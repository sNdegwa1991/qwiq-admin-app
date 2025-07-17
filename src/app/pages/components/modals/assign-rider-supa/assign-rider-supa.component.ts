import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UserServerResponse } from 'src/app/models/user.model';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-assign-rider-supa',
  templateUrl: './assign-rider-supa.component.html',
  styleUrls: ['./assign-rider-supa.component.scss'],
})
export class AssignRiderSupaComponent implements OnInit {

  orderNumber: any;
  ridderUsers: any;
  supa: any;


  constructor(private userService: UserService,
    private modalCtrl: ModalController,
    private parcelService: ParcelService,
    private toast: ToastController) {
    this.getRiders();
   }


  ngOnInit() {}

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
     this.parcelService.updateSupaRider(selectedRider.value,this.orderNumber).subscribe(res =>{
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
