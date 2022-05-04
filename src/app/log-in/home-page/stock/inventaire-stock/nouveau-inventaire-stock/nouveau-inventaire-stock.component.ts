
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DemandeArticle } from '../../../achat/demande-article';
import { Article } from '../../../referentiel/general/articles/article';
import { RegulationArticleStock } from '../../RegulationArticleStock';
import { StockServiceService } from '../../stock-service.service';
import { ArticleForInventaireComponent } from './article-for-inventaire/article-for-inventaire.component';
import { InventaireStock } from './InventaieStock';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { InventaireArticleStock } from '../InventaireArticleStock';
import { ReferentielGeneraleServiceService } from '../../../referentiel/general/referentiel-generale-service.service';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { Magasin } from '../../../referentiel/specifique/unite-gestion-parc/magasin';
import { UGP } from '../../../referentiel/specifique/unite-gestion-parc/ugp';

@Component({
  selector: 'app-nouveau-inventaire-stock',
  templateUrl: './nouveau-inventaire-stock.component.html',
  styleUrls: ['./nouveau-inventaire-stock.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [MatSnackBar]
})
export class NouveauInventaireStockComponent implements OnInit {

  expandedElement: InventaireArticleStock[] | null;

displayedColumns: string[] = ['index', 'codeArticle','quantiteInventaire','inventaireStock' ,'designation'];
articles: Article[] = [];

dataSource = new MatTableDataSource<Article>(this.articles);
@ViewChild(MatSort, {static: true}) sort: MatSort;
listMagasin:string[]=['centre mecanique auto','magasin béja','magasin Nabeul']

magasin = '';
ugp = '';
InventaireArticles: InventaireArticleStock[] = [];
snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
inventaireArticleStock: InventaireArticleStock = new InventaireArticleStock();
typeMouvement:string[]=['Entrée','Sortie'];
paginConfig: PaginationConfiguration = {
  id: 'custom',
  itemsPerPage: 5,
  currentPage: 0,
  totalItems: 10
  
};
tMouvement : string ; 
InventaireArticleForm = new FormGroup({
  'dateInventaireForm': new FormControl(null),
  'tMouvementForm': new FormControl(null),
  'magasinForm': new FormControl(null), 

});


   
magasins :Magasin [] =[];
ugps :UGP[]=[];
itemPerPage = new FormControl(null);
constructor( private   stockServiceService: StockServiceService, public dialog: MatDialog, private  refirencielService: ReferentielGeneraleServiceService , private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, public dialogRef: MatDialogRef<NouveauInventaireStockComponent>) {
  this.ngxLoader.start();
  
  this.getItemsMagasin();
  this.ngxLoader.stop();

}
filteredOptions: Observable<string[]>;
  myControl = new FormControl();

ngOnInit(): void {
  

  this.getItemsMagasin();

  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith('')
  );

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
deleteRow(i: any) {
  this.articles.splice(i, 1);
  this.dataSource = new MatTableDataSource<Article>(this.articles);
}


selectArticles(){
  const dialogRef = this.dialog.open(ArticleForInventaireComponent, {
    width: '800px',
    panelClass: 'mat-dialog-container-class',
  });

  dialogRef.afterClosed().subscribe(value3 => {
    if (value3 !== undefined) {
      this.articles.push(value3);
      console.log(value3);
      
      this.dataSource = new MatTableDataSource<Article>(this.articles);
      this.dataSource.sort = this.sort;
    }
  });
}



closeDialog(): void {
  this.dialogRef.close();
}



onCancelAdding() {
  this.dialogRef.close();
}

onConfirmAdding() {
  if (this.InventaireArticleForm.valid) {
    console.log(this.inventaireArticleStock);
    console.log(this.articles);
    this.dialogRef.close({
      
      dateInventaire: this.InventaireArticleForm.value.dateInventaireForm,
      tMouvement: this.InventaireArticleForm.value.tMouvementForm,
      magasin: this.InventaireArticleForm.value.magasinForm.designation,
      articles: this.articles
    
      
    });
  }
}   

displayNotification(notification: string) {
  setTimeout(() => {
    this.snackBar.open(notification, 'X', {duration: 3000});
  }, 800);
}




}
