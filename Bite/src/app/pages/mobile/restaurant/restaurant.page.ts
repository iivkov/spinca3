import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  selectedRestaurant?: Restaurant;
  
  //private cartService : CartService, 
  constructor(private route : ActivatedRoute, private restaurantService : RestaurantService, private actionSheetController : ActionSheetController, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params.id);
    })
    this.selectedRestaurant = this.restaurantService.selectedRestaurant;
  }

  days = [1, 2, 3, 4, 5];
  daysNames = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  currentDay = 1;
  changeDay(day: number) {
    this.currentDay = day;
  }

}
