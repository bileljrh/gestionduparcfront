import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FamilleArticle} from '../../../../referentiel/general/articles/famille-article';
import {SousFamilleArticle} from '../../../../referentiel/general/articles/sous-famille-article';
import {GenreVehicule} from '../../../../referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import {MarqueVehicule} from '../../../../referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import {TypeVehicule} from '../../../../referentiel/general/parametres-vehicules/type-vehicule/type-vehicule';
import {ReferentielGeneraleServiceService} from '../../../../referentiel/general/referentiel-generale-service.service';
import {AchatServiceService} from '../../../achat-service.service';

import {Article} from '../../../../referentiel/general/articles/article';
import {DemandeArticle} from '../../../demande-article';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-nouveau-article-bon-commande',
  templateUrl: './nouveau-article-bon-commande.component.html',
  styleUrls: ['./nouveau-article-bon-commande.component.scss']
})
export class NouveauArticleBonCommandeComponent  implements OnInit {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  codeArticle:string;
  sousFamille:string;
  familleControl = new FormControl(null);
  sousFamilleControl = new FormControl(null);
  genreControl = new FormControl(null);
  marqueControl = new FormControl(null);
  typeControl = new FormControl(null);
  nouvelArticleForm = new FormGroup({
    codeArticle: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    quantiteCommandee: new FormControl(0, [Validators.required, Validators.min(1)]),
    quantiteLivree: new FormControl(0)
  });
  get f() { return this.nouvelArticleForm.controls; }
  listFamille: FamilleArticle[] = [];
  listSousFamille: SousFamilleArticle[] = [];
  listGenre: GenreVehicule[] = [];
  listMarque: MarqueVehicule[] = [];
  listType: TypeVehicule[] = [];
  listArticle: Article[] = [];
  quantiteCommandee: number = null;
  prixUnitaire: number = null;
  tva: number = null;
  remise: number = null;
  nouveauDemandeArticle: DemandeArticle = {article: null, quantiteCommandee: 0, quantiteLivree: 0};

