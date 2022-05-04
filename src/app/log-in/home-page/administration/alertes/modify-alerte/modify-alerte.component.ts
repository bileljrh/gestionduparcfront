import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Alerte} from '../alerte';

@Component({
  selector: 'app-modify-alerte',
  templateUrl: './modify-alerte.component.html',
  styleUrls: ['./modify-alerte.component.scss']
})
export class ModifyAlerteComponent {


  modifiedAlerte: Alerte = {id: null, numero: '', code: '', message: ''};
  modifiedAlerteForm = new FormGroup({
    numero: new FormControl(null, Validators.required),
    code: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
  });


  constructor(public dialogRef: MatDialogRef<ModifyAlerteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedAlerteForm.controls.numero.patchValue(data.element.numero);
    this.modifiedAlerteForm.controls.code.patchValue(data.element.code);
    this.modifiedAlerteForm.controls.message.patchValue(data.element.message);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedAlerteForm.value) {
      this.modifiedAlerte = {
        id: this.data.element.id,
        numero: this.modifiedAlerteForm.value.numero,
        code: this.modifiedAlerteForm.value.code,
        message: this.modifiedAlerteForm.value.message
      };
      this.dialogRef.close(this.modifiedAlerte);
    }
  }


}
