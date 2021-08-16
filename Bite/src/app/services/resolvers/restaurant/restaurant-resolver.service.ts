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

  async resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Promise<any> {
      // if(this.userService.getUserCompany() !== 2)
      if(!this.userService.isMobile)
      {
        return await this.restraurantService.initRestaurantForCompanyUser();
      }
      else  {
        return await this.restraurantService.initRestaurantForCustomerUser().toPromise();
      }
  }

}
