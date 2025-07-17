import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  ServerURL = environment.SERVER_URL;

  constructor(public http: HttpClient) { }

  geCustomersCahatProfiles(){
    return this.http.get(this.ServerURL+'/get-all-charts.php');
  }

  geCustomerChats(cust_id: any){
    return this.http.get(this.ServerURL+'/get-specific-customer-chats.php?cust_id='+cust_id);
  }

  sendCustomerChats(cust_id: any,message: any){
    return this.http.get(this.ServerURL+'/send-chat-reply.php?cust_id='+cust_id+'&message='+message);
  }
}
