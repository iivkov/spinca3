import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LiteralExpr } from '@angular/compiler';

interface User {
  name : string;
  companyId: number;
  userId: number;
  companyName: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  logiran : boolean = false;
  url : string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  login(username: string, password : string) {
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
      if(response.length>0)
      {
        this.logiran = true;
      }
      console.log("Logiran: ", this.logiran);
    });
  }

  register(name: string, username: string, password : string, restaurantCheck : boolean) {
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

  // this.http.post(this.url, body).subscribe((response: Array<User>) => {
  //   console.log(response);
  // });
  this.http.post<User>(this.url, body).subscribe(response => {
    console.log(response.userId);
  });
}

}