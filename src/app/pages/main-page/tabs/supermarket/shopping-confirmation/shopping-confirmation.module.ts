import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingConfirmationPageRoutingModule } from './shopping-confirmation-routing.module';

import { ShoppingConfirmationPage } from './shopping-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingConfirmationPageRoutingModule
  ],
  declarations: [ShoppingConfirmationPage]
})
export class ShoppingConfirmationPageModule {}
