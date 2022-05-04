import {Component, OnDestroy, ViewChild} from '@angular/core';
import {GenreVehicule} from '../parametres-vehicules/genre-vehicule/genre-vehicule';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../referentiel-generale-service.service';
import {Fournisseur} from './fournisseur';
import {DeleteFournisseurComponent} from './delete-fournisseur/delete-fournisseur.component';
import {ModificationFournisseurComponent} from './modification-fournisseur/modification-fournisseur.component';
import {NouveauFournisseurComponent} from './nouveau-fournisseur/nouveau-fournisseur.component';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../authentication-service.service';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss'],
  providers: [MatSnackBar]
})
export class FournisseursComponent implements OnDestroy {

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  itemPerPage = new FormControl(null);
  
  VIEW_FOURNISSEURS: boolean;
  ADD_FOURNISSEURS: boolean;
  MODIFY_FOURNISSEURS: boolean;
  DELETE_FOURNISSEURS: boolean;
  displayedColumns: string[] = ['index', 'code', 'designation', 'activite', 'dateAjout', 'supprimer', 'modifier'];
  ListElementTable: Fournisseur[] = [];
  dataSource = new MatTableDataSource<GenreVehicule>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le fournisseur sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le fournisseur sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau fournisseur a été ajouté avec succès';
  snackBarFailureAddingMsg = 'La nouveau fournisseur ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'Le fournisseur sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'Le fournisseur sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  listActivite: string[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Referentiel: ReferentielGeneraleServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.getTotalItems();
    this.ngxLoader.stop();
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
    const dialogRef = this.dialog.open(DeleteFournisseurComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Referentiel.deleteSelectedFournisseur(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        });
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModificationFournisseurComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Referentiel.modifySelectedFournisseur(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        });
      }
    }));
  }

  ajouterNouveauFournisseur() {
    const dialogRef = this.dialog.open(NouveauFournisseurComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Referentiel.addNewFournisseur(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingMsg);
        });
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
    this.subscription.push(this.Referentiel.getListFournisseur(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Fournisseur>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.subscription.push(this.Referentiel.getListFournisseur((paginConfig.currentPage -1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Fournisseur>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));

  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

  setDisplayedColumns() {
    this.VIEW_FOURNISSEURS = this.Authentication.authoritiesUtilisateur.VIEW_FOURNISSEURS;
    this.ADD_FOURNISSEURS = this.Authentication.authoritiesUtilisateur.ADD_FOURNISSEURS;
    this.DELETE_FOURNISSEURS = this.Authentication.authoritiesUtilisateur.DELETE_FOURNISSEURS;
    this.MODIFY_FOURNISSEURS = this.Authentication.authoritiesUtilisateur.MODIFY_FOURNISSEURS;
    if (this.DELETE_FOURNISSEURS) {
      if (this.MODIFY_FOURNISSEURS) {
        this.displayedColumns = ['index', 'code', 'designation', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'supprimer'];
      }
    } else {
      if (this.MODIFY_FOURNISSEURS) {
        this.displayedColumns = ['index', 'code', 'designation', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation'];
      }
    }
  }

}
