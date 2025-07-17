import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Capacitor } from '@capacitor/core';
import { Position,Geolocation,PositionOptions } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
import { OrderServerResponse } from 'src/app/models/order.model';
import { RiderService } from 'src/app/services/finanance/rider.service';
import { LocationService } from 'src/app/services/global/location.service';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.page.html',
  styleUrls: ['./orders-details.page.scss'],
})
export class OrdersDetailsPage implements OnInit {

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

  riderId: any;

  destLat: any;
  destLng: any;

  DerDistance: any;
  restaurantName: any;
  reastaurantCoords: any;
  myOrder: any;
  private locationSubscription: any;
  private intervalSubscription: Subscription;
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private orderService: OrderService,
    private maps: LocationService,
    private renderer: Renderer2,
    private callNumber: CallNumber,
    private riderService: RiderService,
    private toast: ToastController) { 
    this.route.params.subscribe(data =>{
      this.orderNumber = data['orderId'];
    })
  }


  ngOnInit() {
    this.dataPopulation();
    this.checkStstusAndSaveLocation();
    setInterval(() => {
      this.checkStstusAndSaveLocation()
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
    this.orderService.getOrderDetails(this.orderNumber).subscribe(res =>{
      this.orderDetails = res;
      this.cart = this.orderDetails.products;
    });

    this.orderService.getOrderStatus(this.orderNumber).subscribe((data) =>{
      this.orderStatus = data;
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
      this.riderId = this.orderStatus.orders[0].rider;
     
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

 startDeliver(){
    this.orderService.updateOrderStatus(this.orderNumber,'10').subscribe(res =>{
      this.startLocationTracking();
    })
  }

  completeDeliver(){
    this.orderService.updateOrderStatus(this.orderNumber,'4').subscribe(res =>{
      this.riderService.calculateSharingCommision(this.riderId,this.orderNumber,this.deliveryFees).subscribe(res=>{
      })
    })
  }

 sendLocationToServer(lat: any,long: any){
      this.orderService.sendCurrentLocationToServer(this.orderNumber,lat,long).subscribe(res =>{
        console.log(res)
      })

  }

  checkStstusAndSaveLocation(){
    this.orderService.getOrderStatus(this.orderNumber).subscribe((data) =>{
      this.myOrder = data;
      const status = this.myOrder.orders[0].status;
      if(status === '10'){
        this.startLocationTracking();
      }
    });
  }

  //.....................................................................................
  async startLocationTracking() {
    try {
      const canUseGeolocation = await this.checkPermissions();
      if (!canUseGeolocation) {
        this.toast.create({
          message: 'Please allow location in your phone',
          duration: 5000,
          position: 'top'
         }).then((toastData) =>{
          //console.log(toastData);
          toastData.present();
         });
        return;
      }

      // Set up interval to get location every 5 seconds
      this.intervalSubscription = interval(5000).subscribe(() => {
        this.getCurrentPosition();
      });

    } catch (error) {
      console.error('Error starting location tracking', error);
    }
  }

  async checkPermissions(): Promise<boolean> {
    if (Capacitor.getPlatform() !== 'web') {
      const permissionStatus = await Geolocation.checkPermissions();
      if (permissionStatus.location !== 'granted') {
        const request = await Geolocation.requestPermissions();
        return request.location === 'granted';
      }
      return true;
    }
    return true; // For web platform, we assume permissions are granted
  }

  async getCurrentPosition() {
    try {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      const position: Position = await Geolocation.getCurrentPosition(options);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      this.sendLocationToServer(latitude, longitude);
    } catch (error) {
      console.error('Error getting current position', error);
    }
  }

  stopLocationTracking() {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }
  //.....................................................................................

  backHome(){
    this.router.navigate(['tabs/ridder-account'])
  }

  callCustomer(){
    this.callNumber.callNumber(this.phoneNumber,true)
    .then(res => console.log("Call Launched Successifully"+ res))
    .catch(res => console.log("Call Launched Failed"+ res))
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i+j.price*j.quantity, 0);
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
