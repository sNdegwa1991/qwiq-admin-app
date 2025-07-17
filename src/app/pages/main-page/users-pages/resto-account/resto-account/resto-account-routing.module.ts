import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestoAccountPage } from './resto-account.page';

const routes: Routes = [
  {
    path: '',
    component: RestoAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoAccountPageRoutingModule {}
