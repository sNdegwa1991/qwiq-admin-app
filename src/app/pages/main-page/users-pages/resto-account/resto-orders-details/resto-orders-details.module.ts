import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestoOrdersDetailsPageRoutingModule } from './resto-orders-details-routing.module';

import { RestoOrdersDetailsPage } from './resto-orders-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestoOrdersDetailsPageRoutingModule
  ],
  declarations: [RestoOrdersDetailsPage]
})
export class RestoOrdersDetailsPageModule {}
