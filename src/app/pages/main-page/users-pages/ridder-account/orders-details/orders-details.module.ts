import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersDetailsPageRoutingModule } from './orders-details-routing.module';

import { OrdersDetailsPage } from './orders-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersDetailsPageRoutingModule
  ],
  declarations: [OrdersDetailsPage]
})
export class OrdersDetailsPageModule {}
