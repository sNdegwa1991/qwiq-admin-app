import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INTRO_KEY, StorageService } from 'src/app/services/user/storage.service';

import SwiperCore, { SwiperOptions, Pagination, EffectCube, Keyboard } from 'swiper';
// Install Swiper module
SwiperCore.use([Keyboard, Pagination, EffectCube]); 

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpts: SwiperOptions={};

  constructor(private router: Router, private storage: StorageService) { 
    if(localStorage.getItem('CapacitorStorage.introduction')){
      this.router.navigateByUrl('auth-screen', { replaceUrl: true});
    }
  }

  ngOnInit() {
   this.animation();
  }

  //............................Redirect to Login
 async goToLogin() {
  await this.storage.setStorage(INTRO_KEY, 'true');
    this.router.navigateByUrl('auth-screen', { replaceUrl: true});
  }

  animation() {
    this.slideOpts = {
      pagination: { clickable: true },
      keyboard: { enabled: true },
      effect: 'cube'
    };
  }

}
