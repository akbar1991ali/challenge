import { LoginService } from './../_services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms' 
import { HttpRequest, HttpHandler,HttpEvent,HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
    loading = false;
    returnUrl: string;
    loginform: FormGroup;
    isSubmitted: boolean = false;
    result: any = null;
  constructor(  private route: ActivatedRoute,
    private router: Router,
    private frmBuilder: FormBuilder,private http: HttpClient,private LoginService:LoginService) { }

  ngOnInit() {
    this.loginform = this.frmBuilder.group({
  
        username:["", [Validators.required,Validators.minLength(3),Validators.maxLength(32)]],
        password:["", [Validators.required,Validators.minLength(6),Validators.maxLength(32)]]
       
      });  
   this.logout();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

  }


  login() {
    this.isSubmitted = true;
    if (!this.loginform.valid)
      return;
    this.loading = true;
    // console.log("form submited");
    this.LoginService.login(this.username.value, this.password.value)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        error => {
            console.log(error);
          if (error.status == 401) {
            this.result = "Invalid Username Or Password"
            this.loading = false;
          }
          else {
            this.result = error.message;
            this.loading = false;

          }
          // console.log(error);
        });
  }
  logout()
  {
    this.LoginService.logout();
    this.router.navigate(['/login']);

  }

get username() { return this.loginform.get('username');}
get password() { return this.loginform.get('password');}

dash(){
   // this.router.navigateByUrl('/home');
   this.router.navigate([this.returnUrl]);
}

}
