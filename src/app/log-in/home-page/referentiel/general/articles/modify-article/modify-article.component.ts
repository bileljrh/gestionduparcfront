import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UpdateArticle} from '../update-article';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FamilleArticle} from '../famille-article';
import {SousFamilleArticle} from '../sous-famille-article';
import {MarqueVehicule} from '../../parametres-vehicules/marque-vehicule/marque-vehicule';
import {GenreVehicule} from '../../parametres-vehicules/genre-vehicule/genre-vehicule';
import {TypeVehicule} from '../../parametres-vehicules/type-vehicule/type-vehicule';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import moment from 'moment';
import {TVA} from '../../parametres-generaux/tva/tva';
import {ReferentielSpecifiqueServiceService} from '../../../specifique/referentiel-specifique-service.service';
import {UGP} from '../../../specifique/unite-gestion-parc/ugp';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Subscription} from 'rxjs';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-modify-article',
  templateUrl: './modify-article.component.html',
  styleUrls: ['./modify-article.component.scss']
})
export class ModifyArticleComponent implements OnInit, OnDestroy {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  modifiedArticle: UpdateArticle = {
    id: null,
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
  modifiedArticleForm = new FormGroup({
    ugp: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    quantiteStock: new FormControl(null, Validators.required),
    prix: new FormControl(null, Validators.required),
    famille: new FormControl(null, Validators.required),
    sousFamille: new FormControl(null),
    genre: new FormControl(null, Validators.required),
    marque: new FormControl(null, Validators.required),
    typeArticle: new FormControl(null, Validators.required),
    dateAjout: new FormControl(new Date(), Validators.required),
    codeArticle: new FormControl(null, Validators.required),
    tva: new FormControl(null),
    remise: new FormControl(null, Validators.required),
    quantiteLivree: new FormControl(null, Validators.required),
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

  listFamille: FamilleArticle[] = [];
  listSousFamille: SousFamilleArticle[] = [];
  listMarque: MarqueVehicule[] = [];
  listGenre: GenreVehicule[] = [];
  listType: TypeVehicule[] = [];
  listTVA: TVA[] = [];
  listUGP: UGP[] = [];
  codeFamille = '';
  codeSousFamille = '';
  private subscriptions: Subscription[] = [];

  constructor(public dialogRef: MatDialogRef<ModifyArticleComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private ReferentielGenerale: ReferentielGeneraleServiceService, private ReferentielSpecifique: ReferentielSpecifiqueServiceService, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.subscriptions.push(this.modifiedArticleForm.controls.famille.valueChanges.subscribe(value => {
      this.listSousFamille = value.sousFamilles;
    }));
    this.subscriptions.push(this.ReferentielSpecifique.getListUGP().subscribe(value => {
      this.listUGP = value;
      this.listUGP.forEach(value1 => {
        if (value1.id === data.element.ugp.id) {
          this.modifiedArticleForm.controls.ugp.patchValue(value1);
        }
      });
    }));
    this.subscriptions.push(this.ReferentielGenerale.getListFamilleArticle().subscribe(value => {
      this.listFamille = value;
      this.listFamille.forEach(value1 => {
        if (value1.id === data.element.sousFamille.famille.id) {
          this.modifiedArticleForm.controls.famille.patchValue(value1);
          this.codeFamille = value1.code;
          value1.sousFamilles.forEach(value2 => {
            if (value2.id === data.element.sousFamille.id) {
              this.modifiedArticleForm.controls.sousFamille.patchValue(value2);
              this.codeSousFamille = value2.code;
            }
          });
        }
      });
    }));
    this.subscriptions.push(this.ReferentielGenerale.ListSousFamilleArticle().subscribe(value => {
      this.listSousFamille = value;
      this.listSousFamille.forEach(value1 => {
        if (value1.id === data.element.sousFamille.id) {
          this.modifiedArticleForm.controls.sousFamille.patchValue(value1);
        }
      });
    }));
    this.subscriptions.push(this.ReferentielGenerale.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.listMarque = value;
      this.listMarque.forEach(value1 => {
        if (value1.id === data.element.marqueVehicule.id) {
          this.modifiedArticleForm.controls.marque.patchValue(value1);
        }
      });
    }));
    this.subscriptions.push(this.ReferentielGenerale.getListGenreVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.listGenre = value;
      this.listGenre.forEach(value1 => {
        if (value1.id === data.element.genreVehicule.id) {
          this.modifiedArticleForm.controls.genre.patchValue(value1);
        }
      });
    }));
    this.subscriptions.push(this.ReferentielGenerale.getListTypeVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.listType = value;
      this.listType.forEach(value1 => {
        if (value1.id === data.element.typeVehicule.id) {
          this.modifiedArticleForm.controls.typeArticle.patchValue(value1);
        }
      });
    }));
    this.subscriptions.push(this.ReferentielGenerale.getListTva().subscribe(value => {
      this.listTVA = value;
      this.listTVA.forEach(value1 => {
        if (value1.tva === data.element.tva) {
          this.modifiedArticleForm.controls.tva.patchValue(value1.tva);
        }
      });
    }));
    this.modifiedArticleForm.controls.designation.patchValue(data.element.designation);
    this.modifiedArticleForm.controls.quantiteStock.patchValue(data.element.quantiteStock);
    this.modifiedArticleForm.controls.prix.patchValue(data.element.prix);
    this.modifiedArticleForm.controls.dateAjout.patchValue(data.element.dateAjout);
    this.modifiedArticleForm.controls.codeArticle.patchValue(data.element.codeArticle);
    this.modifiedArticleForm.controls.remise.patchValue(data.element.remise);
    this.modifiedArticleForm.controls.quantiteLivree.patchValue(data.element.quantiteLivree);
    this.modifiedArticleForm.controls.famille.patchValue(data.element.famille);
    this.modifiedArticleForm.controls.sousFamille.patchValue(data.element.sousFamille);
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.modifiedArticleForm.controls.famille.valueChanges.subscribe(value => {
      this.codeSousFamille = '';
      this.codeFamille = value.code;
      this.modifiedArticleForm.controls.sousFamille.reset({eventEmitter: false});
      this.listSousFamille = value.sousFamilles;
    }));
    this.subscriptions.push(this.modifiedArticleForm.controls.sousFamille.valueChanges.subscribe(value => {
      this.codeSousFamille = value.code;
    }));
    this.subscriptions.push(this.modifiedArticleForm.controls.marque.valueChanges.subscribe(value => {
      this.modifiedArticleForm.controls.typeArticle.reset({eventEmitter: false});
      this.listType = value.types;
    }));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedArticleForm.valid) {
      this.modifiedArticle = {
        id: this.data.element.id,
        dateAjout: moment(this.modifiedArticleForm.value.dateAjout as Date).format('YYYY-MM-DD'),
        designation: this.modifiedArticleForm.value.designation,
        idSousFamille: this.modifiedArticleForm.value.sousFamille.id,
        idGenreVehicule: this.modifiedArticleForm.value.genre.id,
        idMarqueVehicule: this.modifiedArticleForm.value.marque.id,
        prix: this.modifiedArticleForm.value.prix,
        quantiteStock: this.modifiedArticleForm.value.quantiteStock,
        idTypeVehicule: this.modifiedArticleForm.value.typeArticle.id,
        idUgp: this.modifiedArticleForm.value.ugp.id,
        codeArticle: this.modifiedArticleForm.value.codeArticle,
        tva: this.modifiedArticleForm.value.tva,
        remise: this.modifiedArticleForm.value.remise,
        quantiteLivree: this.modifiedArticleForm.value.quantiteLivree,
        alertStock :this.modifiedArticleForm.value.alertStock

      };
      this.dialogRef.close(this.modifiedArticle);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => {
      value.unsubscribe();
    });
  }

}
