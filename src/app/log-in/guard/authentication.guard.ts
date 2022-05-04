import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationServiceService} from '../authentication-service.service';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  serverURL = environment.serverUrl;

  constructor(private Authentication: AuthenticationServiceService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.Authentication.isUserLoggedIn()==false) {
      return true;
    } else {
      this.router.navigate(['/api']);
      return false;
    }
  }
}
