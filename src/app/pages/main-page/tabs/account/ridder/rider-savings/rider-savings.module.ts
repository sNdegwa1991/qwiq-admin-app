import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiderSavingsPageRoutingModule } from './rider-savings-routing.module';

import { RiderSavingsPage } from './rider-savings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiderSavingsPageRoutingModule
  ],
  declarations: [RiderSavingsPage]
})
export class RiderSavingsPageModule {}
