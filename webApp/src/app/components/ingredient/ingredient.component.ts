import { Component, OnInit,Output, EventEmitter } from '@angular/core';
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

  @Output() onPosted = new EventEmitter();


  constructor(private WebSericeIngredient: WebServiceIngredient) {

  }

  async ngOnInit() {

    var response = await this.WebSericeIngredient.getIngredients();
    this.ingredients = response.json();
  }


  postIngredient( ) {
   this.WebSericeIngredient.postIngredient( this.newIngredient);
   this.onPosted.emit(this.newIngredient);
  }

}
