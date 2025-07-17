import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  restoAccounts() {
   this.router.navigate(['tabs/restos'])
  }
  ridderAccounts(){
   this.router.navigate(['tabs/ridder'])
  }
  myAccounts(){
   this.router.navigate(['tabs/profile'])
  }
  logout(){
    localStorage.removeItem('user')
    this.router.navigate(['../'])
  }

}
