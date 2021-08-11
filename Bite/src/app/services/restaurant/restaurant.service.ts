import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  initRestaurantForCustomerUser(): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  initRestaurantForCompanyUser(): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
