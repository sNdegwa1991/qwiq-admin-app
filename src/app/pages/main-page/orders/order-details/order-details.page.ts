import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { LocationService } from 'src/app/services/global/location.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { OrderReviewComponent } from 'src/app/pages/components/modals/order-review/order-review.component';
import { OrderServerResponse } from 'src/app/models/order.model';
import { AssignRiderOrderComponent } from 'src/app/pages/components/modals/assign-rider-order/assign-rider-order.component';
import { AttachReceiptComponent } from 'src/app/pages/components/modals/attach-receipt/attach-receipt.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

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

  destLat: any;
  destLng: any;

  DerDistance: any;
  restaurantName: any;
  reastaurantCoords: any;
  assignedPerson: any;
  riderName: any;

  receiptUrl = environment.SERVER_URL+'/pdf/receipts'

  orderPayments: any[]= [];
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private orderService: OrderService,
    private maps: LocationService,
    private renderer: Renderer2,
    private toast: ToastController,
    private callNumber: CallNumber,
    private modalCtrl: ModalController,
    private alertContoller: AlertController) { 
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

  ngAfterViewInit() {
    this.getCurrentLocation().then((loc) =>{
    this.loadMap().then((pol) =>{
     this.drawPolyline();
   })
 })    
   }

  dataPopulation(){
    this.orderService.getPersonAssignOrder(this.orderNumber).subscribe((res: any) =>{
       this.assignedPerson = res;
       this.riderName = this.assignedPerson.orders[0].name;
    })
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
      this.restaurantName = this.orderStatus.orders[0].resto_name;
      this.coordinates = this.orderStatus.orders[0].coordinates;
      this.reastaurantCoords = this.orderStatus.orders[0].resto_coordinates;
      this.rider = this.orderStatus.orders[0].rider;
      this.receipt_img = this.orderStatus.orders[0].receipt;
      this.time_frame = this.orderStatus.orders[0].time_frame;
      this.timelines = this.orderStatus.orders[0].timelines;
      this.customer_id = this.orderStatus.orders[0].user_id;
    
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

     this.orderService.getOrderPayments(this.orderNumber).subscribe((res:any) =>{
      this.orderPayments = res.payments;
    })
    
  }

  acknowledePayment(order: any,customer_id: any){
    this.router.navigate(['tabs/acknowledge-payment/'+order+'/'+customer_id])

  }

  getPaymentTotal() {
    return this.orderPayments.reduce((i, j) => Number(i)+Number(j.amount), 0);
  }

 async attachShoppingReceipt(order: any){
    const modal = await this.modalCtrl.create({
      component: AttachReceiptComponent,
      componentProps: { 
        orderNumber: order,
      }
    });
    modal.present();

  }

  async deliveryApproval(order: any){
    const alert = await this.alertContoller.create({
      message: "Are you sure you want to approve order number "+order+" for delivery? NOTE: This order has not been paid",
      buttons: [{
        text: "No",
        role: "Cancel"
      },{
        text: "Yes",
        handler: () =>{
         this.assignOrderToRider(order);
        }
      }]
     });
     await alert.present();

  }

  async pushToresto(){
    const alert = await this.alertContoller.create({
      message: "Are you sure you want to push order number "+this.orderNumber+" to "+this.restaurantName+"?",
      buttons: [{
        text: "No",
        role: "Cancel"
      },{
        text: "Yes",
        handler: () =>{
          this.orderService.pushOrderToResto(this.orderNumber,1).subscribe(res =>{
            if(res === 'success')
            {
              this.toast.create({
                message: 'Order number '+this.orderNumber+' sent to '+this.restaurantName+' for confirmation',
                duration: 3000,
                position: 'top'
               }).then((toastData) =>{
                //console.log(toastData);
                toastData.present();
               });
      
            } else {
              this.toast.create({
                message: 'Error! Unable to push. Kindly check your internet',
                duration: 3000,
                position: 'top'
               }).then((toastData) =>{
                //console.log(toastData);
                toastData.present();
               })
            }
          })
        }
      }]
     });
     await alert.present();
  }

  async openModalReviewOrder(order: any) {
    const modal = await this.modalCtrl.create({
      component: OrderReviewComponent,
      componentProps: { 
        orderNumber: order,
      }
    });
    modal.present();
  }

  async assignOrderToRider(order: any){
    const modal = await this.modalCtrl.create({
      component: AssignRiderOrderComponent,
      componentProps: { 
        orderNumber: order,
      }
    });
    modal.present();
  }

  getTotal() {
    return this.cart.reduce((i, j) => i+j.price*j.quantity, 0);
  }

  callCustomer(){
    this.callNumber.callNumber(this.phoneNumber,true)
    .then(res => console.log("Call Launched Successifully"+ res))
    .catch(res => console.log("Call Launched Failed"+ res))
  }

  confirmOrder(order: any){
   this.orderService.updateOrderStatus(this.orderNumber,1).subscribe(res =>{
    if(res === 'success')
    {
      this.toast.create({
        message: 'Order Confirmed. Customer notified to pay',
        duration: 3000,
        position: 'top'
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
       document.getElementById("cstatus")?.setAttribute("style","display:inline");
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

  confirmDelivery(order: any){
    this.orderService.updateOrderStatus(this.orderNumber,4).subscribe(res =>{
      if(res === 'success')
      {
        this.toast.create({
          message: 'Order Confirmed As Delivered and Closed.',
          duration: 3000,
          position: 'top'
         }).then((toastData) =>{
          //console.log(toastData);
          toastData.present();
         });
  
         document.getElementById("action-buttons2")?.setAttribute("style","display:none");
         document.getElementById("s1")?.setAttribute("style","display:none");
         document.getElementById("s2")?.setAttribute("style","display:none");
         document.getElementById("s3")?.setAttribute("style","display:none");
         document.getElementById("s4")?.setAttribute("style","display:none");
         document.getElementById("s5")?.setAttribute("style","display:none");
         document.getElementById("cstatus2")?.setAttribute("style","display:inline");
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
    this.router.navigate(['tabs/orders-search/'+this.aprovalStatus])
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

  async getCurrentLocation(){
    const coordinates = await this.maps.getCurrentLocation();
      this.clat = coordinates.coords.latitude;
      this.clng = coordinates.coords.longitude;
      console.log(coordinates)
      this.source.lat = Number(this.clat);
      this.source.lng = Number(this.clng);
  }

  async loadMap() {
    try {
      console.log('map');
      let googleMaps: any = await this.maps.loadGoogleMaps();
      const mapEl = this.mapElementRef.nativeElement;

      this.orderService.getOrderStatus(this.orderNumber).subscribe((data) =>{
        let comma = this.coordinates.indexOf(',');
        this.dest.lat = Number(this.coordinates.substring(0,comma));
        this.dest.lng = Number(this.coordinates.substring(comma+1,this.coordinates.length));

        let comma2 = this.reastaurantCoords.indexOf(',');
        this.restoCoord.lat = Number(this.reastaurantCoords.substring(0,comma2));
        this.restoCoord.lng = Number(this.reastaurantCoords.substring(comma2+1,this.reastaurantCoords.length));

      const map = new googleMaps.Map(mapEl, {
        center: { lat: this.restoCoord.lat, lng: this.restoCoord.lng },
        disableDefaultUI: true,
        zoom: 10,
      });
      this.directionsService = new googleMaps.DirectionsService;
      this.directionsDisplay = new googleMaps.DirectionsRenderer;
      this.directionsDisplay = new googleMaps.DirectionsRenderer();

      const sourceIconUrl = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';
      const destinationIconUrl = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
      
      const source_position = new googleMaps.LatLng(this.restoCoord.lat, this.restoCoord.lng);
      const destination_position = new googleMaps.LatLng(this.dest.lat, this.dest.lng);
      const source_icon = {
        url: sourceIconUrl,
        scaledSize: new googleMaps.Size(30, 40), // scaled size
        origin: new googleMaps.Point(0, 0), // origin
        anchor: new googleMaps.Point(0, 0) // anchor
      };
      
      const destination_icon = {
        url: destinationIconUrl,
        scaledSize: new googleMaps.Size(30, 40), // scaled size
        origin: new googleMaps.Point(0, 0), // origin
        anchor: new googleMaps.Point(0, 0) // anchor
      };
      const source_marker = new googleMaps.Marker({
        map: map,
        position: source_position,
        animation: googleMaps.Animation.DROP,
        icon: source_icon,
      });

      const destination_marker = new googleMaps.Marker({
        map: map,
        position: destination_position,
        animation: googleMaps.Animation.DROP,
        icon: destination_icon
      });

      source_marker.setMap(map);
      destination_marker.setMap(map);

      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 6,
          strokeOpacity: 1,
          strokeColor: 'blue'
        },
        suppressMarkers: true
      });

      map.setCenter(source_position);
      this.renderer.addClass(mapEl, 'visible');
    });
    } catch(e) {
      console.log(e);
    }
  }

  drawPolyline() {
    this.orderService.getOrderStatus(this.orderNumber).subscribe((data) =>{

      let comma = this.coordinates.indexOf(',');
      this.dest.lat = Number(this.coordinates.substring(0,comma));
      this.dest.lng = Number(this.coordinates.substring(comma+1,this.coordinates.length));

      let comma2 = this.reastaurantCoords.indexOf(',');
      this.restoCoord.lat = Number(this.reastaurantCoords.substring(0,comma2));
      this.restoCoord.lng = Number(this.reastaurantCoords.substring(comma2+1,this.reastaurantCoords.length));

      this.directionsService.route({
        origin: this.restoCoord,
        destination: this.dest,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
      }, (response:any, status:any) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          console.log('response: ', response);
          const directionsData = response.routes[0].legs[0];
          const duration = directionsData.duration.text;
          const distance = directionsData.distance.text;
         console.log('Distance: '+distance)
          console.log('Time: '+duration);

          this.DerDistance = distance;
        } else {
          console.log(status);
        }
      });
   
     })
  }


  

}
