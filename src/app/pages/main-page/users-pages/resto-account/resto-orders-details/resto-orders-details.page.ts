import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { OrderServerResponse } from 'src/app/models/order.model';
import { OrderReviewComponent } from 'src/app/pages/components/modals/order-review/order-review.component';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-resto-orders-details',
  templateUrl: './resto-orders-details.page.html',
  styleUrls: ['./resto-orders-details.page.scss'],
})
export class RestoOrdersDetailsPage implements OnInit {
  @ViewChild('map', {static: true}) mapElementRef: ElementRef;

  googleMaps: any;
  source: any = { lat: 0, lng: 0 };
  dest: any = { lat: 0, lng: 0 };

  restoCoord: any = { lat: 0, lng: 0 };
  
  directionsService: any;
  directionsDisplay: any;

  orderNumber: any;
  cart: any[]= [];
  orderDetails: any;
  orderStatus: any;
  aprovalStatus: any;
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
  notes: any;

  destLat: any;
  destLng: any;

  DerDistance: any;
  restaurantName: any;
  reastaurantCoords: any;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private orderService: OrderService,
    private alertContoller: AlertController,
    private toast: ToastController,
    private modalCtrl: ModalController) {
      this.route.params.subscribe(data =>{
        this.orderNumber = data['orderId'];
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
      console.log(this.orderStatus)
      this.aprovalStatus = this.orderStatus.orders[0].status;
      this.deliveryFees = Number(this.orderStatus.orders[0].delivery_fees);
      this.phoneNumber = this.orderStatus.orders[0].u_phone;
      this.username = this.orderStatus.orders[0].u_name;
      this.info = this.orderStatus.orders[0].information;
      this.building = this.orderStatus.orders[0].building;
      this.loc = this.orderStatus.orders[0].address;
      this.restaurantName = this.orderStatus.orders[0].resto_name;
      this.coordinates = this.orderStatus.orders[0].coordinates;
      this.reastaurantCoords = this.orderStatus.orders[0].resto_coordinates;
      this.notes = this.orderStatus.orders[0].notes;
     
      let comma = this.coordinates.indexOf(',');
      this.dest.lat = Number(this.coordinates.substring(0,comma));
      this.dest.lng = Number(this.coordinates.substring(comma+1,this.coordinates.length));

      let comma2 = this.reastaurantCoords.indexOf(',');
      this.restoCoord.lat = Number(this.reastaurantCoords.substring(0,comma2));
      this.restoCoord.lng = Number(this.reastaurantCoords.substring(comma2+1,this.reastaurantCoords.length));
   
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
    
  }
  getTotal() {
    return this.cart.reduce((i, j) => i+j.price*j.quantity, 0);
  }

 async confirmOrder(order: any){
    const alert = await this.alertContoller.create({
      message: "Are you sure you want to confirm order number "+order+"?",
      buttons: [{
        text: "No",
        role: "Cancel"
      },{
        text: "Yes",
        handler: () =>{
          this.orderConfirmation();
        }
      }]
     });
     await alert.present();

  }

  orderConfirmation(){
    this.orderService.updateOrderStatus(this.orderNumber,1).subscribe(res =>{
      if(res === 'success')
      {
        this.toast.create({
          message: 'Order Confirmed. Customer notified to pay. Once paid the ridder will come for delivery',
          duration: 3000,
          position: 'middle'
         }).then((toastData) =>{
          //console.log(toastData);
          toastData.present();
         });
  
         document.getElementById("action-buttons")?.setAttribute("style","display:none");
         document.getElementById("s1")?.setAttribute("style","display:none");
         document.getElementById("s2")?.setAttribute("style","display:none");
         document.getElementById("s3")?.setAttribute("style","display:none");
         document.getElementById("s4")?.setAttribute("style","display:none");
         document.getElementById("s5")?.setAttribute("style","display:none");
      } else {
        this.toast.create({
          message: 'Error! Unable to confirm. Kindly check your internet',
          duration: 3000,
          position: 'top'
         }).then((toastData) =>{
          //console.log(toastData);
          toastData.present();
         })
      }
     })
  }

 async openModalReviewOrder(order: any){
    const modal = await this.modalCtrl.create({
      component: OrderReviewComponent,
      componentProps: { 
        orderNumber: order,
      }
    });
    modal.present();

  }
 async rejectOrder(order: any){
    const alert = await this.alertContoller.create({
      message: "Are you sure you want to cancel order number "+order+"?",
      buttons: [{
        text: "No",
        role: "Cancel"
      },{
        text: "Yes",
        handler: () =>{
          this.cancelOrder();
        }
      }]
     });
     await alert.present();

  }

  cancelOrder(){
    this.orderService.updateOrderStatus(this.orderNumber,3).subscribe(res =>{
      if(res === 'success')
      {
        this.toast.create({
          message: 'Success! Order number '+this.orderNumber+' has been Cancelled.',
          duration: 3000,
          position: 'top'
         }).then((toastData) =>{
          //console.log(toastData);
          toastData.present();
         });

      } else {
        this.toast.create({
          message: 'Error! Unable to confirm. Kindly check your internet',
          duration: 3000,
          position: 'top'
         }).then((toastData) =>{
          //console.log(toastData);
          toastData.present();
         })
      }
     })
  }
  backHome(){
  this.router.navigate(['tabs/resto-home']);
  }

}
