import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Section} from '../section';

@Component({
  selector: 'app-modify-section',
  templateUrl: './modify-section.component.html',
  styleUrls: ['./modify-section.component.scss']
})
export class ModifySectionComponent {


  modifySectionForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    prixUnitaire: new FormControl(null),
    nombrePersonnels: new FormControl(null),

  });
  modifySection: Section = {
    id: null,
    code: '',
    designation: '',
    nombrePersonnels: null,
  };

  constructor(public dialogRef: MatDialogRef<ModifySectionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifySectionForm.controls.code.patchValue(data.section.code);
    this.modifySectionForm.controls.designation.patchValue(data.section.designation);
    this.modifySectionForm.controls.prixUnitaire.patchValue(data.section.prixUnitaire);
    this.modifySectionForm.controls.nombrePersonnels.patchValue(data.section.nombrePersonnels);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifySectionForm.valid) {
      this.modifySection = {
        id: this.data.section.id,
        code: this.modifySectionForm.value.code,
        designation: this.modifySectionForm.value.designation,
        nombrePersonnels: this.modifySectionForm.value.nombrePersonnels,
      };
      this.dialogRef.close(this.modifySection);
    }
  }


}
