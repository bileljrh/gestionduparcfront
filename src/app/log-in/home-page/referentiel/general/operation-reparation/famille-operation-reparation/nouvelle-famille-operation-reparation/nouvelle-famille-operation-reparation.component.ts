import {Component} from '@angular/core';
import {GenreVehicule} from '../../../parametres-vehicules/genre-vehicule/genre-vehicule';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-nouvelle-famille-operation-reparation',
  templateUrl: './nouvelle-famille-operation-reparation.component.html',
  styleUrls: ['./nouvelle-famille-operation-reparation.component.scss']
})
export class NouvelleFamilleOperationReparationComponent {

  nouvelleFamille: GenreVehicule = {code: '', designation: ''};
  nouvelleFamilleForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    dateAjout: new FormControl(new Date(), [Validators.required])
  });
  get f() { return this.nouvelleFamilleForm.controls; }
  constructor(public dialogRef: MatDialogRef<NouvelleFamilleOperationReparationComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouvelleFamilleForm.valid) {
      this.nouvelleFamille = {
        code: this.nouvelleFamilleForm.value.code,
        designation: this.nouvelleFamilleForm.value.designation
      };
      this.dialogRef.close(this.nouvelleFamille);
    }
  }

}
