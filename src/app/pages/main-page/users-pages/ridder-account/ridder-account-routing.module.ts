import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidderAccountPage } from './ridder-account.page';

const routes: Routes = [
  {
    path: '',
    component: RidderAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidderAccountPageRoutingModule {}
