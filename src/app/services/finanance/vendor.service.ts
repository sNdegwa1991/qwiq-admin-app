import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  registerVendorIncome(amount: any, mode: any, ref: any,vendor: any){
    return this.http.get(this.SERVER_URL+'/register-vendor-moneyin.php?ref='+ref+'&amount='+amount+'&mode='+mode+'&vendor_id='+vendor);
  }
}
