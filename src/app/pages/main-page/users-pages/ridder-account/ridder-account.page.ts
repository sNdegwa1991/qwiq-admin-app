import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderServerResponse } from 'src/app/models/order.model';
import { RestoServerResponse } from 'src/app/models/restaurant.model';
import { OrderService } from 'src/app/services/orders/order.service';
import { RestaurantService } from 'src/app/services/resto/restaurant.service';

@Component({
  selector: 'app-ridder-account',
  templateUrl: './ridder-account.page.html',
  styleUrls: ['./ridder-account.page.scss'],
})
export class RidderAccountPage implements OnInit {
  orders: any;
  unconfirmed: any;
  unpaid: any;
  paid: any;
  undelivered: any;
  delivered: any;
  reviewed: any;
  cancelled: any;
  onway: any;
  restaurant: any;
  restoName: any;
  restoId: any;
  monthStamp: any;
  dateArray: any[] = [];
  totalArray: any[] = [];
  tot = 0;
  user = JSON.parse(localStorage.getItem('user') || '{}')[0].name;
  userId: any;

  shopping: any;
  shoppingList: any;

  constructor(private router: Router,private orderService: OrderService, private restoService: RestaurantService) {

    let date: Date = new Date();
    let dt = (date.getMonth()+1).toString();
    if(dt.length === 1){
      dt = '0'+(date.getMonth()+1).toString();
    }
    this.monthStamp = date.getFullYear().toString()+dt;

    this.orderService.getMonthDaysOrderTotals(this.monthStamp).subscribe((res: OrderServerResponse) =>{
      this.orders = res.orders;
      const len = this.orders.length;
      
      for(let i=0;i<this.orders.length;i++)
      {
        this.dateArray.push(this.orders[i].date)
        this.totalArray.push(this.orders[i].total_orders)
        this.tot = this.tot+this.orders[i].total_orders;
      }

    })
    this.populateData();
  }

  ngOnInit() {
    this.populateData();

    setInterval(() =>{
     this.populateData();
    }, 5000)
  }
  populateData(){
    this.userId = JSON.parse(localStorage.getItem('user') || '{}')[0].userid;
      //................................get pending shopping
      this.orderService.getRiderShoppingList(this.userId).subscribe((res:any) =>{
        this.shopping = res;
        this.shoppingList = this.shopping.orders;
      })
    //.............................unconfirmed orders
    this.orderService.getMonthAnyStatusOrdersRider(0,this.userId).subscribe((res: OrderServerResponse) =>{
     this.unconfirmed = res.orders;
    });

     //.............................unpaid orders
     this.orderService.getMonthAnyStatusOrdersRider(1,this.userId).subscribe((res: OrderServerResponse) =>{
      this.unpaid = res.orders;
     });

      //.............................undelivered orders
    this.orderService.getMonthAnyStatusOrdersRider(2,this.userId).subscribe((res: OrderServerResponse) =>{
      this.undelivered = res.orders;
     });

    //.............................Delivered orders
    this.orderService.getMonthAnyStatusOrdersRider(4,this.userId).subscribe((res: OrderServerResponse) =>{
      this.delivered = res.orders;
     });
     
     //.............................Reviewed orders
    this.orderService.getMonthAnyStatusOrdersRider(5,this.userId).subscribe((res: OrderServerResponse) =>{
      this.reviewed = res.orders;
     });
     //.............................Cancelled orders
    this.orderService.getMonthAnyStatusOrdersRider(3,this.userId).subscribe((res: OrderServerResponse) =>{
      this.cancelled = res.orders;
     });

      //.............................Onway orders
    this.orderService.getMonthAnyStatusOrdersRider(10,this.userId).subscribe((res: OrderServerResponse) =>{
      this.onway = res.orders;
     });
  }

  openSupermarketShopping(){
    this.router.navigate(['tabs/list'])
  }

 openOrders(stat: any){
   this.router.navigate(['tabs/satus-orders/'+stat])
 }

 logout(){
  localStorage.removeItem('user')
    this.router.navigate(['../'])
 }

 openMySavings(){
  this.router.navigate(['tabs/rider-savings'])
 }

}
