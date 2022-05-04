import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { PaginationConfiguration } from '../../pagination-configuration';
import { BonTravail } from '../gestion-bon-travail/bon-travail';
import { ModifyBonTravailComponent } from '../gestion-bon-travail/modify-bon-travail/modify-bon-travail.component';
import { MaintenanceAndReparationServiceService } from '../maintenance-and-reparation-service.service';
import { DateSortieVehiculeComponent } from './date-sortie-vehicule/date-sortie-vehicule.component';
import { ReouvrirBontravailCloturerComponent } from './reouvrir-bontravail-cloturer/reouvrir-bontravail-cloturer.component';

export interface sortVh {
  nBonTravail: string;
  parc: string;
  dateEntree: string;
  vehicule: string;
  dateSortie: string;
  modifier: any;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


@Component({
  selector: 'app-sortie-des-vehicules',
  templateUrl: './sortie-des-vehicules.component.html',
  styleUrls: ['./sortie-des-vehicules.component.scss'],
  providers: [MatSnackBar]
})
export class SortieDesVehiculesComponent implements OnInit {
 
  ListBonTravail: BonTravail[] = [];
  displayedColumns: string[] = ['index', 'parc',  'dateEntree','vehicule', 'dateSortie','etat','reouvrir','modifier',];
  dataSource = new MatTableDataSource<BonTravail>(this.ListBonTravail);
  @ViewChild(MatSort) sort: MatSort;
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  UGP: string[] = ['UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5', 'UGP 6'];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le bon de travail sélectionné a été supprimé avec succées';
  snackBarFailureDeleteMsg = 'Le bon de travail sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'date de sortie véhicule a été modifier avec succées';
  snackBarFailureAddingMsg = 'Le nouveau bon de travail ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifiyingMsg = 'Le bon de travail sélectionné a été modifié avec succées';
  snackBarFailureModifiyingMsg = 'Le bon de travail sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  customSearching = false;
  ListUGP: string[] = [];
  ListStructure: string[] = [];
  ListNumeroSerie: string[] = ['seri1','serie2'];
  ListStatus: string[] = [];
  MODIFY_SORTIE_VEHICULE: boolean;
  VIEW_SORTIE_VEHICULE: boolean;
  REOUVRIR_SORTIE_VEHICULE:boolean;
  constructor(private Maintnenace: MaintenanceAndReparationServiceService, private router: Router,
    private Authentication: AuthenticationServiceService,
     public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.itemPerPage.patchValue(this.paginConfig.itemsPerPage);
    this.getTotalList();
    this.ngxLoader.stop();
    this.setDisplayedColumns();
  }
  setDisplayedColumns() {
    this.MODIFY_SORTIE_VEHICULE = this.Authentication.authoritiesUtilisateur.MODIFY_SORTIE_VEHICULE;
    this.VIEW_SORTIE_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_SORTIE_VEHICULE;
    this.REOUVRIR_SORTIE_VEHICULE = this.Authentication.authoritiesUtilisateur.REOUVRIR_SORTIE_VEHICULE;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalList();
      this.ngxLoader.stop();
    });
  }


  
  reouvrirSelectedDemandeMaintenance(i: any) {
    const dialogRef = this.dialog.open(ReouvrirBontravailCloturerComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: { id: i }
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Maintnenace.reouvrirBonTravailCloturer(value3).subscribe(value => {
          this.getTotalList();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }






  modifier(i:any){
    const dialogRef = this.dialog.open(DateSortieVehiculeComponent, {
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListBonTravail[i]}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Maintnenace.updateDateSortie(value3,this.ListBonTravail[i].id).subscribe(value => {
          this.getTotalList();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  }
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Maintnenace.getPaginationBonTravailList((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListBonTravail = value;
      this.dataSource = new MatTableDataSource<BonTravail>(this.ListBonTravail);
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

  handleCustomSearching() {
    this.customSearching = !this.customSearching;
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

  getTotalList() {
    this.Maintnenace.getTotalItemBonTravailList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.Maintnenace.getPaginationBonTravailList(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListBonTravail = value;
      this.dataSource = new MatTableDataSource<BonTravail>(this.ListBonTravail);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
  }




}
