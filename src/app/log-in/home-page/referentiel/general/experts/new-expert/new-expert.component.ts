import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Expert} from '../expert';
import moment from 'moment';

@Component({
  selector: 'app-new-expert',
  templateUrl: './new-expert.component.html',
  styleUrls: ['./new-expert.component.scss']
})
export class NewExpertComponent {
  newExpert: Expert = {adresse: '', code: '', codePostal: '', dateAjout: '', designation: '', email: '', fax: '', telephone: '', ville: ''};
  newExpertForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    telephone: new FormControl(null),
    fax: new FormControl(null),
    adresse: new FormControl(null),
    codePostal: new FormControl(null),
    ville: new FormControl(null),
    email: new FormControl(null),
    dateAjout: new FormControl(new Date())
  });
  get f() { return this.newExpertForm.controls; }

  constructor(public dialogRef: MatDialogRef<NewExpertComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newExpertForm.valid) {
      this.newExpert = {
        adresse: this.newExpertForm.value.adresse,
        code: this.newExpertForm.value.code,
        codePostal: this.newExpertForm.value.codePostal,
        dateAjout: moment(this.newExpertForm.value.dateAjout as Date).format('YYYY-MM-DD'),
        designation: this.newExpertForm.value.designation,
        email: this.newExpertForm.value.email,
        fax: this.newExpertForm.value.fax,
        telephone: this.newExpertForm.value.telephone,
        ville: this.newExpertForm.value.ville
      };
      this.dialogRef.close(this.newExpert);
    }
  }
}
