import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferentielGeneraleServiceService } from '../../referentiel-generale-service.service';
import moment from 'moment';
import { MarqueVehicule } from '../../parametres-vehicules/marque-vehicule/marque-vehicule';
import { GenreVehicule } from '../../parametres-vehicules/genre-vehicule/genre-vehicule';
import { TypeVehicule } from '../../parametres-vehicules/type-vehicule/type-vehicule';
import { SousFamilleArticle } from '../sous-famille-article';
import { FamilleArticle } from '../famille-article';
import { UpdateArticle } from '../update-article';
import { TVA } from '../../parametres-generaux/tva/tva';
import { UGP } from '../../../specifique/unite-gestion-parc/ugp';
import { ReferentielSpecifiqueServiceService } from '../../../specifique/referentiel-specifique-service.service';
import { Subscription } from 'rxjs';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-nouveau-article',
  templateUrl: './nouveau-article.component.html',
  styleUrls: ['./nouveau-article.component.scss']
})
export class NouveauArticleComponent implements OnDestroy {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  nouveauArticle: UpdateArticle = {

    dateAjout: '',
    designation: '',
    idGenreVehicule: null,
    idMarqueVehicule: null,
    idSousFamille: null,
    idTypeVehicule: null,
    prix: null,
    quantiteStock: null,
    idUgp: null,
    codeArticle: '',
    quantiteLivree: null,
    remise: null,
    tva: null,
   alertStock :null
  };

  nouvelArticleForm = new FormGroup({
    /*   ugp: new FormControl(null, [Validators.required]),
      designation: new FormControl(null, [Validators.required]),
      quantiteStock: new FormControl(null, [Validators.required]),
      // prix: new FormControl(null, [Validators.required]),
      famille: new FormControl(null, [Validators.required]),
      sousFamille: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      marque: new FormControl(null, [Validators.required]),
      typeArticle: new FormControl(null, [Validators.required]),
      dateAjout: new FormControl(new Date(), [Validators.required]),
      codeArticle: new FormControl(null, [Validators.required]),
      tva: new FormControl(null, [Validators.required]), */

    ugp: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    quantiteStock: new FormControl(null, [Validators.required]),
    // prix: new FormControl(null, [Validators.required]),
    // prix: new FormControl(null, [Validators.required]),
    famille: new FormControl(null, [Validators.required]),
    sousFamille: new FormControl(null, [Validators.required]),
    genre: new FormControl(null, [Validators.required]),
    marque: new FormControl(null, [Validators.required]),
    typeArticle: new FormControl(null, [Validators.required]),
    dateAjout: new FormControl(new Date(), [Validators.required]),
    codeArticle: new FormControl(null, [Validators.required]),
    //tva: new FormControl(null, [Validators.required]),
    alertStock :new FormControl(null, [Validators.required]),

  });



  // prix  réel avec 6 chiffre après la virgule
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,6}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  numberOnly(event): boolean {
    let value = event.target.value;
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = value;
    const position = event.target.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }


  get f() { return this.nouvelArticleForm.controls; }
  listFamille: FamilleArticle[] = [];
  listSousFamille: SousFamilleArticle[] = [];
  listMarque: MarqueVehicule[] = [];
  listGenre: GenreVehicule[] = [];
  listType: TypeVehicule[] = [];
  listTVA: TVA[] = [];
  listUGP: UGP[] = [];
  codeFamille: '';
  codeSousFamille: '';
  subscriptions: Subscription[] = [];


  constructor(public dialogRef: MatDialogRef<NouveauArticleComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private ReferentielGenerale: ReferentielGeneraleServiceService, private ReferentielSpecifique: ReferentielSpecifiqueServiceService) {
    this.subscriptions.push(this.ReferentielSpecifique.getListUGP().subscribe(value => {
      this.listUGP = value;
    }));
    this.subscriptions.push(this.ReferentielGenerale.getListFamilleArticle().subscribe(value => {
      this.listFamille = value;
    }));
    this.subscriptions.push(this.ReferentielGenerale.getListSousFamilleArticle().subscribe(value => {
      this.listSousFamille = value;
      this.subscriptions.push(this.ReferentielGenerale.ListSousFamilleArticle().subscribe(value => {
        this.listSousFamille = value;

      }));
      this.subscriptions.push(this.ReferentielGenerale.getListTypeVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
        this.listType = value;
      }));
      this.subscriptions.push(this.ReferentielGenerale.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
        this.listMarque = value;
      }));
      this.subscriptions.push(this.ReferentielGenerale.getListGenreVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
        this.listGenre = value;
      }));
      this.subscriptions.push(this.ReferentielGenerale.getListTva().subscribe(value => {
        this.listTVA = value;
      }));
      this.subscriptions.push(this.nouvelArticleForm.controls.famille.valueChanges.subscribe(value => {

        this.codeFamille = value.code;
      }));
      this.subscriptions.push(this.nouvelArticleForm.controls.sousFamille.valueChanges.subscribe(value => {
        this.codeSousFamille = value.code;

      }));
      this.subscriptions.push(this.nouvelArticleForm.controls.marque.valueChanges.subscribe(value => {
        this.nouvelArticleForm.controls.typeArticle.reset({ eventEmitter: false });
        this.listType = value.types;
      }));
    }));
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouvelArticleForm.valid) {
      console.log(this.nouvelArticleForm.value.sousFamille.id)
      this.nouveauArticle = {
        dateAjout: moment(this.nouvelArticleForm.value.dateAjout as Date).format('YYYY-MM-DD'),
        designation: this.nouvelArticleForm.value.designation,
        idSousFamille: this.nouvelArticleForm.value.sousFamille.id,
        idGenreVehicule: this.nouvelArticleForm.value.genre.id,
        idMarqueVehicule: this.nouvelArticleForm.value.marque.id,
        prix: null,
        quantiteStock: this.nouvelArticleForm.value.quantiteStock,
        idTypeVehicule: this.nouvelArticleForm.value.typeArticle.id,
        idUgp: this.nouvelArticleForm.value.ugp.id,
        codeArticle: this.nouvelArticleForm.value.codeArticle,
        tva: null,
        remise: this.nouvelArticleForm.value.remise,
        quantiteLivree: null,
        alertStock :this.nouvelArticleForm.value.alertStock
      };
      this.dialogRef.close(this.nouveauArticle);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => {
      value.unsubscribe();
    });
  }


}
