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
              tablename: 'allorders'
          },
        //   {
        //     "query": "spMenu",
        //     "params": {
        //         "action": "week",
        //         "companyid": "1"
        //     },
        //     tablename: 'allorders'
        // }
      ]
  }
  return this.httpClient.post(this.url, body).toPromise().then((val: {
    allOrders: Array<Order>
    // allMenus: Array<any>
  }) => {
    this._orders.next(val.allOrders);
  })
}

  initRestaurantForCustomerUser() {
    return true;
  }

}