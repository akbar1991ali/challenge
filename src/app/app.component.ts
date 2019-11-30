import { Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }



 public LocalStore()
 {
  if (localStorage.getItem('currentUser')) {
    // logged in so return true
    return true;
}
else
{
  return false;
}
 }
}
