import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  getRiderSavings(rider: any){
    return this.http.get(this.SERVER_URL+'/get-rider-savings.php?rider='+rider);
  }

  withdrawRidersaving(rider: any, amount: any, reason: any){
    return this.http.get(this.SERVER_URL+'/withdraw-rider-savings.php?rider='+rider+'&amount='+amount+'&reason='+reason);
  }

  calculateSharingCommision(rider: any, order_id: any, delivery: any, ){
    return this.http.get(this.SERVER_URL+'/calculate_delivery_sharing.php?rider='+rider+'&order='+order_id+'&fees='+delivery);
  }

}