  constructor(public dialogRef: MatDialogRef<NouveauArticleBonCommandeComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private Referentiel: ReferentielGeneraleServiceService,
  private achat: AchatServiceService) {
    this.Referentiel.getListFamilleArticle().subscribe(value => {
      this.listFamille = value;
    });
    this.Referentiel.getListSousFamilleArticle().subscribe(value => {
      this.listSousFamille = value;
    });
    this.Referentiel.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.listMarque = value;
    });
    this.Referentiel.getListTypeVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.listType = value;
    });
    this.Referentiel.getListGenreVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.listGenre = value;
    });
    this.Referentiel.articleList().subscribe(value => {
      this.listArticle = value;
    });
   
    this.nouvelArticleForm.controls.designation.valueChanges.subscribe(value => {
      this.nouvelArticleForm.controls.codeArticle.setValue(value, {emitEvent: false});
      this.prixUnitaire = value.prix;
      this.tva = value.tva;
      this.remise = value.remise;
    });
    this.nouvelArticleForm.controls.codeArticle.valueChanges.subscribe(value => {
      this.nouvelArticleForm.controls.designation.setValue(value, {emitEvent: false});
      this.prixUnitaire = value.prix;
      this.tva = value.tva;
      this.remise = value.remise;
    });
  }
  ngOnInit(): void {
   
  }
  changeArticle(value){
    console.log(value)
  
    if(this.sousFamilleControl.value!=null ) 
    {
    this.achat.getArticleBySousFamille(value.sousFamille).subscribe(value=>{
      console.log(value)
      this.listArticle = value;
      console.log(this.listArticle)
        })
      }
      else if(this.familleControl.value!=null ) 
    {
     
    this.achat.getArticleByFamille(value.famille).subscribe(value=>{
      console.log(value)
      this.listArticle = value;
      console.log(this.listArticle)
        })
      }

      else if(this.familleControl.value!=null && this.sousFamilleControl.value!=null ) 
      {
      
      this.achat.getArticleByFamilleSousFamille(value.famille,value.sousFamille).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })
        }

        else if(this.familleControl.value!=null && this.marqueControl.value!=null ) 
      {
       
      this.achat.getArticleByFamilleMarque(value.famille,value.marque).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })
        }

        else if(this.familleControl.value!=null && this.typeControl.value!=null ) 
      {
       
      this.achat.getArticleByFamilleType(value.famille,value.type).subscribe(value=>{
        console.log(value)
        this.listArticle = value;
        console.log(this.listArticle)
          })
        }
      else if(this.typeControl.value!=null )
    {
    this.achat.getArticleByType(value.designation).subscribe(value=>{
      console.log(value)
      this.listArticle = value;
      console.log(this.listArticle)
        })
      }
      else if(this.marqueControl.value!=null )
    {
    this.achat.getArticleByMarque(value.designation).subscribe(value=>{
      console.log(value)
      this.listArticle = value;
      console.log(this.listArticle)
        })
      }
      else if(this.genreControl.value!=null )
    {
    this.achat.getArticleByGenre(value.designation).subscribe(value=>{
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
    
    this.achat.getArticleByGenreSousFamilles(value1.designation,value.sousFamille).subscribe(value=>{
      console.log(value)
      this.listArticle = value;
      console.log(this.listArticle)
        })
      }

  changeArticleParDoubleGT(value1, value) {
        this.achat.getArticleByGenreType(value1.designation,value.sousFamille).subscribe(value=>{
          console.log(value)
          this.listArticle = value;
          console.log(this.listArticle)
            })      }
  changeArticleParDoubleGM(value1, value) {
        this.achat.getArticleByGenreMarque(value1.designation,value.sousFamille).subscribe(value=>{
          console.log(value)
          this.listArticle = value;
          console.log(this.listArticle)
            })      }
  changeArticleParDoubleTS(value1, value) {
        this.achat.getArticleBySousFamilleType(value1.designation,value.sousFamille).subscribe(value=>{
          console.log(value)
          this.listArticle = value;
          console.log(this.listArticle)
            })      }
  changeArticleParDoubleSM(value, value1) {
        this.achat.getArticleBySousFamilleMarque(value1.designation,value.sousFamille).subscribe(value=>{
          console.log(value)
          this.listArticle = value;
          console.log(this.listArticle)
            })      }
  changeArticleParDoubleMT(value1, value) {
        this.achat.getArticleBymarqueType(value1.designation,value.sousFamille).subscribe(value=>{
          console.log(value)
          this.listArticle = value;
          console.log(this.listArticle)
            })
          }
  changeArticleParGSM(value1, value,value2) {
  this.achat.getArticleByGenreSousFamillemarque(value1.designation,value.sousFamille,value2.designation).subscribe(value=>{
  console.log(value)
  this.listArticle = value;
  console.log(this.listArticle)
                })
    }
  changeArticleParGST(value1, value,value2) {
  this.achat.getArticleBySousFamilleGenreType(value1.designation,value.sousFamille,value2.designation).subscribe(value=>{
  console.log(value)
  this.listArticle = value;
  console.log(this.listArticle)
    })
    }
  changeArticleParSMT(value1, value,value2) {
  this.achat.getArticleBySousFamilleMarqueType(value1.designation,value.sousFamille,value2.designation).subscribe(value=>{
  console.log(value)
  this.listArticle = value;
  console.log(this.listArticle)
  })
  }
changeArticleParDoubleGMT(value1, value ,value2) {
this.achat.getArticleByGenreMarqueType(value1.designation,value.sousFamille,value2.designation).subscribe(value=>{
console.log(value)
this.listArticle = value;
console.log(this.listArticle)
})
}
changeArticleParTouts(value1, value ,value2,value3) {
  this.achat.getArticleByTouts(value1.designation,value.sousFamille,value2.designation,value3.designation).subscribe(value=>{
  console.log(value)
  this.listArticle = value;
  console.log(this.listArticle)
  })
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
        quantiteCommandee: this.nouvelArticleForm.value.quantiteCommandee,
        quantiteLivree: this.nouvelArticleForm.value.quantiteLivree,
        article: this.nouvelArticleForm.value.codeArticle
      };
      this.dialogRef.close(this.nouveauDemandeArticle);
    }
  }

}
