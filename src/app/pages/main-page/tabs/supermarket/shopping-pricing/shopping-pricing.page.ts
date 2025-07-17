import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { ConfirmShoppingComponent } from '../modals/confirm-shopping/confirm-shopping.component';
import { AssignRiderSupaComponent } from 'src/app/pages/components/modals/assign-rider-supa/assign-rider-supa.component';

@Component({
  selector: 'app-shopping-pricing',
  templateUrl: './shopping-pricing.page.html',
  styleUrls: ['./shopping-pricing.page.scss'],
})
export class ShoppingPricingPage implements OnInit {
  order: any;
  orders: any;
  orderLeng: any;
  shoppingDetails: any
  shoppingList: any[]= [];
  orderNumber: any;

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

  startBtn = 1;
  priceColumn=0;
  submitBtn=0;
  rider: any;

  enteredPrice: any;

  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private modalCtrl: ModalController,) {
    this.route.params.subscribe(data =>{
      this.orderNumber = data['order'];
      this.getShoppingOrder(this.orderNumber);
      this.getShoppingeDetail(this.orderNumber);
      localStorage.removeItem(this.orderNumber)
    })
   }
  
  ngOnInit() {
    
  }
  

  itemPrice(event: any,product: any){
   this.enteredPrice = event.target.value;
   
   this.cartService.updateCartPrice(product,this.enteredPrice,this.orderNumber);
  }

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
      this.rider = this.orders[0].rider;
    })
  }
  getShoppingeDetail(num: any){
    this.orderService.getShoppingDetails(num).subscribe((res: any) =>{
      this.shoppingDetails = res;
      this.shoppingList = this.shoppingDetails.orders;
    })
  }

  createCart(cart: any){
   this.cartService.createNewCart(cart,this.orderNumber)
   this.startBtn = 0;
   this.priceColumn = 1;
   this.submitBtn = 1;

   alert('NOTE: Enter price of each Item. If an Item is not available enter zero (0)');
  }

  async submitPrices(){
    this.router.navigate(['tabs/shopping-confirmation/'+this.orderNumber])
  //   const modal = await this.modalCtrl.create({
  //     component: ConfirmShoppingComponent,
  //     componentProps: { 
  //       orderNumber: this.orderNumber,
  //     }
  //   });
  //   modal.present();
  }

  backHome(){
    this.router.navigate(['tabs/shopping-list']);
  }

  async assignRider(order: any,supa: any){
      const modal = await this.modalCtrl.create({
      component: AssignRiderSupaComponent,
      componentProps: { 
        orderNumber: order,
        supa: supa
      }
    });
    modal.present();
  }

  

}
