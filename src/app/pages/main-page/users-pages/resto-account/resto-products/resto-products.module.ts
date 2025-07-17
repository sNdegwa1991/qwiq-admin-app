import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestoProductsPageRoutingModule } from './resto-products-routing.module';

import { RestoProductsPage } from './resto-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestoProductsPageRoutingModule
  ],
  declarations: [RestoProductsPage]
})
export class RestoProductsPageModule {}
