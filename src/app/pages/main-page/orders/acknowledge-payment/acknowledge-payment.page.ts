import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OrderServerResponse } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-acknowledge-payment',
  templateUrl: './acknowledge-payment.page.html',
  styleUrls: ['./acknowledge-payment.page.scss'],
})
export class AcknowledgePaymentPage implements OnInit {
  orderNumber: any;
  customer_i: any;
  orderDetails: any;
  orderStatus: any;
  aprovalStatus: any;
  stageStatus: any;
  loc: any;
  building: any;
  info: any;
  deliveryFees: any;
  phoneNumber: any;
  username: any;
  coordinates: any;
  clat: any;
  clng: any;
  otherCosts: any;
  otherCostsTotal: any;
  rider: any;
  receipt_img: any;
  time_frame: any;
  timelines: any;
  customer_id: any;
  cart: any[]= [];
  orderPayments: any[]= [];

  constructor(private route: ActivatedRoute,private orderService: OrderService,
    private toast: ToastController,private router: Router) { 
    this.route.params.subscribe(data =>{
      this.orderNumber = data['order'];
      this.customer_i = data['user'];
    })
  }

  ngOnInit() {
    this.dataPopulation();
    setInterval(() => {
      this.dataPopulation();
    }, 5000);
  }

  dataPopulation(){

    this.orderService.getOrderDetails(this.orderNumber).subscribe(res =>{
      this.orderDetails = res;
      this.cart = this.orderDetails.products;
    });
    
    this.orderService.getOrderStatus(this.orderNumber).subscribe((data) =>{
      this.orderStatus = data;
      this.aprovalStatus = this.orderStatus.orders[0].status;
      this.stageStatus = this.orderStatus.orders[0].stage_status;
      this.deliveryFees = Number(this.orderStatus.orders[0].delivery_fees);
      this.phoneNumber = this.orderStatus.orders[0].u_phone;
      this.username = this.orderStatus.orders[0].u_name;
      this.info = this.orderStatus.orders[0].information;
      this.building = this.orderStatus.orders[0].building;
      this.loc = this.orderStatus.orders[0].address;
      this.coordinates = this.orderStatus.orders[0].coordinates;
      this.rider = this.orderStatus.orders[0].rider;
      this.receipt_img = this.orderStatus.orders[0].receipt;
      this.time_frame = this.orderStatus.orders[0].time_frame;
      this.timelines = this.orderStatus.orders[0].timelines;
  
     })
 
     this.orderService.getOtherOrderCosts(this.orderNumber).subscribe((res: OrderServerResponse) =>{
      this.otherCosts = res.costs;
      let len = this.otherCosts.length;
      let costs = 0;
      for(let i=0;i<len;i++){
       costs = costs+Number(this.otherCosts[i].amount);
      }
      this.otherCostsTotal = costs;
     })

     this.orderService.getOrderPayments(this.orderNumber).subscribe((res:any) =>{
      this.orderPayments = res.payments;
    })
    
  }

  getTotal() {
    return this.cart.reduce((i, j) => i+j.price*j.quantity, 0);
  }

  savePayment(){
    const money = document.getElementById('amount_paid') as HTMLInputElement;
    const mode = document.getElementById('mode') as HTMLInputElement;
    const ref = document.getElementById('reference') as HTMLInputElement;
    const descr = document.getElementById('description') as HTMLInputElement;

    if(money.value === '' || mode.value === undefined || ref.value === '' || descr.value === '')
    {
       alert('All fields are required');
    } else {
      this.orderService.registerPayment(this.customer_i,this.orderNumber,money.value,ref.value,descr.value,mode.value)
      .subscribe(res =>{

        console.log(res);
        this.toast.create({
          message: 'Payment Saved successifully',
          duration: 3000,
          position: 'top'
         }).then((toastData) =>{
          //console.log(toastData);
          toastData.present();
         });
       this.router.navigate(['tabs/order-details/'+this.orderNumber])

      })
    }
  }

  backHome(){
    this.router.navigate(['tabs/order-details/'+this.orderNumber]);
  }

}
