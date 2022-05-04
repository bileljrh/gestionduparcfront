import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { Article } from '../../../referentiel/general/articles/article';
import { FamilleArticle } from '../../../referentiel/general/articles/famille-article';
import { SousFamilleArticle } from '../../../referentiel/general/articles/sous-famille-article';
import { GenreVehicule } from '../../../referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import { MarqueVehicule } from '../../../referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import { TypeVehicule } from '../../../referentiel/general/parametres-vehicules/type-vehicule/type-vehicule';
import { ReferentielGeneraleServiceService } from '../../../referentiel/general/referentiel-generale-service.service';
import { StockServiceService } from '../../stock-service.service';
import { MagasinRotationNull } from '../MagasinRotationNull';

@Component({
  selector: 'app-nouveau-transfert-rotation-null',
  templateUrl: './nouveau-transfert-rotation-null.component.html',
  styleUrls: ['./nouveau-transfert-rotation-null.component.scss']
})
export class NouveauTransfertRotationNullComponent implements OnInit {

  demandeRechargeSousCompte: MagasinRotationNull[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  demandeRecharge: MagasinRotationNull ;
  carburantList: string[] = ['essence', 'gazole',  'huile végétale', 'biodiesel', 'bioéthanol', 'algocarburant', 'biogaz'];
  demandeRechargeSousCompteList: MagasinRotationNull[] = [];
  etatCarteActuel: string;
  listFamille: FamilleArticle[] = [];
  listSousFamille: SousFamilleArticle[] = [];
  listGenre: GenreVehicule[] = [];  
  listMarque: MarqueVehicule[] = [];
  listType: TypeVehicule[] = [];
  listArticle: Article[] = [];
  familleControl = new FormControl(null);
  sousFamilleControl = new FormControl(null);
  genreControl = new FormControl(null);
  marqueControl = new FormControl(null);
  typeControl = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };

  nouvelArticleForm = new FormGroup({
    'codeArticle': new FormControl(null, Validators.required),
    'designation': new FormControl(null, Validators.required)
  });
  snackBar: any;
  get f() { return this.nouvelArticleForm.controls; }

  numCarte: number ; 
  itemPerPage = new FormControl(null);
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialogRef: MatDialogRef<NouveauTransfertRotationNullComponent>, 
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
     private Referentiel: ReferentielGeneraleServiceService,
     private Stock:StockServiceService,
     )
   {
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
     
    this.Referentiel.getListArticleByUGP('ugp').subscribe(value => {
      this.listArticle = value;
    });
    this.nouvelArticleForm.controls.designation.valueChanges.subscribe(value => {
      this.nouvelArticleForm.controls.codeArticle.setValue(value, {emitEvent: false});
     
    });
    this.nouvelArticleForm.controls.codeArticle.valueChanges.subscribe(value => {
      this.nouvelArticleForm.controls.designation.setValue(value, {emitEvent: false});
    

      //this.tva = value.tva;
      //this.remise = value.remise;
    });
   }

  ngOnInit(): void {
    
}

 

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouvelArticleForm.valid) {
 
      console.log(this.demandeRechargeSousCompte);
      this.dialogRef.close({
        codeArticle: this.nouvelArticleForm.value.codeArticle.codeArticle,
        designation: this.nouvelArticleForm.value.designation.designation,
      
      });

    }
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }


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
}
   closeDialog(): void {
    this.dialogRef.close();
  }
}
