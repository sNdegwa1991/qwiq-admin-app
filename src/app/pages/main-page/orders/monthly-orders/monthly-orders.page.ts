import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderServerResponse } from 'src/app/models/order.model';
import { ParcelServerResponse } from 'src/app/models/parcel.model';
import { OrderService } from 'src/app/services/orders/order.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';

@Component({
  selector: 'app-monthly-orders',
  templateUrl: './monthly-orders.page.html',
  styleUrls: ['./monthly-orders.page.scss'],
})
export class MonthlyOrdersPage implements OnInit {
   oStatus: any;
   statusTitle: any;
   myOrders: any;
   monthStamp: any;
   myParcels: any;

  constructor(private route: ActivatedRoute, 
    private orderService: OrderService,
     private router: Router,
     private parcelService: ParcelService) { 
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
    this.dataPouplate();
    })

    
  }

  ngOnInit() {
    setInterval(() => {
      this.dataPouplate()
    }, 30000);
  }

  dataPouplate(){
    this.orderService.getMonthAnyStatusOrders(this.oStatus, this.monthStamp).subscribe((res: OrderServerResponse) =>{
      this.myOrders = res.orders;
     })

     this.parcelService.getStatusParcel(this.oStatus).subscribe((res: ParcelServerResponse) =>{
      this.myParcels = res.parcel;
      console.log(res);
     })
  }
  openOrder(oId: any){
    this.router.navigate(['tabs/order-details/'+oId])
  }

  backHome(){
    this.router.navigate(['tabs/home'])
  }
  openParcel(oId: any){
    this.router.navigate(['tabs/parcel-details/'+oId])
  }

}
