import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingPricingPage } from './shopping-pricing.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingPricingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingPricingPageRoutingModule {}
