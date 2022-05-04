import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthenticationServiceService} from '../../../../authentication-service.service';

@Component({
  selector: 'app-parametres-generaux',
  templateUrl: './parametres-generaux.component.html',
  styleUrls: ['./parametres-generaux.component.scss'],
  providers: [MatSnackBar]
})
export class ParametresGenerauxComponent {
  VIEW_ANNEES: boolean;
  VIEW_ENERGIES: boolean;
  VIEW_TVA: boolean;
  VIEW_UNITES: boolean;
  VIEW_PARAMETRES_GENERAUX_SUB_MODULE: boolean;

  constructor(private Authentication: AuthenticationServiceService) {
    this.setDisplayedColumns();
  }

  setDisplayedColumns() {
    this.VIEW_ENERGIES = this.Authentication.authoritiesUtilisateur.VIEW_ENERGIES;
    this.VIEW_ANNEES = this.Authentication.authoritiesUtilisateur.VIEW_ANNEES;
    this.VIEW_TVA = this.Authentication.authoritiesUtilisateur.VIEW_TVA;
    this.VIEW_UNITES = this.Authentication.authoritiesUtilisateur.VIEW_UNITES;
    this.VIEW_PARAMETRES_GENERAUX_SUB_MODULE = ((this.Authentication.getAuthoritiesUtilisateur().VIEW_ANNEES) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_ENERGIES) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_TVA) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_UNITES));
  }


}
