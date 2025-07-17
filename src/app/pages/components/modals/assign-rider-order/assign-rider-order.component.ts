import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UserServerResponse } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/orders/order.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-assign-rider-order',
  templateUrl: './assign-rider-order.component.html',
  styleUrls: ['./assign-rider-order.component.scss'],
})
export class AssignRiderOrderComponent implements OnInit {

  orderNumber: any;
  ridderUsers: any;

  constructor(private userService: UserService,
    private modalCtrl: ModalController,
    private parcelService: ParcelService,
    private toast: ToastController,
    private orderService: OrderService) {
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
     this.orderService.updateAssignOrderToRider(this.orderNumber,selectedRider.value).subscribe(res =>{
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
