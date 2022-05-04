

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Gouvernorat} from '../gouvernorat';
import {NewGouvernoratComponent} from './new-gouvernorat/new-gouvernorat.component';
import {ModifyGouvernoratComponent} from './modify-gouvernorat/modify-gouvernorat.component';
import {DeleteGouvernoratComponent} from './delete-gouvernorat/delete-gouvernorat.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';
import { FormControl } from '@angular/forms';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-gouvernorat',
  templateUrl: './gouvernorat.component.html',
  styleUrls: ['./gouvernorat.component.scss'],
  providers: [MatSnackBar]
})
export class GouvernoratComponent implements OnInit, OnDestroy {
  VIEW_GOUVERNORATS: boolean;
  ADD_GOUVERNORATS: boolean;
  MODIFY_GOUVERNORATS: boolean;
  DELETE_GOUVERNORATS: boolean;
  displayedColumns: string[] = [];
  ListElementTable: Gouvernorat[] = [];
  itemPerPageForm = new FormControl();
  dataSource = new MatTableDataSource<Gouvernorat>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le gouvernorat sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le gouvernorat sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau gouvernorat a été ajouté avec succès';
  snackBarFailureAddingMsg = 'La nouveau gouvernorat ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'Le gouvernorat sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'Le gouvernorat sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  subscription: Subscription[] = [];


  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Referentiel: ReferentielGeneraleServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.getTotalItems();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.subscription.push(this.itemPerPageForm.valueChanges.subscribe(value1 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value1;
      this.getTotalItems();
      this.ngxLoader.stop();
    }));
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
    const dialogRef = this.dialog.open(DeleteGouvernoratComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedGouvernorat(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModifyGouvernoratComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.modifySelectedGouvernorat(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouveauGouvernorat() {
    const dialogRef = this.dialog.open(NewGouvernoratComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewGouvernorat(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingMsg);
        }));
      }
    }));
  }

  getTotalItems() {
    
    this.subscription.push(this.Referentiel.getPaginationListGouvernorat(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Gouvernorat>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => { 
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
   
  }

  ngOnDestroy() {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

  setDisplayedColumns() {
    this.VIEW_GOUVERNORATS = this.Authentication.authoritiesUtilisateur.VIEW_GOUVERNORATS;
    this.ADD_GOUVERNORATS = this.Authentication.authoritiesUtilisateur.ADD_GOUVERNORATS;
    this.DELETE_GOUVERNORATS = this.Authentication.authoritiesUtilisateur.DELETE_GOUVERNORATS;
    this.MODIFY_GOUVERNORATS = this.Authentication.authoritiesUtilisateur.MODIFY_GOUVERNORATS;
    if (this.DELETE_GOUVERNORATS) {
      if (this.MODIFY_GOUVERNORATS) {
        this.displayedColumns = ['index', 'code', 'designation', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'supprimer'];
      }
    } else {
      if (this.MODIFY_GOUVERNORATS) {
        this.displayedColumns = ['index', 'code', 'designation', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation'];
      }
    }
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.subscription.push(this.Referentiel.getPaginationListGouvernorat((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Gouvernorat>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
}

