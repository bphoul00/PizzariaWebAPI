import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebServiceIngredient {

  BASE_URL = 'http://localhost:3000/api/';

  constructor(private http:Http) {}


  getIngredients() {
    return this.http.get( this.BASE_URL + 'ingredients/').toPromise();
  }

  getIngredientsInstock() {
    return this.http.get( this.BASE_URL + 'ingredients/instock').toPromise();
  }

  postIngredient(ingredient) {
    return this.http.post( this.BASE_URL + 'ingredients/',ingredient).toPromise();
  }
}
