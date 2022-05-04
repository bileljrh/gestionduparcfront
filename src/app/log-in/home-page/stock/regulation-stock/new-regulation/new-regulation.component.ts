
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from '../../../referentiel/general/articles/article';
import { map, startWith } from 'rxjs/operators';
import { RegulationArticleStock } from '../../RegulationArticleStock';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { StockServiceService } from '../../stock-service.service';
import { ReferentielGeneraleServiceService } from '../../../referentiel/general/referentiel-generale-service.service';
import { Magasin } from '../../../referentiel/specifique/unite-gestion-parc/magasin';
import { UGP } from '../../../referentiel/specifique/unite-gestion-parc/ugp';


@Component({
  selector: 'app-new-regulation',
  templateUrl: './new-regulation.component.html',
  styleUrls: ['./new-regulation.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [MatSnackBar]
})
export class NewRegulationComponent implements OnInit {

  expandedElement: RegulationArticleStock[] | null;

  type_mouvement: string;

  typeMouvements: string[] = ['Entrée', 'Sortie'];
  article: Article ; 
  articles: Article[] = [];
  magasins: Magasin[] = [];
  quantiteStock: number = null;

  ugps: UGP[] = [];

  regulationArticleForm = new FormGroup({
    'articleForm': new FormControl(null),
    'quantite_modifierForm': new FormControl(null),
    'type_mouvementForm': new FormControl(null),
    'observationForm': new FormControl(null),

  });

  itemPerPage = new FormControl(null);


  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  regulationArticle: RegulationArticleStock = new RegulationArticleStock();
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10

  };

  constructor( private Referentiel: ReferentielGeneraleServiceService, private stockServiceService: StockServiceService, public dialog: MatDialog, private refirencielService: ReferentielGeneraleServiceService, private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, public dialogRef: MatDialogRef<NewRegulationComponent>)
  {
    this.ngxLoader.start();
    this.getItemsMagasin();
    this.Referentiel.getListArticleByUGP('ugp').subscribe(value => {
      this.articles = value;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
    this.regulationArticleForm.controls.articleForm.valueChanges.subscribe(value => {
      this.regulationArticleForm.controls.articleForm
      this.quantiteStock =  this.article.quantiteStock;
    });
    this.ngxLoader.stop();

  }
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith('')
    );

    this.regulationArticleForm.controls.articleForm.valueChanges.subscribe(value => {
      this.quantiteStock =  this.article.quantiteStock;
    });

  }

  getItemsMagasin() {
    this.stockServiceService.getAllMagasins().subscribe(value => {
      console.log(value);
      this.magasins = value;

    });
  }

  getItemsUgp() {

    this.stockServiceService.getAllUgps().subscribe(value => {
      console.log(value);
      this.ugps = value;


    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelAdding() {
    this.dialogRef.close();
  }

  onConfirmAdding() {

    if (this.regulationArticleForm.valid) {
      this.dialogRef.close({
        idArticle: this.regulationArticleForm.value.articleForm.id,
        codeArticle: this.regulationArticleForm.value.articleForm.codeArticle,
        quantite_modifier: this.regulationArticleForm.value.quantite_modifierForm,
        type_mouvement: this.regulationArticleForm.value.type_mouvementForm,
        observation: this.regulationArticleForm.value.observationForm,
      });
    }
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', { duration: 3000 });
    }, 800);
  }


}
