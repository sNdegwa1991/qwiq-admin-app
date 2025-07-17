import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiderDetailsPageRoutingModule } from './rider-details-routing.module';

import { RiderDetailsPage } from './rider-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiderDetailsPageRoutingModule
  ],
  declarations: [RiderDetailsPage]
})
export class RiderDetailsPageModule {}
