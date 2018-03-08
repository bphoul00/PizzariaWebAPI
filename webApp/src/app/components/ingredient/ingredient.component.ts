import { Component, OnInit } from '@angular/core';
import { WebServiceIngredient }  from './WebSericeIngredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  name: string;
  price: number;
  stock: number;
  ingredients = [];


  constructor(private WebSericeIngredient: WebServiceIngredient) {
    console.log('constructor ran ...')
  }




  async ngOnInit() {
    console.log('ngOnInit ran...')

    var response = await this.WebSericeIngredient.getIngredients();
    this.ingredients = response.json();
  }

  onClick() {
    this.name='Chocolate';
  }

  addIngredient(name) {
    console.log(name);

    return false;
  }

}
