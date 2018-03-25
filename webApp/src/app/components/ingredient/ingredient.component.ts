import { Component, OnInit } from '@angular/core';
import { WebServiceIngredient }  from './WebServiceIngredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  newIngredient = {
    name: "Name of Ingredient",
    price: 100,
    stock: 0
  }

  constructor(private webServiceIngredient: WebServiceIngredient) {
  }

  ngOnInit() {
    



  }

  postIngredient( ) {
   this.webServiceIngredient.postIngredient( this.newIngredient)
  }

}
