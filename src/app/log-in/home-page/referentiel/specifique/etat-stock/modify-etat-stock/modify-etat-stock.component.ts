import {Component, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EtatStock} from '../etat-stock';
import {Article} from '../../../general/articles/article';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReferentielGeneraleServiceService} from '../../../general/referentiel-generale-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-modify-etat-stock',
  templateUrl: './modify-etat-stock.component.html',
  styleUrls: ['./modify-etat-stock.component.scss']
})
export class ModifyEtatStockComponent implements OnDestroy {
  subscription: Subscription[] = [];
  modifiedEtatStockForm = new FormGroup({
    chapitre: new FormControl(null, Validators.required),
    time: new FormControl(null, Validators.required),
    article: new FormControl(null, Validators.required),
    paragraphe: new FormControl(null, Validators.required),
    region: new FormControl(null, Validators.required),
    sousParagraphe: new FormControl(null, Validators.required)
  });
  modifiedEtatStock: EtatStock = {id: null, article: undefined, chapitre: '', paragraphe: '', region: '', sousParagraphe: '', time: ''};
  ListArticle: Article[] = [];
  codeArticle = '';

  constructor(public dialogRef: MatDialogRef<ModifyEtatStockComponent>, private Referentiel: ReferentielGeneraleServiceService, @Inject(MAT_DIALOG_DATA) public data) {
    this.subscription.push(this.Referentiel.getListArticleByUGP('AllUGP').subscribe(value => {
      this.ListArticle = value;
      this.ListArticle.forEach(value1 => {
        if (value1.id === data.element.article.id) {
          this.modifiedEtatStockForm.controls.article.patchValue(value1);
        }
      });
    }));
    this.modifiedEtatStockForm.controls.chapitre.patchValue(data.element.chapitre);
    this.modifiedEtatStockForm.controls.time.patchValue(data.element.time);
    this.modifiedEtatStockForm.controls.article.patchValue(data.element.article);
    this.modifiedEtatStockForm.controls.paragraphe.patchValue(data.element.paragraphe);
    this.modifiedEtatStockForm.controls.region.patchValue(data.element.region);
    this.modifiedEtatStockForm.controls.sousParagraphe.patchValue(data.element.sousParagraphe);
    this.subscription.push(this.modifiedEtatStockForm.controls.article.valueChanges.subscribe(value => {
      this.codeArticle = value.codeArticle;
    }));
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedEtatStockForm.valid) {
      this.modifiedEtatStock = {
        id: this.data.element.id,
        article: this.modifiedEtatStockForm.value.article,
        chapitre: this.modifiedEtatStockForm.value.chapitre,
        paragraphe: this.modifiedEtatStockForm.value.paragraphe,
        region: this.modifiedEtatStockForm.value.region,
        sousParagraphe: this.modifiedEtatStockForm.value.sousParagraphe,
        time: this.modifiedEtatStockForm.value.time
      };
      this.dialogRef.close(this.modifiedEtatStock);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }


}
