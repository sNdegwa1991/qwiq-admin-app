import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServerResponse } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-restos',
  templateUrl: './restos.page.html',
  styleUrls: ['./restos.page.scss'],
})
export class RestosPage implements OnInit {

  restoUsers: any;

  constructor(private users: UserService, private router: Router) { }

  ngOnInit() {
    this.getRestaurantUsers();
  }

  getRestaurantUsers(){
    this.users.getRoledUsers(2).subscribe((res: UserServerResponse) =>{
     this.restoUsers = res.user;
    })
  }

  addNewRestoUser(){
    alert("Adding new restaurant user not active")
  }

  openUser(user: any){
    this.router.navigate(['tabs/resto-finance/'+user])
  }

}
