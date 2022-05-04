import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Article} from '../../../general/articles/article';
import {ReferentielGeneraleServiceService} from '../../../general/referentiel-generale-service.service';
import {EtatStock} from '../etat-stock';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-etat-stock',
  templateUrl: './new-etat-stock.component.html',
  styleUrls: ['./new-etat-stock.component.scss']
})
export class NewEtatStockComponent implements OnDestroy {
  subscription: Subscription[] = [];
  newEtatStockForm = new FormGroup({
    chapitre: new FormControl(null, Validators.required),
    time: new FormControl(null, Validators.required),
    article: new FormControl(null, Validators.required),
    paragraphe: new FormControl(null, Validators.required),
    region: new FormControl(null, Validators.required),
    sousParagraphe: new FormControl(null, Validators.required)
  });
  get f() { return this.newEtatStockForm.controls; }
  newEtatStock: EtatStock = {article: undefined, chapitre: '', paragraphe: '', region: '', sousParagraphe: '', time: ''};
  ListArticle: Article[] = [];
  codeArticle = '';

  constructor(public dialogRef: MatDialogRef<NewEtatStockComponent>, private Referentiel: ReferentielGeneraleServiceService) {
    this.subscription.push(this.Referentiel.getListArticleByUGP('AllUGP').subscribe(value => {
      this.ListArticle = value;
    }));
    this.subscription.push(this.newEtatStockForm.controls.article.valueChanges.subscribe(value => {
      this.codeArticle = value.codeArticle;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newEtatStockForm.valid) {
      this.newEtatStock = {
        article: this.newEtatStockForm.value.article,
        chapitre: this.newEtatStockForm.value.chapitre,
        paragraphe: this.newEtatStockForm.value.paragraphe,
        region: this.newEtatStockForm.value.region,
        sousParagraphe: this.newEtatStockForm.value.sousParagraphe,
        time: this.newEtatStockForm.value.time
      };
      this.dialogRef.close(this.newEtatStock);
    }
  }

}
