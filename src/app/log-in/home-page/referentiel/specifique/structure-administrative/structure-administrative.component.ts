
import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModifyStructureAdministrativeComponent} from './modify-structure-administrative/modify-structure-administrative.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NewStructureAdministrativeComponent} from './new-structure-administrative/new-structure-administrative.component';
import {DeleteStructureAdministrativeComponent} from './delete-structure-administrative/delete-structure-administrative.component';
import {Structure} from './structure';
import {ReferentielSpecifiqueServiceService} from '../referentiel-specifique-service.service';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../authentication-service.service';


@Component({
  selector: 'app-structure-administrative',
  templateUrl: './structure-administrative.component.html',
  styleUrls: ['./structure-administrative.component.scss'],
  providers: [MatSnackBar]
})
export class StructureAdministrativeComponent implements OnDestroy {
  VIEW_STRUCTURE_ADMINISTRATIVE: boolean;
  ADD_STRUCTURE_ADMINISTRATIVE: boolean;
  MODIFY_STRUCTURE_ADMINISTRATIVE: boolean;
  DELETE_STRUCTURE_ADMINISTRATIVE: boolean;
  subscription: Subscription[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La structure sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La structure sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La structure a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La structure ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'La structure sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'La structure sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  mystructureFilles: Structure[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, private Referentiel: ReferentielSpecifiqueServiceService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.VIEW_STRUCTURE_ADMINISTRATIVE = this.Authentication.authoritiesUtilisateur.VIEW_STRUCTURE_ADMINISTRATIVE;
    this.ADD_STRUCTURE_ADMINISTRATIVE = this.Authentication.authoritiesUtilisateur.ADD_STRUCTURE_ADMINISTRATIVE;
    this.DELETE_STRUCTURE_ADMINISTRATIVE = this.Authentication.authoritiesUtilisateur.DELETE_STRUCTURE_ADMINISTRATIVE;
    this.MODIFY_STRUCTURE_ADMINISTRATIVE = this.Authentication.authoritiesUtilisateur.MODIFY_STRUCTURE_ADMINISTRATIVE;
    this.getStructureList();
    this.ngxLoader.stop();
  }



  modifyStructure(el: Structure, pr?: Structure) {
    if (this.MODIFY_STRUCTURE_ADMINISTRATIVE) {
      const dialogRef = this.dialog.open(ModifyStructureAdministrativeComponent, {
        width: '900px',
        panelClass: 'mat-dialog-container-class',
        data: {element: el, parent: pr}
      });
      this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.subscription.push(this.Referentiel.modifySelectedStructure(value3).subscribe(value => {
            this.getStructureList();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesModifyingMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureModifyingMsg);
          }));
        }
      }));
    }
  }


  deleteSelectedStrcuture(i: number) {
    if (this.DELETE_STRUCTURE_ADMINISTRATIVE) {
      const dialogRef = this.dialog.open(DeleteStructureAdministrativeComponent, {
        width: '540px',
        panelClass: 'mat-dialog-container-class',
        data: {id: i}
      });
      this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.subscription.push(this.Referentiel.deleteSelectedStructure(value3).subscribe(value => {
            this.getStructureList();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesDeleteMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureDeleteMsg);
          }));
        }
      }));
    }
  }

  addChildStructure(parent: any) {
    if (this.ADD_STRUCTURE_ADMINISTRATIVE) {
      const dialogRef = this.dialog.open(NewStructureAdministrativeComponent, {
        width: '900px',
        panelClass: 'mat-dialog-container-class',
        data: {element: parent, structureMere: false}
      });
      this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.subscription.push(this.Referentiel.addNewChildStructure(value3, value3.structureMere.id).subscribe(value => {
            this.getStructureList();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesAddingMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureAddingMsg);
          }));
        }
      }));
    }
  }


  ajouterStructureMere() {
    if (this.ADD_STRUCTURE_ADMINISTRATIVE) {
      const dialogRef = this.dialog.open(NewStructureAdministrativeComponent, {
        width: '900px',
        panelClass: 'mat-dialog-container-class',
        data: {structureMere: true}
      });
      this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.subscription.push(this.Referentiel.addNewParentStructure(value3).subscribe(value => {
            this.getStructureList();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesAddingMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureAddingMsg);
          }));
        }
      }));
    }
  }

  getStructureList() {
    this.subscription.push(this.Referentiel.getListStructure().subscribe(value => {
      this.mystructureFilles = value;
    }, error => {
      this.showNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }


}
