import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderServerResponse } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-status-orders',
  templateUrl: './status-orders.page.html',
  styleUrls: ['./status-orders.page.scss'],
})
export class StatusOrdersPage implements OnInit {
  oStatus: any;
  statusTitle: any;
  myOrders: any;
  monthStamp: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { 
    let date: Date = new Date();
    let dt = (date.getMonth()+1).toString();
    if(dt.length === 1){
      dt = '0'+(date.getMonth()+1).toString();
    }
    this.monthStamp = date.getFullYear().toString()+dt;
    this.route.params.subscribe(stat =>{
   this.oStatus = stat['status'];
   
   if(this.oStatus === '0'){ this.statusTitle = 'Unconfirmed' }
   if(this.oStatus === '1'){ this.statusTitle = 'Unpaid' }
   if(this.oStatus === '2'){ this.statusTitle = 'Undelivered' }
   if(this.oStatus === '4'){ this.statusTitle = 'Delivered' }
   if(this.oStatus === '10'){ this.statusTitle = 'Onway' }
    this.dataPouplate();
    })
  }

  ngOnInit() {
    this.dataPouplate();
  }

  dataPouplate(){
    let userId = JSON.parse(localStorage.getItem('user') || '{}')[0].userid;
    this.orderService.getMonthAnyStatusOrdersRider(this.oStatus, userId).subscribe((res: OrderServerResponse) =>{
      this.myOrders = res.orders;
      console.log(res)
     })
  }

  openOrder(oId: any){
    this.router.navigate(['tabs/ridder-order-details/'+oId])
  }

  backHome(){
    this.router.navigate(['tabs/ridder-account'])
  }

}
