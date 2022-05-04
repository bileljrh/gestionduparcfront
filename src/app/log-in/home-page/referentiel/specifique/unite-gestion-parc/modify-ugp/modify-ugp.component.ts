import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UGP} from '../ugp';

@Component({
  selector: 'app-modify-ugp',
  templateUrl: './modify-ugp.component.html',
  styleUrls: ['./modify-ugp.component.scss']
})
export class ModifyUGPComponent {


  modifyUgpForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required)
  });
  modifyUgp: UGP = {id: null, code: '', designation: ''};

  constructor(public dialogRef: MatDialogRef<ModifyUGPComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifyUgpForm.controls.code.patchValue(data.element.code);
    this.modifyUgpForm.controls.designation.patchValue(data.element.designation);

  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifyUgpForm.valid) {
      this.modifyUgp = {
        id: this.data.element.id,
        code: this.modifyUgpForm.value.code,
        designation: this.modifyUgpForm.value.designation
      };
      this.dialogRef.close(this.modifyUgp);
    }
  }

}
