import { LoginService } from './../_services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  log:boolean=false;

  constructor(private LoginServiice:LoginService,private router: Router) { }

  ngOnInit() {
  }

  status: boolean = false;
  clickEvent(){
      this.status = !this.status; 
  
  }


  userLogOut()
  {
    this.LoginServiice.logout();
    this.router.navigate(['/login']);

  }
}
