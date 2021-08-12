import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router) { }

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

  addNewDish()
  {
    this.router.navigate(['/web/new-dish']);
  }

}
