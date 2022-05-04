import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { PaginationConfiguration } from '../../pagination-configuration';
import { StockServiceService } from '../../stock/stock-service.service';
import { VisiteTechnique } from '../visite-technique/visite-technique';

@Component({
  selector: 'app-alert-vehicule',
  templateUrl: './alert-vehicule.component.html',
  styleUrls: ['./alert-vehicule.component.scss'],
  providers: [MatSnackBar]
})
export class AlertVehiculeComponent implements OnInit {
  


  ListTest: string[] = ['vehicule test'];
  displayedColumns: string[] = ['index','id','dateDebutValidite','dateFinValidite','montantVisiteTechnique'];
  alertArticleList: VisiteTechnique[] = [];
  dataSource = new MatTableDataSource<VisiteTechnique>(this.alertArticleList);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';

  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  private subscriptions: Subscription[] = [];
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];


  constructor(
    public dialog: MatDialog,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private Authentication: AuthenticationServiceService,
    private   stockServiceService: StockServiceService
  ) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.ngxLoader.stop();
   
  }


  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  ngOnInit(): void {
    console.log(this.alertArticleList);
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      this.ngxLoader.stop();
    });
  }
  

  getTotalItems() {
   
    this.stockServiceService.findVisiteForAlerting().subscribe(value => {
      console.log(value);
      this.alertArticleList = value;
      this.dataSource = new MatTableDataSource<VisiteTechnique>(this.alertArticleList);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
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
  
  
  


  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }
}
