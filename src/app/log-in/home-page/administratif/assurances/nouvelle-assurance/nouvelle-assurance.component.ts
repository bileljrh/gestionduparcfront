import {Component} from '@angular/core';
import {AdministratifServiceService} from '../../administratif-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectVehicule} from '../../vehicules/select-vehicule';
import moment from 'moment';
import {NewAssurance} from '../new-assurance';

@Component({
  selector: 'app-nouvelle-assurance',
  templateUrl: './nouvelle-assurance.component.html',
  styleUrls: ['./nouvelle-assurance.component.scss']
})
export class NouvelleAssuranceComponent {
  newAssurance: NewAssurance = {
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
  newAssuranceForm = new FormGroup({
    numeroContrat: new FormControl(null, Validators.required),
    compagnieAssurance: new FormControl(null, Validators.required),
    montantAssurance: new FormControl(null, Validators.required),
    nombreplaces: new FormControl(null,[Validators.required, Validators.max(99)]),
    puissanceFiscale: new FormControl(null, Validators.required),
    assuranceSP: new FormControl(null, Validators.required),
    datePMC: new FormControl(null, Validators.required),
    dateDebutValidite: new FormControl(null, Validators.required),
    dateFinValidite: new FormControl(null, Validators.required , this.validateDateDebutDateFin),
    numeroPlaque: new FormControl(null, Validators.required)
  });
  get f() { return this.newAssuranceForm.controls; }

  constructor(private Administratif: AdministratifServiceService, public dialogRef: MatDialogRef<NouvelleAssuranceComponent>) {
    this.Administratif.getSelectVehiculeByStrucutureForAssurance().subscribe(value => {
      this.ListVehicules = value;
    });
  }

  onConfirm() {
    if (this.newAssuranceForm.valid) {
      this.newAssurance = {
        assuranceSP: this.newAssuranceForm.value.assuranceSP,
        compagnieAssurance: this.newAssuranceForm.value.compagnieAssurance,
        dateDebutValidite: moment(this.newAssuranceForm.value.dateDebutValidite as Date).format('YYYY-MM-DD'),
        dateFinValidite: moment(this.newAssuranceForm.value.dateFinValidite as Date).format('YYYY-MM-DD'),
        datePMC: moment(this.newAssuranceForm.value.datePMC as Date).format('YYYY-MM-DD'),
        montantAssurance: this.newAssuranceForm.value.montantAssurance,
        nombreplaces: this.newAssuranceForm.value.nombreplaces,
        numeroContrat: this.newAssuranceForm.value.numeroContrat,
        puissanceFiscale: this.newAssuranceForm.value.puissanceFiscale,
        idVehicules: this.newAssuranceForm.value.numeroPlaque
      };
      this.dialogRef.close(this.newAssurance);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
  validateDateDebutDateFin(group : FormGroup): any{
    let valid = true;
     if (this. newAssuranceForm.controls.dateDebutValidite < this. newAssuranceForm.controls.dateDebutValidite) {
      valid = false;
    }
     
    return valid;
    }


}
