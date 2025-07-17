import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { UserServerResponse } from 'src/app/models/user.model';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-assign-rider-parcel',
  templateUrl: './assign-rider-parcel.component.html',
  styleUrls: ['./assign-rider-parcel.component.scss'],
})
export class AssignRiderParcelComponent implements OnInit {

  orderNumber: any;
  ridderUsers: any;

  constructor(private userService: UserService,
    private modalCtrl: ModalController,
    private parcelService: ParcelService,
    private toast: ToastController) {
    this.getRiders();
   }


  ngOnInit() {
    
  }

  getRiders(){
    this.userService.getActiveRiders().subscribe((res: UserServerResponse) =>{
      this.ridderUsers = res.user;
     })
  }

  assignParcelToRider(){
    const selectedRider = document.getElementById('rider') as HTMLInputElement;
    if(selectedRider.value == undefined || selectedRider.value == ''){
     alert('Error! You have not selected rider to assign this order');
    } else {
     this.parcelService.updateParcelRider(selectedRider.value,this.orderNumber).subscribe(res =>{
      this.toast.create({
        message: 'Success! Order assigned',
        duration: 3000,
        position: 'top'
       }).then((toastData) =>{
        //console.log(toastData);
        toastData.present();
       });
      this.modalCtrl.dismiss(null, 'cancel');
     })
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
