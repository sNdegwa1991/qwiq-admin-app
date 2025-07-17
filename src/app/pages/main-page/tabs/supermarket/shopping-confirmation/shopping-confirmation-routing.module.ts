import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingConfirmationPage } from './shopping-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingConfirmationPageRoutingModule {}
