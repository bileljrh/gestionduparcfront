import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GenreVehicule} from './genre-vehicule';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {DeleteGenreVehiculeComponent} from './delete-genre-vehicule/delete-genre-vehicule.component';
import {ModificationGenreVehiculeComponent} from './modification-genre-vehicule/modification-genre-vehicule.component';
import {NouveauGenreVehiculeComponent} from './nouveau-genre-vehicule/nouveau-genre-vehicule.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-genre-vehicule',
  templateUrl: './genre-vehicule.component.html',
  styleUrls: ['./genre-vehicule.component.scss'],
  providers: [MatSnackBar]
})
export class GenreVehiculeComponent implements OnInit, OnDestroy {

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  itemPerPage = new FormControl(null);

  VIEW_GENRES_VEHICULE: boolean;
  ADD_GENRES_VEHICULE: boolean;
  MODIFY_GENRES_VEHICULE: boolean;
  DELETE_GENRES_VEHICULE: boolean;
  displayedColumns: string[] = [];
  ListElementTable: GenreVehicule[] = [];
  dataSource = new MatTableDataSource<GenreVehicule>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le genre sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le genre sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau genre a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouveau genre ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'Le genre sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'Le genre sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';

  constructor(public dialog: MatDialog, private ngxLoader: NgxUiLoaderService, private snackBar: MatSnackBar, private Referentiel: ReferentielGeneraleServiceService, private Authentication: AuthenticationServiceService) {
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
    const dialogRef = this.dialog.open(DeleteGenreVehiculeComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.deleteSelectedGenreVehicule(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModificationGenreVehiculeComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.modifySelectedGenreVehicule(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouveauGenre() {
    const dialogRef = this.dialog.open(NouveauGenreVehiculeComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.addNewGenreVehicule(value3).subscribe(value2 => {
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
    this.subscription.push(this.Referentiel.getListGenreVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<GenreVehicule>(this.ListElementTable);
      this.dataSource.sort = this.sort;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.subscription.push(this.Referentiel.getListGenreVehicule((paginConfig.currentPage -1).toString(),paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<GenreVehicule>(this.ListElementTable);
      this.dataSource.sort = this.sort;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));

  }
  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

  setDisplayedColumns() {
    this.VIEW_GENRES_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_GENRES_VEHICULE;
    this.ADD_GENRES_VEHICULE = this.Authentication.authoritiesUtilisateur.ADD_GENRES_VEHICULE;
    this.DELETE_GENRES_VEHICULE = this.Authentication.authoritiesUtilisateur.DELETE_GENRES_VEHICULE;
    this.MODIFY_GENRES_VEHICULE = this.Authentication.authoritiesUtilisateur.MODIFY_GENRES_VEHICULE;
    if (this.DELETE_GENRES_VEHICULE) {
      if (this.MODIFY_GENRES_VEHICULE) {
        this.displayedColumns = ['index', 'code', 'designation', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'supprimer'];
      }
    } else {
      if (this.MODIFY_GENRES_VEHICULE) {
        this.displayedColumns = ['index', 'code', 'designation', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation'];
      }
    }
  }

}
