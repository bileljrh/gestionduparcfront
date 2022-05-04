import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from '../../../referentiel/general/articles/article';
import { ReferentielGeneraleServiceService } from '../../../referentiel/general/referentiel-generale-service.service';
import { InventaireArticleStock } from '../InventaireArticleStock';
import { ModifyArticleInventaireStockComponent } from './modify-article-inventaire-stock/modify-article-inventaire-stock.component';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { StockServiceService } from '../../stock-service.service';
@Component({
  selector: 'app-details-inventaire',
  templateUrl: './details-inventaire.component.html',
  styleUrls: ['./details-inventaire.component.scss'],
  providers: [MatSnackBar]

})
export class DetailsInventaireComponent implements OnInit {

  inventaireArticleStock: InventaireArticleStock = new InventaireArticleStock();
 articles: Article[] = [];
  displayedColumns: string[] = ['index', 'codeArticle', 'designation', 'quantite','modifier'];
  dataSource = new MatTableDataSource<Article>(this.articles);
  @ViewChild(MatSort) sort: MatSort;
  snackBarSuccesModificationMsg = 'L\'article sélectionné a été modifié avec succès';
  snackBarFailureModificationMsg = 'L\'articlesélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  
  inventaireArticleStockForm = new FormGroup({
  'dateInventaireForm': new FormControl(null),
  'tMouvementForm': new FormControl(null),
  'magasinForm': new FormControl(null), 

  });
 
  
  patchInitialValues() {
    this.inventaireArticleStockForm.controls.dateinventaireArticleStockForm.patchValue(this.data.element.dateinventaireArticleStock);
    this.inventaireArticleStockForm.controls.tMouvementForm.patchValue(this.data.element.tMouvement);
    this.inventaireArticleStockForm.controls.magasinForm.patchValue(this.data.element.magasin);
  }
  
  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }
  
  constructor(  private ReferentielGenerale: ReferentielGeneraleServiceService, public dialogRef: MatDialogRef<DetailsInventaireComponent>, private   stockServiceService: StockServiceService,  private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, @Inject(MAT_DIALOG_DATA) public data: any) 
 {
  console.log(this.data.element);

    this.stockServiceService.getArticleForInventaire(this.data.element.id).subscribe(value => {
      console.log(value);
      this.articles = value;
      this.dataSource = new MatTableDataSource<Article>(this.articles);
      console.log(this.articles);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {

  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close(this.articles);
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyArticleInventaireStockComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.articles[i]}
      
    });
    console.log(this.articles[i]);
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.articles[i] = value3;
        this.dataSource = new MatTableDataSource<Article>(this.articles);
        this.dataSource.sort = this.sort;
      }
    });
  }

}
