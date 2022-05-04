import {Component, Inject} from '@angular/core';
import {MarqueVehicule} from '../marque-vehicule';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modification-marque-vehicule',
  templateUrl: './modification-marque-vehicule.component.html',
  styleUrls: ['./modification-marque-vehicule.component.scss']
})
export class ModificationMarqueVehiculeComponent {
  modifiedMarque: MarqueVehicule = {id: null, code: '', designation: ''};
  modifiedMarqueForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<ModificationMarqueVehiculeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedMarqueForm.controls.code.setValue(data.element.code);
    this.modifiedMarqueForm.controls.designation.setValue(data.element.designation);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedMarqueForm.valid) {
      this.modifiedMarque = {
        id: this.data.element.id,
        code: this.modifiedMarqueForm.value.code,
        designation: this.modifiedMarqueForm.value.designation
      };
      this.dialogRef.close(this.modifiedMarque);
    }
  }


}
