import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menuCtrl: MenuController, private userService: UserService, private router : Router, private storageService : StorageService) {
      this.onInitApp();
    }

    onInitApp(){
      if(this.userService.isLogged()){
        this.router.navigate(['/web/dashboard']);
      }
      this.userService._user.subscribe(val => {
        this.loggedIn = val != null;
      })
    }
  
    async openMenu() {
      await this.menuCtrl.open('first');
    }
  
    loggedIn : boolean = false;
    
    closeMenu() {
      this.menuCtrl.close('first');
    }
  
    logout() {
      this.userService.logout();
      this.closeMenu();
    }
  }