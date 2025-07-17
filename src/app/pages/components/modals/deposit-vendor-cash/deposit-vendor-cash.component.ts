import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { RestoServerResponse } from 'src/app/models/restaurant.model';
import { VendorService } from 'src/app/services/finanance/vendor.service';
import { RestaurantService } from 'src/app/services/resto/restaurant.service';

@Component({
  selector: 'app-deposit-vendor-cash',
  templateUrl: './deposit-vendor-cash.component.html',
  styleUrls: ['./deposit-vendor-cash.component.scss'],
})
export class DepositVendorCashComponent implements OnInit {
  form!: FormGroup;
  type = true;
  result: any;
  vendor: any;
  response: any;
  restoName: any;
  restoData: any;

  constructor(private modalCtrl: ModalController,
    private vendorService: VendorService,
    private toast: ToastController,private restoService: RestaurantService) {
     }

  ngOnInit() {
    this.restoService.getRestaurant(this.vendor).subscribe((res: RestoServerResponse) =>{
      this.restoData = res.restaurants;
      this.restoName = this.restoData[0].name;
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  saveDeposit(){
    const amount = document.getElementById('amount') as HTMLInputElement;
    const mode = document.getElementById('mode') as HTMLInputElement;
    const ref = document.getElementById('reference') as HTMLInputElement;

    if(amount.value === '' || mode.value === undefined || ref.value === ''){
      this.toast.create({
        message: 'Error! All field are required',
        duration: 3000,
        position: 'top'
       }).then((toastData) =>{
        //console.log(toastData);
        toastData.present();
       })
    } else {
      this.vendorService.registerVendorIncome(amount.value,mode.value,ref.value,this.vendor).subscribe(res =>{
        if(res === 'Payment Exists'){
          this.toast.create({
            message: 'Sorry! Payment with reference code '+ref.value+' has already been added',
            duration: 3000,
            position: 'top'
           }).then((toastData) =>{
            //console.log(toastData);
            toastData.present();
           })
        } else {
          this.toast.create({
            message: 'Success! Payment with reference code '+ref.value+' added successfully',
            duration: 3000,
            position: 'top'
           }).then((toastData) =>{
            //console.log(toastData);
            toastData.present();
           })
        }
      })
    }
    

  }
  
}
