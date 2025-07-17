import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiderSavingsPage } from './rider-savings.page';

const routes: Routes = [
  {
    path: '',
    component: RiderSavingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiderSavingsPageRoutingModule {}
