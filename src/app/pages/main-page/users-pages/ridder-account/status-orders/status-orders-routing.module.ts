import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusOrdersPage } from './status-orders.page';

const routes: Routes = [
  {
    path: '',
    component: StatusOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusOrdersPageRoutingModule {}
