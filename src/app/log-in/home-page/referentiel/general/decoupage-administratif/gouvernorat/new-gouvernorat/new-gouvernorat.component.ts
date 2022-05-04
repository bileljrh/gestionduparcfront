import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Gouvernorat} from '../../gouvernorat';

@Component({
  selector: 'app-new-gouvernorat',
  templateUrl: './new-gouvernorat.component.html',
  styleUrls: ['./new-gouvernorat.component.scss']
})
export class NewGouvernoratComponent {
  newGouvernoratForm = new FormGroup({
    designation: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [Validators.required])
  });
  get f() { return this.newGouvernoratForm.controls; }
  newGouvernorat: Gouvernorat = {code: '', designation: ''};

  constructor(public dialogRef: MatDialogRef<NewGouvernoratComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newGouvernoratForm.valid) {
      this.newGouvernorat = {
        designation: this.newGouvernoratForm.value.designation,
        code: this.newGouvernoratForm.value.code
      };
      this.dialogRef.close(this.newGouvernorat);
    }
  }


}
