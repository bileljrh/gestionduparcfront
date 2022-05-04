import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUgp } from '../UpdateUgp';
import { UgpArticle } from '../../referentiel/specifique/unite-gestion-parc/ugpArticle';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReferentielGeneraleServiceService } from '../../referentiel/general/referentiel-generale-service.service';
import { StockServiceService } from '../stock-service.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UpdateUgpArticle } from '../UpdateUgpArticle';
import { ArticleTransfertParcVersParcComponent } from '../article-transfert-parc-vers-parc/article-transfert-parc-vers-parc.component';

@Component({
  selector: 'app-new-transfert-parc-vers-parc',
  templateUrl: './new-transfert-parc-vers-parc.component.html',
  styleUrls: ['./new-transfert-parc-vers-parc.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [MatSnackBar]
})
export class NewTransfertParcVersParcComponent implements OnInit {

  nouveauBon:UpdateUgp = {
   
    status:'',
    updateParcTransfertArticle : []  
  }
  articleTab: UgpArticle[] = [];

  dataSource = new MatTableDataSource<UgpArticle>(this.articleTab);
  expandedElement: UgpArticle[] | null;
  newArticleVersParcForm = new FormGroup({
    status: new FormControl(null, Validators.required),
    qteTransferer: new FormControl(null, Validators.required),
    magasinDestinataire: new FormControl(null),
  });
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 
  constructor(  public dialogRef: MatDialogRef<NewTransfertParcVersParcComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Referentiel:ReferentielGeneraleServiceService,
    private Stock:StockServiceService,
    public dialog: MatDialog) { }

    options: string[] = ['Centre Mecanique Auto', 'Parc Béja', 'Parc Al-Kef'];
    displayedColumns: string[] = ['index', 'codeArticle', 'designation', 'magasinDestinataire','plus'];



    filteredOptions: Observable<string[]>;
    myControl = new FormControl();
    closeDialog(): void {
      this.dialogRef.close();
    }
  
  
    onCancel() {
      this.dialogRef.close();
    }

    deleteRow(i: any) {
      this.articleTab.splice(i, 1);
      this.dataSource = new MatTableDataSource<UgpArticle>(this.articleTab);
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }


    onConfirm() {
      this.nouveauBon = {

        updateParcTransfertArticle : this.demandeArticlesToUpdateDemandeArticles(this.articleTab),
         
        status: this.newArticleVersParcForm.value.status,
        
      }
      console.log("nouv transfert vers mv");
      
      console.log(this.nouveauBon);
      this.dialogRef.close(this.nouveauBon);
   }

   demandeArticlesToUpdateDemandeArticles(ugpArticles: UgpArticle []): UpdateUgpArticle[] {
    const updateUgpArticles: UpdateUgpArticle[] = [];
    if (ugpArticles.length > 0) {
      ugpArticles.forEach(ugpArticle => {
         const updateUgpArticle: UpdateUgpArticle = {
          qteTransferer:ugpArticle.qteTransferer,
          magasinDestinataire:ugpArticle.magasinDestinataire,
          updateArticle: {
            id:ugpArticle.article.id,
            codeArticle: ugpArticle.article.codeArticle,
            dateAjout: ugpArticle.article.dateAjout,
            designation: ugpArticle.article.designation,
            idGenreVehicule: ugpArticle.article.genreVehicule.id,
            idMarqueVehicule: ugpArticle.article.marqueVehicule.id,
            idSousFamille: ugpArticle.article.sousFamille.id,
            idTypeVehicule: ugpArticle.article.typeVehicule.id,
            prix: ugpArticle.article.prix,
            quantiteLivree: ugpArticle.article.quantiteLivree,
            quantiteStock: ugpArticle.article.quantiteStock,
            remise: ugpArticle.article.remise,
            tva: ugpArticle.article.tva,
            idUgp: ugpArticle.article.ugp.id
          }
        
          
        };
        //console.log(updateMagasinArticle.updateArticle.codeArticle);
        updateUgpArticles.push(updateUgpArticle);
        //console.log(updateMagasinArticles);
        
      });
    }
    console.log(this.demandeArticlesToUpdateDemandeArticles);
    console.log("test4");
    return updateUgpArticles;
  }
selectArticles(){ 
const dialogRef = this.dialog.open(ArticleTransfertParcVersParcComponent, {
  width: '800px',
  panelClass: 'mat-dialog-container-class',
});
dialogRef.afterClosed().subscribe(value3 => {
  if (value3 !== undefined) {
    this.articleTab.push(value3);
   // console.log(value3);
    console.log(this.articleTab);
    
    this.dataSource = new MatTableDataSource<UgpArticle>(this.articleTab);
    this.dataSource.sort = this.sort;
  }
});
}


  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

}
