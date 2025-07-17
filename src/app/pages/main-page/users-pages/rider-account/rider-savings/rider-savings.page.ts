import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiderService } from 'src/app/services/finanance/rider.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rider-savings',
  templateUrl: './rider-savings.page.html',
  styleUrls: ['./rider-savings.page.scss'],
})
export class RiderSavingsPage implements OnInit {

  riderDetails: any;
  details: any;
  riderOrders: any;
  SERVER_URL = environment.SERVER_URL;
  imageUrl = this.SERVER_URL+'/images';
  full_name: any;
  rider: any;
  savingDetails: any;
  riderSaving: any;
  totalCommision: any;
  totalSharing: any;
  balance: any;
  value: any;
  totalWidthdraw: any;

  userId = JSON.parse(localStorage.getItem('user') || '{}')[0].userid;

  constructor(private riderService: RiderService, private router: Router) { }

  ngOnInit() {
    this.getRiderSavings()
  }

  getRiderSavings(){
    this.riderService.getRiderSavings(this.userId).subscribe(res =>{
      this.savingDetails =res;
      this.riderSaving = this.savingDetails.savings;
      this.calculateTotals(this.riderSaving)
    })
  }

  calculateTotals(data: any){
   this.value=data;  
   //console.log(this.value[0].money_in)
   this.totalCommision = 0;
   this.totalSharing = 0;
   this.totalWidthdraw = 0;
   for(let j=0;j<this.value.length;j++){   
      if(((this.value[j].amount) >=0 || (this.value[j].amount) < 0) && ((this.value[j].description) === 'commision')){
       this.totalCommision+= parseFloat(this.value[j].amount);
      }
     
      if(((this.value[j].amount) >=0 || (this.value[j].amount) < 0) && ((this.value[j].description) === 'sharing')){
       this.totalSharing+= parseFloat(this.value[j].amount);
      }
      if(((this.value[j].amount) >=0 || (this.value[j].amount) < 0) && ((this.value[j].description) === 'withdraw')){
       this.totalWidthdraw+= parseFloat(this.value[j].amount);
      }

       } 

       this.balance = (this.totalCommision + this.totalSharing)-this.totalWidthdraw;

   
 }

 cancel(){
   this.router.navigate(['tabs/ridder-account']);
 }

}
