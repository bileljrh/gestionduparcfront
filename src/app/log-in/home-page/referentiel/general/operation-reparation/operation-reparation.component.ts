import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthenticationServiceService} from '../../../../authentication-service.service';

@Component({
  selector: 'app-operation-reparation',
  templateUrl: './operation-reparation.component.html',
  styleUrls: ['./operation-reparation.component.scss'],
  providers: [MatSnackBar]
})
export class OperationReparationComponent {
  VIEW_FAMILLES_OPERATIONS_REPARATION: boolean;
  VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS: boolean;
  VIEW_OPERATIONS_REPARATION: boolean;


  constructor(public dialog: MatDialog, private Authentication: AuthenticationServiceService) {
    this.VIEW_FAMILLES_OPERATIONS_REPARATION = this.Authentication.getAuthoritiesUtilisateur().VIEW_FAMILLES_OPERATIONS_REPARATION;
    this.VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS = this.Authentication.getAuthoritiesUtilisateur().VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS;
    this.VIEW_OPERATIONS_REPARATION = this.Authentication.getAuthoritiesUtilisateur().VIEW_OPERATIONS_REPARATION;
  }


}
