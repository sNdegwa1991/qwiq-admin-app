import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestosPageRoutingModule } from './restos-routing.module';

import { RestosPage } from './restos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestosPageRoutingModule
  ],
  declarations: [RestosPage]
})
export class RestosPageModule {}
