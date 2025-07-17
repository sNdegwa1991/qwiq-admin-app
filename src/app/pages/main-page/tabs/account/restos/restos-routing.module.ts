import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestosPage } from './restos.page';

const routes: Routes = [
  {
    path: '',
    component: RestosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestosPageRoutingModule {}
