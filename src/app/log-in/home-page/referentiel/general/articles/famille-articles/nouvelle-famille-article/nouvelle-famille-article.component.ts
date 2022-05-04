import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FamilleArticle} from '../../famille-article';

@Component({
  selector: 'app-nouvelle-famille-article',
  templateUrl: './nouvelle-famille-article.component.html',
  styleUrls: ['./nouvelle-famille-article.component.scss']
})
export class NouvelleFamilleArticleComponent {
  nouvelleFamilleForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    famille: new FormControl(null, Validators.required),
  });
  get f() { return this.nouvelleFamilleForm.controls; }
  nouvelleFamille: FamilleArticle = {code: '', famille: '', sousFamilles: []};

  constructor(public dialogRef: MatDialogRef<NouvelleFamilleArticleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouvelleFamilleForm.valid) {
      this.nouvelleFamille.code = this.nouvelleFamilleForm.value.code;
      this.nouvelleFamille.famille = this.nouvelleFamilleForm.value.famille;
      this.dialogRef.close(this.nouvelleFamille);
    }
  }

}
