import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { RiderService } from 'src/app/services/finanance/rider.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rider-savings',
  templateUrl: './rider-savings.component.html',
  styleUrls: ['./rider-savings.component.scss'],
})
export class RiderSavingsComponent implements OnInit {
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

  constructor(private modalCtrl: ModalController,
    private userService: UserService,
    private riderService: RiderService,
    private toast: ToastController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getRiderDetails();
    this.getRiderSavings();
  }

  getRiderDetails(){
    this.userService.getRiderDetails(this.rider).subscribe(res =>{
     this.riderDetails = res;
     this.details = this.riderDetails.user[0];
     this.full_name = this.details.first_name+' '+this.details.surname;
    })
   }

   getRiderSavings(){
     this.riderService.getRiderSavings(this.rider).subscribe(res =>{
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

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async openWithDraw(){
    const alert = await this.alertController.create({
      header: 'Are you sure you want to withdraw from '+this.full_name+ ' account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('cancel')
          },
        },
        {
          text: 'OK',
          role: 'Yes',
          handler: () => {
            const displayField = document.getElementById('cash_withdrawal_didplay') as HTMLInputElement;
            const displayBtn = document.getElementById('btn_withdraw') as HTMLInputElement;
            displayField.style.display = "block";
            displayBtn.style.display = "none";
          },
        },
      ],
    });

    await alert.present();
  }

 async withFromRider(){
    const amount = document.getElementById('amount') as HTMLInputElement;
    const purpose = document.getElementById('purpose') as HTMLInputElement;

    if(amount.value === ''){
      this.toast.create({
        message: 'Error! Please provide amount you wish to withdraw from '+this.full_name+' account',
        duration: 3000,
        position: 'top'
       }).then((toastData) =>{
        //console.log(toastData);
        toastData.present();
       })
    } else {
      if(purpose.value === ''){
        this.toast.create({
          message: 'Error! Please provide provide purpose/reason for withdrawing '+amount.value+ ' from '+this.full_name+' account',
          duration: 3000,
          position: 'top'
         }).then((toastData) =>{
          //console.log(toastData);
          toastData.present();
         })

      } else {

        const alert = await this.alertController.create({
          header: 'Are you sure you want to withdraw '+amount.value+' from '+this.full_name+ ' account for '+purpose.value+' purpose?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                //console.log('cancel')
              },
            },
            {
              text: 'OK',
              role: 'Yes',
              handler: () => {
                this.riderService.withdrawRidersaving(this.rider,amount.value,purpose.value).subscribe(res =>{
                  const displayField = document.getElementById('cash_withdrawal_didplay') as HTMLInputElement;
                  const displayBtn = document.getElementById('btn_withdraw') as HTMLInputElement;
                  displayField.style.display = "none";
                  displayBtn.style.display = "block";
                  this.getRiderSavings();
                  this.toast.create({
                    message: 'Success! Confirmed '+amount.value+ ' from '+this.full_name+' account withdrawn successifully',
                    duration: 3000,
                    position: 'top'
                   }).then((toastData) =>{
                    //console.log(toastData);
                    toastData.present();
                   })
                 })
              },
            },
          ],
        });
    
        await alert.present();
       
      }
    }
  }

}
