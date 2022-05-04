import { Component, Inject } from '@angular/core';
import { ReformeTableData } from '../reforme-table-data';
import { SelectVehicule } from '../../vehicules/select-vehicule';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-modify-reforme',
  templateUrl: './modify-reforme.component.html',
  styleUrls: ['./modify-reforme.component.scss']
})
export class ModifyReformeComponent {
  modifiedReforme: ReformeTableData = {
    id: null,
    nom: '',
    date: '',
    reference: '',
    dateSortie: '',
    prix: 0,
    cause: '',
    idVehicule: 0,
  };
  ListVehicules: SelectVehicule[] = [];
  modifiedReformeForm = new FormGroup({
    // nom: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    dateSortie: new FormControl(null, Validators.required),
    //  prix: new FormControl(null, Validators.required),
    cause: new FormControl(null, Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<ModifyReformeComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.patchInitialValue();
  }


  onConfirm() {
    if (this.modifiedReformeForm.valid) {
      this.patchFinalValue();
      this.dialogRef.close(this.modifiedReforme);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  patchFinalValue() {
    this.modifiedReforme = {
      id: this.data.element.id,
      nom: null,
      date: moment(this.modifiedReformeForm.value.date as Date).format('YYYY-MM-DD'),
      reference: this.modifiedReformeForm.value.reference,
      dateSortie: moment(this.modifiedReformeForm.value.dateSortie as Date).format('YYYY-MM-DD'),
      prix: null,
      cause: this.modifiedReformeForm.value.cause,
      idVehicule: null,
    };
  }

  patchInitialValue() {
    // this.modifiedReformeForm.controls.nom.patchValue(this.data.element.nom);
    this.modifiedReformeForm.controls.date.setValue(this.data.element.date);
    //this.modifiedReformeForm.controls.reference.setValue(this.data.element.reference);
    this.modifiedReformeForm.controls.dateSortie.setValue(this.data.element.dateSortie);
    // this.modifiedReformeForm.controls.prix.patchValue(this.data.element.prix);
    this.modifiedReformeForm.controls.cause.setValue(this.data.element.cause);
  }

}
