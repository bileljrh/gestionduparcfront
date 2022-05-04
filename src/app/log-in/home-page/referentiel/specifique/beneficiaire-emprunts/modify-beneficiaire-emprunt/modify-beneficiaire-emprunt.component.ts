import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BeneficiaireEmprunt} from '../beneficiaire-emprunt';

@Component({
  selector: 'app-modify-beneficiaire-emprunt',
  templateUrl: './modify-beneficiaire-emprunt.component.html',
  styleUrls: ['./modify-beneficiaire-emprunt.component.scss']
})
export class ModifyBeneficiaireEmpruntComponent {

  modifiedBeneficiaire: BeneficiaireEmprunt = {id: null, code: '', nomBeneficiaire: ''};
  modifiedBeneficiaireForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    nomBeneficiaire: new FormControl(null, Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<ModifyBeneficiaireEmpruntComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedBeneficiaireForm.controls.code.patchValue(data.element.code);
    this.modifiedBeneficiaireForm.controls.nomBeneficiaire.patchValue(data.element.nomBeneficiaire);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedBeneficiaireForm.valid) {
      this.modifiedBeneficiaire = {
        id: this.data.element.id,
        code: this.modifiedBeneficiaireForm.value.code,
        nomBeneficiaire: this.modifiedBeneficiaireForm.value.nomBeneficiaire,
      };
      this.dialogRef.close(this.modifiedBeneficiaire);
    }
  }
}
