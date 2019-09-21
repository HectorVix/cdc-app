import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isCollapsed = true;
  rolAdmin = false;

  constructor(private router: Router) { }

  ngOnInit() {
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    if (decodedToken.sub == "Admin")
      this.rolAdmin = true;
    else
      this.rolAdmin = false;
  }
  colapsar() {
    this.isCollapsed = true;
  }
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
