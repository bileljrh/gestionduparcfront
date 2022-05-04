import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DeleteEnergieComponent} from './delete-energie/delete-energie.component';
import {ModifyEnergieComponent} from './modify-energie/modify-energie.component';
import {NewEnergieComponent} from './new-energie/new-energie.component';
import {Energie} from './energie';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';
import { FormControl } from '@angular/forms';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-energie',
  templateUrl: './energie.component.html',
  styleUrls: ['./energie.component.scss']
})
export class EnergieComponent implements OnInit, OnDestroy {
  VIEW_ENERGIES: boolean;
  ADD_ENERGIES: boolean;
  MODIFY_ENERGIES: boolean;
  DELETE_ENERGIES: boolean;
  subscription: Subscription[] = [];
  displayedColumns: string[] = [];
  ListElementTable: Energie[] = [];
  itemPerPageForm = new FormControl(null);
  dataSource = new MatTableDataSource<Energie>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'énergie sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'L\'énergie sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle énergie a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle énergie ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'L\'énergie sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'L\'énergie sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
 
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

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
    const dialogRef = this.dialog.open(DeleteEnergieComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedEnergie(value3).subscribe(value2 => {
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

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Referentiel.getPaginationListEnergies((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Energie>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }


  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModifyEnergieComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.modifySelectedEnergie(value3).subscribe(value2 => {
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

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  ajouterNouvelleEnergie() {
    const dialogRef = this.dialog.open(NewEnergieComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewEnergie(value3).subscribe(value2 => {
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

  getTotalItems() {

    this.subscription.push(this.Referentiel.getPaginationListEnergies(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Energie>(this.ListElementTable);
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
    this.VIEW_ENERGIES = this.Authentication.authoritiesUtilisateur.VIEW_ENERGIES;
    this.ADD_ENERGIES = this.Authentication.authoritiesUtilisateur.ADD_ENERGIES;
    this.DELETE_ENERGIES = this.Authentication.authoritiesUtilisateur.DELETE_ENERGIES;
    this.MODIFY_ENERGIES = this.Authentication.authoritiesUtilisateur.MODIFY_ENERGIES;
    if (this.DELETE_ENERGIES) {
      if (this.MODIFY_ENERGIES) {
        this.displayedColumns = ['index', 'code', 'description', 'prixUnitaire', 'tva', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'description', 'prixUnitaire', 'tva', 'supprimer'];
      }
    } else {
      if (this.MODIFY_ENERGIES) {
        this.displayedColumns = ['index', 'code', 'description', 'prixUnitaire', 'tva', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'description', 'prixUnitaire', 'tva'];
      }
    }
  }

}
