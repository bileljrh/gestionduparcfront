import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Magasin} from '../magasin';

@Component({
  selector: 'app-new-magasin',
  templateUrl: './new-magasin.component.html',
  styleUrls: ['./new-magasin.component.scss']
})
export class NewMagasinComponent {

  newMagasinForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
  });
  get f() { return this.newMagasinForm.controls; }
  newMagasin: Magasin = {
    code: '',
    designation: '',
    ugp: null,
  };

  constructor(public dialogRef: MatDialogRef<NewMagasinComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newMagasinForm.valid) {
      this.newMagasin = {
        code: this.newMagasinForm.value.code,
        designation: this.newMagasinForm.value.designation,
        ugp: this.data.element,
      };
      this.dialogRef.close(this.newMagasin);
    }
  }


}
