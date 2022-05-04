import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {EtatStock} from './etat-stock';
import {ReferentielSpecifiqueServiceService} from '../referentiel-specifique-service.service';
import {DeleteEtatStockComponent} from './delete-etat-stock/delete-etat-stock.component';
import {ModifyEtatStockComponent} from './modify-etat-stock/modify-etat-stock.component';
import {NewEtatStockComponent} from './new-etat-stock/new-etat-stock.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../authentication-service.service';
import { FormControl } from '@angular/forms';
import { PaginationConfiguration } from '../../../pagination-configuration';

@Component({
  selector: 'app-etat-stock',
  templateUrl: './etat-stock.component.html',
  styleUrls: ['./etat-stock.component.scss'],
  providers: [MatSnackBar]
})
export class EtatStockComponent implements OnInit, OnDestroy {

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  itemPerPage = new FormControl(null);


  VIEW_ETATS_STOCK: boolean;
  ADD_ETATS_STOCK: boolean;
  MODIFY_ETATS_STOCK: boolean;
  DELETE_ETATS_STOCK: boolean;
  subscription: Subscription[] = [];
  displayedColumns: string[] = [];
  ListElementTable: EtatStock[] = [];
  dataSource = new MatTableDataSource<EtatStock>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'état de stock sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'L\'état de stock sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau état de stock a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouveau état de stock ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'L\'état de stock sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'L\'état de stock sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Referentiel: ReferentielSpecifiqueServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
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
    const dialogRef = this.dialog.open(DeleteEtatStockComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedEtatStock(value3).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModifyEtatStockComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.modifySelectedEtatStock(value3).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouveauEtat() {
    const dialogRef = this.dialog.open(NewEtatStockComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewEtatStock(value3).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
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
    this.subscription.push(this.Referentiel.getListEtatStock(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<EtatStock>(this.ListElementTable);
      this.dataSource.sort = this.sort;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.subscription.push(this.Referentiel.getListEtatStock((paginConfig.currentPage - 1).toString(),paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<EtatStock>(this.ListElementTable);
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
    this.VIEW_ETATS_STOCK = this.Authentication.authoritiesUtilisateur.VIEW_ETATS_STOCK;
    this.ADD_ETATS_STOCK = this.Authentication.authoritiesUtilisateur.ADD_ETATS_STOCK;
    this.DELETE_ETATS_STOCK = this.Authentication.authoritiesUtilisateur.DELETE_ETATS_STOCK;
    this.MODIFY_ETATS_STOCK = this.Authentication.authoritiesUtilisateur.MODIFY_ETATS_STOCK;
    if (this.DELETE_ETATS_STOCK) {
      if (this.MODIFY_ETATS_STOCK) {
        this.displayedColumns = ['index', 'article', 'time', 'chapitre', 'region', 'paragraphe', 'sousParagraphe', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'article', 'time', 'chapitre', 'region', 'paragraphe', 'sousParagraphe', 'supprimer'];
      }
    } else {
      if (this.MODIFY_ETATS_STOCK) {
        this.displayedColumns = ['index', 'article', 'time', 'chapitre', 'region', 'paragraphe', 'sousParagraphe', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'article', 'time', 'chapitre', 'region', 'paragraphe', 'sousParagraphe'];
      }
    }
  }

}
