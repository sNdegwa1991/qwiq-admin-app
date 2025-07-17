import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderServerResponse } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
myOrders: any;
start = 0;
totalOrders: any;
  constructor(private route: Router,private orderService: OrderService) { 
    this.populateData();
  }

  ngOnInit() {
  setInterval(() => {
    this.populateData()
  }, 60000);
  }

  populateData(){
    this.orderService.getPagedOrders(this.start).subscribe((res: OrderServerResponse) =>{
      this.myOrders = res.orders;
    })
    
    this.orderService.getAllOrders().subscribe((data: OrderServerResponse) =>{
     this.totalOrders = data.orders.length;
    })
  }

  backHome(){
    this.route.navigate(['tabs/home'])
  }

  openOrder(id: any){
    this.route.navigate(['tabs/order-details/'+id])
  }

  searchOrder(typeNumber: any){
      this.filterOrders(typeNumber.target.value);
  }

  filterOrders(orderNumber: any){
    this.orderService.getPagedOrdersFiltered(0,orderNumber).subscribe((res: OrderServerResponse) =>{
      this.myOrders = res.orders;
      this.totalOrders = res.orders.length;

      console.log(this.myOrders);
    })
  }

}
