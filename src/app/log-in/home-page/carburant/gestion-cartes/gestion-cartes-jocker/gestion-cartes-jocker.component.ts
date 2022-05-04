import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PaginationConfiguration} from '../../../pagination-configuration';
import {CarteJockerServiceService} from '../../carte-jocker/carte-jocker-service.service';
import {CarteJockerDataResponseList} from './carte-jocker-data-response-list';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ModifyCarteJockerComponent} from './modify-carte-jocker/modify-carte-jocker.component';
import {DeleteCarteJockerComponent} from './delete-carte-jocker/delete-carte-jocker.component';
import {NouvelleCarteJockerComponent} from './nouvelle-carte-jocker/nouvelle-carte-jocker.component';
import {FicheVehiculeComponent} from '../../../administratif/vehicules/fiche-vehicule/fiche-vehicule.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-gestion-cartes-jocker',
  templateUrl: './gestion-cartes-jocker.component.html',
  styleUrls: ['./gestion-cartes-jocker.component.scss'],
  providers: [MatSnackBar]
})
export class GestionCartesJockerComponent implements OnInit {
  displayedColumns: string[] = ['index', 'numeroCarte', 'solde', 'dateFinValidite', 'modifier', 'supprimer'];
  carteJockerList: CarteJockerDataResponseList[] = [];
  dataSource = new MatTableDataSource<CarteJockerDataResponseList>(this.carteJockerList);
  @ViewChild(MatSort) sort: MatSort;
  itemPerPage = new FormControl(null);
  selectedTypeCarburant: string;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  etatCarteActuel: string;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La carte Jocker sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La carte Jocker sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'La modification de la carte Jocker sélectionnée a été effectuée avec succès';
  snackBarFailureModificationMsg = 'la carte Jocker sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'une nouvelle carte Jocker a été effectuée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle carte Jocker ne pourra pas être effectué, réessayez de nouveau s\'il vous plait';
 
VIEW_CARTE_JOCKER:boolean;
MODIFY_CARTE_JOCKER:boolean;
DELETE_CARTE_JOCKER:boolean;
ADD_CARTE_JOCKER:boolean;


  constructor(private Authentication: AuthenticationServiceService,  private CarteJocker: CarteJockerServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
  }

  
  setDisplayedColumns() {
    this.VIEW_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.VIEW_CARTE_JOCKER;
    this.MODIFY_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.MODIFY_CARTE_JOCKER;
    this.DELETE_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.DELETE_CARTE_JOCKER;
    this.ADD_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.ADD_CARTE_JOCKER;

  }

  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.CarteJocker.getPaginationCarteJockerList(this.etatCarteActuel, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
        this.carteJockerList = value1;
        this.dataSource = new MatTableDataSource<CarteJockerDataResponseList>(this.carteJockerList);
        this.dataSource.sort = this.sort;
        this.ngxLoader.stop();
      }, error => {
        setTimeout(() => {
          this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
        }, 800);
        this.ngxLoader.stop();
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRow(id: any) {
    const dialogRef = this.dialog.open(DeleteCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {idCarte: id}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.deleteSelectedCarteJocker(value).subscribe(value1 => {
          this.CarteJocker.getPaginationCarteJockerList(this.etatCarteActuel, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value2 => {
            this.carteJockerList = value2;
            this.dataSource = new MatTableDataSource<CarteJockerDataResponseList>(this.carteJockerList);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
          });
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
    this.CarteJocker.getPaginationCarteJockerList(this.etatCarteActuel, (paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.carteJockerList = value;
      this.dataSource = new MatTableDataSource<CarteJockerDataResponseList>(this.carteJockerList);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
      this.ngxLoader.stop();
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
    const dialogRef = this.dialog.open(ModifyCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {element: this.carteJockerList[i]}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.modifySelectedCarteJocker(value).subscribe(value1 => {
          this.CarteJocker.getPaginationCarteJockerList(this.etatCarteActuel, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value2 => {
            this.carteJockerList = value2;
            this.dataSource = new MatTableDataSource<CarteJockerDataResponseList>(this.carteJockerList);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
          });
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesModificationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModificationMsg);
        });
      }
    });
  }

  redirectToVehicule(i: any) {
    const dialogRef = this.dialog.open(FicheVehiculeComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1100px',
      data: {id: i}
    });
  }

  ajouterNouvelleCarteJocker() {
    const dialogRef = this.dialog.open(NouvelleCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.addNewCarteJocker(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }

  getTotalItems() {
    this.CarteJocker.getTotalNumberCarteJocker().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CarteJocker.getPaginationCarteJockerList(this.etatCarteActuel, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.carteJockerList = value;
      this.dataSource = new MatTableDataSource<CarteJockerDataResponseList>(this.carteJockerList);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }

}
