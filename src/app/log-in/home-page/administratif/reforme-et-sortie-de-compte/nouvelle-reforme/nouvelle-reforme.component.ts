import { Component } from '@angular/core';
import { SelectVehicule } from '../../vehicules/select-vehicule';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministratifServiceService } from '../../administratif-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { ReformeTableData } from '../reforme-table-data';


@Component({
  selector: 'app-nouvelle-reforme',
  templateUrl: './nouvelle-reforme.component.html',
  styleUrls: ['./nouvelle-reforme.component.scss'],
})
export class NouvelleReformeComponent {
  newReforme: ReformeTableData = {
    nom: 'test',
    date: '',
    reference: '',
    dateSortie: '',
    prix: 0,
    cause: '',
    idVehicule: 0,
  };
  ListVehicules: SelectVehicule[] = [];
  newReformeForm = new FormGroup({
    //  nom: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    dateSortie: new FormControl(null, Validators.required),
    //  prix: new FormControl(null, Validators.required),
    cause: new FormControl(null, Validators.required),
    numeroPlaque: new FormControl(null, Validators.required)
  });
  get f() { return this.newReformeForm.controls; }

  constructor(private Administratif: AdministratifServiceService, public dialogRef: MatDialogRef<NouvelleReformeComponent>) {
    this.Administratif.getSelectVehiculeByStrucutureForReforme().subscribe(value => {
      this.ListVehicules = value;
    });
  }


  onConfirm() {
    if (this.newReformeForm.valid) {
      this.patchFinalValue();
      this.dialogRef.close(this.newReforme);
    }
    // this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  patchFinalValue() {
    this.newReforme = {
      nom: null,
      date: moment(this.newReformeForm.value.date as Date).format('YYYY-MM-DD'),
      reference: this.newReformeForm.value.reference,
      dateSortie: moment(this.newReformeForm.value.dateSortie as Date).format('YYYY-MM-DD'),
      prix: null,
      cause: this.newReformeForm.value.cause,
      idVehicule: this.newReformeForm.value.numeroPlaque,
    };
  }

}
