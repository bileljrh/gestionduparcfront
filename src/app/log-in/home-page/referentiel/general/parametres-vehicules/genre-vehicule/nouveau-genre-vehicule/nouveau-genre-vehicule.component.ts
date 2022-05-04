import {Component} from '@angular/core';
import {GenreVehicule} from '../genre-vehicule';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-nouveau-genre-vehicule',
  templateUrl: './nouveau-genre-vehicule.component.html',
  styleUrls: ['./nouveau-genre-vehicule.component.scss']
})
export class NouveauGenreVehiculeComponent {
  nouveauGenre: GenreVehicule = {code: '', designation: ''};
  nouveauGenreForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    dateAjout: new FormControl(new Date(), [Validators.required])
  });
  get f() { return this.nouveauGenreForm.controls; }
  constructor(public dialogRef: MatDialogRef<NouveauGenreVehiculeComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouveauGenreForm.valid) {
      this.nouveauGenre = {
        code: this.nouveauGenreForm.value.code,
        designation: this.nouveauGenreForm.value.designation
      };
      this.dialogRef.close(this.nouveauGenre);
    }
  }


}
