import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  //private cartService : CartService, 
  constructor(private route : ActivatedRoute, private restaurantService : RestaurantService, private actionSheetController : ActionSheetController, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params.id);
    })
  }

}
