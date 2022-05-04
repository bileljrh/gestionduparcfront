import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Ressource} from '../ressource';

@Component({
  selector: 'app-modify-ressource',
  templateUrl: './modify-ressource.component.html',
  styleUrls: ['./modify-ressource.component.scss']
})
export class ModifyRessourceComponent {

  modifyRessourceForm = new FormGroup({
    numero: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    prixUnitaire: new FormControl(null),
    nombrePersonnels: new FormControl(null),
  });
  modifyRessource: Ressource = {
    id: null,
    designation: '',
    numero: '',
    nombrePersonnels: 0,
    prixUnitaire: ''
  };

  constructor(public dialogRef: MatDialogRef<ModifyRessourceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifyRessourceForm.controls.designation.patchValue(data.ressource.designation);
    this.modifyRessourceForm.controls.numero.patchValue(data.ressource.numero);
    this.modifyRessourceForm.controls.nombrePersonnels.patchValue(data.ressource.nombrePersonnels);
    this.modifyRessourceForm.controls.prixUnitaire.patchValue(data.ressource.prixUnitaire);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifyRessourceForm.valid) {
      this.modifyRessource = {
        id: this.data.ressource.id,
        numero: this.modifyRessourceForm.value.numero,
        designation: this.modifyRessourceForm.value.designation,
        nombrePersonnels: this.modifyRessourceForm.value.nombrePersonnels,
        prixUnitaire: this.modifyRessourceForm.value.prixUnitaire,
      };
      this.dialogRef.close(this.modifyRessource);
    }
  }


}
