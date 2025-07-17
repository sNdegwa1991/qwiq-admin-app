import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServerResponse } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ridder',
  templateUrl: './ridder.page.html',
  styleUrls: ['./ridder.page.scss'],
})
export class RidderPage implements OnInit {
 ridderUsers: any
  constructor(private users: UserService,private router: Router) { }

  ngOnInit() {
    this.getRidderUsers();
  }

  getRidderUsers(){
    this.users.getRoledUsersRiddder(3).subscribe((res: UserServerResponse) =>{
     this.ridderUsers = res.user;
    })
  }

  openRider(rider: any)
  {
    this.router.navigate(['tabs/rider-details/'+rider])
  }

  addNewRidderUser(){
    alert("Adding new restaurant user not active")
  }

}
