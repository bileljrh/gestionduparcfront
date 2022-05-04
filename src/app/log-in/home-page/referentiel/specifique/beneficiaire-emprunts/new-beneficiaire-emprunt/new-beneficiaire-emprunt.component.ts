import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {BeneficiaireEmprunt} from '../beneficiaire-emprunt';

@Component({
  selector: 'app-new-beneficiaire-emprunt',
  templateUrl: './new-beneficiaire-emprunt.component.html',
  styleUrls: ['./new-beneficiaire-emprunt.component.scss']
})
export class NewBeneficiaireEmpruntComponent {

  newBeneficiaire: BeneficiaireEmprunt = {code: '', nomBeneficiaire: ''};
  newBeneficiaireForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    nomBeneficiaire: new FormControl(null, Validators.required),
  });
  get f() { return this.newBeneficiaireForm.controls; }
  constructor(public dialogRef: MatDialogRef<NewBeneficiaireEmpruntComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newBeneficiaireForm.valid) {
      this.newBeneficiaire = {
        code: this.newBeneficiaireForm.value.code,
        nomBeneficiaire: this.newBeneficiaireForm.value.nomBeneficiaire,
      };
      this.dialogRef.close(this.newBeneficiaire);
    }
  }
}
