import { Component, ViewChild } from '@angular/core';
import { IngredientComponent} from './components/ingredient/ingredient.component';
import { OrderComponent} from './components/order/order.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(IngredientComponent) ingredients : IngredientComponent;

  onPosted(ingredient) {
    this.ingredients.ingredients.push(ingredient);
  }

}
