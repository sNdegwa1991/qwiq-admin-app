import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  sendMessage(phone: any,message: any){
    return this.http.get(this.SERVER_URL+'/general-messaging.php?phone='+phone+'&message='+message);
  }
}
