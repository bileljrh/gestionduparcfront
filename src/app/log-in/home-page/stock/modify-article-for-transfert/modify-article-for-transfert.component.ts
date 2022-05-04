import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Article } from '../../referentiel/general/articles/article';
import { ReferentielGeneraleServiceService } from '../../referentiel/general/referentiel-generale-service.service';
import { Magasin } from '../../referentiel/specifique/unite-gestion-parc/magasin';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { UgpArticle } from '../../referentiel/specifique/unite-gestion-parc/ugpArticle';
import { StockServiceService } from '../stock-service.service';

@Component({
  selector: 'app-modify-article-for-transfert',
  templateUrl: './modify-article-for-transfert.component.html',
  styleUrls: ['./modify-article-for-transfert.component.scss'],
  providers: [MatSnackBar]
})
export class ModifyArticleForTransfertComponent implements OnInit {
  ugpControl = new FormControl(null);
  nouvelArticleForm = new FormGroup({
    codeArticle: new FormControl(null),
    magasinDestinataire: new FormControl(null,Validators.required),
    designation: new FormControl(null),
    quantiteDispo: new FormControl(0),
    qteTransferer: new FormControl(0)
  });
 
  listUgp: UGP[] = [];
  listMagasin: Magasin[] =[];
  listArticle: Article[] = [];



  prixUnitaire: number = null;
  quantiteDispo: number = null;

  prixTotal:number=null;
  nouveauDemandeArticle: UgpArticle = {
    article: null,
     qteTransferer: 0,
      magasinDestinataire: null};

  constructor(public dialogRef: MatDialogRef<ModifyArticleForTransfertComponent>, 
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,private ngxLoader: NgxUiLoaderService,
     private Referentiel: ReferentielGeneraleServiceService,
     private Stock:StockServiceService,) {
     
      
       //this.nouvelArticleForm.controls.ugpControl.setValue(this.data.element.ugp);
        //this.nouvelArticleForm.controls.codeArticle.setValue(this.data.element.codeArticle);
        //this.nouvelArticleForm.controls.quantiteDispo.setValue(this.data.element.quantiteDispo);
        this.nouvelArticleForm.controls.qteTransferer.patchValue(this.data.element.qteTransferer);
        //this.nouvelArticleForm.controls.designation.setValue(this.data.element.designation);
        this.nouvelArticleForm.controls.magasinDestinataire.patchValue(this.data.element.magasinDestinataire);
        

      this.ngxLoader.start();
  
    console.log(data);
    this.ngxLoader.stop();
      
     

      this.Stock.getAllUgp().subscribe(value => {
        this.listUgp = value;
      });

      this.Stock.getAllMagasins().subscribe(value => {
        this.listMagasin = value;
      });

       
      this.Referentiel.getListArticleByUGP('ugp').subscribe(value => {
        this.listArticle = value;
      });

      this.nouvelArticleForm.controls.designation.valueChanges.subscribe(value => {
        this.nouvelArticleForm.controls.codeArticle.setValue(value, {emitEvent: false});
        this.prixUnitaire = value.prix;
        this.quantiteDispo=value.quantiteStock;
        this.prixTotal=value.prix * 1.1;
      });
      this.nouvelArticleForm.controls.codeArticle.valueChanges.subscribe(value => {
        this.nouvelArticleForm.controls.designation.setValue(value, {emitEvent: false});
        this.prixUnitaire = value.prix;
        this.quantiteDispo=value.quantiteStock;
        this.prixTotal=value.prix * 1.1;
      });

 
      }

//Filtre article 
changeArticle(value){
  this.Stock.getArticleByUgp(value.id).subscribe(value=>{
    console.log(value)
    this.listArticle = value;
    console.log(this.listArticle)
      });
    }

      closeDialog(): void {
        this.dialogRef.close();
      }
    
      onCancel() {
        this.dialogRef.close();
      }
      onConfirm() {
        if (this.nouvelArticleForm.valid) {
          this.nouveauDemandeArticle = {
            id: this.data.element.id,
            magasinDestinataire: this.nouvelArticleForm.value.magasinDestinataire,
            qteTransferer: this.nouvelArticleForm.value.qteTransferer,
            article: this.nouvelArticleForm.value.codeArticle
          };
          console.log("test6");
          this.dialogRef.close(this.nouveauDemandeArticle);
        }
      }




    

  ngOnInit(): void {
    this.ngxLoader.start();
  
   
    this.ngxLoader.stop();
  }

}
