import { animate, state, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DemandeArticle } from 'src/app/log-in/home-page/achat/demande-article';
import { InventaireStock } from 'src/app/log-in/home-page/stock/inventaire-stock/nouveau-inventaire-stock/InventaieStock';
import { ArticleForBonTravailComponent } from './details-article/article-for-bon-travail/article-for-bon-travail.component';

@Component({
  selector: 'app-piece-stock',
  templateUrl: './piece-stock.component.html',
  styleUrls: ['./piece-stock.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [MatSnackBar]
})
export class PieceStockComponent implements OnInit {
 //fake Interface
 nouveauBon: DemandeArticle = {
    
  article: null,
  quantiteCommandee: 0,
  quantiteLivree: 0,
};
today= new Date();
jstoday = '';

@ViewChild(MatSort, {static: true}) sort: MatSort;

constructor(public dialogRef: MatDialogRef<PieceStockComponent>, public dialog: MatDialog) { 
  this.jstoday = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss a', 'en-US', '+0530').substring(0,10);

}

listMagasin :string[]=['magasin 1','magasin 2'];
listAtelier:string[]=['atelier 1','atelier 2']
displayedColumns: string[] = ['index', 'codeArticle', 'designation', 'plus'];
articleTab: InventaireStock[] = [];
dataSource = new MatTableDataSource<InventaireStock>(this.articleTab);
expandedElement: InventaireStock[] | null;
 myControl = new FormControl();
options: string[] = ['Centre Mecanique Auto', 'Parc Béja', 'Parc Al-Kef'];
filteredOptions: Observable<string[]>;

ngOnInit() {
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );
}
/*

deleteRow(i: any) {
  this.articleTab.splice(i, 1);
  this.dataSource = new MatTableDataSource<InventaireStock>(this.articleTab);
}*/

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
  this.nouveauBon = {
    article: this.nouveauBon.article,
    quantiteCommandee: 0,
    quantiteLivree :0}
    this.dialogRef.close(this.nouveauBon);
    }

selectArticles(){
  const dialogRef = this.dialog.open(ArticleForBonTravailComponent, {
    width: '800px',
    panelClass: 'mat-dialog-container-class',
  });
  
  dialogRef.afterClosed().subscribe(value3 => {
    if (value3 !== undefined) {
      this.articleTab.push(value3);
      console.log(value3);
      
      
      this.dataSource = new MatTableDataSource<InventaireStock>(this.articleTab);
      this.dataSource.sort = this.sort;
    }
  });
  
}

}
 