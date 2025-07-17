import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyOrdersPageRoutingModule } from './monthly-orders-routing.module';

import { MonthlyOrdersPage } from './monthly-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthlyOrdersPageRoutingModule
  ],
  declarations: [MonthlyOrdersPage]
})
export class MonthlyOrdersPageModule {}
