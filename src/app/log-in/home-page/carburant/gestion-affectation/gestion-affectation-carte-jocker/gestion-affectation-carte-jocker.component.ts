import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CarteJockerDataResponseList} from '../../gestion-cartes/gestion-cartes-jocker/carte-jocker-data-response-list';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PaginationConfiguration} from '../../../pagination-configuration';
import {CarteJockerServiceService} from '../../carte-jocker/carte-jocker-service.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ModifyDemandeAffectationCarteJockerComponent} from './modify-demande-affectation-carte-jocker/modify-demande-affectation-carte-jocker.component';
import {DeleteDemandeAffectationCarteJockerComponent} from './delete-demande-affectation-carte-jocker/delete-demande-affectation-carte-jocker.component';
import {NouvelleDemandeAffectationCarteJockerComponent} from './nouvelle-demande-affectation-carte-jocker/nouvelle-demande-affectation-carte-jocker.component';
import {ConfirmDemandeAffectationCarteJockerComponent} from './confirm-demande-affectation-carte-jocker/confirm-demande-affectation-carte-jocker.component';
import {ValidateDemandeAffectationCarteJockerComponent} from './validate-demande-affectation-carte-jocker/validate-demande-affectation-carte-jocker.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';


@Component({
  selector: 'app-gestion-affectation-carte-jocker',
  templateUrl: './gestion-affectation-carte-jocker.component.html',
  styleUrls: ['./gestion-affectation-carte-jocker.component.scss'],
  providers: [MatSnackBar]
})
export class GestionAffectationCarteJockerComponent implements OnInit {
  displayedColumns: string[] = ['index', 'structure', 'numeroCarte', 'solde', 'matriculeBeneficiaire', 'numeroPlaque', 'vehicule', 'confirmer', 'valider', 'modifier', 'supprimer'];
  carteJockerList: CarteJockerDataResponseList[] = [];
  dataSource = new MatTableDataSource<CarteJockerDataResponseList>(this.carteJockerList);
  @ViewChild(MatSort) sort: MatSort;
  TypeCarburant = new FormControl(null);
  itemPerPage = new FormControl(null);
  selectedTypeCarburant: string;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarSuccesDeleteMsg = 'la demande d\'affectation de carte Jocker sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la demande d\'affectation de carte Jocker sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'La modification de la demande d\'affectation de carte Jocker sélectionnée a été effectuée avec succès';
  snackBarFailureModificationMsg = 'la demande d\'affectation de carte Jocker sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'La confirmation de la demande d\'affectation de carte Jocker sélectionnée a été effectuée avec succès';
  snackBarFailureConfirmationMsg = 'la demande d\'affectation de carte Jocker sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesValidationMsg = 'La validation de la demande d\'affectation de carte Jocker sélectionnée a été effectuée avec succès';
  snackBarFailureValidationMsg = 'la demande d\'affectation de carte Jocker sélectionnée ne pourra pas être validée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'une nouvelle carte Jocker a été effectuée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle carte Jocker ne pourra pas être effectué, réessayez de nouveau s\'il vous plait';
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';


  CONFIRMATION_DEMANDE_AFFECTATION_CARTE_JOCKER: boolean;
  VALIDATION_DEMANDE_AFFECTATION_CARTE_JOCKER: boolean;
  VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER: boolean;
  MODIFY_DEMANDE_AFFECTATION_CARTE_JOCKER: boolean;
  ADD_DEMANDE_AFFECTATION_CARTE_JOCKER: boolean;
  VEHICULE_DEMANDE_AFFECTATION_CARTE_JOCKER: boolean;
  DELETE_DEMANDE_AFFECTATION_CARTE_JOCKER: boolean;
  
  
  constructor( private Authentication: AuthenticationServiceService,  private CarteJocker: CarteJockerServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
  }

   
  setDisplayedColumns() {
    this.CONFIRMATION_DEMANDE_AFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.CONFIRMATION_DEMANDE_AFFECTATION_CARTE_JOCKER;
    this.VALIDATION_DEMANDE_AFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.VALIDATION_DEMANDE_AFFECTATION_CARTE_JOCKER;
    this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER;
    this.MODIFY_DEMANDE_AFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.MODIFY_DEMANDE_AFFECTATION_CARTE_JOCKER;
    this.ADD_DEMANDE_AFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.ADD_DEMANDE_AFFECTATION_CARTE_JOCKER;
    this.VEHICULE_DEMANDE_AFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.VEHICULE_DEMANDE_AFFECTATION_CARTE_JOCKER;
    this.DELETE_DEMANDE_AFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.DELETE_DEMANDE_AFFECTATION_CARTE_JOCKER;

  }
  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      this.ngxLoader.stop();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRow(id1: number, id2: number) {
    const dialogRef = this.dialog.open(DeleteDemandeAffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {idCarte: id1, idHistorique: id2}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.CarteJocker.deleteSelectedDemandeAffectationCarteJocker(value.idCarte, value.idHistorique).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.CarteJocker.getPaginationDemandesAffectationCarteJocker((paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.carteJockerList = value;
      this.dataSource = new MatTableDataSource<CarteJockerDataResponseList>(this.carteJockerList);
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

  modifyRow(i: number) {
    const dialogRef = this.dialog.open(ModifyDemandeAffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {element: this.carteJockerList[i]}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.modifySelectedDemandeAffectationCarteJocker(value.idCarte, value.idVehicule, this.carteJockerList[i].id).subscribe(value1 => {
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

  redirectToVehicule(idVehicule: any) {

  }

  nouvelleAffectationCarteJocker() {
    const dialogRef = this.dialog.open(NouvelleDemandeAffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.addNewAffectationCarteJocker(value.idCarte, value.idVehicule).subscribe(value1 => {
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

  getTotalItems() {
    this.CarteJocker.getTotalDemandeAffectationCarteJockerByFilteredDate().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CarteJocker.getPaginationDemandesAffectationCarteJocker(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.carteJockerList = value;
      this.dataSource = new MatTableDataSource<CarteJockerDataResponseList>(this.carteJockerList);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }

  confirmRow(i: any) {
    const dialogRef = this.dialog.open(ConfirmDemandeAffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.confirmSelectedDemandeAffectationCarteJocker(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesConfirmationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModificationMsg);
        });
      }
    });
  }

  validateRow(i: any) {
    const dialogRef = this.dialog.open(ValidateDemandeAffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.validateSelectedDemandeAffectationCarteJocker(value).subscribe(value1 => {
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
}
