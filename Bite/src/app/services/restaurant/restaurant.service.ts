import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { Order } from 'src/app/interfaces/order';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { MenuDish } from 'src/app/interfaces/menu-dish';
import { Dish } from 'src/app/interfaces/dish';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {

  constructor(private httpClient : HttpClient, private userService : UserService) { }

  url : string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";
  _orders: BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>(null);
  _menus: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  _restaurants: BehaviorSubject<Array<Restaurant>> = new BehaviorSubject<Array<Restaurant>>([]);
  _dishes: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>(null);

  selectedRestaurant?: Restaurant;

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
    allMenus: Array<Menu>,
    allDishes: Array<Dish>
  }) => {
    this._orders.next(val.allOrders);
    this._menus.next(val.allMenus);
    this._dishes.next(val.allDishes);
  })
}

  initRestaurantForCustomerUser() {
    let body = {
      "db": "Food",
      "queries": [
          {
            "query": "spCompany",
            "params": {
                "@action": "all"
            },
              tablename: 'allRestaurants'
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
          "query": "spMenu",
            "params": {
                "action": "all"
            },
          tablename: 'allMenus'
      }
      ]
    }
    return this.httpClient.post(this.url, body).pipe(map((val : {
      allRestaurants : Array<Restaurant>;
      allMenus: Array<MenuDish>;
    }) => {
      if(val.allRestaurants.length >0 ) {
        const x = val.allRestaurants.map(r => ({
          companyId: r.companyId,
          name: r.name,
          menus: [1, 2, 3, 4, 5].map(d => val.allMenus.filter(m => m.companyId === r.companyId && m.day === d))
        }));
        this._restaurants.next(x);  
      }
    }));

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

  restaurantSelection(restaurant: Restaurant): void {
    this.selectedRestaurant = restaurant;
    console.log(this.selectedRestaurant);
    
  }

}