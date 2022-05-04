import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { AchatServiceService } from '../../achat/achat-service.service';
import { PaginationConfiguration } from '../../pagination-configuration';
import { DeleteInventaireStockOperationComponent } from './delete-inventaire-stock-operation/delete-inventaire-stock-operation.component';
import { DetailsInventaireComponent } from './details-inventaire/details-inventaire.component';
import { NouveauInventaireStockComponent } from './nouveau-inventaire-stock/nouveau-inventaire-stock.component';
import { InventaireArticleStock } from './InventaireArticleStock';
import { StockServiceService } from '../stock-service.service';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { Article } from '../../referentiel/general/articles/article';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
@Component({
  selector: 'app-inventaire-stock',
  templateUrl: './inventaire-stock.component.html',
  styleUrls: ['./inventaire-stock.component.scss'],
  providers: [MatSnackBar]
})
export class InventaireStockComponent implements OnInit {
  ListTest: string[] = ['vehicule test'];
  displayedColumns: string[] = ['index','codeArticle','designation','quantiteStock','parc','creationDate','prix','sousFamille'];
  inventaireList: Article[] = [];
   ListUPGS:UGP[];
  ListMagasin:InventaireArticleStock[]=[];
  dataSource = new MatTableDataSource<Article>(this.inventaireList);
  articleList: Article[] = [];
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';

VIEW_Inventaire_Stock : boolean;
DETAILS_Inventaire_Stock : boolean;
DELETE_Inventaire_Stock: boolean;
ADD_Inventaire_Stock: boolean;
UgpControl = new FormControl(null);
MagasinControl = new FormControl(null);
  statusParameter = new FormControl(null);
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
    this. getListInventaire();
    this.ngxLoader.stop();
    this. setDisplayedColumns();
    this. getListUPG();
    this.getListMagasinInventaire();
  }
  setDisplayedColumns() {
    this.VIEW_Inventaire_Stock = this.Authentication.authoritiesUtilisateur.VIEW_Inventaire_Stock;
    this.DETAILS_Inventaire_Stock = this.Authentication.authoritiesUtilisateur.DETAILS_Inventaire_Stock;
    this.DELETE_Inventaire_Stock = this.Authentication.authoritiesUtilisateur.DELETE_Inventaire_Stock;
    this.ADD_Inventaire_Stock = this.Authentication.authoritiesUtilisateur.ADD_Inventaire_Stock;
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
//filtrage avec magasin:
this.MagasinControl.valueChanges.subscribe(value2 => 
  {     
         console.log(value2);
         this.ngxLoader.start();
         this.paginConfig.currentPage = 0;
         console.log(value2);
         if (value2 === undefined) 
         {
              this.magasin = '';
         } 
         else 
         {
              this.magasin = value2.magasin;
              console.log(this.magasin);
         }
         this.getTotalItems();
         this.ngxLoader.stop();
});
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getListUPG() {
    this.stockServiceService.getAllUgps().subscribe(value => {
      console.log(value);
      this.ListUPGS = value;
     
  });
}
  ngOnInit(): void {
    console.log(this.inventaireList);
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      this.ngxLoader.stop();
      this.getListUPG();
      this.getListMagasinInventaire();
    });
  }
  
  magasin = '';
  ugp = '';
  getTotalItems() {
    this.stockServiceService.getTotalItemsRegulations().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.stockServiceService.getAllInventaire(this.magasin ,this.ugp,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.inventaireList = value;
      this.dataSource = new MatTableDataSource<Article>(this.inventaireList);
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
  
  getListMagasinInventaire() {
    this.stockServiceService.getAllMagasinInventaire().subscribe(value => {
      console.log(value);
      this.ListMagasin = value;
     
  });
  }

  getListInventaire() {
    this.stockServiceService.getInventaire().subscribe(value => {
      console.log(value);
      this.articleList = value;
     
  });
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }
  Telecharger()
  {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Inventaire du stock");
    let header=["CodeArticle","Designation","Quantite du stock","Prix","Tva"]
    let headerRow = worksheet.addRow(header);
    for (let x1 of this.articleList)
{
  let x2=Object.keys(x1);
  let temp=[]
  for(let y of x2)
  {
    temp.push(x1[y])
  }
  worksheet.addRow(temp)
}
let fname="Inventaire du stock"

//add data and file name and download
workbook.xlsx.writeBuffer().then((data) => {
  let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
});
   /* this.stockServiceService.Telecharger().subscribe(value => {
      console.log(value);
      this.ListUPGS = value;
  });*/
}
}
