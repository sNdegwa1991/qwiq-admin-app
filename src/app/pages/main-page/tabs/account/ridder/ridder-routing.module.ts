import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidderPage } from './ridder.page';

const routes: Routes = [
  {
    path: '',
    component: RidderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidderPageRoutingModule {}
