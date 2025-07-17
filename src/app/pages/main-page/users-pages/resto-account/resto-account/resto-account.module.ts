import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestoAccountPageRoutingModule } from './resto-account-routing.module';

import { RestoAccountPage } from './resto-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestoAccountPageRoutingModule
  ],
  declarations: [RestoAccountPage]
})
export class RestoAccountPageModule {}
