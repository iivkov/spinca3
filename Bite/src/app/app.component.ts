import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  loggedIn : boolean = false;
  isMobile : boolean = false;

  constructor(private menuCtrl: MenuController, private userService: UserService, private router : Router, private storageService : StorageService, private platform : Platform) {
      this.onInitApp();
    }

    onInitApp(){
      this.userService.isMobile = this.platform.is('mobileweb') || this.platform.is('mobile');
      this.isMobile = this.userService.isMobile;

      if(this.userService.isLogged()){
        // this.router.navigate(['/web/dashboard']);
        this.router.navigate(['/' + (!this.isMobile ? 'web' : 'mobile/tabs') + '/dashboard'], {replaceUrl : true});
      }
      this.userService._user.subscribe(val => {
        this.loggedIn = val != null;
      })
    }
  
    async openMenu() {
      await this.menuCtrl.open('first');
    }
    
    closeMenu() {
      this.menuCtrl.close('first');
    }
  
    logout() {
      this.userService.logout();
      this.closeMenu();
    }
  }