import {Component, OnInit, ViewChild} from '@angular/core';
import {AdministratifServiceService} from '../administratif-service.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PaginationConfiguration} from '../../pagination-configuration';
import {TaxeCirculation} from './taxe-circulation';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DeleteTaxeCirculationComponent} from './delete-taxe-circulation/delete-taxe-circulation.component';
import {ModifyTaxeCirculationComponent} from './modify-taxe-circulation/modify-taxe-circulation.component';
import {NewTaxeDeCirculationComponent} from './new-taxe-de-circulation/new-taxe-de-circulation.component';
import {SearchTaxeCirculationComponent} from './search-taxe-circulation/search-taxe-circulation.component';
import {FormControl} from '@angular/forms';
import {TaxeCirculationTableData} from './taxe-circulation-table-data';
import {ModifyVehiculeComponent} from '../vehicules/modify-vehicule/modify-vehicule.component';
import {AuthenticationServiceService} from '../../../authentication-service.service';


@Component({
  selector: 'app-taxe-de-circulation',
  templateUrl: './taxe-de-circulation.component.html',
  styleUrls: ['./taxe-de-circulation.component.scss'],
  providers: [MatSnackBar]
})
export class TaxeDeCirculationComponent implements OnInit {
  VIEW_TAXE_CIRCULATION: boolean;
  ADD_TAXE_CIRCULATION: boolean;
  MODIFY_TAXE_CIRCULATION: boolean;
  DELETE_TAXE_CIRCULATION: boolean;
  displayedColumns: string[] = [];
  ListElementTable: TaxeCirculationTableData[] = [];
  dataSource = new MatTableDataSource<TaxeCirculation>(this.ListElementTable);
  @ViewChild(MatSort) sort: MatSort;
  itemPerPageControl = new FormControl(10);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La taxe de circulation sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La taxe de circulation sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'La taxe de circulation sélectionnée a été modifiée avec succès';
  snackBarFailureModificationMsg = 'La taxe de circulation sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'une nouvelle taxe de circulation a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle taxe de circulation ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  itemPerPage = new FormControl(10);

  constructor(private Administratif: AdministratifServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.getTotalItems();
    this.ngxLoader.stop();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRow(i: number) {
    const dialogRef = this.dialog.open(DeleteTaxeCirculationComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.deleteSelectedTaxeCirculation(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        });
        this.ngxLoader.stop();
      }
    });
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyTaxeCirculationComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {element: this.ListElementTable[i]}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.modifySelectedTaxeCirculation(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesModificationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModificationMsg);
        });
        this.ngxLoader.stop();
      }
    });
  }

  nouvelleTaxeCirculation() {
    const dialogRef = this.dialog.open(NewTaxeDeCirculationComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.Administratif.addNewTaxeCirculation(value.newTaxeCirculation, value.id).subscribe(value1 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesAddingMsg);
          this.ngxLoader.stop();
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  }

  searchTaxeCirculation() {
    const dialogRef = this.dialog.open(SearchTaxeCirculationComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
      }
    });
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Administratif.getPaginationTaxeCirculationList((this.paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<TaxeCirculationTableData>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
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

  getTotalItems() {
    this.Administratif.getTotalItemTaxeCirculationList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.Administratif.getPaginationTaxeCirculationList(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<TaxeCirculationTableData>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }

  ngOnInit(): void {
    this.itemPerPageControl.valueChanges.subscribe(value1 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value1;
      this.getTotalItems();
      this.ngxLoader.stop();
    });

  }

  setDisplayedColumns() {
    this.VIEW_TAXE_CIRCULATION = this.Authentication.authoritiesUtilisateur.VIEW_TAXE_CIRCULATION;
    this.DELETE_TAXE_CIRCULATION = this.Authentication.authoritiesUtilisateur.DELETE_TAXE_CIRCULATION;
    this.ADD_TAXE_CIRCULATION = this.Authentication.authoritiesUtilisateur.ADD_TAXE_CIRCULATION;
    this.MODIFY_TAXE_CIRCULATION = this.Authentication.authoritiesUtilisateur.MODIFY_TAXE_CIRCULATION;
    if (this.DELETE_TAXE_CIRCULATION) {
      if (this.MODIFY_TAXE_CIRCULATION) {
        this.displayedColumns = ['index', 'numeroQuittance', 'numeroPlaque', 'dateDebutCirculation', 'dateFinCirculation', 'dateFinValidite', 'montant', 'vehicule', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'numeroQuittance', 'numeroPlaque', 'dateDebutCirculation', 'dateFinCirculation', 'dateFinValidite', 'montant', 'vehicule', 'supprimer'];
      }
    } else {
      if (this.MODIFY_TAXE_CIRCULATION) {
        this.displayedColumns = ['index', 'numeroQuittance', 'numeroPlaque', 'dateDebutCirculation', 'dateFinCirculation', 'dateFinValidite', 'montant', 'vehicule', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'numeroQuittance', 'numeroPlaque', 'dateDebutCirculation', 'dateFinCirculation', 'dateFinValidite', 'montant', 'vehicule'];
      }
    }
  }

}
