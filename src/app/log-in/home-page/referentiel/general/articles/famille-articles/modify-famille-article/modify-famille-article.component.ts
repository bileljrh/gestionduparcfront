import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FamilleArticle} from '../../famille-article';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modify-famille-article',
  templateUrl: './modify-famille-article.component.html',
  styleUrls: ['./modify-famille-article.component.scss']
})
export class ModifyFamilleArticleComponent {
  listFamille: FamilleArticle[] = [];
  modifiedFamille: FamilleArticle = {
    code: '', 
    famille: '',
    id: 0};
  modifiedFamilleForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    famille: new FormControl(null, Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<ModifyFamilleArticleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedFamilleForm.controls.code.patchValue(this.data.element.code);
    this.modifiedFamilleForm.controls.famille.patchValue(this.data.element.famille);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedFamilleForm.valid) {
      this.modifiedFamille = {
        code: this.modifiedFamilleForm.value.code,
        famille: this.modifiedFamilleForm.value.famille,
        id: this.data.element.id
      };
      this.dialogRef.close(this.modifiedFamille);
    }
  }

}
