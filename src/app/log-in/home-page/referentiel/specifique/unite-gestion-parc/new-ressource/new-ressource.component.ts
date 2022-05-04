import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Ressource} from '../ressource';

@Component({
  selector: 'app-new-ressource',
  templateUrl: './new-ressource.component.html',
  styleUrls: ['./new-ressource.component.scss']
})
export class NewRessourceComponent {


  newRessourceForm = new FormGroup({
    numero: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    prixUnitaire: new FormControl(null),
    nombrePersonnels: new FormControl(null),
  });
  get f() { return this.newRessourceForm.controls; }
  newRessource: Ressource = {
    designation: '',
    numero: '',
    nombrePersonnels: 0,
    prixUnitaire: ''
  };

  constructor(public dialogRef: MatDialogRef<NewRessourceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newRessourceForm.valid) {
      this.newRessource = {
        numero: this.newRessourceForm.value.numero,
        designation: this.newRessourceForm.value.designation,
        nombrePersonnels: this.newRessourceForm.value.nombrePersonnels,
        prixUnitaire: this.newRessourceForm.value.prixUnitaire,
        ugp: this.data.ugp,
      };
      this.dialogRef.close(this.newRessource);
    }
  }

}
