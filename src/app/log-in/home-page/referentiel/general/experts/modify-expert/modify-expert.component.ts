import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Expert} from '../expert';
import moment from 'moment';

@Component({
  selector: 'app-modify-expert',
  templateUrl: './modify-expert.component.html',
  styleUrls: ['./modify-expert.component.scss']
})
export class ModifyExpertComponent {

  modifiedExpert: Expert = {
    id: null,
    adresse: '',
    code: '',
    codePostal: '',
    dateAjout: '',
    designation: '',
    email: '',
    fax: '',
    telephone: '',
    ville: ''
  };
  modifiedExpertForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    telephone: new FormControl(null),
    fax: new FormControl(null),
    adresse: new FormControl(null),
    codePostal: new FormControl(null),
    ville: new FormControl(null),
    email: new FormControl(null),
    dateAjout: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<ModifyExpertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.modifiedExpertForm.controls.code.patchValue(data.element.code);
    this.modifiedExpertForm.controls.designation.patchValue(data.element.designation);
    this.modifiedExpertForm.controls.telephone.patchValue(data.element.telephone);
    this.modifiedExpertForm.controls.fax.patchValue(data.element.fax);
    this.modifiedExpertForm.controls.adresse.patchValue(data.element.adresse);
    this.modifiedExpertForm.controls.codePostal.patchValue(data.element.codePostal);
    this.modifiedExpertForm.controls.ville.patchValue(data.element.ville);
    this.modifiedExpertForm.controls.email.patchValue(data.element.email);
    this.modifiedExpertForm.controls.dateAjout.patchValue(data.element.dateAjout);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedExpertForm.valid) {
      this.modifiedExpert = {
        id: this.data.element.id,
        adresse: this.modifiedExpertForm.value.adresse,
        code: this.modifiedExpertForm.value.code,
        codePostal: this.modifiedExpertForm.value.codePostal,
        dateAjout: moment(this.modifiedExpertForm.value.dateAjout as Date).format('YYYY-MM-DD'),
        designation: this.modifiedExpertForm.value.designation,
        email: this.modifiedExpertForm.value.email,
        fax: this.modifiedExpertForm.value.fax,
        telephone: this.modifiedExpertForm.value.telephone,
        ville: this.modifiedExpertForm.value.ville
      };
      this.dialogRef.close(this.modifiedExpert);
    }
  }

}
