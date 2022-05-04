import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from '../../referentiel/general/articles/article';
import { FamilleArticle } from '../../referentiel/general/articles/famille-article';
import { SousFamilleArticle } from '../../referentiel/general/articles/sous-famille-article';
import { GenreVehicule } from '../../referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import { MarqueVehicule } from '../../referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import { TypeVehicule } from '../../referentiel/general/parametres-vehicules/type-vehicule/type-vehicule';
import { ReferentielGeneraleServiceService } from '../../referentiel/general/referentiel-generale-service.service';
import { Magasin } from '../../referentiel/specifique/unite-gestion-parc/magasin';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { UgpArticle } from '../../referentiel/specifique/unite-gestion-parc/ugpArticle';
import { StockServiceService } from '../stock-service.service';

@Component({
  selector: 'app-article-transfert-parc-vers-parc',
  templateUrl: './article-transfert-parc-vers-parc.component.html',
  styleUrls: ['./article-transfert-parc-vers-parc.component.scss']
})
export class ArticleTransfertParcVersParcComponent implements OnInit {


  
 
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
  nouveauDemandeArticle: UgpArticle = {article: null, qteTransferer: 0, magasinDestinataire: null};

  constructor(public dialogRef: MatDialogRef<ArticleTransfertParcVersParcComponent>, 
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
     private Referentiel: ReferentielGeneraleServiceService,
     private Stock:StockServiceService,) {

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
            magasinDestinataire: this.nouvelArticleForm.value.magasinDestinataire,
            qteTransferer: this.nouvelArticleForm.value.qteTransferer,
            article: this.nouvelArticleForm.value.codeArticle
          };
          console.log("test6");
          this.dialogRef.close(this.nouveauDemandeArticle);
        }
      }

  ngOnInit(): void {
  }



  
}
