import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcknowledgePaymentPage } from './acknowledge-payment.page';

const routes: Routes = [
  {
    path: '',
    component: AcknowledgePaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcknowledgePaymentPageRoutingModule {}
