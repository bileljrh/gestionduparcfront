import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {PaginationConfiguration} from '../../pagination-configuration';
import {AdministratifServiceService} from '../administratif-service.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ModifyVehiculeComponent} from '../vehicules/modify-vehicule/modify-vehicule.component';
import {GpsTableData} from './gps-table-data';
import {DeleteGPSComponent} from './delete-gps/delete-gps.component';
import {ModifyGPSComponent} from './modify-gps/modify-gps.component';
import {NewGPSComponent} from './new-gps/new-gps.component';
import {AuthenticationServiceService} from '../../../authentication-service.service';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss'],
  providers: [MatSnackBar]
})
export class GpsComponent implements OnInit {
  VIEW_GPS: boolean;
  DELETE_GPS: boolean;
  ADD_GPS: boolean;
  MODIFY_GPS: boolean;

  displayedColumns: string[] = [];
  ListElementTable: GpsTableData[] = [];
  dataSource = new MatTableDataSource<GpsTableData>(this.ListElementTable);
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
  snackBarSuccesDeleteMsg = 'Le GPS sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le GPS sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'Le GPS sélectionné a été modifié avec succès';
  snackBarFailureModificationMsg = 'Le GPS sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'un nouveau GPS a été ajouté avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'un nouveau GPS ne pourra pas être affectué, réessayez de nouveau s\'il vous plait';
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
    const dialogRef = this.dialog.open(DeleteGPSComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.deleteSelectedGPS(value).subscribe(value1 => {
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
    const dialogRef = this.dialog.open(ModifyGPSComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {element: this.ListElementTable[i]}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.modifySelectedGPS(value).subscribe(value1 => {
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

  nouveauGPS() {
    const dialogRef = this.dialog.open(NewGPSComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.Administratif.addNewGPS(value.gps, value.id).subscribe(value1 => {
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
    this.Administratif.getPaginationGPSList((this.paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<GpsTableData>(this.ListElementTable);
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
    this.Administratif.getTotalItemGPSList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.Administratif.getPaginationGPSList(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<GpsTableData>(this.ListElementTable);
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
    this.VIEW_GPS = this.Authentication.authoritiesUtilisateur.VIEW_GPS;
    this.DELETE_GPS = this.Authentication.authoritiesUtilisateur.DELETE_GPS;
    this.ADD_GPS = this.Authentication.authoritiesUtilisateur.ADD_GPS;
    this.MODIFY_GPS = this.Authentication.authoritiesUtilisateur.MODIFY_GPS;
    if (this.DELETE_GPS) {
      if (this.MODIFY_GPS) {
        this.displayedColumns = ['index', 'numeroPlaque', 'structure', 'codeIMEI', 'vehicule', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'numeroPlaque', 'structure', 'codeIMEI', 'vehicule', 'supprimer'];
      }
    } else {
      if (this.MODIFY_GPS) {
        this.displayedColumns = ['index', 'numeroPlaque', 'structure', 'codeIMEI', 'vehicule', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'numeroPlaque', 'structure', 'codeIMEI', 'vehicule'];
      }
    }
  }


}
