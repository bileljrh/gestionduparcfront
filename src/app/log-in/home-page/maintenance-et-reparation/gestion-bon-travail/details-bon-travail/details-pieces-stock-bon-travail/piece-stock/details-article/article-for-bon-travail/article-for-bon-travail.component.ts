import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ArticleBon } from 'src/app/log-in/home-page/maintenance-et-reparation/ArticleBon';
import { BonDeTravail } from 'src/app/log-in/home-page/maintenance-et-reparation/BonDeTravail';
import { BonTravailArticle } from 'src/app/log-in/home-page/maintenance-et-reparation/BonTravailArticle';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { Article } from 'src/app/log-in/home-page/referentiel/general/articles/article';
import { FamilleArticle } from 'src/app/log-in/home-page/referentiel/general/articles/famille-article';
import { SousFamilleArticle } from 'src/app/log-in/home-page/referentiel/general/articles/sous-famille-article';
import { GenreVehicule } from 'src/app/log-in/home-page/referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import { MarqueVehicule } from 'src/app/log-in/home-page/referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import { TypeVehicule } from 'src/app/log-in/home-page/referentiel/general/parametres-vehicules/type-vehicule/type-vehicule';
import { ReferentielGeneraleServiceService } from 'src/app/log-in/home-page/referentiel/general/referentiel-generale-service.service';
import { InventaireStock } from 'src/app/log-in/home-page/stock/inventaire-stock/nouveau-inventaire-stock/InventaieStock';

@Component({
  selector: 'app-article-for-bon-travail',
  templateUrl: './article-for-bon-travail.component.html',
  styleUrls: ['./article-for-bon-travail.component.scss']
})
export class ArticleForBonTravailComponent implements OnInit {

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
  //listArticle: Article[] = [];
  listFamille: FamilleArticle[] = [];
  listSousFamille: SousFamilleArticle[] = [];
  listGenre: GenreVehicule[] = [];
  listMarque: MarqueVehicule[] = [];
  listType: TypeVehicule[] = [];


  lesArticles:[]=[];
  prixUnitaire: number = null;
  quantiteDispo: number = null;
  prixTotal:number=null;
  regulationForm: BonTravailArticle = {
    articles:null,

    quantite:0,
    quantiteLivree:0

  }
  ;
  formControl = new FormControl();
  autoFilter: Observable<Article[]>;
  listArticle: Article[] = [];
  filteredOptions: Observable<Article[]>;
  myControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<ArticleForBonTravailComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private Referentiel: ReferentielGeneraleServiceService)
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
      this.prixTotal=(value.prix * value.tva);
    });
    this.nouvelArticleForm.controls.codeArticle.valueChanges.subscribe(value => {
      this.nouvelArticleForm.controls.designation.setValue(value, {emitEvent: false});
      this.prixUnitaire = value.prix;
      this.quantiteDispo=value.quantiteStock;
      this.prixTotal=(value.prix * value.tva);
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
       articles:this.nouvelArticleForm.value.codeArticle,
       quantite:this.nouvelArticleForm.value.quantite,
       quantiteLivree:this.nouvelArticleForm.value.quantiteLivree
      }      
    }
    this.dialogRef.close(this.regulationForm);
    console.log("test autocomplete !!");
    console.log(this.regulationForm);   
  }
  ngOnInit(): void {
    this.filteredOptions = this.nouvelArticleForm.controls.codeArticle.valueChanges.pipe(
      map(value => this._filter(value)),
    ); 

  }

  private _filter(code): Article[] {
    const filterValue = code+'';
    return this.listArticle.filter(option =>{
     let stropt =   option.codeArticle+''
    return stropt.startsWith(filterValue)});
  }

  public displayProperty(value) {
    if (value) {
      return value.designation;
    }
  }
  

}
