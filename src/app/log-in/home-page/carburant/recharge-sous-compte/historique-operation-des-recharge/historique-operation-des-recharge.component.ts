import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { CarburantServiceService } from '../../carburant-service.service';
import { DeleteRechargeSousCompteComponent } from '../delete-recharge-sous-compte/delete-recharge-sous-compte.component';
import { HistoriqueOperationRecharge } from './HistoriqueOperationRecharge';

@Component({
  selector: 'app-historique-operation-des-recharge',
  templateUrl: './historique-operation-des-recharge.component.html',
  styleUrls: ['./historique-operation-des-recharge.component.scss'],
  providers: [MatSnackBar]
})
export class HistoriqueOperationDesRechargeComponent implements OnInit {

  etatCarteActuel: string;
  demandeRechargeSousCompte: HistoriqueOperationRecharge[] = [];
  EtatsCarte: string[] = ['Nan affecté', 'Affecté'];
  displayedColumns: string[] = ['index', 'numSousCompte','demandeur', 'typeCarburant', 'quantiteDemande','creationDate',  'supprimer'];
  
  
  dataSource = new MatTableDataSource<HistoriqueOperationRecharge>(this.demandeRechargeSousCompte);
  @ViewChild(MatSort) sort: MatSort;
  
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  TypeCarburant = new FormControl(null);
  itemPerPage = new FormControl(null);
  selectedTypeCarburant: string;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  customSearching = false;
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarSuccesDeleteMsg = 'la suppression de la demande de recharge sous compte sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la demande de recharge sous compte sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  
  DELETE_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE: boolean;
  

  constructor(private Authentication: AuthenticationServiceService,
    private Carburant: CarburantServiceService,   
    private router: Router, public dialog: MatDialog, 
    private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
  }
  
  setDisplayedColumns() {
    this.DELETE_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE = this.Authentication.authoritiesUtilisateur.DELETE_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE;
   
  }
  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      console.log(this.getTotalItems());
      this.ngxLoader.stop();
    });
  }
  
  getTotalItems() {
    
    this.Carburant.getTotalHistoriqueDemandeRechargeSousCompte(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.demandeRechargeSousCompte = value;
      console.log(this.demandeRechargeSousCompte);
      this.dataSource = new MatTableDataSource<HistoriqueOperationRecharge>(this.demandeRechargeSousCompte);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }
  
  
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Carburant.getTotalHistoriqueDemandeRechargeSousCompte((paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.demandeRechargeSousCompte = value;
      console.log("test demande quota carte jocker");
      console.log(this.Carburant);
      this.dataSource = new MatTableDataSource<HistoriqueOperationRecharge>(this.demandeRechargeSousCompte);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }

  deleteRow(index: number) {
    
    const dialogRef = this.dialog.open(DeleteRechargeSousCompteComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Carburant.deleteHistoriqueDemandeRechargeSousCompte(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
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
 
    displayNotification(notification: string) {
      setTimeout(() => {
        this.snackBar.open(notification, 'X', {duration: 3000});
      }, 800);
    }
}
