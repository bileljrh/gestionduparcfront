import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {AdministratifServiceService} from '../administratif-service.service';
import {AssuranceTableData} from './assurance-table-data';
import {PaginationConfiguration} from '../../pagination-configuration';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DeleteAssuranceComponent} from './delete-assurance/delete-assurance.component';
import {ModifyAssuranceComponent} from './modify-assurance/modify-assurance.component';
import {NouvelleAssuranceComponent} from './nouvelle-assurance/nouvelle-assurance.component';
import {SearchAssuranceComponent} from './search-assurance/search-assurance.component';
import {ModifyVehiculeComponent} from '../vehicules/modify-vehicule/modify-vehicule.component';
import {AuthenticationServiceService} from '../../../authentication-service.service';

export interface ObjDate {
  year: number;
  month: number;
  date: number;
}


@Component({
  selector: 'app-assurances',
  templateUrl: './assurances.component.html',
  styleUrls: ['./assurances.component.scss'],
  providers: [MatSnackBar]
})
export class AssurancesComponent implements OnInit {
  VIEW_ASSURANCE: boolean;
  ADD_ASSURANCE: boolean;
  MODIFY_ASSURANCE: boolean;
  DELETE_ASSURANCE: boolean;
  displayedColumns: string[] = [];
  ListElementTable: AssuranceTableData[] = [];
  dataSource = new MatTableDataSource<AssuranceTableData>(this.ListElementTable);
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
  snackBarSuccesDeleteMsg = 'L\'assurance sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'L\'assurance sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'L\'assurance sélectionnée a été modifiée avec succès';
  snackBarFailureModificationMsg = 'L\'assurance sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'une nouvelle assurance a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle assurance ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
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
    const dialogRef = this.dialog.open(DeleteAssuranceComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.deleteSelectedAssurance(value).subscribe(value1 => {
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
    const dialogRef = this.dialog.open(ModifyAssuranceComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {element: this.ListElementTable[i]}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.modifySelectedAssurance(value).subscribe(value1 => {
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

  nouvelleAssurance() {
    const dialogRef = this.dialog.open(NouvelleAssuranceComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.Administratif.addNewAssurance(value).subscribe(value1 => {
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
    const dialogRef = this.dialog.open(SearchAssuranceComponent, {
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
    this.Administratif.getPaginationAssuranceList((this.paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<AssuranceTableData>(this.ListElementTable);
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
    this.Administratif.getTotalItemAssuranceList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.Administratif.getPaginationAssuranceList(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<AssuranceTableData>(this.ListElementTable);
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
    this.VIEW_ASSURANCE = this.Authentication.authoritiesUtilisateur.VIEW_ASSURANCE;
    this.DELETE_ASSURANCE = this.Authentication.authoritiesUtilisateur.DELETE_ASSURANCE;
    this.ADD_ASSURANCE = this.Authentication.authoritiesUtilisateur.ADD_ASSURANCE;
    this.MODIFY_ASSURANCE = this.Authentication.authoritiesUtilisateur.MODIFY_ASSURANCE;
    if (this.DELETE_ASSURANCE) {
      if (this.MODIFY_ASSURANCE) {
        this.displayedColumns = ['index', 'numeroContrat', 'compagnieAssurance', 'nombreplaces', 'montantAssurance', 'puissanceFiscale', 'dateDebutValidite', 'dateFinValidite', 'datePMC', 'vehicule', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'numeroContrat', 'compagnieAssurance', 'nombreplaces', 'montantAssurance', 'puissanceFiscale', 'dateDebutValidite', 'dateFinValidite', 'datePMC', 'vehicule', 'supprimer'];
      }
    } else {
      if (this.MODIFY_ASSURANCE) {
        this.displayedColumns = ['index', 'numeroContrat', 'compagnieAssurance', 'nombreplaces', 'montantAssurance', 'puissanceFiscale', 'dateDebutValidite', 'dateFinValidite', 'datePMC', 'vehicule', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'numeroContrat', 'compagnieAssurance', 'nombreplaces', 'montantAssurance', 'puissanceFiscale', 'dateDebutValidite', 'dateFinValidite', 'datePMC', 'vehicule'];
      }
    }
  }

}
