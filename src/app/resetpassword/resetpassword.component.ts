import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  Resetform: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
constructor(
  private router: Router,
  private frmBuilder: FormBuilder,private LoginService:LoginService) { }


  ngOnInit() {
      this.Resetform = this.frmBuilder.group({
  
        email:["", [Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.email]],
        otp:["", [Validators.required,Validators.minLength(3)]],
        password:["", [Validators.required,Validators.minLength(3)]]
   
       
      }); 
  }

  get email() { return this.Resetform.get('email');}
  get otp() { return this.Resetform.get('otp');}
  get password() { return this.Resetform.get('password');}

  resetPassword()
  {
    this.isSubmitted = true;
    if (!this.Resetform.valid)
      return;
  
    // console.log("form submited");
    this.LoginService.validateOtp(this.email.value,this.otp.value,this.password.value)
      .subscribe(
        data => {
          console.log(data);
          alert(data.message)
         
        },
        error => {
         alert(error.error.message)
          // console.log(error);
        });
  }
}
