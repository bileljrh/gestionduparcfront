import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { log } from 'console';
import { RechargeComplementaireModule } from '../recharge-complementaire/recharge-complementaire.module';
import { CarburantServiceService } from '../../carburant-service.service';
import { HistoriqueRechargeComplementaireModule } from './historique-recharge-complementaire/historique-recharge-complementaire.module';
@Component({
  selector: 'app-historique-recharge-complementaire',
  templateUrl: './historique-recharge-complementaire.component.html',
  styleUrls: ['./historique-recharge-complementaire.component.scss'],
  providers: [MatSnackBar]

})
export class HistoriqueRechargeComplementaireComponent implements OnInit {
  etatCarteActuel: string;
  RechargeComplementaireModules: HistoriqueRechargeComplementaireModule[] = [];
  EtatsCarte: string[] = ['Nan affecté', 'Affecté'];
  displayedColumns: string[] = ['index',  'matricule','quantiteDemande'];
  
  
  dataSource = new MatTableDataSource<HistoriqueRechargeComplementaireModule>(this.RechargeComplementaireModules);
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
  snackBarSuccesDeleteMsg = 'la suppression de la demande de recharge de carburant de compensation sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la demande de recharge de carburant de compensation sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarFailureAddingMsg = 'La nouvelle demande quota  ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle demande quota a été ajouté avec succées';
  snackBarSuccesModificationMsg = 'La demande quota sélectionné a été modifié avec succès';
  snackBarFailureModificationMsg = 'La demande sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'La confirmation de la demande de recharge de carburant de compensation sélectionnée a été effectuée avec succès';
  snackBarSuccesValidationMsg = 'La validation de la demande de recharge de carburant de compensation  sélectionnée a été effectuée avec succès';
  snackBarFailureValidationMsg = 'la demande de recharge de carburant de compensation sélectionnée ne pourra pas être validée, réessayez de nouveau s\'il vous plait';

  constructor(private Authentication: AuthenticationServiceService,
    private  Carburant: CarburantServiceService ,
    private router: Router, public dialog: MatDialog, 
    private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.ngxLoader.stop();
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
    
    this.Carburant.getTotalHistoriqueDemandeRechargeComplementaire(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.RechargeComplementaireModules = value;
      console.log(this.RechargeComplementaireModules);
      this.dataSource = new MatTableDataSource<HistoriqueRechargeComplementaireModule>(this.RechargeComplementaireModules);
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
    this.Carburant.getTotalHistoriqueDemandeRechargeComplementaire((paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.RechargeComplementaireModules = value;
      console.log("test demande quota carte jocker");
      console.log(this.Carburant);
      this.dataSource = new MatTableDataSource<HistoriqueRechargeComplementaireModule>(this.RechargeComplementaireModules);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
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
