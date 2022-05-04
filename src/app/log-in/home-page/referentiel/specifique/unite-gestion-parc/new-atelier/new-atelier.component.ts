import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Atelier} from '../atelier';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-atelier',
  templateUrl: './new-atelier.component.html',
  styleUrls: ['./new-atelier.component.scss']
})
export class NewAtelierComponent {
  newAtelierForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
  });
  get f() { return this.newAtelierForm.controls; }
  newAtelier: Atelier = {
    code: '',
    designation: '',
    ugp: null,
  };

  constructor(public dialogRef: MatDialogRef<NewAtelierComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newAtelierForm.valid) {
      this.newAtelier = {
        code: this.newAtelierForm.value.code,
        designation: this.newAtelierForm.value.designation,
        ugp: this.data.element,
      };
      this.dialogRef.close(this.newAtelier);
    }
  }

}
