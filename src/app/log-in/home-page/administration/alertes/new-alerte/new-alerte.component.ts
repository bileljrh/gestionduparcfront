import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Alerte} from '../alerte';

@Component({
  selector: 'app-new-alerte',
  templateUrl: './new-alerte.component.html',
  styleUrls: ['./new-alerte.component.scss']
})
export class NewAlerteComponent {

  newAlerte: Alerte = {numero: '', code: '', message: ''};
  newAlerteForm = new FormGroup({
    numero: new FormControl(null, Validators.required),
    code: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
  });
  get f() { return this.newAlerteForm.controls; }


  constructor(public dialogRef: MatDialogRef<NewAlerteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newAlerteForm.value) {
      this.newAlerte = {
        numero: this.newAlerteForm.value.numero,
        code: this.newAlerteForm.value.code,
        message: this.newAlerteForm.value.message
      };
      this.dialogRef.close(this.newAlerte);
    }
  }

}
