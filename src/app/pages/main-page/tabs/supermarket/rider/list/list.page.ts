import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  shopping: any;
  shoppingList: any;

  constructor(private orderService: OrderService,private router: Router) {
    this.getTheList();
   }

  ngOnInit() {
  }
  
  getTheList(){
      //................................get pending shopping
      this.orderService.getAllShoppingList().subscribe((res:any) =>{
        this.shopping = res;
        this.shoppingList = this.shopping.orders;
      })
  }

  viewShopping(order: any){
    this.router.navigate(['tabs/pricing/'+order])
  }

  backHome(){
    this.router.navigate(['tabs/ridder-account'])
  }

}
