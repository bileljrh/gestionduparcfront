import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UGP} from '../ugp';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-ugp',
  templateUrl: './new-ugp.component.html',
  styleUrls: ['./new-ugp.component.scss']
})
export class NewUGPComponent {
  newUgpForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required)
  });
  get f() { return this.newUgpForm.controls; }
  newUgp: UGP = {code: '', designation: ''};

  constructor(public dialogRef: MatDialogRef<NewUGPComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newUgpForm.valid) {
      this.newUgp = {
        code: this.newUgpForm.value.code,
        designation: this.newUgpForm.value.designation
      };
      this.dialogRef.close(this.newUgp);
    }
  }
}
