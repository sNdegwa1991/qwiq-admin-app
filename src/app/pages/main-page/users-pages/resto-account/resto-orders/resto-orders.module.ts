import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestoOrdersPageRoutingModule } from './resto-orders-routing.module';

import { RestoOrdersPage } from './resto-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestoOrdersPageRoutingModule
  ],
  declarations: [RestoOrdersPage]
})
export class RestoOrdersPageModule {}
