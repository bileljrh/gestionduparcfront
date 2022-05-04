import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationServiceService} from '../authentication-service.service';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  serverURL = environment.serverUrl;

  constructor(private authenticationService: AuthenticationServiceService) {
  }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes('api/login')) {
      return httpHandler.handle(httpRequest);
    } else if (httpRequest.url.includes('api/reset_password')) {
      return httpHandler.handle(httpRequest);
    } else if (httpRequest.url.includes('/image_personnel')) {
      this.authenticationService.loadToken();
      const token = this.authenticationService.getToken();
      const request = httpRequest.clone({setHeaders: {Authorization: `Bearer ${token}`}});
      return httpHandler.handle(request);
    } else if (httpRequest.url.includes('api/')) {
      this.authenticationService.loadToken();
      const token = this.authenticationService.getToken();
      const request = httpRequest.clone({setHeaders: {Authorization: `Bearer ${token}`}});
      return httpHandler.handle(request);
    } else {
      return httpHandler.handle(httpRequest);
    }
  }
}
