import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rider-profile',
  templateUrl: './rider-profile.component.html',
  styleUrls: ['./rider-profile.component.scss'],
})
export class RiderProfileComponent implements OnInit {

  riderDetails: any;
  details: any;
  riderOrders: any;
  SERVER_URL = environment.SERVER_URL;
  imageUrl = this.SERVER_URL+'/images';
  full_name: any;
  rider: any;
  email: any;
  phone: any;
  image: any;
  bank_account: any
  bank_branch: any
  bank_name: any
  dl_status: any
  img_id_back:any
  img_id_front: any
  img_photo: any
  kin_address: any
  kin_contact: any
  kin_name: any
  kin_relationship: any
  kra_pin: any
  logbook: any
  ownership: any;
  reg_no: any;
  rider_address: any
  status: any


  constructor(private modalCtrl: ModalController,private userService: UserService) {
   
   }

  ngOnInit() {
    this.getRiderDetails();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  getRiderDetails(){
    this.userService.getRiderDetails(this.rider).subscribe(res =>{
     this.riderDetails = res;
     this.details = this.riderDetails.user[0];
     this.full_name = this.details.first_name+' '+this.details.surname;
     console.log(this.details)
    })
   }

}
