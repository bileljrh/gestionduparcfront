import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ActivatedRouteSnapshot, CanLoad, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationServiceService} from '../authentication-service.service';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiGuardGuard implements CanActivate{

  
  constructor(private Authentication: AuthenticationServiceService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.Authentication.isUserLoggedIn()==true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
