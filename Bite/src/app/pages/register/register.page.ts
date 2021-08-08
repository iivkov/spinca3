import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  username: string;
  password: string;

  restaurantCheck : boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  registerClick()
  {
    this.userService.register(this.name, this.username, this.password, this.restaurantCheck);
  }

}
