import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthScreenPageRoutingModule } from './auth-screen-routing.module';

import { AuthScreenPage } from './auth-screen.page';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AuthScreenPageRoutingModule
  ],
  declarations: [AuthScreenPage,SignInFormComponent, SignUpFormComponent]
})
export class AuthScreenPageModule {}
