import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/user/chat.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.page.html',
  styleUrls: ['./chat-panel.page.scss'],
})
export class ChatPanelPage implements OnInit {
  txtMessage: any;
  userId:any;
  mess: any;
  userName: any;

  constructor(private chatService: ChatService, private route: ActivatedRoute) { 
    this.route.params.subscribe(data =>{
      this.userId = data['user'];
      this.userName = data['name'];
      this.getChats(this.userId);
    })

    
  }

  ngOnInit() {
    setInterval(dt =>{
      this.getChats(this.userId)
    },3000)
  }

  getChats(use: any){
    this.chatService.geCustomerChats(use).subscribe((data: any)=>{
    this.txtMessage = data.cats;  
    })
  }

  sendMessage(){
    const message = document.getElementById('message-typed') as HTMLInputElement;

    if(message.value.length < 1){
      alert('Kindly type your message');
    } else {
      this.chatService.sendCustomerChats(this.userId,message.value).subscribe(res =>{
        this.getChats(this.userId);
        this.mess = '';
      })
    }
  }

}
