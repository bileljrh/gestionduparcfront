import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Atelier} from '../atelier';

@Component({
  selector: 'app-modify-atelier',
  templateUrl: './modify-atelier.component.html',
  styleUrls: ['./modify-atelier.component.scss']
})
export class ModifyAtelierComponent {


  modifyAtelierForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
  });
  modifyAtelier: Atelier = {
    id: null,
    code: '',
    designation: '',
  };

  constructor(public dialogRef: MatDialogRef<ModifyAtelierComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifyAtelierForm.controls.code.patchValue(data.atelier.code);
    this.modifyAtelierForm.controls.designation.patchValue(data.atelier.designation);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifyAtelierForm.valid) {
      this.modifyAtelier = {
        id: this.data.atelier.id,
        code: this.modifyAtelierForm.value.code,
        designation: this.modifyAtelierForm.value.designation,
      };
      this.dialogRef.close(this.modifyAtelier);
    }
  }


}
