import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PaginationConfiguration} from '../../../pagination-configuration';
import {FormControl} from '@angular/forms';
import {NewCarteAgilisCashComponent} from './new-carte-agilis-cash/new-carte-agilis-cash.component';
import {CarteAgilisCashServiceService} from '../../carte-agilis-cash/carte-agilis-cash-service.service';
import {DeleteCarteAgilisCashComponent} from './delete-carte-agilis-cash/delete-carte-agilis-cash.component';
import {FicheVehiculeComponent} from '../../../administratif/vehicules/fiche-vehicule/fiche-vehicule.component';
import {CarteAgilisCashTabData} from '../../carte-agilis-cash/carte-agilis-cash-tab-data';
import {ModifyCarteAgilisCashComponent} from './modify-carte-agilis-cash/modify-carte-agilis-cash.component';
import {ModifyVehiculeComponent} from '../../../administratif/vehicules/modify-vehicule/modify-vehicule.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';


@Component({
  selector: 'app-gestion-carte-agilis-cash',
  templateUrl: './gestion-carte-agilis-cash.component.html',
  styleUrls: ['./gestion-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class GestionCarteAgilisCashComponent implements OnInit {

  displayedColumns: string[] = ['index', 'numeroCarte', 'numeroPlaque', 'montant', 'typeCarburant', 'dateFinValidite', 'vehicule', 'modifier', 'supprimer'];
  carteAgilisCashTabData: CarteAgilisCashTabData[] = [];
  dataSource = new MatTableDataSource<CarteAgilisCashTabData>(this.carteAgilisCashTabData);


  
  VIEW_AGILIS_CASH:boolean;
  ADD_AGILIS_CASH:boolean;
  MODIFY_AGILIS_CASH:boolean;
  DELETE_AGILIS_CASH:boolean;
  VEHICULE_AGILIS_CASH:boolean;
  setDisplayedColumns() {
    this.MODIFY_AGILIS_CASH= this.Authentication.authoritiesUtilisateur.MODIFY_AGILIS_CASH;
    this.DELETE_AGILIS_CASH = this.Authentication.authoritiesUtilisateur.DELETE_AGILIS_CASH;
    this.VIEW_AGILIS_CASH = this.Authentication.authoritiesUtilisateur.VIEW_AGILIS_CASH;
    this.ADD_AGILIS_CASH = this.Authentication.authoritiesUtilisateur.ADD_AGILIS_CASH;
    this.VEHICULE_AGILIS_CASH = this.Authentication.authoritiesUtilisateur.VEHICULE_AGILIS_CASH;

}
  @ViewChild(MatSort) sort: MatSort;
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  typeCarburantForm = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  itemPerPage = new FormControl(null);
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'la carte Agilis Cash sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la carte Agilis Cash sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'la nouvelle carte Agilis Cash a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'la nouvelle carte Agilis Cash ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'la carte Agilis Cash sélectionnée a été modifiée avec succès';
  snackBarFailureModificationMsg = 'la carte Agilis Cash sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';

  selectedTypeCarburant = 'tousTypes';

  constructor(private Authentication: AuthenticationServiceService,private CarteAgilisCash: CarteAgilisCashServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.ngxLoader.stop();
    this.setDisplayedColumns();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.typeCarburantForm.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.selectedTypeCarburant = 'tousTypes';
      } else {
        this.selectedTypeCarburant = value;
      }
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.getTotalItems();
    });
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
    });
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyCarteAgilisCashComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1100px',
      data: {element: this.carteAgilisCashTabData[i]}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteAgilisCash.modifySelectedCarteAgilisCash(value3).subscribe(value2 => {
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

  deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeleteCarteAgilisCashComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteAgilisCash.deleteSelectedCarteAgilisCash(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteMsg);
          this.getTotalItems();
        });
        
        
      }
    });
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.CarteAgilisCash.getPaginationListCarteAgilisCashByTypeCarburant(this.selectedTypeCarburant, (paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.carteAgilisCashTabData = value;
      this.dataSource = new MatTableDataSource<CarteAgilisCashTabData>(this.carteAgilisCashTabData);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }

  redirectToVehicule(i: number) {
    const dialogRef = this.dialog.open(ModifyVehiculeComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1100px',
      data: {id: i}
    });
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  redirect2Vehicule(idVehicule: any) {
    const dialogRef = this.dialog.open(FicheVehiculeComponent, {
      width: '1100px',
      panelClass: 'mat-dialog-container-class',
      data: {id: idVehicule}
    });
  }

  ajouterNouvelleCarteAgilisCash() {
    const dialogRef = this.dialog.open(NewCarteAgilisCashComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.createNewCarteAgilisCash(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

  getTotalItems() {
    this.CarteAgilisCash.getTotalNumberListCarteAgilisCashByTypeCarburant(this.selectedTypeCarburant).subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CarteAgilisCash.getPaginationListCarteAgilisCashByTypeCarburant(this.selectedTypeCarburant, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.carteAgilisCashTabData = value;
      this.dataSource = new MatTableDataSource<CarteAgilisCashTabData>(this.carteAgilisCashTabData);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }


}
