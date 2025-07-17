import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestoStatusOrdersPageRoutingModule } from './resto-status-orders-routing.module';

import { RestoStatusOrdersPage } from './resto-status-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestoStatusOrdersPageRoutingModule
  ],
  declarations: [RestoStatusOrdersPage]
})
export class RestoStatusOrdersPageModule {}
