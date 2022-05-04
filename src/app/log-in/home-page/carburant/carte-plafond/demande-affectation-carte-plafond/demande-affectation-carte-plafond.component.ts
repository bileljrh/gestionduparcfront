import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {PaginationConfiguration} from '../../../pagination-configuration';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DeleteDemandeAffectationCartePlafondComponent} from './delete-demande-affectation-carte-plafond/delete-demande-affectation-carte-plafond.component';
import {ConfirmDemandeAffectationCartePlafondComponent} from './confirm-demande-affectation-carte-plafond/confirm-demande-affectation-carte-plafond.component';
import {ValidateDemandeAffectationCartePlafondComponent} from './validate-demande-affectation-carte-plafond/validate-demande-affectation-carte-plafond.component';
import {CartePlafondServiceService} from '../carte-plafond-service.service';
import {AffectationCarteTabData} from '../affectation-carte-tab-data';
import {FicheVehiculeComponent} from '../../../administratif/vehicules/fiche-vehicule/fiche-vehicule.component';
import { NewAffectationCartePlafondComponent } from './new-affectation-carte-plafond/new-affectation-carte-plafond.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-demande-affectation-carte-plafond',
  templateUrl: './demande-affectation-carte-plafond.component.html',
  styleUrls: ['./demande-affectation-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class DemandeAffectationCartePlafondComponent implements OnInit {

  ListCartePlafond: AffectationCarteTabData[] = [];
  displayedColumns: string[] = ['matriculeBeneficiaire', 'nomBeneficiaire', 'numero_plaque', 'typeCarburantCarte', 'numeroCarte', 'montant', 'vehicule', 'confirm', 'validate', 'supprimer'];
  dataSource = new MatTableDataSource<AffectationCarteTabData>(this.ListCartePlafond);
  @ViewChild(MatSort) sort: MatSort;
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  UGP: string[] = ['UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5', 'UGP 6'];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'La confirmation de la demande d\'affectation sélectionnée a été effectuée avec succées';
  snackBarSuccesDeleteMsg = 'La suppression de la demande d\'affectation sélectionnée a été effectuée avec succées';
  snackBarFailureDeleteMsg = 'La demande d\'affectation sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarFailureConfirmationMsg = 'La demande d\'affectation sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesValidationMsg = 'La validation de la demande d\'affectation sélectionnée a été effectuée avec succées';
  snackBarFailureValidationMsg = 'La demande d\'affectation sélectionnée ne pourra pas être validée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg="Demande Ajouter Avec Succées"
  snackBarFailureModificationMsg="la demande ne poura pas etre ajouter"
  typeCarburant = new FormControl(null);
  itemPerPage = new FormControl(null);
  selectedTypeCarburant = 'tousTypes';
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  constructor( private Authentication: AuthenticationServiceService,  private CartePlafond: CartePlafondServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
  }

  VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean;
  DELETE_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean;
  ADD_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean;
  CONFIRM_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean;
  VALIDATION_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean;
  VEHICULE_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean;

  setDisplayedColumns() {
    this.ADD_DEMANDE_AFFECTATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.ADD_DEMANDE_AFFECTATION_CARTE_PLAFOND;

    this.DELETE_DEMANDE_AFFECTATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.DELETE_DEMANDE_AFFECTATION_CARTE_PLAFOND;

    this.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND;
    this.CONFIRM_DEMANDE_AFFECTATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.CONFIRM_DEMANDE_AFFECTATION_CARTE_PLAFOND;

    this.VALIDATION_DEMANDE_AFFECTATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.VALIDATION_DEMANDE_AFFECTATION_CARTE_PLAFOND;
    this.VEHICULE_DEMANDE_AFFECTATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.VEHICULE_DEMANDE_AFFECTATION_CARTE_PLAFOND;
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.itemsPerPage = value;
      this.paginConfig.currentPage = 0;
      this.getTotalItems();
    });
    this.typeCarburant.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      if (this.TypeCarburant.includes(value)) {
        this.selectedTypeCarburant = value;
      } else {
        this.selectedTypeCarburant = 'tousTypes';
      }
      this.getTotalItems();
    });
  }

  nouvelleAffectationCartePlafond() {
    const dialogRef = this.dialog.open(NewAffectationCartePlafondComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
       // this.CartePlafond.createNewDemandAffectationCartePlafond(value).subscribe();
        //this.CarteJocker.addNewAffectationCarteJocker(value.idCarte, value.idVehicule).subscribe(value1 => {
          this.CartePlafond.createNewDemandAffectationCartePlafond(value).subscribe(value1 => {
        this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesModificationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModificationMsg);
        });
      }
    });
  }

  deleteRow(i: number) {
    const dialogRef = this.dialog.open(DeleteDemandeAffectationCartePlafondComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CartePlafond.deleteDemandAffectationCartePlafond(value).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesConfirmationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureConfirmationMsg);
        });
      }
    });
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.CartePlafond.getPaginationListDemandeAffectationCartePlafondByEtat((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString(), this.selectedTypeCarburant).subscribe(value1 => {
      this.ListCartePlafond = value1;
      this.dataSource = new MatTableDataSource<AffectationCarteTabData>(this.ListCartePlafond);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  confirmRow(i: number) {
    const dialogRef = this.dialog.open(ConfirmDemandeAffectationCartePlafondComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CartePlafond.confirmDemandeAffectationCartePlafond(value).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesConfirmationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureConfirmationMsg);
        });
      }
    });
  }

  validateRow(i: any) {
    const dialogRef = this.dialog.open(ValidateDemandeAffectationCartePlafondComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CartePlafond.validateDemandeAffectationCartePlafond(value).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesValidationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureValidationMsg);
        });
      }
    });

  }

  getTotalItems() {
    this.CartePlafond.getTotalNumberDemandesAffectationCartesPlafond(this.selectedTypeCarburant).subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CartePlafond.getPaginationListDemandeAffectationCartePlafondByEtat(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(), this.selectedTypeCarburant).subscribe(value => {
      this.ListCartePlafond = value;
      this.dataSource = new MatTableDataSource<AffectationCarteTabData>(this.ListCartePlafond);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
      this.ngxLoader.stop();
    });
  }

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  redirectToVehicule(i: number) {
    const dialogRef = this.dialog.open(FicheVehiculeComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1100px',
      data: {id: i}
    });
  }

}
