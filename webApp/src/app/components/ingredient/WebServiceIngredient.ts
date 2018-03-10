import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class WebServiceIngredient {
  ingredients = [];
  BASE_URL = 'http://localhost:3000/api/';

  constructor(private http:Http) {
    this.getIngredients();
  }


  async getIngredients() {
    try {
      var response = await this.http.get( this.BASE_URL + 'ingredients/').toPromise();
      this.ingredients = response.json();
    } catch (error) {
      this.handleError("Unable to get ingredients");

    }
  }

  getIngredientsInstock() {
    try {
      return this.http.get( this.BASE_URL + 'ingredients/instock').toPromise();
    } catch {
      this.handleError("Unable to get ingredient");
    }

  }

  async postIngredient(ingredient) {
    try{
      var response = await this.http.post( this.BASE_URL + 'ingredients/',ingredient).toPromise();
      this.ingredients.push(response.json());
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
