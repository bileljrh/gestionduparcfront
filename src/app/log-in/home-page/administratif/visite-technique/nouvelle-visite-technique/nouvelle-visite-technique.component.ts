import {Component, OnInit} from '@angular/core';
import {SelectVehicule} from '../../vehicules/select-vehicule';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratifServiceService} from '../../administratif-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';
import {VisiteTechniqueTableData} from '../visite-technique-table-data';


@Component({
  selector: 'app-nouvelle-visite-technique',
  templateUrl: './nouvelle-visite-technique.component.html',
  styleUrls: ['./nouvelle-visite-technique.component.scss']
})
export class NouvelleVisiteTechniqueComponent implements OnInit {
  ListVehicules: SelectVehicule[] = [];
  newVisiteTechniqueForm = new FormGroup({
    //nombrePlaces: new FormControl(null, Validators.required),
    montantVisiteTechnique: new FormControl(null, Validators.required),
    //puissanceFiscale: new FormControl(null, Validators.required),
    //datePMC: new FormControl(null, Validators.required),
    dateDebutValidite: new FormControl(null, Validators.required),
    numeroPlaque: new FormControl(null, Validators.required),
    dateFinValidite: new FormControl(null, Validators.required),
  //  prixAchat: new FormControl(null, Validators.required)
  });
  get f() { return this.newVisiteTechniqueForm.controls; }

  newVisiteTechnique: VisiteTechniqueTableData = {
    prixAchat: 0,
    datePMC: null,
    nombrePlaces: 0,
    puissanceFiscale: 0,
    montantVisiteTechnique: 0,
    dateDebutValidite: null,
    dateFinValidite: null,
    idVehicule: 0,
  };


  constructor(private Administratif: AdministratifServiceService, public dialogRef: MatDialogRef<NouvelleVisiteTechniqueComponent>) {
    Administratif.getSelectVehiculeByStrucutureForVisiteTechnique().subscribe(value => {
      this.ListVehicules = value;
    });
  }

  ngOnInit(): void {
  }

  onConfirm() {
    if (this.newVisiteTechniqueForm.valid) {
      this.patchFinalValues();
      this.dialogRef.close(this.newVisiteTechnique);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  patchFinalValues() {
    this.newVisiteTechnique = {
      //prixAchat: this.newVisiteTechniqueForm.value.prixAchat,
      prixAchat: null,
      dateDebutValidite: moment(this.newVisiteTechniqueForm.value.dateDebutValidite as Date).format('YYYY-MM-DD'),
      dateFinValidite: moment(this.newVisiteTechniqueForm.value.dateFinValidite as Date).format('YYYY-MM-DD'),
     // datePMC: moment(this.newVisiteTechniqueForm.value.datePMC as Date).format('YYYY-MM-DD'),
      datePMC: null,
      montantVisiteTechnique: this.newVisiteTechniqueForm.value.montantVisiteTechnique,
     /* puissanceFiscale: this.newVisiteTechniqueForm.value.puissanceFiscale,
      nombrePlaces: this.newVisiteTechniqueForm.value.nombrePlaces,*/
      puissanceFiscale: null,
      nombrePlaces: null,
      idVehicule: this.newVisiteTechniqueForm.value.numeroPlaque.id,
    };
  }
  validateDateDebutDateFin(group : FormGroup): any{
    let valid = true;
     if (this.newVisiteTechniqueForm.controls.dateDebutValidite < this.newVisiteTechniqueForm.controls.dateDebutValidite) {
      valid = false;
    }
     
    return valid;
    }


}
