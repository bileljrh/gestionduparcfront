import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Magasin} from '../magasin';

@Component({
  selector: 'app-modify-magasin',
  templateUrl: './modify-magasin.component.html',
  styleUrls: ['./modify-magasin.component.scss']
})
export class ModifyMagasinComponent {

  modifyMagasinForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
  });
  modifyMagasin: Magasin = {
    id: null,
    code: '',
    designation: '',
    ugp: null,
  };

  constructor(public dialogRef: MatDialogRef<ModifyMagasinComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifyMagasinForm.controls.code.patchValue(data.magasin.code);
    this.modifyMagasinForm.controls.designation.patchValue(data.magasin.designation);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifyMagasinForm.valid) {
      this.modifyMagasin = {
        id: this.data.magasin.id,
        code: this.modifyMagasinForm.value.code,
        designation: this.modifyMagasinForm.value.designation,
        ugp: this.data.element,
      };
      this.dialogRef.close(this.modifyMagasin);
    }
  }


}
