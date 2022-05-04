import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Section} from '../section';

@Component({
  selector: 'app-new-section',
  templateUrl: './new-section.component.html',
  styleUrls: ['./new-section.component.scss']
})
export class NewSectionComponent {

  newSectionForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    prixUnitaire: new FormControl(null),
    nombrePersonnels: new FormControl(null),

  });
  get f() { return this.newSectionForm.controls; }
  newSection: Section = {
    code: '',
    designation: '',
    nombrePersonnels: null,
  };

  constructor(public dialogRef: MatDialogRef<NewSectionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newSectionForm.valid) {
      this.newSection = {
        code: this.newSectionForm.value.code,
        designation: this.newSectionForm.value.designation,
        nombrePersonnels: this.newSectionForm.value.nombrePersonnels,
      };
      this.dialogRef.close(this.newSection);
    }
  }

}
