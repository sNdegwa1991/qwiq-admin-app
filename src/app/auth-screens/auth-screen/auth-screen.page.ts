import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.page.html',
  styleUrls: ['./auth-screen.page.scss'],
})
export class AuthScreenPage implements OnInit {

  segmentValue = '1';
  networkStatus: any;
  role: any;

  constructor(private route: Router,public toast: ToastController) { 
    this.takeHome();
  }

  ngOnInit() {
    Network.addListener('networkStatusChange', status => {
      if(status.connected === false){
        this.toast.create({
          message: 'Oops! No Internet Connection',
          duration: 2000,
          position: 'top'
         }).then((toastData) =>{
          toastData.present();
         })
      }
    });

    setInterval(() =>{
      this.getNetWorkStatus();
    },3000)
  }

  async getNetWorkStatus() {
    this.networkStatus = await Network.getStatus();
     if(this.networkStatus.connected === false){
      this.toast.create({
        message: 'Oops! No Internet Connection',
        duration: 2000,
        position: 'top'
       }).then((toastData) =>{
        toastData.present();
       })
     }
  }

  segmentChanged(event: any) {
    //console.log(event);
    this.segmentValue = event.detail.value;
  }

  takeHome(){
    if(localStorage.getItem('user')){
      this.role = JSON.parse(localStorage.getItem('user') || '{}')[0].role;
      if(this.role === '1')
      {
        this.route.navigate(['/tabs/home']);
      }
      if(this.role === '2')
      {
        this.route.navigate(['/tabs/resto-home']);
      }
      if(this.role === '3')
      {
        this.route.navigate(['/tabs/ridder-account']);
      }
    }
   }

}
