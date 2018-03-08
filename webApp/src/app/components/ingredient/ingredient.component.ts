import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  name:string;
  price: number;
  stock: number;

  constructor() {
    console.log('constructor ran ...')
  }

  ngOnInit() {
    console.log('ngOnInit ran...')

    this.name = 'tomato';
    this.price = 10;
    this.stock = 2;
  }

  onClick() {
    this.name='Chocolate';
    this.hobbies.push('New Ingredient');
  }

  addIngredient(name) {
    console.log(name);
    this.
    return false;
  }

}
