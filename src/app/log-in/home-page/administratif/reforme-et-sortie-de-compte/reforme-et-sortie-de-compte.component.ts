import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {PaginationConfiguration} from '../../pagination-configuration';
import {AdministratifServiceService} from '../administratif-service.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {SearchTaxeCirculationComponent} from '../taxe-de-circulation/search-taxe-circulation/search-taxe-circulation.component';
import {ReformeTableData} from './reforme-table-data';
import {DeleteReformeComponent} from './delete-reforme/delete-reforme.component';
import {ModifyReformeComponent} from './modify-reforme/modify-reforme.component';
import {NouvelleReformeComponent} from './nouvelle-reforme/nouvelle-reforme.component';
import {ModifyVehiculeComponent} from '../vehicules/modify-vehicule/modify-vehicule.component';
import {AuthenticationServiceService} from '../../../authentication-service.service';


@Component({
  selector: 'app-reforme-et-sortie-de-compte',
  templateUrl: './reforme-et-sortie-de-compte.component.html',
  styleUrls: ['./reforme-et-sortie-de-compte.component.scss'],
  providers: [MatSnackBar]
})
export class ReformeEtSortieDeCompteComponent implements OnInit {
  VIEW_REFORME: boolean;
  ADD_REFORME: boolean;
  MODIFY_REFORME: boolean;
  DELETE_REFORME: boolean;
  displayedColumns: string[] = [];
  ListElementTable: ReformeTableData[] = [];
  dataSource = new MatTableDataSource<ReformeTableData>(this.ListElementTable);
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
  snackBarSuccesDeleteMsg = 'La réforme sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La réforme sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'La réforme sélectionnée a été modifiée avec succès';
  snackBarFailureModificationMsg = 'La réforme ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'une nouvelle réforme a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle réforme ne pourra pas être affectuée, réessayez de nouveau s\'il vous plait';
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
    const dialogRef = this.dialog.open(DeleteReformeComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.deleteSelectedReforme(value).subscribe(value1 => {
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
    const dialogRef = this.dialog.open(ModifyReformeComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {element: this.ListElementTable[i]}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.modifySelectedReforme(value).subscribe(value1 => {
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

  nouvelleReforme() {
    const dialogRef = this.dialog.open(NouvelleReformeComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.Administratif.addNewReforme(value).subscribe(value1 => {
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
    this.Administratif.getPaginationReformeList((this.paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<ReformeTableData>(this.ListElementTable);
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
    this.Administratif.getTotalItemReformeList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.Administratif.getPaginationReformeList(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<ReformeTableData>(this.ListElementTable);
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
    this.VIEW_REFORME = this.Authentication.authoritiesUtilisateur.VIEW_REFORME;
    this.DELETE_REFORME = this.Authentication.authoritiesUtilisateur.DELETE_REFORME;
    this.ADD_REFORME = this.Authentication.authoritiesUtilisateur.ADD_REFORME;
    this.MODIFY_REFORME = this.Authentication.authoritiesUtilisateur.MODIFY_REFORME;
    if (this.DELETE_REFORME) {
      if (this.MODIFY_REFORME) {
        this.displayedColumns = ['index', 'numeroPlaque', 'structure', 'reference', 'date', 'dateSortie', 'vehicule', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'numeroPlaque', 'structure', 'reference', 'date', 'dateSortie', 'vehicule', 'supprimer'];
      }
    } else {
      if (this.MODIFY_REFORME) {
        this.displayedColumns = ['index', 'numeroPlaque', 'structure', 'reference',  'date', 'dateSortie', 'vehicule', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'numeroPlaque', 'structure', 'reference',  'date', 'dateSortie', 'vehicule'];
      }
    }
  }

}
