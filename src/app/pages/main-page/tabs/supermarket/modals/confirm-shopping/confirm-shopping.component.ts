import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-confirm-shopping',
  templateUrl: './confirm-shopping.component.html',
  styleUrls: ['./confirm-shopping.component.scss'],
})
export class ConfirmShoppingComponent implements OnInit {
  shoppingcart: any;
  orderNumber: string;
  myOrder: any;
  constructor(private cartService: CartService) {
    this.getShoppingList(this.orderNumber);
    this.myOrder = this.orderNumber;
   }

  ngOnInit() {
    const num = document.getElementById('order_number') as HTMLInputElement;
    console.log(num.value);
  }

  getShoppingList(order: any){
    this.shoppingcart = JSON.parse(localStorage.getItem(order) || '{}');
    console.log(this.shoppingcart)
    console.log(order)
  }

  submitList(){

  }

  reviewOrder(){

  }

}
