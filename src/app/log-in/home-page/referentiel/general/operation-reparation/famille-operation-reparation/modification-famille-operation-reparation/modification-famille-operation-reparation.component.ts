import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FamilleOperationReparation} from '../famille-operation-reparation';

@Component({
  selector: 'app-modification-famille-operation-reparation',
  templateUrl: './modification-famille-operation-reparation.component.html',
  styleUrls: ['./modification-famille-operation-reparation.component.scss']
})
export class ModificationFamilleOperationReparationComponent {
  modifiedFamille: FamilleOperationReparation = {id: null, code: '', designation: ''};
  modifiedFamilleForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<ModificationFamilleOperationReparationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedFamilleForm.controls.code.setValue(data.element.code);
    this.modifiedFamilleForm.controls.designation.setValue(data.element.designation);
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
        id: this.data.element.id,
        code: this.modifiedFamilleForm.value.code,
        designation: this.modifiedFamilleForm.value.designation
      };
      this.dialogRef.close(this.modifiedFamille);
    }
  }

}
