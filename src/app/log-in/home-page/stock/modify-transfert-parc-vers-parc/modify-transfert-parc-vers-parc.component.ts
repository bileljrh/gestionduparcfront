import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ParcTransfert } from '../../referentiel/specifique/unite-gestion-parc/ParcTransfert';
import { UgpArticle } from '../../referentiel/specifique/unite-gestion-parc/ugpArticle';
import { ModifyArticleForTransfertComponent } from '../modify-article-for-transfert/modify-article-for-transfert.component';
import { StockServiceService } from '../stock-service.service';
import { UpdateUgp } from '../UpdateUgp';
import { UpdateUgpArticle } from '../UpdateUgpArticle';

@Component({
  selector: 'app-modify-transfert-parc-vers-parc',
  templateUrl: './modify-transfert-parc-vers-parc.component.html',
  styleUrls: ['./modify-transfert-parc-vers-parc.component.scss'],
  providers: [MatSnackBar]
})
export class ModifyTransfertParcVersParcComponent implements OnInit {
  
 // ListParcTransfert: UgpArticle[] = [];
  updateUgp:UpdateUgp   = {
    id: null , 
    status:'',
    updateParcTransfertArticle : []  
  }
  articleTab: UgpArticle[] = [];
  dataSource = new MatTableDataSource<UgpArticle>(this.articleTab);
  transfertForm = new FormGroup({
    magasinDestinataire:new FormControl(null, Validators.required),
  });

  displayedColumns: string[] = ['index', 'codeArticle', 'designation','magasinDestinataire','plus'];

  expandedElement: UgpArticle[] | null;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(public dialogRef: MatDialogRef<ModifyTransfertParcVersParcComponent>,       
    private stock: StockServiceService ,   
     private router: Router,
      public dialog: MatDialog,
       private snackBar: MatSnackBar,
        private ngxLoader: NgxUiLoaderService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngxLoader.start();
    this.ngxLoader.stop();
    console.log("data.element.ugpsArticle")
    console.log(data.element.ugpsArticle)
    console.log("data.element")
    console.log(data.element)
    this.articleTab = data.element.parcTransfertArticle;
    this.dataSource = new MatTableDataSource<UgpArticle>(this.articleTab);
    //console.log(data);
    console.log("articles tab ");
    console.log(this.articleTab);
    
  }

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
  ngOnInit(): void {
  }




  onConfirm() {
    this.updateUgp = {
      status: this.transfertForm.value.status,
      id :  this.data.element.id,
      updateParcTransfertArticle : this.demandeArticlesToUpdateDemandeArticles(this.articleTab),
    };
    console.log(this.updateUgp);
    this.dialogRef.close(this.updateUgp);
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
            updateUgpArticles.push(updateUgpArticle);

          });
        }
        
        return updateUgpArticles;
      }


      selectArticles(){ 
        const dialogRef = this.dialog.open(ModifyArticleForTransfertComponent, {
          width: '800px',
          panelClass: 'mat-dialog-container-class',
          data: {element: this.articleTab}
        });
        dialogRef.afterClosed().subscribe(value3 => {
          if (value3 !== undefined) {
            this.articleTab.push(value3);
            this.dataSource = new MatTableDataSource<UgpArticle>(this.articleTab);
            this.dataSource.sort = this.sort;
          }
        });
      }
      
  
}
