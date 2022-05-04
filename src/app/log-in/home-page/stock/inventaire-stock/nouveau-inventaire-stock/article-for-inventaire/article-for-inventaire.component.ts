import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/log-in/home-page/referentiel/general/articles/article';
import { FamilleArticle } from 'src/app/log-in/home-page/referentiel/general/articles/famille-article';
import { SousFamilleArticle } from 'src/app/log-in/home-page/referentiel/general/articles/sous-famille-article';
import { GenreVehicule } from 'src/app/log-in/home-page/referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import { MarqueVehicule } from 'src/app/log-in/home-page/referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import { TypeVehicule } from 'src/app/log-in/home-page/referentiel/general/parametres-vehicules/type-vehicule/type-vehicule';
import { ReferentielGeneraleServiceService } from 'src/app/log-in/home-page/referentiel/general/referentiel-generale-service.service';
import { RegulationArticleStock } from '../../../RegulationArticleStock';
import { StockServiceService } from '../../../stock-service.service';
import { InventaireStock } from '../InventaieStock';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-article-for-inventaire',
  templateUrl: './article-for-inventaire.component.html',
  styleUrls: ['./article-for-inventaire.component.scss'],
  providers: [MatSnackBar]
})
export class ArticleForInventaireComponent implements OnInit {

  familleControl = new FormControl(null);
  sousFamilleControl = new FormControl(null);
  genreControl = new FormControl(null);
  marqueControl = new FormControl(null);
  typeControl = new FormControl(null);
  listMagasin :string[]=['test'];
  typeMouvement:string[]=['type Mouvement test'];
  nouvelArticleForm = new FormGroup({
    codeArticle: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    quantiteDispo: new FormControl(),
    quantite: new FormControl(0)
  });
  listFamille: FamilleArticle[] = [];
  listSousFamille: SousFamilleArticle[] = [];
  listGenre: GenreVehicule[] = [];
  listMarque: MarqueVehicule[] = [];
  listType: TypeVehicule[] = [];

  prixUnitaire: number = null;
  quantiteDispo: number = null;
  prixTotal:number=null;

