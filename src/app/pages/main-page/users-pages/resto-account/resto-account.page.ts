import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderServerResponse } from 'src/app/models/order.model';
import { RestoServerResponse } from 'src/app/models/restaurant.model';
import { OrderService } from 'src/app/services/orders/order.service';
import { RestaurantService } from 'src/app/services/resto/restaurant.service';

@Component({
  selector: 'app-resto-account',
  templateUrl: './resto-account.page.html',
  styleUrls: ['./resto-account.page.scss'],
})
export class RestoAccountPage implements OnInit {
  orders: any;
  unconfirmed: any;
  unpaid: any;
  paid: any;
  undelivered: any;
  delivered: any;
  reviewed: any;
  cancelled: any;
  restaurant: any;
  restoName: any;

restoId = JSON.parse(localStorage.getItem('user') || '{}')[0].specs;

  constructor(private router: Router,private orderService: OrderService, private restoService: RestaurantService) {
    this.restoService.getRestaurant(this.restoId).subscribe((res: RestoServerResponse) =>{
      this.restaurant = res;
      this.restoName = this.restaurant.restaurants[0].name;
    })
   }

  ngOnInit() {
    this.populateData();

    setInterval(() =>{
     this.populateData();
    }, 30000)
  }
  
  populateData(){
     //.............................unconfirmed orders
     this.orderService.getMonthAnyStatusOrdersResto(0,this.restoId).subscribe((res: OrderServerResponse) =>{
      this.unconfirmed = res.orders;
     });
 
      //.............................unpaid orders
      this.orderService.getMonthAnyStatusOrdersResto(1,this.restoId).subscribe((res: OrderServerResponse) =>{
       this.unpaid = res.orders;
      });
 
       //.............................undelivered orders
     this.orderService.getMonthAnyStatusOrdersResto(2,this.restoId).subscribe((res: OrderServerResponse) =>{
       this.undelivered = res.orders;
      });
 
     //.............................Delivered orders
     this.orderService.getMonthAnyStatusOrdersResto(4,this.restoId).subscribe((res: OrderServerResponse) =>{
       this.delivered = res.orders;
      });
      
      //.............................Reviewed orders
     this.orderService.getMonthAnyStatusOrdersResto(5,this.restoId).subscribe((res: OrderServerResponse) =>{
       this.reviewed = res.orders;
      });
 
      //.............................Cancelled orders
     this.orderService.getMonthAnyStatusOrdersResto(3,this.restoId).subscribe((res: OrderServerResponse) =>{
       this.cancelled = res.orders;
      });
    
  }

  openOrders(stat: any){
    this.router.navigate(['tabs/order-search-status/'+stat])
  }


}
