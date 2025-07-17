import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPagePageRoutingModule } from './main-page-routing.module';

import { MainPagePage } from './main-page.page';
import { ProductComponent } from '../components/modals/product/product.component';
import { OrderReviewComponent } from '../components/modals/order-review/order-review.component';
import { DepositVendorCashComponent } from '../components/modals/deposit-vendor-cash/deposit-vendor-cash.component';
import { RiderProfileComponent } from '../components/modals/rider-profile/rider-profile.component';
import { RiderSavingsComponent } from '../components/modals/rider-savings/rider-savings.component';
import { AssignRiderOrderComponent } from '../components/modals/assign-rider-order/assign-rider-order.component';
import { AssignRiderParcelComponent } from '../components/modals/assign-rider-parcel/assign-rider-parcel.component';
import { AttachReceiptComponent } from '../components/modals/attach-receipt/attach-receipt.component';
import { ConfirmShoppingComponent } from './tabs/supermarket/modals/confirm-shopping/confirm-shopping.component';
import { AssignRiderSupaComponent } from '../components/modals/assign-rider-supa/assign-rider-supa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPagePageRoutingModule,
    //NgApexchartsModule
  ],
  declarations: [
    MainPagePage, 
    ProductComponent, 
    OrderReviewComponent,
    DepositVendorCashComponent,
    RiderProfileComponent,
    RiderSavingsComponent,
    AssignRiderOrderComponent,
    AssignRiderParcelComponent,
    AttachReceiptComponent,
    ConfirmShoppingComponent,
    AssignRiderSupaComponent
  ]
})
export class MainPagePageModule {}
