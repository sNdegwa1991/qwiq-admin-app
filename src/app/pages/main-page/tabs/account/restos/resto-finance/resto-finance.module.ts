import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestoFinancePageRoutingModule } from './resto-finance-routing.module';

import { RestoFinancePage } from './resto-finance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestoFinancePageRoutingModule
  ],
  declarations: [RestoFinancePage]
})
export class RestoFinancePageModule {}
