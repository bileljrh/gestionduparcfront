import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Fournisseur} from '../fournisseur';

@Component({
  selector: 'app-modification-fournisseur',
  templateUrl: './modification-fournisseur.component.html',
  styleUrls: ['./modification-fournisseur.component.scss']
})
export class ModificationFournisseurComponent {
  modifiedFournisseur: Fournisseur = {
    id: null,
    adresse: '',
    banque: '',
    code: '',
    designation: '',
    email: '',
    fax: '',
    rib: '',
    tel: '',
    web: ''
  };
  modifiedFournisseurForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    adresse: new FormControl(null),
    tel: new FormControl(null),
    fax: new FormControl(null),
    email: new FormControl(null),
    web: new FormControl(null),
    banque: new FormControl(null),
    rib: new FormControl(null),
  });

  constructor(public dialogRef: MatDialogRef<ModificationFournisseurComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedFournisseurForm.controls.code.setValue(data.element.code);
    this.modifiedFournisseurForm.controls.designation.setValue(data.element.designation);
    this.modifiedFournisseurForm.controls.adresse.setValue(data.element.adresse);
    this.modifiedFournisseurForm.controls.tel.setValue(data.element.tel);
    this.modifiedFournisseurForm.controls.fax.setValue(data.element.fax);
    this.modifiedFournisseurForm.controls.email.setValue(data.element.email);
    this.modifiedFournisseurForm.controls.web.setValue(data.element.web);
    this.modifiedFournisseurForm.controls.banque.setValue(data.element.banque);
    this.modifiedFournisseurForm.controls.rib.setValue(data.element.rib);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.modifiedFournisseurForm.valid) {
      this.modifiedFournisseur = {
        id: this.data.element.id,
        adresse: this.modifiedFournisseurForm.value.adresse,
        banque: this.modifiedFournisseurForm.value.banque,
        code: this.modifiedFournisseurForm.value.code,
        designation: this.modifiedFournisseurForm.value.designation,
        email: this.modifiedFournisseurForm.value.email,
        fax: this.modifiedFournisseurForm.value.fax,
        rib: this.modifiedFournisseurForm.value.rib,
        tel: this.modifiedFournisseurForm.value.tel,
        web: this.modifiedFournisseurForm.value.web
      };
      this.dialogRef.close(this.modifiedFournisseur);
    }
  }

}
