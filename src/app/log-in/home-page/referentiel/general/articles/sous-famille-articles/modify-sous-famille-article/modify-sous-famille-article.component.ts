import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReferentielGeneraleServiceService } from '../../../referentiel-generale-service.service';
import { FamilleArticle } from '../../famille-article';
import { SousFamilleArticle } from '../../sous-famille-article';

@Component({
  selector: 'app-modify-sous-Famille-article',
  templateUrl: './modify-sous-Famille-article.component.html',
  styleUrls: ['./modify-sous-Famille-article.component.scss']
})
export class ModifySousFamilleArticleComponent {
  listFamille: FamilleArticle[] = [];
  codeFamille = '';

  modifiedSousFamille: SousFamilleArticle = {
    code: '', 
    sousFamille: '',
    id: 0};
  modifiedSousFamilleForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    sousFamille: new FormControl(null, Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<ModifySousFamilleArticleComponent>,private ReferentielGenerale: ReferentielGeneraleServiceService,
     @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedSousFamilleForm.controls.code.patchValue(this.data.element.code);
    this.modifiedSousFamilleForm.controls.sousFamille.patchValue(this.data.element.sousFamille);
    

    this.ReferentielGenerale.getListFamilleArticle().subscribe(value => {
      this.listFamille = value;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
      this.modifiedSousFamille = {
        code: this.modifiedSousFamilleForm.value.code,
        sousFamille: this.modifiedSousFamilleForm.value.sousFamille,
        id: this.data.element.id
      };
      this.dialogRef.close(this.modifiedSousFamille);
    
  }


}
