import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl=environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl+'login.php', { username: username, password: password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            //console.log(user);
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        }));
}

logout()
{
    localStorage.removeItem('currentUser');
    localStorage.clear();
    
}

sendOtp(email: string) {
  return this.http.post<any>(this.apiUrl+'admin_sent_otp.php', { email: email })
      .pipe(map(user => {
        
         
          return user;
      }));
}

validateOtp(email: string,otp,password) {
  return this.http.post<any>(this.apiUrl+'admin_forgot_password.php', { email: email, otp: otp, password: password })
      .pipe(map(user => {
        
         
          return user;
      }));
}

}
