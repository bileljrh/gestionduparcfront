import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PaginationConfiguration} from '../../pagination-configuration';
import {MatDialog} from '@angular/material/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AdministratifServiceService} from '../administratif-service.service';
import {DeleteVehiculeComponent} from './delete-vehicule/delete-vehicule.component';
import {VehiculeTableData} from './vehicule-table-data';
import {NewVehiculeComponent} from './new-vehicule/new-vehicule.component';
import {ModifyVehiculeComponent} from './modify-vehicule/modify-vehicule.component';
import {AuthenticationServiceService} from '../../../authentication-service.service';


@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.scss'],
  providers: [MatSnackBar]
})
export class VehiculesComponent implements OnInit {
  VIEW_VEHICULE: boolean;
  ADD_VEHICULE: boolean;
  MODIFY_VEHICULE: boolean;
  DELETE_VEHICULE: boolean;
  EtatsCarte: string[] = ['Nan affecté', 'Affecté'];
  displayedColumns: string[] = [];
  ListElement: VehiculeTableData[] = [];
  dataSource = new MatTableDataSource<VehiculeTableData>(this.ListElement);
  @ViewChild(MatSort) sort: MatSort;
  itemPerPage = new FormControl(10);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau vehicule a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouveau vehicule ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le véhicule sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le véhicule sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'Le véhicule sélectionné a été effectué avec succès';
  snackBarFailureModificationMsg = 'Le véhicule sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';

  constructor(private Administratif: AdministratifServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
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
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  deleteRow(i: any) {
    const dialogRef = this.dialog.open(DeleteVehiculeComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.deleteSelectedVehicule(value3).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Administratif.getPaginationVehiculeTableDataList((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElement = value;
      this.dataSource = new MatTableDataSource<VehiculeTableData>(this.ListElement);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  nouveauVehicule() {
    const dialogRef = this.dialog.open(NewVehiculeComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1100px'
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.addNewVehicule(value3.newVehicule).subscribe(value2 => {
          if (value3.image2BeUploaded !== null) {
            this.Administratif.uploadImageCar(value2, value3.image2BeUploaded).subscribe();
          }
          if (value3.documents !== null) {
            value3.documents.forEach(doc => {
              this.Administratif.uploadDocumentCar(value2, doc).subscribe();
            });
          }
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  }

  showNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }

  getTotalItems() {
    this.Administratif.getTotalItemVehiculeTableDataList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.Administratif.getPaginationVehiculeTableDataList(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElement = value;
      this.dataSource = new MatTableDataSource<VehiculeTableData>(this.ListElement);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyVehiculeComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1100px',
      data: {id: this.ListElement[i].id}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.modifySelectedVehicule(value3.modifiedVehicule).subscribe(value2 => {
          if (value3.image2BeUploaded !== null) {
            this.Administratif.uploadImageCar(value2, value3.image2BeUploaded).subscribe();
          }
          if (value3.idDocument2BeDeleted !== null) {
            value3.idDocument2BeDeleted.forEach(id => {
              this.Administratif.deleteSelectedDocument(id).subscribe();
            });
          }
          if (value3.documents !== null) {
            value3.documents.forEach(doc => {
              this.Administratif.uploadDocumentCar(value2, doc).subscribe();
            });
          }
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesModificationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureModificationMsg);
        });
      }
    });
  }

  setDisplayedColumns() {
    this.VIEW_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_VEHICULE;
    this.DELETE_VEHICULE = this.Authentication.authoritiesUtilisateur.DELETE_VEHICULE;
    this.ADD_VEHICULE = this.Authentication.authoritiesUtilisateur.ADD_VEHICULE;
    this.MODIFY_VEHICULE = this.Authentication.authoritiesUtilisateur.MODIFY_VEHICULE;
    if (this.DELETE_VEHICULE) {
      if (this.MODIFY_VEHICULE) {
        this.displayedColumns = ['index', 'numero_plaque', 'marque', 'type', 'genre', 'energie', 'natureAffectation', 'structure', 'beneficiaire', 'etatVehicule', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'numero_plaque', 'marque', 'type', 'genre', 'energie', 'natureAffectation', 'structure', 'beneficiaire', 'etatVehicule', 'supprimer'];
      }
    } else {
      if (this.MODIFY_VEHICULE) {
        this.displayedColumns = ['index', 'numero_plaque', 'marque', 'type', 'genre', 'energie', 'natureAffectation', 'structure', 'beneficiaire', 'etatVehicule', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'numero_plaque', 'marque', 'type', 'genre', 'energie', 'natureAffectation', 'structure', 'beneficiaire', 'etatVehicule'];
      }
    }
  }
}
