import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "ivan@ivan.hr";
  password: string = "ivan123";
  logiran;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.logiran = this.userService.logiran;
  }

  loginClick()
  {
    this.userService.login(this.username, this.password);
  }

}
