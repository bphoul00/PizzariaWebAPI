import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { WebServiceIngredient} from './components/ingredient/WebServiceIngredient';
import { OrderComponent } from './components/order/order.component';
import { WebServiceOrder} from './components/order/WebServiceOrder';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './components/register/auth.service';

var routes = [
  {
  path: 'ingredients',
  component: IngredientComponent
},
{
  path: 'orders',
  component: OrderComponent
},
{
  path: 'register',
  component: RegisterComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    IngredientComponent,
    OrderComponent,
    NavbarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [WebServiceIngredient, WebServiceOrder, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
