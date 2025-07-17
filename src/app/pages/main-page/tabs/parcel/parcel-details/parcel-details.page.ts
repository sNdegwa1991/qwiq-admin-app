import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ParcelServerResponse } from 'src/app/models/parcel.model';
import { AssignRiderParcelComponent } from 'src/app/pages/components/modals/assign-rider-parcel/assign-rider-parcel.component';
import { LocationService } from 'src/app/services/global/location.service';
import { MessagingService } from 'src/app/services/global/messaging.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.page.html',
  styleUrls: ['./parcel-details.page.scss'],
})
export class ParcelDetailsPage implements OnInit {
  @ViewChild('map', {static: true}) mapElementRef: ElementRef;

  googleMaps: any;

  dest: any = { lat: 0, lng: 0 };
  restoCoord: any = { lat: 0, lng: 0 };
  
  directionsService: any;
  directionsDisplay: any;
  orderNumber: any;
  parcel: any;
  parcelDetails: any;
  descriptiob: any;
  from: any;
  drop: any;
  receiver: any;
  deliveryFees: any;
  date_created: any;
  aprovalStatus: any;
  distance : any;
  pickCords: any;
  dropCords: any;
  phoneNumber: any;
  username: any;
  DerDistance: any;
  rider: any;
  oIcon = "assets/imgs/origin.png";
  pIcon = "assets/imgs/dest.png";
  vertical = "assets/imgs/vertical.png";
  parcelImg = "assets/imgs/parcel.png";
  parcelAssigment: any;
  riderName: any;
  time_frame: any;
  timelines: any;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private orderService: OrderService,
    private maps: LocationService,
    private renderer: Renderer2,
    private toast: ToastController,
    private callNumber: CallNumber,
    private modalCtrl: ModalController,
    private alertContoller: AlertController,
    private parcelService: ParcelService,
    private smsService: MessagingService) { 
    this.route.params.subscribe(data =>{
      this.orderNumber = data['order'];
      this.loadData(this.orderNumber);
    })
   
    
  }

  ngOnInit() {
    setInterval(() => {
      this.loadData(this.orderNumber);
    }, 10000);
    
  }

  loadData(order: any){
    this.parcelService.getPersonAssignParcel(order).subscribe((data: any) =>{
      this.parcelAssigment = data;
      this.riderName = this.parcelAssigment.orders[0].name;
    })
    this.parcelService.getParcelDetails(order).subscribe((res: ParcelServerResponse) =>{
    this.parcel = res.parcel;
    this.parcelDetails = this.parcel[0].parcel_description;
    this.from = this.parcel[0].parcel_origin;
    this.drop = this.parcel[0].parcel_destination;
    this.receiver =  this.parcel[0].customer_phone;
    this.distance = this.parcel[0].distance;
    this.deliveryFees = this.parcel[0].delivery_fees;
    this.date_created = this.parcel[0].date_created;
    this.aprovalStatus = this.parcel[0].status;
    this.pickCords = this.parcel[0].parcel_origin_cords;
    this.dropCords = this.parcel[0].parcel_end_cords;
    this.username = this.parcel[0].customer;
    this.phoneNumber = this.parcel[0].customer_phone;
    this.rider = this.parcel[0].rider_id;
    this.time_frame = this.parcel[0].time_frame;
      this.timelines = this.parcel[0].timelines;

    let comma = this.pickCords.indexOf(',');
    this.dest.lat = Number(this.pickCords.substring(0,comma));
    this.dest.lng = Number(this.pickCords.substring(comma+1,this.pickCords.length));

    let comma2 = this.dropCords.indexOf(',');
    this.restoCoord.lat = Number(this.dropCords.substring(0,comma2));
    this.restoCoord.lng = Number(this.dropCords.substring(comma2+1,this.dropCords.length));

    
    this.loadMap(this.pickCords,this.dropCords).then((pol) =>{
      this.drawPolyline(this.pickCords,this.dropCords);
    })   
    
    })

   
   }

   backHome(){
    this.router.navigate(['tabs/home'])
   }
   async assignRider(){
    const modal = await this.modalCtrl.create({
      component: AssignRiderParcelComponent,
      componentProps: { 
        orderNumber: this.orderNumber,
      }
    });
    modal.present();

   }

  async confirmOrder(order: any){
    const alert = await this.alertContoller.create({
      message: "Are you sure you want to approve delivery of parcel number "+order+" at a fees of "+this.deliveryFees+"?",
      buttons: [{
        text: "No",
        role: "Cancel"
      },{
        text: "Yes",
        handler: () =>{
         this.parcelService.updateStatusParcel('1',order).subscribe(res =>{
          this.toast.create({
            message: 'Approval Success! Parcel Number '+order+' marked for delivery. Customer notified to make payement',
            duration: 3000,
            position: 'top'
           }).then((toastData) =>{
            //console.log(toastData);
            toastData.present();
           });

           this.smsService.sendMessage(this.phoneNumber,"Dear "+this.username+", Your order for delivery of parcel number "+order+" has been approved for delivery. Kindly open Qwiqsoko App to pay for this order for it to be delivered.")
           .subscribe(dat =>{
          
           })
         })
        }
      }]
     });
     await alert.present();
   }


   async rejectOrder(order: any){
    const alert = await this.alertContoller.create({
      message: "Are you sure you want to CANCEL delivery of parcel number "+order+" at a fees of "+this.deliveryFees+"?",
      buttons: [{
        text: "No",
        role: "Cancel"
      },{
        text: "Yes",
        handler: () =>{
         this.parcelService.updateStatusParcel('0',order).subscribe(res =>{
          this.toast.create({
            message: 'Order Cancelled! Parcel Number '+order+' has been cancelled customer can not pay',
            duration: 3000,
            position: 'top'
           }).then((toastData) =>{
            //console.log(toastData);
            toastData.present();
           });
         })
        }
      }]
     });
     await alert.present();

   }

  async confirmDelivery(order: any){
    const alert = await this.alertContoller.create({
      message: "Are you sure you want to mark parcel number "+order+" as delivered?",
      buttons: [{
        text: "No",
        role: "Cancel"
      },{
        text: "Yes",
        handler: () =>{
         this.parcelService.updateStatusParcel('4',order).subscribe(res =>{
          this.toast.create({
            message: 'Confirmation Success! Parcel Number '+order+' has been marked as delivered.',
            duration: 3000,
            position: 'top'
           }).then((toastData) =>{
            //console.log(toastData);
            toastData.present();
           });

         })
        }
      }]
     });
     await alert.present();

   }

   callCustomer(){

   }

   async loadMap(pick: any, drop: any) {
    let comma = pick.indexOf(',');
    this.dest.lat = Number(pick.substring(0,comma));
    this.dest.lng = Number(pick.substring(comma+1,pick.length));

    let comma2 = drop.indexOf(',');
    this.restoCoord.lat = Number(drop.substring(0,comma2));
    this.restoCoord.lng = Number(drop.substring(comma2+1,drop.length));
    try {
      console.log('map');
      console.log(this.dest)
      console.log(this.restoCoord)
      let googleMaps: any = await this.maps.loadGoogleMaps();
      const mapEl = this.mapElementRef.nativeElement;
        //console.log("dest: "+this.dest)

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
    } catch(e) {
      console.log(e);
    }
  }

  drawPolyline(pick: any, drop: any) {
    let comma = pick.indexOf(',');
    this.dest.lat = Number(pick.substring(0,comma));
    this.dest.lng = Number(pick.substring(comma+1,pick.length));

    let comma2 = drop.indexOf(',');
    this.restoCoord.lat = Number(drop.substring(0,comma2));
    this.restoCoord.lng = Number(drop.substring(comma2+1,drop.length));
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
 
  }


  

}
