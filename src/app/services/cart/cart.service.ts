import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  private shoppingCart: any[]= [];

  constructor() { 
    

    // if(sl.length > 0){
    //   this.shoppingCart = sl;
    //  }
  }

  // getShoppingCart() {
  //   return this.shoppingCart
  // }

  addShoppingCart(cart: any, order: any){
    this.shoppingCart.push(cart);
    this.saveShoppingCart(order);
  }

  createNewCart(cart: any,order: any){
    localStorage.setItem(order,JSON.stringify(cart));
  }

  saveShoppingCart(order: any){
    localStorage.setItem(order,JSON.stringify(this.shoppingCart));
  }

  clearShoppingListCart(){
    let len = this.shoppingCart.length;
    for(let i=0;i<len;i++){
    this.shoppingCart.splice(0,1);
    this.saveShoppingCart
  }
  
  }

  updateCartPrice(product: any,price: any,order: any) {
    this.shoppingCart = JSON.parse(localStorage.getItem(order) || '{}');
    for(let [index,c] of this.shoppingCart.entries()) {
      if(c.id === product.id) {
        c.price = price;
      }
    }
   // console.log(this.shoppingCart)
   this.saveShoppingCart(order);

  }
}
