import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcknowledgePaymentPageRoutingModule } from './acknowledge-payment-routing.module';

import { AcknowledgePaymentPage } from './acknowledge-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcknowledgePaymentPageRoutingModule
  ],
  declarations: [AcknowledgePaymentPage]
})
export class AcknowledgePaymentPageModule {}