  constructor(public dialogRef: MatDialogRef<ArticleForInventaireComponent>,  
     private Stock:StockServiceService,
  
   public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private Referentiel: ReferentielGeneraleServiceService,private snackBar: MatSnackBar,private ngxLoader: NgxUiLoaderService)
   {
     
    this.ngxLoader.start();
    this.Referentiel.getListArticleByUGP('ugp').subscribe(value => {
      this.listArticle = value;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
    this.ngxLoader.stop();


    /* 
    this.Referentiel.getListFamilleArticle().subscribe(value => {
      this.listFamille = value;
    });
    this.Referentiel.getListSousFamilleArticle().subscribe(value => {
      this.listSousFamille = value;
    });
    this.Referentiel.getListMarqueVehicule().subscribe(value => {
      this.listMarque = value;
    });
    this.Referentiel.getListTypeVehicule().subscribe(value => {
      this.listType = value;
    });
    this.Referentiel.getListGenreVehicule().subscribe(value => {
      this.listGenre = value;
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

      //this.tva = value.tva;
      //this.remise = value.remise;
    }); */
   }


   snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
   articleForm = new FormGroup({
     codeArticle: new FormControl(null,Validators.required),
     quantiteInventaire: new FormControl(null,Validators.required),
     designation: new FormControl(null,Validators.required),
   });
   listArticle: Article[] = [];
   quantiteInventaire:null;
   designation:null; 
 

   displayNotification(notification: string) {
     setTimeout(() => {
       this.snackBar.open(notification, 'X', {duration: 3000});
     }, 800);
   }
 
   ngOnInit(): void {
     this.articleForm.controls.codeArticle.valueChanges.subscribe(value => {
       console.log(value);
       if (value.quantiteInventaire != null) {
         this.quantiteInventaire = value.quantiteInventaire;
       }
       if (value.designation != null) {
         this.designation = value.designation;
       }
       this.designation = value.designation;
       this.quantiteInventaire = value.quantiteInventaire;
       
     });
      }
 
 
      onCancel() {
       this.dialogRef.close();
     }
     onConfirm() {
 
       if (this.articleForm.valid) {
 
         this.dialogRef.close({
          quantiteInventaire: this.articleForm.value.quantiteInventaire,
           id:  null , 
           regulationStock:null,
           codeArticle : this.articleForm.value.codeArticle
 
         });
         console.log(this.articleForm);
 
       }
     }
    closeDialog(): void {
     this.dialogRef.close();
   }
/* 
  //Filtre article 
changeArticle(value){
  console.log(value)
  
  
  if(this.sousFamilleControl.value!=null ) 
  {
  this.Stock.getArticleBySousFamille(value.sousFamille).subscribe(value=>{
    console.log(value)
    this.listArticle = value;
    console.log(this.listArticle)
      })
    }
    else if(this.familleControl.value!=null ) 
    {
     
    this.Stock.getArticleByFamille(value.famille).subscribe(value=>{
      console.log(value)
      this.listArticle = value;
      console.log(this.listArticle)
        })
      }

      else if(this.familleControl.value!=null && this.sousFamilleControl.value!=null ) 
      {
      
      this.Stock.getArticleByFamilleSousFamille(value.famille,value.sousFamille).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })
        }

        else if(this.familleControl.value!=null && this.marqueControl.value!=null ) 
      {
       
      this.Stock.getArticleByFamilleMarque(value.famille,value.marque).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })
        }

        else if(this.familleControl.value!=null && this.typeControl.value!=null ) 
      {
       
      this.Stock.getArticleByFamilleType(value.famille,value.type).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })
        }
    else if(this.typeControl.value!=null )
  {
  this.Stock.getArticleByType(value.designation).subscribe(value=>{
    console.log(value)
    this.listArticle = value;
    console.log(this.listArticle)
      })
    }
    else if(this.marqueControl.value!=null)
  {
  this.Stock.getArticleByMarque(value.designation).subscribe(value=>{
    console.log(value)
    this.listArticle = value;
    console.log(this.listArticle)
      })
    }
    else if(this.genreControl.value!=null )
  {
  this.Stock.getArticleByGenre(value.designation).subscribe(value=>{
    console.log(value)
    this.listArticle = value;
    console.log(this.listArticle)
      })
    }
    else if(this.genreControl.value!=null && this.sousFamilleControl.value!=null && this.marqueControl.value==null && this.typeControl.value ==null )
  {
 this.changeArticleParDoubleGS(this.genreControl.value,this.sousFamilleControl.value )
    }
  else if(this.genreControl.value!=null && this.marqueControl.value ==null && this.typeControl.value!=null && this.sousFamilleControl.value==null)
    {
   this.changeArticleParDoubleGT(this.genreControl.value,this.typeControl.value)
      }
  else if(this.genreControl.value!=null && this.marqueControl.value!=null && this.sousFamilleControl.value!=null && this.typeControl.value!=null)
    {
   this.changeArticleParDoubleGM(this.genreControl.value,this.marqueControl.value)
      }
  else if(this.sousFamilleControl.value!=null && this.typeControl.value!=null && this.marqueControl==null && this.genreControl==null)
      {
  this.changeArticleParDoubleTS(this.typeControl.value,this.sousFamilleControl.value)
        }
  else if(this.sousFamilleControl.value!=null && this.marqueControl.value!=null && this.genreControl.value==null && this.typeControl.value==null)
  {
  this.changeArticleParDoubleSM(this.sousFamilleControl.value,this.marqueControl.value)
  }

  else if(this.marqueControl.value!=null && this.typeControl.value!=null &&this.sousFamilleControl.value==null && this.genreControl.value==null)
    {
   this.changeArticleParDoubleMT(this.marqueControl.value,this.typeControl.value)
      }
 
 else if(this.marqueControl.value!=null && this.typeControl.value!=null && this.sousFamilleControl.value!=null && this.genreControl.value==null)
 {
this.changeArticleParSMT(this.marqueControl.value,this.typeControl.value,this.sousFamilleControl.value)
   }
else if(this.genreControl.value!=null && this.typeControl.value!=null && this.sousFamilleControl.value!=null && this.marqueControl.value==null)
   {
  this.changeArticleParGST(this.genreControl.value,this.typeControl.value,this.sousFamilleControl.value)
     }
else if(this.marqueControl.value!=null && this.genreControl.value!=null && this.sousFamilleControl.value!=null && this.typeControl.value==null)
  {
this.changeArticleParGSM(this.marqueControl.value,this.genreControl.value,this.sousFamilleControl.value)
}      
else if(this.marqueControl.value!=null && this.typeControl.value!=null && this.genreControl.value!=null && this.sousFamilleControl.value==null)
{
this.changeArticleParDoubleGMT(this.marqueControl.value,this.typeControl.value,this.genreControl.value)
  }
else if(this.marqueControl.value!=null && this.typeControl.value!=null && this.sousFamilleControl.value!=null && this.genreControl.value !=null)
  {
this.changeArticleParTouts(this.marqueControl.value,this.typeControl.value,this.sousFamilleControl.value,this.genreControl.value)
    }
}
changeArticleParDoubleGS(value1, value) {
  
  this.Stock.getArticleByGenreSousFamilles(value1.designation,value.sousFamille).subscribe(value=>{
    console.log(value)
    this.listArticle = value;
    console.log(this.listArticle)
      })
    }

changeArticleParDoubleGT(value1, value) {
      this.Stock.getArticleByGenreType(value1.designation,value.sousFamille).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })      }
changeArticleParDoubleGM(value1, value) {
      this.Stock.getArticleByGenreMarque(value1.designation,value.sousFamille).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })      }
changeArticleParDoubleTS(value1, value) {
      this.Stock.getArticleBySousFamilleType(value1.designation,value.sousFamille).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })      }
changeArticleParDoubleSM(value, value1) {
      this.Stock.getArticleBySousFamilleMarque(value1.designation,value.sousFamille).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })      }
changeArticleParDoubleMT(value1, value) {
      this.Stock.getArticleBymarqueType(value1.designation,value.sousFamille).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })
        }
changeArticleParGSM(value1, value,value2) {
this.Stock.getArticleByGenreSousFamillemarque(value1.designation,value.sousFamille,value2.designation).subscribe(value=>{
console.log(value)
this.listArticle = value;
console.log(this.listArticle)
              })
  }
changeArticleParGST(value1, value,value2) {
this.Stock.getArticleBySousFamilleGenreType(value1.designation,value.sousFamille,value2.designation).subscribe(value=>{
console.log(value)
this.listArticle = value;
console.log(this.listArticle)
  })
  }
changeArticleParSMT(value1, value,value2) {
this.Stock.getArticleBySousFamilleMarqueType(value1.designation,value.sousFamille,value2.designation).subscribe(value=>{
console.log(value)
this.listArticle = value;
console.log(this.listArticle)
})
}
changeArticleParDoubleGMT(value1, value ,value2) {
this.Stock.getArticleByGenreMarqueType(value1.designation,value.sousFamille,value2.designation).subscribe(value=>{
console.log(value)
this.listArticle = value;
console.log(this.listArticle)
})
}
changeArticleParTouts(value1, value ,value2,value3) {
this.Stock.getArticleByTouts(value1.designation,value.sousFamille,value2.designation,value3.designation).subscribe(value=>{
console.log(value)
this.listArticle = value;
console.log(this.listArticle)
})
} */
}
