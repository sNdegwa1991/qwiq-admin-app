import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderServerResponse } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-resto-status-orders',
  templateUrl: './resto-status-orders.page.html',
  styleUrls: ['./resto-status-orders.page.scss'],
})
export class RestoStatusOrdersPage implements OnInit {
  oStatus: any;
   statusTitle: any;
   myOrders: any;
   monthStamp: any;
   restoId = JSON.parse(localStorage.getItem('user') || '{}')[0].specs;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { 
  
    this.route.params.subscribe(stat =>{
   this.oStatus = stat['status'];
   
   if(this.oStatus === '0'){ this.statusTitle = 'Unconfirmed' }
   if(this.oStatus === '1'){ this.statusTitle = 'Unpaid' }
   if(this.oStatus === '2'){ this.statusTitle = 'Undelivered' }
   if(this.oStatus === '4'){ this.statusTitle = 'Delivered' }
    })
  }

  ngOnInit() {
    this.dataPouplate();
  }

  dataPouplate(){
    this.orderService.getRestoAnyStatusOrders(this.oStatus, this.restoId).subscribe((res: OrderServerResponse) =>{
      this.myOrders = res.orders;
      console.log(this.myOrders)
     })
  }

  openOrder(oId: any){
    this.router.navigate(['tabs/resto-orders-details/'+oId])
  }

  backHome(){
    this.router.navigate(['tabs/resto-home'])
  }

}
