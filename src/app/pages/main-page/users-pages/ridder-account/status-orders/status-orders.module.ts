import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusOrdersPageRoutingModule } from './status-orders-routing.module';

import { StatusOrdersPage } from './status-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusOrdersPageRoutingModule
  ],
  declarations: [StatusOrdersPage]
})
export class StatusOrdersPageModule {}
