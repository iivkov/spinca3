import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {

  constructor(private httpClient : HttpClient, private userService : UserService) { }

  url : string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";
  _orders: BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>(null);
  _menus: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);

initRestaurantForCompanyUser() {
  let body = {
      "db": "Food",
      "queries": [
          {
              "query": "spOrdersQuery",
              "params": {
                  "action": "forCompany",
                  "restoranid": this.userService.getUserCompany()
              },
              tablename: 'allOrders'
          },
          {
            "query": "spMenu",
            "params": {
                "action": "week",
                "companyid": "1"
            },
            tablename: 'allMenus'
        },
        {
          "query": "spDishMenu",
          "params": {
              "action": "dish",
              "companyid": "1"
          },
          tablename: 'allDishes'
      }
      ]
  }
  return this.httpClient.post(this.url, body).toPromise().then((val: {
    allOrders: Array<Order>,
    allMenus: Array<any>,
    allDishes: Array<any>
  }) => {
    this._orders.next(val.allOrders);
    this._menus.next(val.allMenus);
  })
}

  initRestaurantForCustomerUser() {
    return true;
  }

  saveNewDish(dish_name: string, dish_description: string, saladCheck: boolean, breadCheck : boolean, soupCheck : boolean){
    console.log("Dodavanje novog jela:");
    console.log(dish_name);
    console.log(dish_description);
    console.log(saladCheck);
    console.log(breadCheck);
    console.log(soupCheck);

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spDishAzur",
            "params": {
                "action": "insert",
                "companyid": "9",
                "name": dish_name,
                "soup": soupCheck,
                "salad": saladCheck,
                "bread": breadCheck,
                "userid": this.userService._user.getValue().userId
            }
          }
      ]
    }

    this.httpClient.post(this.url, body).subscribe();
  }

}