import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resto-account',
  templateUrl: './resto-account.page.html',
  styleUrls: ['./resto-account.page.scss'],
})
export class RestoAccountPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  logout(){

    localStorage.removeItem('user')
    this.route.navigate(['../'])
  }

  myProfile(){
    alert("Under Construction")
  }
  changePassword(){
    alert("Under Construction")
  }

}
