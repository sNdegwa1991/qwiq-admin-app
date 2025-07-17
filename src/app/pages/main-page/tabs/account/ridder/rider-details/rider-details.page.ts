import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OrderServerResponse } from 'src/app/models/order.model';
import { RiderProfileComponent } from 'src/app/pages/components/modals/rider-profile/rider-profile.component';
import { RiderSavingsComponent } from 'src/app/pages/components/modals/rider-savings/rider-savings.component';
import { OrderService } from 'src/app/services/orders/order.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rider-details',
  templateUrl: './rider-details.page.html',
  styleUrls: ['./rider-details.page.scss'],
})
export class RiderDetailsPage implements OnInit {

  userId: any;
  riderDetails: any;
  details: any;
  riderOrders: any;
  SERVER_URL = environment.SERVER_URL;
  imageUrl = this.SERVER_URL+'/images';
  totalAmount = 0;
  totalDelivery = 0;
  totalSharing = 0;
  totalCommission = 0;
  totalOtherCost = 0;
  value: any;
  full_name: any;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrderService,
    private modalCtrl: ModalController) {
    this.route.params.subscribe(data =>{
      this.userId = data['id'];
    })
   }

  ngOnInit() {
    this.getRiderDetails();
    this.getRiderOrders(this.userId)
  }

  getRiderDetails(){
    this.userService.getRiderDetails(this.userId).subscribe(res =>{
     this.riderDetails = res;
     this.details = this.riderDetails.user[0];
     this.full_name = this.details.first_name+' '+this.details.surname;
    })
   }

   getRiderOrders(rider: any){
    this.ordersService.getRiderOrders(rider).subscribe((res: OrderServerResponse) =>{
      this.riderOrders = res.orders;

     this.calculateTotals(this.riderOrders)
    })
  }

  calculateTotals(rider : any){
   // debugger  
  this.value=rider    
  //console.log(this.value);  
  for(let j=0;j<rider.length;j++){   
       this.totalAmount+= this.value[j].amount;
       this.totalDelivery+= parseInt(this.value[j].delivery_fees);
       this.totalSharing+= parseFloat(this.value[j].sharing);
       this.totalCommission+= parseFloat(this.value[j].commision);
       this.totalOtherCost+= parseFloat(this.value[j].other_cost);   
  
  }  
  }

  openRiderOrder(order: any){
   this.router.navigate(['tabs/order-details/'+order]);
  }

  async openProfile(){
    const modal = await this.modalCtrl.create({
      component: RiderProfileComponent,
      componentProps: { 
        rider: this.userId,
      }
    });
    modal.present();
 
  }

  async opensavings(){
    const modal = await this.modalCtrl.create({
      component: RiderSavingsComponent,
      componentProps: { 
        rider: this.userId,
      }
    });
    modal.present();
  }

}
