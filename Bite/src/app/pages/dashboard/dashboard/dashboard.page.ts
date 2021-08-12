import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private restaurantService : RestaurantService) {
    this.restaurantService._orders.subscribe(val => {this.orders = val})
   }

  ngOnInit() {
  }

  // orders2 = [
  //   {
  //     jelo: 'Rižoto',
  //     narucitelj: 'Ivan Ivanic',
  //   },
  //   {
  //     jelo: 'Ćevapi',
  //     narucitelj: 'Petar Petric',
  //   },
  //   {
  //     jelo: 'Škampi',
  //     narucitelj: 'Ante Antic',
  //   },
  //   {
  //     jelo: 'Punjena paprika',
  //     narucitelj: 'Stipe Stipic',
  //   }
  // ]

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

}
