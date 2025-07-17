import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestoOrdersPage } from './resto-orders.page';

const routes: Routes = [
  {
    path: '',
    component: RestoOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoOrdersPageRoutingModule {}
