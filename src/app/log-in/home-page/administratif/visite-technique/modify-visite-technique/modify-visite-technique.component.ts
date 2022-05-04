import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VisiteTechniqueTableData } from '../visite-technique-table-data';
import { AdministratifServiceService } from '../../administratif-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-modify-visite-technique',
  templateUrl: './modify-visite-technique.component.html',
  styleUrls: ['./modify-visite-technique.component.scss']
})
export class ModifyVisiteTechniqueComponent implements OnInit {
  modifiedVisiteTechniqueForm = new FormGroup({
    //nombrePlaces: new FormControl(null, Validators.required),
    montantVisiteTechnique: new FormControl(null, Validators.required),
    //puissanceFiscale: new FormControl(null, Validators.required),
    //datePMC: new FormControl(null, Validators.required),
    dateDebutValidite: new FormControl(null, Validators.required),
    numeroPlaque: new FormControl(null, Validators.required),
    dateFinValidite: new FormControl(null, Validators.required),
    //  prixAchat: new FormControl(null, Validators.required)
    idVehicule: new FormControl(null)
  });
  modifiedVisiteTechnique: VisiteTechniqueTableData = {
    id: null,
    prixAchat: 0,
    datePMC: null,
    nombrePlaces: 0,
    puissanceFiscale: 0,
    montantVisiteTechnique: 0,
    dateDebutValidite: null,
    dateFinValidite: null,
    idVehicule: 0,
  };


  constructor(private Administratif: AdministratifServiceService, public dialogRef: MatDialogRef<ModifyVisiteTechniqueComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.patchInitialValues();
    console.log(this.data.element.idVehicule);

  }

  ngOnInit(): void {
  }



  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  patchFinalValues() {
    this.modifiedVisiteTechnique = {
      /*    id: this.data.element.id,
         prixAchat: this.modifiedVisiteTechniqueForm.value.numeroPlaque,
         dateDebutValidite: moment(this.modifiedVisiteTechniqueForm.value.dateDebutValidite as Date).format('YYYY-MM-DD'),
         dateFinValidite: moment(this.modifiedVisiteTechniqueForm.value.dateFinValidite as Date).format('YYYY-MM-DD'),
         datePMC: moment(this.modifiedVisiteTechniqueForm.value.datePMC as Date).format('YYYY-MM-DD'),
         montantVisiteTechnique: this.modifiedVisiteTechniqueForm.value.montantVisiteTechnique,
         nombrePlaces: this.modifiedVisiteTechniqueForm.value.nombrePlaces,
         puissanceFiscale: this.modifiedVisiteTechniqueForm.value.puissanceFiscale,
         idVehicule: null */
      //prixAchat: this.newVisiteTechniqueForm.value.prixAchat,
      id: this.data.element.id,
      prixAchat: null,
      dateDebutValidite: moment(this.modifiedVisiteTechniqueForm.value.dateDebutValidite as Date).format('YYYY-MM-DD'),
      dateFinValidite: moment(this.modifiedVisiteTechniqueForm.value.dateFinValidite as Date).format('YYYY-MM-DD'),
      datePMC: null,
      montantVisiteTechnique: this.modifiedVisiteTechniqueForm.value.montantVisiteTechnique,
      puissanceFiscale: null,
      nombrePlaces: null,
      idVehicule: 314,
      numeroPlaque: this.modifiedVisiteTechniqueForm.value.numeroPlaque,



    };
  }
  onConfirm() {
    if (this.modifiedVisiteTechniqueForm.valid) {
      this.patchFinalValues();
      this.dialogRef.close(this.modifiedVisiteTechnique);
      console.log(this.modifiedVisiteTechniqueForm.value.idVehicule);
    }

  }
  patchInitialValues() {
    // this.modifiedVisiteTechniqueForm.controls.nombrePlaces.patchValue(this.data.element.nombrePlaces);
    this.modifiedVisiteTechniqueForm.controls.montantVisiteTechnique.patchValue(this.data.element.montantVisiteTechnique);
    // this.modifiedVisiteTechniqueForm.controls.puissanceFiscale.patchValue(this.data.element.puissanceFiscale);
    //  this.modifiedVisiteTechniqueForm.controls.datePMC.patchValue(this.data.element.datePMC);
    this.modifiedVisiteTechniqueForm.controls.dateDebutValidite.patchValue(this.data.element.dateDebutValidite);
    this.modifiedVisiteTechniqueForm.controls.dateFinValidite.patchValue(this.data.element.dateFinValidite);
    this.modifiedVisiteTechniqueForm.controls.numeroPlaque.patchValue(this.data.element.numeroPlaque);
    this.modifiedVisiteTechniqueForm.controls.idVehicule.patchValue(this.data.element.idVehicule);

  }


}
