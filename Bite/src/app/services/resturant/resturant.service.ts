import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResturantService {

  constructor() { }

  
  url : string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";
}
