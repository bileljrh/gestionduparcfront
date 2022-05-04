import {Component, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FamilleArticle} from '../../famille-article';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReferentielGeneraleServiceService} from '../../../referentiel-generale-service.service';
import {SousFamilleArticle} from '../../sous-famille-article';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nouvelle-sous-famille-article',
  templateUrl: './nouvelle-sous-famille-article.component.html',
  styleUrls: ['./nouvelle-sous-famille-article.component.scss']
})
export class NouvelleSousFamilleArticleComponent implements OnDestroy {
  nouvelleSousFamilleForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    famille: new FormControl(null, Validators.required),
    sousFamille: new FormControl(null, Validators.required),
  });
  
  get f() { return this.nouvelleSousFamilleForm.controls; }
  nouvelleSousFamille: SousFamilleArticle = {code: '', sousFamille: '', famille: null};
  listFamille: FamilleArticle[] = [];
  codeFamille = '';
  subscription: Subscription[] = [];

  constructor(public dialogRef: MatDialogRef<NouvelleSousFamilleArticleComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private ReferentielGenerale: ReferentielGeneraleServiceService) {
    this.subscription.push(ReferentielGenerale.getListFamilleArticle().subscribe(value => {
      this.listFamille = value;
    }));
    this.subscription.push(this.nouvelleSousFamilleForm.controls.famille.valueChanges.subscribe(value => {
      this.codeFamille = value.code;
    }));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouvelleSousFamilleForm.valid) {
      this.nouvelleSousFamille.code = this.nouvelleSousFamilleForm.value.code;
      this.nouvelleSousFamille.sousFamille = this.nouvelleSousFamilleForm.value.sousFamille;
      this.nouvelleSousFamille.famille = this.nouvelleSousFamilleForm.value.famille;
      this.dialogRef.close({id: this.nouvelleSousFamilleForm.value.famille, sousFamille: this.nouvelleSousFamille});
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }
}
