import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantService } from '../../restaurant/restaurant.service';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantResolverService implements Resolve<boolean> {

  constructor(private userService : UserService, private restraurantService : RestaurantService) { }

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      if(this.userService.isCompany() !== 2)
      {
        return this.restraurantService.initRestaurantForCompanyUser();
      }
      else {
        return this.restraurantService.initRestaurantForCustomerUser();
      }
  }

}
