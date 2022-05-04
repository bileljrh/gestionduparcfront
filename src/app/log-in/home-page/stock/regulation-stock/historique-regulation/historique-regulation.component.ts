import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { HistoriqueRegulation } from '../../HistoriqueRegulation';
import { StockServiceService } from '../../stock-service.service';
import { DeleteHistoriqueRegulationComponent } from './delete-historique-regulation/delete-historique-regulation.component';

@Component({
  selector: 'app-historique-regulation',
  templateUrl: './historique-regulation.component.html',
  styleUrls: ['./historique-regulation.component.scss'],
  providers: [MatSnackBar]

})
export class HistoriqueRegulationComponent implements OnInit {

  displayedColumns: string[] = ['index',  'codeArticle', 'type_mouvement', 'quantite_modifier' ,'dateRegulation','supprimer'];
  

  
  historiqueregulationList: HistoriqueRegulation[] = [];

  dataSource = new MatTableDataSource<HistoriqueRegulation>(this.historiqueregulationList);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesModifiyingMsg = 'Le bon de commande sélectionné a été modifié avec succées';
  snackBarFailureModifiyingMsg = 'Le bon de commande sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'article sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg ='Problème de supprission, actualiser la page s\'il vous plait';
 
  DELETE_HISTORIQUE_REGULATION: boolean;


  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  private subscriptions: Subscription[] = [];
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  paginator: any;
  
  constructor(
    public dialog: MatDialog,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private Authentication: AuthenticationServiceService,
    private   stockServiceService: StockServiceService
      ) {
        this.ngxLoader.start();
        this.getTotalItems();
        console.log(this.historiqueregulationList);
        this.ngxLoader.stop();
        this. setDisplayedColumns();
  }

  setDisplayedColumns() {
    this.DELETE_HISTORIQUE_REGULATION = this.Authentication.authoritiesUtilisateur.DELETE_HISTORIQUE_REGULATION;
    
   
  }

  ngOnInit(): void {    
    console.log(this.historiqueregulationList);
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      this.ngxLoader.stop();    
    });

  }
  getTotalItems() {
   
    this.stockServiceService.getAllHistoriqueRegulartions(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.historiqueregulationList = value;
      this.dataSource = new MatTableDataSource<HistoriqueRegulation>(this.historiqueregulationList);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
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
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
  displayPageContent(paginConfig: PaginationConfiguration){

  }


  deleteRow(i) {
    const dialogRef = this.dialog.open(DeleteHistoriqueRegulationComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: { id: i }
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.stockServiceService.deleteHistoriqueRegulartion(value.id).subscribe(value1 => {
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
  
  
  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', { duration: 800 });
    });
  }

}
