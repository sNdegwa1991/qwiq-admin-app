import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingPricingPageRoutingModule } from './shopping-pricing-routing.module';

import { ShoppingPricingPage } from './shopping-pricing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingPricingPageRoutingModule
  ],
  declarations: [ShoppingPricingPage]
})
export class ShoppingPricingPageModule {}
