import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppComponent } from './app.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { WebServiceIngredient} from './components/ingredient/WebServiceIngredient';
import { OrderComponent } from './components/order/order.component';
import { WebServiceOrder} from './components/order/WebServiceOrder';


@NgModule({
  declarations: [
    AppComponent,
    IngredientComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [WebServiceIngredient, WebServiceOrder],
  bootstrap: [AppComponent]
})
export class AppModule { }
