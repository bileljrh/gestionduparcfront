import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {DeleteTypeVehiculeComponent} from './delete-type-vehicule/delete-type-vehicule.component';
import {ModificationTypeVehiculeComponent} from './modification-type-vehicule/modification-type-vehicule.component';
import {NouveauTypeVehiculeComponent} from './nouveau-type-vehicule/nouveau-type-vehicule.component';
import {TypeVehicule} from './type-vehicule';
import {TypeMarqueVehicule} from '../type-marque-vehicule';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-type-vehicule',
  templateUrl: './type-vehicule.component.html',
  styleUrls: ['./type-vehicule.component.scss'],
  providers: [MatSnackBar]
})
export class TypeVehiculeComponent implements OnInit, OnDestroy {

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  itemPerPage = new FormControl(null);
  
  VIEW_TYPES_VEHICULE: boolean;
  ADD_TYPES_VEHICULE: boolean;
  MODIFY_TYPES_VEHICULE: boolean;
  DELETE_TYPES_VEHICULE: boolean;
  subscription: Subscription[] = [];
  displayedColumns: string[] = [];
  ListElementTable: TypeVehicule[] = [];
  ListTypeMarque: TypeMarqueVehicule[] = [];
  dataSource = new MatTableDataSource<TypeVehicule>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le type sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le type sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau type a été ajouté avec succès';
  snackBarFailureAddingMsg = 'La nouveau type ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'Le type sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'Le type sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';

  constructor(public dialog: MatDialog,  private ngxLoader: NgxUiLoaderService,private snackBar: MatSnackBar, private Referentiel: ReferentielGeneraleServiceService, private Authentication: AuthenticationServiceService) {
    this.subscription.push(this.Referentiel.getListTypeMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListTypeMarque = value;
    }));
    this.setDisplayedColumns();
    this.getTotalItems();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
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

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRow(i: any) {
    const dialogRef = this.dialog.open(DeleteTypeVehiculeComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.deleteSelectedTypeVehicule(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModificationTypeVehiculeComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id], marque: this.getMarqueVehiculeByTypeId(this.ListElementTable[id].id)}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.modifySelectedTypeVehicule(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouveauType() {
    const dialogRef = this.dialog.open(NouveauTypeVehiculeComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.addNewTypeVehicule(value3, value3.marques.id).subscribe(value2 => {
          this.ListTypeMarque = [];
          this.subscription.push(this.Referentiel.getListTypeMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
            this.ListTypeMarque = value;
          }));
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureAddingMsg);
        }));
      }
    }));
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  getTotalItems() {
    this.subscription.push(this.Referentiel.getListTypeVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<TypeVehicule>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngOnInit();
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.subscription.push(this.Referentiel.getListTypeVehicule((paginConfig.currentPage -1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<TypeVehicule>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngOnInit();
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));

  }
  getMarqueVehiculeByTypeId(id: number): string {
    let marque = '';
    this.ListTypeMarque.forEach(value => {
      if (value.idType === id) {
        marque = value.designationMarque;
      }
    });
    return marque;
  }

  setDisplayedColumns() {
    this.VIEW_TYPES_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_TYPES_VEHICULE;
    this.ADD_TYPES_VEHICULE = this.Authentication.authoritiesUtilisateur.ADD_TYPES_VEHICULE;
    this.DELETE_TYPES_VEHICULE = this.Authentication.authoritiesUtilisateur.DELETE_TYPES_VEHICULE;
    this.MODIFY_TYPES_VEHICULE = this.Authentication.authoritiesUtilisateur.MODIFY_TYPES_VEHICULE;
    if (this.DELETE_TYPES_VEHICULE) {
      if (this.MODIFY_TYPES_VEHICULE) {
        this.displayedColumns = ['index', 'code', 'designation', 'marque', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'supprimer'];
      }
    } else {
      if (this.MODIFY_TYPES_VEHICULE) {
        this.displayedColumns = ['index', 'code', 'designation', 'marque'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation'];
      }
    }
  }

}
