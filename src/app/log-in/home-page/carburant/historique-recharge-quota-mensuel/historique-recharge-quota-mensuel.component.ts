import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { PaginationConfiguration } from '../../pagination-configuration';
import { CarburantServiceService } from '../carburant-service.service';
import { HistoriqueRechargeQM } from './HistoriqueRechargeQM';
@Component({
  selector: 'app-historique-recharge-quota-mensuel',
  templateUrl: './historique-recharge-quota-mensuel.component.html',
  styleUrls: ['./historique-recharge-quota-mensuel.component.scss'],
  providers: [MatSnackBar]
})
export class HistoriqueRechargeQuotaMensuelComponent implements OnInit {

  etatCarteActuel: string;
  demandeRechargeQuota: HistoriqueRechargeQM[] = [];
  EtatsCarte: string[] = ['Nan affecté', 'Affecté'];
  displayedColumns: string[] = ['index', 'nom','prenom', 'matricule'];
  
  
  dataSource = new MatTableDataSource<HistoriqueRechargeQM>(this.demandeRechargeQuota);
  @ViewChild(MatSort) sort: MatSort;
  
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  
  itemPerPage = new FormControl(null);
  
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  customSearching = false;
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL: boolean;
  
  
  

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
    this.VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL = this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL;
   
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
    
    this.Carburant.getTotalHistoriqueRechargeQM(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.demandeRechargeQuota = value;
      console.log(this.demandeRechargeQuota);
      this.dataSource = new MatTableDataSource<HistoriqueRechargeQM>(this.demandeRechargeQuota);
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
    this.getTotalItems();
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
