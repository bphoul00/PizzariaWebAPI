import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './../register/auth.service'


@Injectable()
export class WebServiceIngredient {
  ingredients = [];
  BASE_URL = 'http://localhost:3000/api';

  constructor(private http:Http, private auth: AuthService) {
    this.getIngredients();
  }


  getIngredients() {
    try {
      this.http.get( this.BASE_URL + '/ingredients', this.auth.tokenHeader).map(res => {
        this.ingredients = res.json();
        console.log(this.ingredients);
      });
    } catch (error) {
      this.handleError("Unable to get ingredients");

    }
  }

  getIngredientsInstock() {
    try {
      return this.http.get( this.BASE_URL + '/ingredients/instock', this.auth.tokenHeader).map(res => res.json());
    } catch {
      this.handleError("Unable to get ingredient");
    }

  }

  postIngredient(ingredient) {
    try{
      this.http.post( this.BASE_URL + '/ingredients/', ingredient, this.auth.tokenHeader).map(res => {
        this.ingredients.push(res.json())
      });
    } catch {
      this.handleError("Unable to create ingredient");
    }
  }

  private handleError(error) {
    console.error(error);
    alert(error);
    //TODO Better UI error notification

  }

}
