import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RestoServerResponse } from 'src/app/models/restaurant.model';
import { DepositVendorCashComponent } from 'src/app/pages/components/modals/deposit-vendor-cash/deposit-vendor-cash.component';
import { RestaurantService } from 'src/app/services/resto/restaurant.service';

@Component({
  selector: 'app-resto-finance',
  templateUrl: './resto-finance.page.html',
  styleUrls: ['./resto-finance.page.scss'],
})
export class RestoFinancePage implements OnInit {
   restoId: any;
   restoName: any;
   restoData: any;
   finance: any;
   financeData: any;
   value:any;
   totalMoneyIn: any;
   totalMoneyOut: any;
   balance: any;
  constructor(private route: ActivatedRoute,private restoService: RestaurantService,private modalCtrl: ModalController) { 
    this.route.params.subscribe(data =>{
      this.restoId = data['id'];
      this.restoService.getRestaurant(this.restoId).subscribe((res: RestoServerResponse) =>{
        this.restoData = res.restaurants;
        this.restoName = this.restoData[0].name;
      })
    })
  }

  ngOnInit() {
    this.populateResto();

    setInterval(res =>{
      this.populateResto()
    },10000);
  }

  populateResto(){
    this.restoService.getRestaurantFinance(this.restoId).subscribe(res =>{
      this.finance = res;
      this.financeData = this.finance.trans;
      this.calculateTotals(this.financeData);
    })
  }

  calculateTotals(data: any){
    this.value=data;  
    //console.log(this.value[0].money_in)
    this.totalMoneyIn = 0;
    this.totalMoneyOut = 0;
    for(let j=0;j<this.value.length;j++){   
       if((this.value[j].money_in) >=0 || (this.value[j].money_in) < 0){
        this.totalMoneyIn+= parseFloat(this.value[j].money_in);
       }
       if((this.value[j].money_out) >=0){
        this.totalMoneyOut+= parseInt(this.value[j].money_out);
       }

        } 

        this.balance = this.totalMoneyIn - this.totalMoneyOut;

    
  }

  async depositCash(){
    const modal = await this.modalCtrl.create({
      component: DepositVendorCashComponent,
      componentProps: { 
        vendor: this.restoId,
      }
    });
    modal.present();
  }

}
