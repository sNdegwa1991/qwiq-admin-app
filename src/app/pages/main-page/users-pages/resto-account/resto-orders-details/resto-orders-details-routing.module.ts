import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestoOrdersDetailsPage } from './resto-orders-details.page';

const routes: Routes = [
  {
    path: '',
    component: RestoOrdersDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoOrdersDetailsPageRoutingModule {}
