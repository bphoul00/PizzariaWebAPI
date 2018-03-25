import { Component, OnInit } from '@angular/core';
import { WebServiceOrder} from './WebServiceOrder';
import { WebServiceIngredient }  from './../ingredient/WebServiceIngredient';

import 'rxjs/add/operator/map'


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders = [];
  ingredients = [];

  newOrder = {
    customerName : 'Customer Name',
    customerEmail : 'email@example.com',
    customerTelephone : '1-(555)-555-5555',
    dateTime : '2018-01-01T08:00:00',
    ingredients : []
  }



  post() {
  }

  constructor(private WebServiceOrder: WebServiceOrder, private WebServiceIngredient: WebServiceIngredient) { }

  async ngOnInit() {

    this.WebServiceOrder.getOrders().subscribe( res => {
    this.orders = res;
    });



    this.WebServiceIngredient.getIngredientsInstock().subscribe( res => {
    this.ingredients = res;
    console.log(res);
    });

    //TEST
    this.WebServiceOrder.getUser().subscribe();

  }

}
