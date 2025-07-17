import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestoServerResponse } from 'src/app/models/restaurant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  getRestaurant(restoId: any): Observable<RestoServerResponse>{
    return this.http.get<RestoServerResponse>(this.SERVER_URL+'/get-restaurant-details.php?search='+restoId);
  }

  getRestaurantFinance(restoId: any){
    return this.http.get(this.SERVER_URL+'/get-resto-finance-details.php?resto_id='+restoId);
  }
}
