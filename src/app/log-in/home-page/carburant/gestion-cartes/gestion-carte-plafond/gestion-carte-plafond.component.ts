import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PaginationConfiguration} from '../../../pagination-configuration';
import {FormControl} from '@angular/forms';
import {CartePlafondServiceService} from '../../carte-plafond/carte-plafond-service.service';
import {NouvelleCartePlafondComponent} from './nouvelle-carte-plafond/nouvelle-carte-plafond.component';
import {ModifyCartePlafondComponent} from './modify-carte-plafond/modify-carte-plafond.component';
import {DeleteCartePlafondComponent} from './delete-carte-plafond/delete-carte-plafond.component';
import {CartePlafondTabData} from './carte-plafond-tab-data';
import {ModifyVehiculeComponent} from '../../../administratif/vehicules/modify-vehicule/modify-vehicule.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-gestion-carte-plafond',
  templateUrl: './gestion-carte-plafond.component.html',
  styleUrls: ['./gestion-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class GestionCartePlafondComponent implements OnInit {
  //displayedColumns: string[] = ['index', 'numeroCarte', 'numeroPlaque', 'montant', 'typeCarburant', 'dateFinValidite', 'vehicule', 'modifier', 'supprimer'];
  displayedColumns: string[] = ['index', 'numeroCarte',  'montant',  'dateFinValidite','status', 'modifier', 'supprimer'];
  cartePlafondTabData: CartePlafondTabData[] = [];
  dataSource = new MatTableDataSource<CartePlafondTabData>(this.cartePlafondTabData);
  @ViewChild(MatSort) sort: MatSort;
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  TypeCarburantForm = new FormControl(null);
  itemPerPage = new FormControl(null);
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle carte vehicule a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle carte ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La carte sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La carte sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'La carte sélectionnée a été modifiée avec succès';
  snackBarFailureModificationMsg = 'La carte sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  typeCarburant = 'tousTypes';

  constructor( private Authentication: AuthenticationServiceService, private CartePlafond: CartePlafondServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
  }
  VIEW_CARTE_PLAFOND:boolean;
  MODIFY_CARTE_PLAFOND:boolean;
  DELETE_CARTE_PLAFOND:boolean;
  ADD_CARTE_PLAFOND:boolean;
  
  setDisplayedColumns() {
    this.VIEW_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.VIEW_CARTE_PLAFOND;

    this.MODIFY_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.MODIFY_CARTE_PLAFOND;

    this.DELETE_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.DELETE_CARTE_PLAFOND;

    this.ADD_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.ADD_CARTE_PLAFOND;
  
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.TypeCarburantForm.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.typeCarburant = 'tousTypes';
      } else {
        this.typeCarburant = value;
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

  ajouterNouvelleCartePlafond() {
    const dialogRef = this.dialog.open(NouvelleCartePlafondComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CartePlafond.createNewCartePlafond(value).subscribe(value2 => {
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

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyCartePlafondComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.cartePlafondTabData[i]}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CartePlafond.modifySelectedCartePlafond(value).subscribe(value2 => {
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

  redirectToVehicule(i: number) {
    const dialogRef = this.dialog.open(ModifyVehiculeComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1100px',
      data: {id: i}
    });
  }

  deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeleteCartePlafondComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CartePlafond.deleteSelectedCartePlafond(value).subscribe(value2 => {
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
    this.CartePlafond.getPaginationListCartePlafondByTypeCarburant(this.typeCarburant, (paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.cartePlafondTabData = value;
      this.dataSource = new MatTableDataSource<CartePlafondTabData>(this.cartePlafondTabData);
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

  getTotalItems() {
    this.CartePlafond.getTotalNumberListCartePlafondByTypeCarburant(this.typeCarburant).subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CartePlafond.getPaginationListCartePlafondByTypeCarburant(this.typeCarburant, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.cartePlafondTabData = value;
      this.dataSource = new MatTableDataSource<CartePlafondTabData>(this.cartePlafondTabData);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

}
