import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { AuthService } from './../register/auth.service';

@Injectable()
export class WebServiceOrder {

  BASE_URL = 'http://localhost:3000';

  constructor(private http:Http, private auth: AuthService) {}

  getOrders() {
    return this.http.get( this.BASE_URL+'/api/orders').toPromise();

  }

  getUser () {
    return this.http.get( this.BASE_URL + '/users/me', this.auth.tokenHeader).map(res => res.json());
  }

}
