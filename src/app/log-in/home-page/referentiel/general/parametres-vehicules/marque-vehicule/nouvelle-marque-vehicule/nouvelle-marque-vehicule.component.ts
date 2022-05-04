import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MarqueVehicule} from '../marque-vehicule';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-nouvelle-marque-vehicule',
  templateUrl: './nouvelle-marque-vehicule.component.html',
  styleUrls: ['./nouvelle-marque-vehicule.component.scss']
})
export class NouvelleMarqueVehiculeComponent {
  nouvelleMarque: MarqueVehicule = {code: '', designation: ''};
  nouvelleMarqueForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
  });
  get f() { return this.nouvelleMarqueForm.controls; }
  constructor(public dialogRef: MatDialogRef<NouvelleMarqueVehiculeComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouvelleMarqueForm.valid) {
      this.nouvelleMarque = {
        code: this.nouvelleMarqueForm.value.code,
        designation: this.nouvelleMarqueForm.value.designation
      };
      this.dialogRef.close(this.nouvelleMarque);
    }
  }


}
