import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderServerResponse } from 'src/app/models/order.model';
import { RestoServerResponse } from 'src/app/models/restaurant.model';
import { OrderService } from 'src/app/services/orders/order.service';
import { RestaurantService } from 'src/app/services/resto/restaurant.service';

@Component({
  selector: 'app-resto-orders',
  templateUrl: './resto-orders.page.html',
  styleUrls: ['./resto-orders.page.scss'],
})
export class RestoOrdersPage implements OnInit {

  myOrders: any;
start = 0;
totalOrders: any;
restoName: any;
restaurant: any;

restoId = JSON.parse(localStorage.getItem('user') || '{}')[0].specs;

  constructor(private route: Router,private orderService: OrderService, private restoService: RestaurantService) {
    this.restoService.getRestaurant(this.restoId).subscribe((res: RestoServerResponse) =>{
      this.restaurant = res;
      this.restoName = this.restaurant.restaurants[0].name;
    })
   }

  ngOnInit() {
    this.populateData();
    setInterval(() =>{
      this.populateData();
    },30000)
  }

  populateData(){
    this.orderService.getRestodOrders(this.restoId).subscribe((res: OrderServerResponse) =>{
      this.myOrders = res.orders;
      this.totalOrders = res.orders.length;
    })
    
  }

  openOrder(id: any){
    this.route.navigate(['tabs/resto-orders-details/'+id])
  }



}
