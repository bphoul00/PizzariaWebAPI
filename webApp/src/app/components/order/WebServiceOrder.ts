import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebServiceOrder {

  constructor(private http:Http) {}

  getOrders() {
    return this.http.get('http://localhost:3000/api/orders').toPromise();

  }
}
