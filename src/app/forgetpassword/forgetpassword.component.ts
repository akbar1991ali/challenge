import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  Forgotform: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
constructor(
  private router: Router,
  private frmBuilder: FormBuilder,private LoginService:LoginService) { }


  ngOnInit() {
      this.Forgotform = this.frmBuilder.group({
  
        email:["", [Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.email]],
   
       
      }); 
  }

  get email() { return this.Forgotform.get('email');}


  sendOtp()
  {
    this.isSubmitted = true;
    if (!this.Forgotform.valid)
      return;
  
    // console.log("form submited");
    this.LoginService.sendOtp(this.email.value)
      .subscribe(
        data => {
          // console.log(data);
         alert(data.message)
         this.router.navigate([{outlets: {primary: 'resetpassword' ,sidebar: 'resetpassword'}}])
        },
        error => {
            console.log(error);
        alert(error.error.message)
          // console.log(error);
        });
  }

}
