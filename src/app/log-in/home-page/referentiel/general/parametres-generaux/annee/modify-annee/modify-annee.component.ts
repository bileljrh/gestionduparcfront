import {Component, Inject} from '@angular/core';
import {Annee} from '../annee';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modify-annee',
  templateUrl: './modify-annee.component.html',
  styleUrls: ['./modify-annee.component.scss']
})
export class ModifyAnneeComponent {

  modifiedAnnee: Annee = {id: null, annee: null};
  modifiedAnneeForm = new FormGroup({
    annee: new FormControl(null, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<ModifyAnneeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedAnneeForm.controls.annee.patchValue(data.element.annee);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedAnneeForm.valid) {
      this.modifiedAnnee = {
        id: this.data.element.id,
        annee: this.modifiedAnneeForm.value.annee,
      };
      this.dialogRef.close(this.modifiedAnnee);
    }
  }

}
