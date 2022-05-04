import {Component, Inject} from '@angular/core';
import {SelectVehicule} from '../../vehicules/select-vehicule';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratifServiceService} from '../../administratif-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';
import {NewAssurance} from '../new-assurance';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehicule } from '../../vehicules/vehicule';

@Component({
  selector: 'app-modify-assurance',
  templateUrl: './modify-assurance.component.html',
  styleUrls: ['./modify-assurance.component.scss'],
  providers: [MatSnackBar]

})
export class ModifyAssuranceComponent {
  initialVehiculeIDs: number[] = [];
  modifiedAssurance: NewAssurance = {
    id: null,
    assuranceSP: '',
    compagnieAssurance: '',
    dateDebutValidite: '',
    dateFinValidite: '',
    datePMC: '',
    montantAssurance: 0,
    nombreplaces: 0,
    numeroContrat: '',
    puissanceFiscale: 0,
    idVehicules: []
  };
  ListVehicules: SelectVehicule[] = [];
  modifiedAssuranceForm = new FormGroup({
    numeroContrat: new FormControl(null, Validators.required),
    compagnieAssurance: new FormControl(null, Validators.required),
    montantAssurance: new FormControl(null, Validators.required),
    nombreplaces: new FormControl(null, Validators.required),
    puissanceFiscale: new FormControl(null, Validators.required),
    assuranceSP: new FormControl(null, Validators.required),
    datePMC: new FormControl(null, Validators.required),
    dateDebutValidite: new FormControl(null, Validators.required),
    dateFinValidite: new FormControl(null, Validators.required),
    numeroPlaque: new FormControl(null, Validators.required)
  });
  ListVehicule: Vehicule[] = [];


  constructor(private Administratif: AdministratifServiceService, public dialogRef: MatDialogRef<ModifyAssuranceComponent>, @Inject(MAT_DIALOG_DATA) public data, private snackBar: MatSnackBar) {
    console.log(data.element);
    this.patchInitialValue();
   /*  this.Administratif.getOneVehicule(data.element.vehicules.id).subscribe(value => {
      this.ListVehicule = value;
    }); */
    this.Administratif.getSelectVehiculeByStrucutureForAssurance().subscribe(value => {
      this.ListVehicules = value;
      this.modifiedAssuranceForm.controls.numeroPlaque.setValue(this.initialVehiculeIDs);
    });
    this.modifiedAssuranceForm.controls.numeroPlaque.setValue(this.initialVehiculeIDs);
  }


  onConfirm() {
    if (this.modifiedAssuranceForm.valid) {
      this.modifiedAssurance = {
        id: this.data.element.id,
        assuranceSP: this.modifiedAssuranceForm.value.assuranceSP,
        compagnieAssurance: this.modifiedAssuranceForm.value.compagnieAssurance,
        dateDebutValidite: moment(this.modifiedAssuranceForm.value.dateDebutValidite as Date).format('YYYY-MM-DD'),
        dateFinValidite: moment(this.modifiedAssuranceForm.value.dateFinValidite as Date).format('YYYY-MM-DD'),
        datePMC: moment(this.modifiedAssuranceForm.value.datePMC as Date).format('YYYY-MM-DD'),
        montantAssurance: this.modifiedAssuranceForm.value.montantAssurance,
        nombreplaces: this.modifiedAssuranceForm.value.nombreplaces,
        numeroContrat: this.modifiedAssuranceForm.value.numeroContrat,
        puissanceFiscale: this.modifiedAssuranceForm.value.puissanceFiscale,
        idVehicules: this.modifiedAssuranceForm.value.numeroPlaque,
      };
      this.dialogRef.close(this.modifiedAssurance);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  patchInitialValue() {
    this.modifiedAssuranceForm.controls.numeroContrat.patchValue(this.data.element.numeroContrat);
    this.modifiedAssuranceForm.controls.compagnieAssurance.patchValue(this.data.element.compagnieAssurance);
    this.modifiedAssuranceForm.controls.montantAssurance.patchValue(this.data.element.montantAssurance);
    this.modifiedAssuranceForm.controls.nombreplaces.patchValue(this.data.element.nombreplaces);
    this.modifiedAssuranceForm.controls.puissanceFiscale.patchValue(this.data.element.puissanceFiscale);
    this.modifiedAssuranceForm.controls.assuranceSP.patchValue(this.data.element.assuranceSP);
    this.modifiedAssuranceForm.controls.datePMC.patchValue(this.data.element.datePMC);
    this.modifiedAssuranceForm.controls.dateDebutValidite.patchValue(this.data.element.dateDebutValidite);
    this.modifiedAssuranceForm.controls.dateFinValidite.patchValue(this.data.element.dateFinValidite);
    this.data.element.vehicules.forEach(value => {
      this.initialVehiculeIDs.push(value.id);
    });
  }

}
