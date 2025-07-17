import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation, GeolocationOptions } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  options1: GeolocationOptions;
  //currentPos: Geoposition;

  constructor(private locationAccuracy: LocationAccuracy, 
    private nativegeocode: NativeGeocoder,
    private http: HttpClient) { }
    options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };

  getCurrentLocation() {
    return Geolocation.getCurrentPosition()
    .then(coordinates => {
      return coordinates;
    })
    .catch(e => {
      throw(e);
    });
  }

  requestLocationPermission() {
    return Geolocation.requestPermissions()
    .then(status => {
      return status;
    })
    .catch(e => {
      throw(e);
    });
  }

  async enableLocation() {
    try {
      const canRequest: boolean = await this.locationAccuracy.canRequest();
      console.log('canrequest: ', canRequest);
      if(canRequest) {
        await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        console.log('Request successful');
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
      throw(e);
    }
  }

  reverseGeocoder(lat: any, lng: any){
    return this.nativegeocode.reverseGeocode(lat, lng, this.options)
    .then((result: NativeGeocoderResult[]) => {
      console.log('Service: '+JSON.stringify(result[0]));
      return result[0];
    })
    .catch((error: any) => {
      console.log(error);
      throw(error);
    });
  }

  forwardGeocoder(address: any){
   return this.nativegeocode.forwardGeocode(address, this.options)
   .then((result: NativeGeocoderResult[]) => {
    console.log('The coordinates are Latitude=' + result[0].latitude + 'and longitude ' + result[0].longitude);
    return result[0];
   })
   .catch((error: any) =>{
    console.log(error);
    throw(error);
   });
  }

  
  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const gModule = win.google;
    if(gModule && gModule.maps) {
     return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.mapsKey
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Map SDK is not Available');
        }
      };
    });
  }
}
