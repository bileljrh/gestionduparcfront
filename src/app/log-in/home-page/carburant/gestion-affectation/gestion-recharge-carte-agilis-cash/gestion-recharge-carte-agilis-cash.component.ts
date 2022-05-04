import {Component, ViewChild} from '@angular/core';
import {CarteAgilisCashServiceService} from '../../carte-agilis-cash/carte-agilis-cash-service.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ModifyRechargeCarteAgilisCashComponent} from './modify-recharge-carte-agilis-cash/modify-recharge-carte-agilis-cash.component';
import {DeleteRechargeCarteAgilisCashComponent} from './delete-recharge-carte-agilis-cash/delete-recharge-carte-agilis-cash.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PaginationConfiguration} from '../../../pagination-configuration';
import {FicheVehiculeComponent} from '../../../administratif/vehicules/fiche-vehicule/fiche-vehicule.component';
import {NewRechargeCarteAgilisCashComponent} from './new-recharge-carte-agilis-cash/new-recharge-carte-agilis-cash.component';
import {RechargeCarteAgilisCashTabData} from './recharge-carte-agilis-cash-tab-data';
import {ConfirmRechargeCarteAgilisCashComponent} from './confirm-recharge-carte-agilis-cash/confirm-recharge-carte-agilis-cash.component';
import {ValidateRechargeCarteAgilisCashComponent} from './validate-recharge-carte-agilis-cash/validate-recharge-carte-agilis-cash.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-gestion-recharge-carte-agilis-cash',
  templateUrl: './gestion-recharge-carte-agilis-cash.component.html',
  styleUrls: ['./gestion-recharge-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class GestionRechargeCarteAgilisCashComponent {
  listRechargeCarteAgilisCash: RechargeCarteAgilisCashTabData [] = [];
  displayedColumns: string[] = ['index', 'moisMission', 'numeroCarte', 'beneficiaire', 'numeroPlaque', 'montantDemande', 'confirmer', 'valider', 'vehicule', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<RechargeCarteAgilisCashTabData>(this.listRechargeCarteAgilisCash);
 
   VIEW_RECHARGE_AGILIS:boolean;
   MODIFY_RECHARGE_AGILIS:boolean;
   DELETE_RECHARGE_AGILIS:boolean;
   ADD_RECHARGE_AGILIS:boolean;
   VEHICULE_RECHARGE_AGILIS:boolean;
   CONFIRMER_RECHARGE_AGILIS:boolean;
   VALIDER_RECHARGE_AGILIS:boolean;
  setDisplayedColumns() {
    this.MODIFY_RECHARGE_AGILIS= this.Authentication.authoritiesUtilisateur.MODIFY_RECHARGE_AGILIS;
    this.DELETE_RECHARGE_AGILIS = this.Authentication.authoritiesUtilisateur.DELETE_RECHARGE_AGILIS;
    this.VIEW_RECHARGE_AGILIS = this.Authentication.authoritiesUtilisateur.VIEW_RECHARGE_AGILIS;
    this.ADD_RECHARGE_AGILIS = this.Authentication.authoritiesUtilisateur.ADD_RECHARGE_AGILIS;
    this.VEHICULE_RECHARGE_AGILIS = this.Authentication.authoritiesUtilisateur.VEHICULE_RECHARGE_AGILIS;
    this.CONFIRMER_RECHARGE_AGILIS = this.Authentication.authoritiesUtilisateur.CONFIRMER_RECHARGE_AGILIS;
    this.VALIDER_RECHARGE_AGILIS = this.Authentication.authoritiesUtilisateur.VALIDER_RECHARGE_AGILIS;

}

  @ViewChild(MatSort) sort: MatSort;
  snackBarSuccesDeleteMsg = 'La recharge sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La recharge sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'La recharge sélectionnée a été modifiée avec succès';
  snackBarFailureModificationMsg = 'La recharge sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle recharge sélectionnée a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle recharge sélectionnée ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmingMsg = 'La recharge sélectionnée a été confirmée avec succès';
  snackBarFailureConfirmingMsg = 'La recharge sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesValidatingMsg = 'La recharge sélectionnée a été validée avec succès';
  snackBarFailureValidatingMsg = 'La recharge sélectionnée ne pourra pas être validée, réessayez de nouveau s\'il vous plait';
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };

  constructor(private Authentication: AuthenticationServiceService, private CarteAgilisCash: CarteAgilisCashServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.ngxLoader.stop();
    this.setDisplayedColumns();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmRow(i: any) {
    const dialogRef = this.dialog.open(ConfirmRechargeCarteAgilisCashComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.confirmSelectedRechargeCarteAgilisCash(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesConfirmingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureConfirmingMsg);
        });
      }
    });
  }

  validRow(i: any) {
    const dialogRef = this.dialog.open(ValidateRechargeCarteAgilisCashComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.validateSelectedRechargeCarteAgilisCash(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesValidatingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureValidatingMsg);
        });
      }
    });
  }

  deleteRow(i: any) {
    const dialogRef = this.dialog.open(DeleteRechargeCarteAgilisCashComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.deleteSelectedRechargeCarteAgilisCash(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyRechargeCarteAgilisCashComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {element: this.listRechargeCarteAgilisCash[i]}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.modifySelectedRechargeCarteAgilisCash(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesModificationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureModificationMsg);
        });
      }
    });
  }

  ajouterNouvelleRechargeCarteAgilisCash() {
    const dialogRef = this.dialog.open(NewRechargeCarteAgilisCashComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.createNewRechargeRequestCarteAgilisCash(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  }

  redirect2Vehicule(idVehicule: any) {
    const dialogRef = this.dialog.open(FicheVehiculeComponent, {
      width: '1100px',
      panelClass: 'mat-dialog-container-class',
      data: {id: idVehicule}
    });
  }

  getTotalItems() {
    this.CarteAgilisCash.getTotalNumberListRechargeCarteAgilisCash().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CarteAgilisCash.getPaginationListRechargeCarteAgilisCash(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.listRechargeCarteAgilisCash = value;
      this.dataSource = new MatTableDataSource<RechargeCarteAgilisCashTabData>(this.listRechargeCarteAgilisCash);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

  dateToMonth(date: string): string {
    return date.substr(3);
  }

}
