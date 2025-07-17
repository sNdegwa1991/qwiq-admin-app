import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParcelServerResponse } from 'src/app/models/parcel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  sendParcelOrderToServe(parcel_id: any,parcel_origin: any,parcel_destination: any,parcel_origin_cords: any,parcel_end_cords: any,parcel_nature: any,parcel_description: any,distance: any,delivery_fees: any, user_id: any,receiver: any){
    return this.http.get(this.SERVER_URL+'/parcels/parcel-register.php?parcel_id='+parcel_id+'&parcel_origin='+parcel_origin+'&parcel_destination='+parcel_destination+'&parcel_origin_cords='+parcel_origin_cords+'&parcel_end_cords='+parcel_end_cords+'&parcel_nature='+parcel_nature+'&parcel_description='+parcel_description+'&distance='+distance+'&delivery_fees='+delivery_fees+'&user_id='+user_id+'&receiver='+receiver);
    }
    getUserOpenParcel(userId: any): Observable<ParcelServerResponse>{
      return this.http.get<ParcelServerResponse>(this.SERVER_URL+'/parcels/parcel-user-open.php?search='+userId);
    }

    getUserClosedParcel(userId: any): Observable<ParcelServerResponse>{
      return this.http.get<ParcelServerResponse>(this.SERVER_URL+'/parcels/parcel-user-closed.php?search='+userId);
    }

    getParcelDetails(parcelId: any): Observable<ParcelServerResponse>{
      return this.http.get<ParcelServerResponse>(this.SERVER_URL+'/parcels/parcel-getById.php?search='+parcelId);
    }

    getStatusParcel(status: any): Observable<ParcelServerResponse>{
      return this.http.get<ParcelServerResponse>(this.SERVER_URL+'/parcels/parcel-get-status-list.php?search='+status);
    }

    updateStatusParcel(status: any,order: any){
      return this.http.get(this.SERVER_URL+'/parcels/parcel-update-status.php?status_update='+status+'&order_number='+order);
    }

    updateParcelRider(rider_id: any,order: any){
      return this.http.get(this.SERVER_URL+'/parcels/parcel-update-rider.php?rider_id='+rider_id+'&order_number='+order);
    }

    updateSupaRider(rider_id: any,order: any){
      return this.http.get(this.SERVER_URL+'/supa-update-rider.php?rider_id='+rider_id+'&order_number='+order);
    }

    getPersonAssignParcel(order: any){
      return this.http.get(this.SERVER_URL+'/get-parcel-rider.php?parcel_id='+order);
    }
}
