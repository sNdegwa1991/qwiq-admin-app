import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyOrdersPage } from './monthly-orders.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyOrdersPageRoutingModule {}
