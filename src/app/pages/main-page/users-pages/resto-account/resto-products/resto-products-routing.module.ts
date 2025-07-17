import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestoProductsPage } from './resto-products.page';

const routes: Routes = [
  {
    path: '',
    component: RestoProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoProductsPageRoutingModule {}
