import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {

  form!: FormGroup;
  type = true;
  result: any;

  constructor(private userService: UserService) { 
    this.initForm();
  }

  ngOnInit() {}

  initForm(){
    this.form = new FormGroup({
     email: new FormControl(null, {validators: [Validators.required]}),
     password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
    })
   }
 
   changeType() {
     this.type = !this.type;
   }
 
   onSubmit() {
     if(!this.form.valid) {
       this.form.markAllAsTouched();
       return;
     }

     var email = this.form.value.email;
     var pass = this.form.value.password;
     this.userService.loginData(email,pass).subscribe(data => {
      this.result =data;
     })
   }


}
