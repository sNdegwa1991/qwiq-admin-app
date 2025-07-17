import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  orderNumber: any;
  shoppingcart: any[]= [];
  enteredPrice: any;
  cartConfirm = 1;
  cartEdit = 0;

  order: any;
  orders: any;
  orderLeng: any;

  address: any;
  contact:any;
  coordinates: any;
  date_placed: any;
  delivery_fees: any;
  information: any;
  note: any;
  order_id: any;
  u_name: any;
  u_phone: any;
  supa: any;
  user_id: any;
  delivery_id = 1;
  rider_id: any;

  increment: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private cartService: CartService,private orderService: OrderService) { 
    this.route.params.subscribe(data =>{
      this.orderNumber = data['order'];
      this.getShoppingCart(this.orderNumber);
      this.getShoppingOrder(this.orderNumber)
    })
  }

  ngOnInit() {}

  getShoppingOrder(num: any){
    this.orderService.getSingleShopping(num).subscribe((res: any) =>{

      this.order = res;
      this.orders = this.order.orders;
      this.orderLeng = this.orders.length;
      
      this.address= this.orders[0].address;
      this.information = this.orders[0].information;
      this.note = this.orders[0].note;
      this.delivery_fees = this.orders[0].delivery_fees;
      this.supa = this.orders[0].supa;
      this.coordinates = this.orders[0].coordinates;
      this.u_name = this.orders[0].u_name;
      this.u_phone = this.orders[0].u_phone;
      this.date_placed = this.orders[0].date_placed;
      this.contact = this.orders[0].contact;
      this.user_id = this.orders[0].user_id;
      this.rider_id = this.orders[0].rider;
    })

   
  }

  getTotal() {
    return this.shoppingcart.reduce((i, j) => i+j.price*j.quantity, 0);
  }
  
  getShoppingCart(order: any){
    this.shoppingcart = JSON.parse(localStorage.getItem(order) || '{}');
  }

  submitList(){
    let catLeng = this.shoppingcart.length;
   this.orderService.registerOder(this.user_id,this.orderNumber,this.coordinates,this.address,this.information,this.information,this.delivery_fees,this.delivery_id,this.supa,this.contact,this.note,this.note,this.rider_id).subscribe((res:any) =>{
    for(this.increment=0;this.increment<catLeng;this.increment++)
    {
    const product = this.shoppingcart[this.increment].id;
    const price = this.shoppingcart[this.increment].price;
    this.orderService.updateShoppingPrices(product,price).subscribe((res) =>{
      console.log(res)
    })
    
   }
   })

   this.router.navigate(['tabs/ridder-order-details/'+this.orderNumber])

  }

  editCart(){
    this.cartEdit = 0;
    this.cartConfirm = 1;
  }
  reviewOrder(){
    this.cartEdit = 1;
    this.cartConfirm = 0;
  }
  itemPrice(event: any,product: any){
    this.enteredPrice = event.target.value;
    
    this.cartService.updateCartPrice(product,this.enteredPrice,this.orderNumber);

    this.getShoppingCart(this.orderNumber);
   }

}
