import {Component} from '@angular/core';
import {AuthenticationServiceService} from '../../../../authentication-service.service';

@Component({
  selector: 'app-parametres-vehicules',
  templateUrl: './parametres-vehicules.component.html',
  styleUrls: ['./parametres-vehicules.component.scss']
})
export class ParametresVehiculesComponent {
  VIEW_PARAMETRES_VEHICULES_SUB_MODULE: boolean;
  VIEW_CAUSES_SINISTRES: boolean;
  VIEW_GENRES_VEHICULE: boolean;
  VIEW_MARQUES_VEHICULE: boolean;
  VIEW_TYPES_VEHICULE: boolean;
  VIEW_USAGES_VEHICULES: boolean;

  constructor(private Authentication: AuthenticationServiceService) {
    this.setDisplayedColumns();
  }


  setDisplayedColumns() {
    this.VIEW_CAUSES_SINISTRES = this.Authentication.authoritiesUtilisateur.VIEW_CAUSES_SINISTRES;
    this.VIEW_GENRES_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_GENRES_VEHICULE;
    this.VIEW_MARQUES_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_MARQUES_VEHICULE;
    this.VIEW_TYPES_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_TYPES_VEHICULE;
    this.VIEW_USAGES_VEHICULES = this.Authentication.authoritiesUtilisateur.VIEW_USAGES_VEHICULES;
    this.VIEW_PARAMETRES_VEHICULES_SUB_MODULE = ((this.Authentication.getAuthoritiesUtilisateur().VIEW_CAUSES_SINISTRES) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_GENRES_VEHICULE) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_MARQUES_VEHICULE) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_TYPES_VEHICULE) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_USAGES_VEHICULES));

  }

}
