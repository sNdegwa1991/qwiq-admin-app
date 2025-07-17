import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { INTRO_KEY, StorageService } from '../services/user/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(private router: Router, private storage: StorageService){}
  
  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await this.storage.getStorage(INTRO_KEY);

    if(hasSeenIntro && hasSeenIntro.value == 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/intro', {replaceUrl: true});
      return false;
    }
  }
}
