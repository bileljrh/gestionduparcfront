import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { AchatServiceService } from '../../achat/achat-service.service';
import { PaginationConfiguration } from '../../pagination-configuration';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { RegulationArticleStock } from '../RegulationArticleStock';
import { StockServiceService } from '../stock-service.service';
import { DeleteRegulationStockOperationComponent } from './delete-regulation-stock-operation/delete-regulation-stock-operation.component';
import { DetailsRegulationStockComponent } from './details-regulation-stock/details-regulation-stock.component';
import { NewRegulationComponent } from './new-regulation/new-regulation.component';

@Component({
  selector: 'app-regulation-stock',
  templateUrl: './regulation-stock.component.html',
  styleUrls: ['./regulation-stock.component.scss'],
  providers: [MatSnackBar]

})
export class RegulationStockComponent implements OnInit {
  ListTest: string[] = ['vehicule test'];
  displayedColumns: string[] = ['index',  'codeArticle', 'typeMouvement', 'dateRegulation', 'details', 'supprimer'];
  regulationList: RegulationArticleStock[] = [];
  ugps :UGP[]=[];
  ugp = '';
  ListMagasin:RegulationArticleStock[]=[];
  dataSource = new MatTableDataSource<RegulationArticleStock>(this.regulationList);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesModifiyingMsg = 'Le bon de commande sélectionné a été modifié avec succées';
  snackBarFailureModifiyingMsg = 'Le bon de commande sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'article sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'L\'article sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle regulation a été ajoutée avec succès';
  listUGP:string[]=['parc béja','parc zaghouene','parc Ariana','parc tataouine']
  VIEW_Regulation_Stock: boolean;
  DETAILS_Regulation_Stock: boolean;
  DELETE_Regulation_Stock: boolean;
  ADD_Regulation_Stock: boolean;
  UgpControl = new FormControl(null);
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
  magasin = '';
  constructor(
    public dialog: MatDialog,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private Authentication: AuthenticationServiceService,
    private   stockServiceService: StockServiceService
      ) {
        this.ngxLoader.start();
        this.getTotalItems();
        this.getItemsUgp();
        this.ngxLoader.stop();
        this. setDisplayedColumns();
  }

  getItemsUgp() {
    
    this.stockServiceService.getAllUgps().subscribe(value => {
      console.log(value);
      this.ugps=value;
     });
  }
  setDisplayedColumns() {
    this.VIEW_Regulation_Stock = this.Authentication.authoritiesUtilisateur.VIEW_Regulation_Stock;
    this.DETAILS_Regulation_Stock = this.Authentication.authoritiesUtilisateur.DETAILS_Regulation_Stock;
    this.DELETE_Regulation_Stock = this.Authentication.authoritiesUtilisateur.DELETE_Regulation_Stock;
    this.ADD_Regulation_Stock = this.Authentication.authoritiesUtilisateur.ADD_Regulation_Stock;
   //filtrage avec ugp
    this.UgpControl.valueChanges.subscribe(value2 => 
      {
      
             console.log(value2);
             this.ngxLoader.start();
             this.paginConfig.currentPage = 0;
             console.log(value2);
             if (value2 === undefined)
             {
                  this.ugp = '';
             }
             else
             {
                 this.ugp = value2.designation
                 console.log(this.ugp);
             }
             this.getTotalItems();
             this.ngxLoader.stop();
    });
 
  }

  ngOnInit(): void {
    this.getTotalItems();
      this.getItemsUgp();
      this.subscriptions.push(this.itemPerPage.valueChanges.subscribe(value1 => {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.paginConfig.itemsPerPage = value1;
        this.getTotalItems();
        this.ngxLoader.stop();
      }));
      this.UgpControl.valueChanges.subscribe(value2 => {
        console.log("la valuer de value 2 ugp");
  
        console.log(value2);
  
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        console.log(value2);
        if (value2 === undefined) {
          this.ugp = '';
        } else {
          this.ugp = value2.designation;
          console.log("l'ugp'!!");
          console.log(this.ugp);
          
        }
        this.getTotalItems();
        this.ngxLoader.stop();
      });
  }

  getTotalItems() {

   this.stockServiceService.getTotalItemsRegulationList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.stockServiceService.getAllRegulartion(this.ugp,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.regulationList = value;
      this.dataSource = new MatTableDataSource<RegulationArticleStock>(this.regulationList);
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
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
  displayPageContent(paginConfig: PaginationConfiguration){

  }

  modifyRow(i: any) {
     const dialogRef = this.dialog.open(DetailsRegulationStockComponent, {
         width: '900px',
         panelClass: 'mat-dialog-container-class',
         data: {element: this.regulationList[i]}
       });
       console.log(this.regulationList[i]);

    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.stockServiceService.updateRegulation(value3).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesModifiyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureModifiyingMsg);
        });
      }
    });
  }

  deleteRow(i) {
    const dialogRef = this.dialog.open(DeleteRegulationStockOperationComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: { id: i }
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.stockServiceService.deleteRegulartion(value.id).subscribe(value1 => {
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
  regulationStock() {
    const dialogRef = this.dialog.open(NewRegulationComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        //juste pour laffichage de message d'eerur (achat)
        console.log(value3);
        this.stockServiceService.createRegulartion(value3).subscribe(value2 => {
          this.ngxLoader.stop();
          this.getTotalItems();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureLoadingMsg);
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
