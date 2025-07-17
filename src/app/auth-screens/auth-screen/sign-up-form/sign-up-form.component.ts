import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {

  form!: FormGroup;
  type = false;
  responseData: any;

  constructor() { 
    this.initForm();
  }

  ngOnInit() {}

  initForm(){
    this.form = new FormGroup({
     fname: new FormControl(null, {validators: [Validators.required]}),
     email: new FormControl(null, {validators: [Validators.required]}),
     phone: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
     password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
     password1: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]})
    })
   }
 
   changeType() {
     this.type = !this.type;
   }
 
   onSubmit() {
    //  if(!this.form.valid) {
    //    this.form.markAllAsTouched();
    //    return;
    //  }

    //  //console.log(this.form.value.fname);
    //  var email = this.form.value.email;
    //  var name = this.form.value.fname;
    //  var pass = this.form.value.password;
    //  var phone = this.form.value.phone;
    //  this.userService.registerData(email,name,pass,phone).subscribe(data =>{
    //   this.responseData = data;
    //   //console.log(this.responseData);
    //  });
   }


}
