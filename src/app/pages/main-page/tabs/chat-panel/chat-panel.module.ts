import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPanelPageRoutingModule } from './chat-panel-routing.module';

import { ChatPanelPage } from './chat-panel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPanelPageRoutingModule
  ],
  declarations: [ChatPanelPage]
})
export class ChatPanelPageModule {}
