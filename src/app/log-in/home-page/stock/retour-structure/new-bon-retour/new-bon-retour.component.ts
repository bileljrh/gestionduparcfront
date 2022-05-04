import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DemandeArticle } from '../../../achat/demande-article';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { Article } from '../../../referentiel/general/articles/article';
import { Structure } from '../../../referentiel/specifique/structure-administrative/structure';
import { Magasin } from '../../../referentiel/specifique/unite-gestion-parc/magasin';
import { UGP } from '../../../referentiel/specifique/unite-gestion-parc/ugp';
import { StockServiceService } from '../../stock-service.service';
import { RetourStock } from '../RetourStock';
import { ArticleForRetourStockComponent } from './article-for-retour-stock/article-for-retour-stock.component';

@Component({
  selector: 'app-new-bon-retour',
  templateUrl: './new-bon-retour.component.html',
  styleUrls: ['./new-bon-retour.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [MatSnackBar]
})
export class NewBonRetourComponent implements OnInit {

 

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public dialogRef: MatDialogRef<NewBonRetourComponent>,private stockServiceService: StockServiceService, private ngxLoader: NgxUiLoaderService, public dialog: MatDialog) {

    this.ngxLoader.start();
    this.ngxLoader.stop();
    this.getItemsStructure();
    this.getItemsMagasin();
  
   }
   magasin : string; 
   structure: string;
   dateSortie: Date;
   
   magasins :Magasin [] =[];
   ugps :UGP[]=[];
   structures: Structure[]=[];

  listMagasin:string[]=['Centre Mecanique Auto'];
  listStructure:string[]=['sc-01','sc-02'];
  displayedColumns: string[] = ['index', 'codeArticle', 'designation', 'plus'];
  articleTab: RetourStock[] = [];
  articles: Article[] = [];
  //dataSource = new MatTableDataSource<Article>(this.articles);
  dataSource = new MatTableDataSource<RetourStock>(this.articleTab);
  expandedElement: RetourStock[] | null;
   myControl = new FormControl();
  options: string[] = ['Centre Mecanique Auto', 'Parc Béja', 'Parc Al-Kef'];
  filteredOptions: Observable<string[]>;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
    
  };
  itemPerPage = new FormControl(null);
  retourForm = new FormGroup({
    'dateSortieForm': new FormControl(null),
    'magasinForm': new FormControl(null),
    'structureForm': new FormControl(null), 
  
  });
  ngOnInit() {
    

    this.getItemsStructure();
    this.getItemsMagasin();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );



  }
  
  deleteRow(i: any) {
    this.articleTab.splice(i, 1);
    this.dataSource = new MatTableDataSource<RetourStock>(this.articleTab);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  //fake confirm
  onConfirm() {
    if (this.retourForm.valid) {
      
      this.dialogRef.close({
        
        dateSortie: this.retourForm.value.dateSortieForm,
        magasin: this.retourForm.value.magasinForm.designation,
        structure: this.retourForm.value.structureForm.designation,
        articles: this.articles
      
        
      });
    }
  
  }

  selectArticles(){
    const dialogRef = this.dialog.open(ArticleForRetourStockComponent, {
      width: '800px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.articleTab.push(value3);
        console.log(value3);
        
        this.dataSource = new MatTableDataSource<RetourStock>(this.articleTab);
        this.dataSource.sort = this.sort;
      }
    });
  }



  getItemsMagasin() {
    this.stockServiceService.getAllMagasins().subscribe(value => {
     console.log(value);
     this.magasins=value;
     
    });
  }

  getItemsUgp() {
    
    this.stockServiceService.getAllUgps().subscribe(value => {
      console.log(value);
      this.ugps=value;
    
 
     });
  }

  getItemsStructure() {
    
    this.stockServiceService.getAllStructure().subscribe(value => {
      console.log(value);
      this.structures=value;
    
 
     });
  }



}
