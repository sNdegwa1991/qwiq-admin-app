import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPanelPage } from './chat-panel.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPanelPageRoutingModule {}
