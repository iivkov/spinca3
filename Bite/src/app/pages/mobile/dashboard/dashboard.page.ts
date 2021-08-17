import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  allRestaurants : Array<Restaurant>;
  filteredRestaurants : Array<Restaurant>;

  constructor(private restaurantService : RestaurantService) { }

  ngOnInit() {
    this.restaurantService._restaurants.subscribe(value => {
      if(value.length) {
        this.allRestaurants = value;
        this.filteredRestaurants = value;
        this.setImages();
      }
    })
  }

  setImages() {
    this.allRestaurants.forEach(r => {
      const random = Math.floor(Math.random()*5) + 1;
      r.image = `url("assets/restorani/restoran${random}.jpg")`;
    })
  }

  search(event){
    const query = event.target.value.toLowerCase();
    this.filteredRestaurants = !query ? [...this.allRestaurants] : this.allRestaurants.filter(r => r.name.toLowerCase().includes(query));
  }

}
