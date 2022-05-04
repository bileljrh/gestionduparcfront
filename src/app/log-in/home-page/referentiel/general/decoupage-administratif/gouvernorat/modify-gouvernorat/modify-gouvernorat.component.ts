import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Gouvernorat} from '../../gouvernorat';

@Component({
  selector: 'app-modify-gouvernorat',
  templateUrl: './modify-gouvernorat.component.html',
  styleUrls: ['./modify-gouvernorat.component.scss']
})
export class ModifyGouvernoratComponent {
  modifiedGouvernorat: Gouvernorat = {id: null, designation: ''};
  modifiedGouvernoratForm = new FormGroup({
    designation: new FormControl(null, Validators.required),
    code: new FormControl(null, Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<ModifyGouvernoratComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedGouvernoratForm.controls.designation.patchValue(this.data.element.designation);
    this.modifiedGouvernoratForm.controls.code.patchValue(this.data.element.code);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedGouvernoratForm.valid) {
      this.modifiedGouvernorat = {
        id: this.data.element.id,
        designation: this.modifiedGouvernoratForm.value.designation,
        code: this.modifiedGouvernoratForm.value.code
      };
      this.dialogRef.close(this.modifiedGouvernorat);
    }
  }

}
