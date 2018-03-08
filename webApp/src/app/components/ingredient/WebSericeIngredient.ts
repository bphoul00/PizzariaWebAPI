import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebServiceIngredient {

  constructor(private http:Http) {}

  getIngredients() {
    return this.http.get('http://localhost:3000/api/ingredients/').toPromise();

  }
}
