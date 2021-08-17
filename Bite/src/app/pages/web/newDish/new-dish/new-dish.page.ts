import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.page.html',
  styleUrls: ['./new-dish.page.scss'],
})
export class NewDishPage implements OnInit {

  dish_name: string;
  dish_description: string;
  saladCheck : boolean = false;
  breadCheck : boolean = false;
  soupCheck : boolean = false;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
  }

  saveNewDish() {
    this.restaurantService.saveNewDish(this.dish_name, this.dish_description, this.saladCheck, this.breadCheck, this.soupCheck);
  }

}
