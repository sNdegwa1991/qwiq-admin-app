import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { UserServerResponse } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ServerURL = environment.SERVER_URL;
  results: any;
  responseData: any;
  role: any;

  constructor(public http: HttpClient, 
    public toast: ToastController,
    public loading: LoadingController,
    public route: Router) { }

    loginData(email:string, password: string) {
      return this.http.get(`${this.ServerURL}/admin-login.php?email=${email}&password=${password}`).pipe( map(result => {
        this.results = result;
        this.role = this.results[0].role;

        if(result === 'Failed'){
          this.toast.create({
           message: 'Invalid Credentials',
           duration: 2000,
           position: 'top'
          }).then((toastData) =>{
           //console.log(toastData);
           toastData.present();
          })
         } else {
            this.loading.create({
              duration: 2000
            }).then((res) =>{
              res.present();

              res.onDidDismiss().then((dis) =>{
                localStorage.setItem('user', JSON.stringify(result));
                if(this.role === '1')
                {
                  this.route.navigate(['/tabs/home']);
                }
                if(this.role === '2')
                {
                  this.route.navigate(['/tabs/resto-home']);
                }
                if(this.role === '3')
                {
                  this.route.navigate(['/tabs/ridder-account']);
                }
              })
            })
         }
      }))
    }

  getRoledUsers(role: any): Observable<UserServerResponse>{
      return this.http.get<UserServerResponse>(`${this.ServerURL}/get-admin-resto-users.php?role=${role}`);
    }

    getRoledUsersRiddder(role: any): Observable<UserServerResponse>{
      return this.http.get<UserServerResponse>(`${this.ServerURL}/get-admin-users.php?role=${role}`);
    } 
    
    getRiderDetails(rider: any){
      return this.http.get(this.ServerURL+'/get-rider-details.php?rider='+rider);
     } 

     getActiveRiders(): Observable<UserServerResponse>{
      return this.http.get<UserServerResponse>(this.ServerURL+'/get-active-riders.php');
     } 
}
