import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router : Router) { }

  // user: User;
  _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  logiran: boolean = false;
  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";


  login(username: string, password: string) {
    console.log("Logiranje uspjelo...");
    console.log(username);
    console.log(password);

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spUsersAzur",
          "params": {
            "action": "login",
            "email": username,
            "password": password
          }
        }
      ]
    }

    // this.http.post(this.url, body).subscribe(() => {});
    this.http.post(this.url, body).subscribe((response: Array<User>) => {
      // console.log(response);
      if (response.length > 0) {
        // this.logiran = true;
        // this.user = response[0];
        this._user.next(response[0]);
      }
        this.router.navigate(['/web/dashboard'], {replaceUrl : true}); 
    });
  }

  logout() {
    // this.user = null;
    this._user.next(null);
  }

  register(name: string, username: string, password: string, restaurantCheck: boolean, restaurantName: string) {
    console.log("Registracija novog korisnika je uspješna!");
    console.log(name);
    console.log(username);
    console.log(password);
    console.log(restaurantCheck);

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spUsersAzur",
          "params": {
            "action": "insert",
            "name": name,
            "email": username,
            "password": password
          }
        }
      ]
    }

    this.http.post(this.url, body).subscribe((response: Array<{
      userid: number
    }>) => {
      if (response.length > 0 && restaurantCheck) {
        let bodyForNewCompany = {
          "db": "Food",
          "queries": [
            {
              "query": "spCompanyAzur",
              "params": {
                "action": "insert",
                "name": restaurantName,
                "status": "1",
                "userid": response[0].userid
              }
            }
          ]
        }
        this.http.post(this.url, bodyForNewCompany).subscribe(res => {
          console.log(res);
        })

      }
    });
  }

  isCompany(){
    return 5;
  }

}