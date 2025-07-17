import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidderPageRoutingModule } from './ridder-routing.module';

import { RidderPage } from './ridder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidderPageRoutingModule
  ],
  declarations: [RidderPage]
})
export class RidderPageModule {}
