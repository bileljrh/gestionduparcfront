import {Component, OnDestroy, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {OperationReparation} from './operation-reparation';
import {DeleteOperationReparationComponent} from './delete-operation-reparation/delete-operation-reparation.component';
import {ModificationOperationReparationComponent} from './modification-operation-reparation/modification-operation-reparation.component';
import {NouvelleOperationReparationComponent} from './nouvelle-operation-reparation/nouvelle-operation-reparation.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-liste-operation-reparation',
  templateUrl: './liste-operation-reparation.component.html',
  styleUrls: ['./liste-operation-reparation.component.scss'],
  providers: [MatSnackBar]
})
export class ListeOperationReparationComponent implements OnDestroy {

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  itemPerPage = new FormControl(null);



  VIEW_OPERATIONS_REPARATION: boolean;
  ADD_OPERATIONS_REPARATION: boolean;
  MODIFY_OPERATIONS_REPARATION: boolean;
  DELETE_OPERATIONS_REPARATION: boolean;
  subscription: Subscription[] = [];
  displayedColumns: string[] = [];
  ListElementTable: OperationReparation[] = [];
  dataSource = new MatTableDataSource<OperationReparation>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'opération de réparation sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'L\'opération de réparation sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle opération de réparation a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle opération de réparation ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'L\'opération de réparation a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'L\'opération de réparation ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';


  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService,private Referentiel: ReferentielGeneraleServiceService, private Authentication: AuthenticationServiceService) {
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
    const dialogRef = this.dialog.open(DeleteOperationReparationComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.deleteSelectedOperationReparation(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModificationOperationReparationComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.modifySelectedOperationReparation(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouvelleOperation() {
    const dialogRef = this.dialog.open(NouvelleOperationReparationComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.addNewOperationReparation(value3).subscribe(value2 => {
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
    this.subscription.push(this.Referentiel.getListOperationReparation(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<OperationReparation>(this.ListElementTable);
      this.dataSource.sort = this.sort;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.subscription.push(this.Referentiel.getListOperationReparation((paginConfig.currentPage - 1).toString(),paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<OperationReparation>(this.ListElementTable);
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
    this.VIEW_OPERATIONS_REPARATION = this.Authentication.authoritiesUtilisateur.VIEW_OPERATIONS_REPARATION;
    this.ADD_OPERATIONS_REPARATION = this.Authentication.authoritiesUtilisateur.ADD_OPERATIONS_REPARATION;
    this.DELETE_OPERATIONS_REPARATION = this.Authentication.authoritiesUtilisateur.DELETE_OPERATIONS_REPARATION;
    this.MODIFY_OPERATIONS_REPARATION = this.Authentication.authoritiesUtilisateur.MODIFY_OPERATIONS_REPARATION;
    if (this.DELETE_OPERATIONS_REPARATION) {
      if (this.MODIFY_OPERATIONS_REPARATION) {
        this.displayedColumns = ['index', 'code', 'designation', 'famille', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'famille', 'supprimer'];
      }
    } else {
      if (this.MODIFY_OPERATIONS_REPARATION) {
        this.displayedColumns = ['index', 'code', 'designation', 'famille', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'famille'];
      }
    }
  }


}
