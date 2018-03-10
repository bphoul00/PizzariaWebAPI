import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { WebServiceIngredient} from './components/ingredient/WebServiceIngredient';
import { OrderComponent } from './components/order/order.component';
import { WebServiceOrder} from './components/order/WebServiceOrder';
import { NavbarComponent } from './components/navbar/navbar.component';

var routes = [
  {
  path: 'ingredients',
  component: IngredientComponent
},
{
  path: 'orders',
  component: OrderComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    IngredientComponent,
    OrderComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WebServiceIngredient, WebServiceOrder],
  bootstrap: [AppComponent]
})
export class AppModule { }
