import {Component, ViewChild} from '@angular/core';
import {GenreVehicule} from '../genre-vehicule/genre-vehicule';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {DeleteMarqueVehiculeComponent} from './delete-marque-vehicule/delete-marque-vehicule.component';
import {ModificationMarqueVehiculeComponent} from './modification-marque-vehicule/modification-marque-vehicule.component';
import {NouvelleMarqueVehiculeComponent} from './nouvelle-marque-vehicule/nouvelle-marque-vehicule.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-marque-vehicule',
  templateUrl: './marque-vehicule.component.html',
  styleUrls: ['./marque-vehicule.component.scss'],
  providers: [MatSnackBar]
})
export class MarqueVehiculeComponent {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  itemPerPage = new FormControl(null);

  VIEW_MARQUES_VEHICULE: boolean;
  ADD_MARQUES_VEHICULE: boolean;
  MODIFY_MARQUES_VEHICULE: boolean;
  DELETE_MARQUES_VEHICULE: boolean;
  subscription: Subscription[] = [];
  displayedColumns: string[] = [];
  ListElementTable: GenreVehicule[] = [];
  dataSource = new MatTableDataSource<GenreVehicule>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La marque sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La marque sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle marque a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle marque ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'La marque sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'La marque sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';

  constructor(public dialog: MatDialog,private ngxLoader: NgxUiLoaderService, private snackBar: MatSnackBar, private Referentiel: ReferentielGeneraleServiceService, private Authentication: AuthenticationServiceService) {
    this.setDisplayedColumns();
    this.getTotalItems();
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
    const dialogRef = this.dialog.open(DeleteMarqueVehiculeComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.deleteSelectedMarqueVehicule(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModificationMarqueVehiculeComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.modifySelectedMarqueVehicule(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouvelleMarque() {
    const dialogRef = this.dialog.open(NouvelleMarqueVehiculeComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.addNewMarqueVehicule(value3).subscribe(value2 => {
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
    this.subscription.push(this.Referentiel.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<GenreVehicule>(this.ListElementTable);
      this.dataSource.sort = this.sort;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.subscription.push(this.Referentiel.getListMarqueVehicule((paginConfig.currentPage -1).toString(),paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<GenreVehicule>(this.ListElementTable);
      this.dataSource.sort = this.sort;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));

  }
  setDisplayedColumns() {
    this.VIEW_MARQUES_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_MARQUES_VEHICULE;
    this.ADD_MARQUES_VEHICULE = this.Authentication.authoritiesUtilisateur.ADD_MARQUES_VEHICULE;
    this.DELETE_MARQUES_VEHICULE = this.Authentication.authoritiesUtilisateur.DELETE_MARQUES_VEHICULE;
    this.MODIFY_MARQUES_VEHICULE = this.Authentication.authoritiesUtilisateur.MODIFY_MARQUES_VEHICULE;
    if (this.DELETE_MARQUES_VEHICULE) {
      if (this.MODIFY_MARQUES_VEHICULE) {
        this.displayedColumns = ['index', 'code', 'designation', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'supprimer'];
      }
    } else {
      if (this.MODIFY_MARQUES_VEHICULE) {
        this.displayedColumns = ['index', 'code', 'designation', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation'];
      }
    }
  }

}
