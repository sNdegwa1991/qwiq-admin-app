import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestoFinancePage } from './resto-finance.page';

const routes: Routes = [
  {
    path: '',
    component: RestoFinancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoFinancePageRoutingModule {}
