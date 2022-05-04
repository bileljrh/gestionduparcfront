import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {FamilleOperationReparation} from './famille-operation-reparation';
import {NouvelleFamilleOperationReparationComponent} from './nouvelle-famille-operation-reparation/nouvelle-famille-operation-reparation.component';
import {ModificationFamilleOperationReparationComponent} from './modification-famille-operation-reparation/modification-famille-operation-reparation.component';
import {DeleteFamilleOperationReparationComponent} from './delete-famille-operation-reparation/delete-famille-operation-reparation.component';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-famille-operation-reparation',
  templateUrl: './famille-operation-reparation.component.html',
  styleUrls: ['./famille-operation-reparation.component.scss'],
  providers: [MatSnackBar]
})
export class FamilleOperationReparationComponent implements OnInit, OnDestroy {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  itemPerPage = new FormControl(null);


  
  VIEW_FAMILLES_OPERATIONS_REPARATION: boolean;
  ADD_FAMILLES_OPERATIONS_REPARATION: boolean;
  MODIFY_FAMILLES_OPERATIONS_REPARATION: boolean;
  DELETE_FAMILLES_OPERATIONS_REPARATION: boolean;
  displayedColumns: string[] = [];
  ListElementTable: FamilleOperationReparation[] = [];
  dataSource = new MatTableDataSource<FamilleOperationReparation>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La famille d\'opération de réparation sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La famille d\'opération de réparation sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle famille d\'opération de réparation a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La famille d\'opération de réparation ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'La famille d\'opération de réparation a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'La famille d\'opération de réparation ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  subscription: Subscription[] = [];

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
    const dialogRef = this.dialog.open(DeleteFamilleOperationReparationComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Referentiel.deleteSelectedFamilleOperationReparation(value3).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        });
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModificationFamilleOperationReparationComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.modifySelectedFamilleOperationReparation(value3).subscribe(value2 => {
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

  ajouterNouvelleFamille() {
    const dialogRef = this.dialog.open(NouvelleFamilleOperationReparationComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Referentiel.addNewFamilleOperationReparation(value3).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
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
    this.subscription.push(this.Referentiel.getListFamilleOperationReparation(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<FamilleOperationReparation>(this.ListElementTable);
      this.dataSource.sort = this.sort;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.subscription.push(this.Referentiel.getListFamilleOperationReparation((paginConfig.currentPage - 1).toString(),paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<FamilleOperationReparation>(this.ListElementTable);
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
    this.VIEW_FAMILLES_OPERATIONS_REPARATION = this.Authentication.authoritiesUtilisateur.VIEW_FAMILLES_OPERATIONS_REPARATION;
    this.ADD_FAMILLES_OPERATIONS_REPARATION = this.Authentication.authoritiesUtilisateur.ADD_FAMILLES_OPERATIONS_REPARATION;
    this.DELETE_FAMILLES_OPERATIONS_REPARATION = this.Authentication.authoritiesUtilisateur.DELETE_FAMILLES_OPERATIONS_REPARATION;
    this.MODIFY_FAMILLES_OPERATIONS_REPARATION = this.Authentication.authoritiesUtilisateur.MODIFY_FAMILLES_OPERATIONS_REPARATION;
    if (this.DELETE_FAMILLES_OPERATIONS_REPARATION) {
      if (this.MODIFY_FAMILLES_OPERATIONS_REPARATION) {
        this.displayedColumns = ['index', 'code', 'designation', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'supprimer'];
      }
    } else {
      if (this.MODIFY_FAMILLES_OPERATIONS_REPARATION) {
        this.displayedColumns = ['index', 'code', 'designation', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation'];
      }
    }
  }

}
