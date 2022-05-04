import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DemandeArticle } from 'src/app/log-in/home-page/achat/demande-article';
import { BonTravailArticleExterne } from 'src/app/log-in/home-page/maintenance-et-reparation/BonTravailArticleExterne';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { Article } from 'src/app/log-in/home-page/referentiel/general/articles/article';
import { FamilleArticle } from 'src/app/log-in/home-page/referentiel/general/articles/famille-article';
import { SousFamilleArticle } from 'src/app/log-in/home-page/referentiel/general/articles/sous-famille-article';
import { GenreVehicule } from 'src/app/log-in/home-page/referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import { MarqueVehicule } from 'src/app/log-in/home-page/referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import { TypeVehicule } from 'src/app/log-in/home-page/referentiel/general/parametres-vehicules/type-vehicule/type-vehicule';
import { ReferentielGeneraleServiceService } from 'src/app/log-in/home-page/referentiel/general/referentiel-generale-service.service';
import { InventaireStock } from 'src/app/log-in/home-page/stock/inventaire-stock/nouveau-inventaire-stock/InventaieStock';
import { ArticleExterneForBonTravailComponent } from '../article-externe-for-bon-travail/article-externe-for-bon-travail.component';

@Component({
  selector: 'app-articles-externes-bon-travail',
  templateUrl: './articles-externes-bon-travail.component.html',
  styleUrls: ['./articles-externes-bon-travail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [MatSnackBar]
})
export class ArticlesExternesBonTravailComponent implements OnInit {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

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
    quantite: new FormControl(0),
    quantiteLivree:new FormControl(0)
  });
  listArticle: Article[] = [];
  listFamille: FamilleArticle[] = [];
  listSousFamille: SousFamilleArticle[] = [];
  listGenre: GenreVehicule[] = [];
  listMarque: MarqueVehicule[] = [];
  listType: TypeVehicule[] = [];


  lesArticles:[]=[];
  prixUnitaire: number = null;
  quantiteDispo: number = null;
  prixTotal:number=null;
  regulationForm: BonTravailArticleExterne = {
    externes:null,

    quantite:0,
    quantiteLivree:0

  }
  ;



  constructor(public dialogRef: MatDialogRef<ArticlesExternesBonTravailComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private Referentiel: ReferentielGeneraleServiceService)
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
    this.Referentiel.articleList().subscribe(value => {
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
    });
   }

   closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
  article:Article[];
  onConfirm() {
    if (this.nouvelArticleForm.valid) {
      this.regulationForm =
     {
       externes:this.nouvelArticleForm.value.codeArticle,

       quantite:this.nouvelArticleForm.value.quantite,
       quantiteLivree:this.nouvelArticleForm.value.quantiteLivree
      }

      
    }
    this.dialogRef.close(this.regulationForm);
    console.log("test reglsation form");
    
    console.log(this.regulationForm.externes);
    
  }
  ngOnInit(): void {
  }
}
