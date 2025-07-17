import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/user/chat.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  profileData: any;
  totalProfile: any;

  constructor(private chatService: ChatService, private router: Router) {
    this.getCustomersProfile();
   }

  ngOnInit() {
    setInterval(dt =>{
      this. getCustomersProfile();
    },3000)
  }

  getCustomersProfile(){
    this.chatService.geCustomersCahatProfiles().subscribe((data: any) =>{
      this.profileData = data.cats;
      this.totalProfile = this.profileData.length;
    })
  }

  openProfile(user_id: any,name:any){
    this.router.navigate(['tabs/chat-panel/'+user_id+'/'+name])
  }

}
