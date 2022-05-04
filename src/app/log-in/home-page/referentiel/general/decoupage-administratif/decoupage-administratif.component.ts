import {Component} from '@angular/core';
import {AuthenticationServiceService} from '../../../../authentication-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';


@Component({
  selector: 'app-decoupage-administratif',
  templateUrl: './decoupage-administratif.component.html',
  styleUrls: ['./decoupage-administratif.component.scss']
})
export class DecoupageAdministratifComponent {
  VIEW_GOUVERNORATS: boolean;
  VIEW_STATIONS_PEAGE: boolean;

  constructor(private Authentication: AuthenticationServiceService, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
  }

  setDisplayedColumns() {
    this.VIEW_GOUVERNORATS = this.Authentication.authoritiesUtilisateur.VIEW_GOUVERNORATS;
    this.VIEW_STATIONS_PEAGE = this.Authentication.authoritiesUtilisateur.VIEW_STATIONS_PEAGE;
  }

}
