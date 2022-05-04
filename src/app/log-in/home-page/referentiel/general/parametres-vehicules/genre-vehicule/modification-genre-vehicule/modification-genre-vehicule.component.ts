import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GenreVehicule} from '../genre-vehicule';

@Component({
  selector: 'app-modification-genre-vehicule',
  templateUrl: './modification-genre-vehicule.component.html',
  styleUrls: ['./modification-genre-vehicule.component.scss']
})
export class ModificationGenreVehiculeComponent {

  modifiedGenre: GenreVehicule = {id: null, code: '', designation: ''};
  modifiedGenreForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<ModificationGenreVehiculeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedGenreForm.controls.code.setValue(data.element.code);
    this.modifiedGenreForm.controls.designation.setValue(data.element.designation);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedGenreForm.valid) {
      this.modifiedGenre = {
        id: this.data.element.id,
        code: this.modifiedGenreForm.value.code,
        designation: this.modifiedGenreForm.value.designation
      };
      this.dialogRef.close(this.modifiedGenre);
    }
  }


}
