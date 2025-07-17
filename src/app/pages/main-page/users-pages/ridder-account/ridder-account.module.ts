import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidderAccountPageRoutingModule } from './ridder-account-routing.module';

import { RidderAccountPage } from './ridder-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidderAccountPageRoutingModule
  ],
  declarations: [RidderAccountPage]
})
export class RidderAccountPageModule {}
