import {Component, Inject} from '@angular/core';
import {Unite} from '../unite';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modify-unite',
  templateUrl: './modify-unite.component.html',
  styleUrls: ['./modify-unite.component.scss']
})
export class ModifyUniteComponent {

  modifiedUnite: Unite = {id: null, unite: null};
  modifiedUniteForm = new FormGroup({
    unite: new FormControl(null, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<ModifyUniteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedUniteForm.controls.unite.patchValue(data.element.unite);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedUniteForm.valid) {
      this.modifiedUnite = {
        id: this.data.element.id,
        unite: this.modifiedUniteForm.value.code,
      };
      this.dialogRef.close(this.modifiedUnite);
    }
  }

}
