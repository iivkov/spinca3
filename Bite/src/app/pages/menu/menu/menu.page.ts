import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit() {
  }

  orders : Array<Order>=[];
  days = [1, 2, 3, 4, 5];
  daysNames = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  daysNamesCRO = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak'];

  currentDay = 1;
  changeDay(day: number) {
    this.currentDay = day;
  }

  getOrdersForDay() {
    if(this.orders != null) {
      return this.orders.filter(o => o.dan == this.daysNamesCRO[this.currentDay -1]);
    }
  }

  addNewDish()
  {
    this.router.navigate(['/web/new-dish']);
  }

}
