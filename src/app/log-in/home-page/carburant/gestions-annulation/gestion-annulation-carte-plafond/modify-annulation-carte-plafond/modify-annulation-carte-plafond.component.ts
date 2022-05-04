import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DemandeAnnulationCartePlafond} from '../../../carte-plafond/demande-annulation-carte-plafond/demande-annulation-carte-plafond';
import {CarburantServiceService} from '../../../carburant-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-modify-annulation-carte-plafond',
  templateUrl: './modify-annulation-carte-plafond.component.html',
  styleUrls: ['./modify-annulation-carte-plafond.component.scss']
})
export class ModifyAnnulationCartePlafondComponent implements OnInit {
  typeCarburant = '';
  structure = '';
  nomBeneficiaire = '';
  montant: number = null;
  modifyDemandeAnnulationForm = new FormGroup({
    typeDeclarant: new FormControl(null, [Validators.required]),
    nomDeclarant: new FormControl(null, [Validators.required]),
    prenomDeclarant: new FormControl(null, [Validators.required]),
    sexeDeclarant: new FormControl(null, [Validators.required]),
    dateNaissanceDeclarant: new FormControl(null),
    lieuNaissanceDeclarant: new FormControl(null),
    numeroCINDeclarant: new FormControl(null),
    causeAnnulation: new FormControl(null)
  });
  modifyDemandeAnnulation: DemandeAnnulationCartePlafond = {
    id: null,
    nomDeclarant: '',
    prenomDeclarant: '',
    dateNaissanceDeclarant: '',
    lieuNaissanceDeclarant: '',
    numeroCINDeclarant: '',
    sexeDeclarant: '',
    typeDeclarant: '',
    numeroCarte: '',
    typeCarburant: '',
    montant: 0,
    causeAnnulation: ''
    };


  constructor(public dialogRef: MatDialogRef<ModifyAnnulationCartePlafondComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, 
     private Carburant: CarburantServiceService) {
    this.patchInitialValues();
  }


  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  onCancelModification() {
    this.dialogRef.close();
  }

  onConfirmModification() {
    if (this.modifyDemandeAnnulationForm.valid) {
      this.patchFinaleValues();
      this.dialogRef.close(this.modifyDemandeAnnulation);
    }
  }

  patchInitialValues() {
    this.modifyDemandeAnnulationForm.controls.typeDeclarant.setValue(this.data.element.typeDeclarant);
    this.modifyDemandeAnnulationForm.controls.nomDeclarant.setValue(this.data.element.nomDeclarant);
    this.modifyDemandeAnnulationForm.controls.prenomDeclarant.setValue(this.data.element.prenomDeclarant);
    this.modifyDemandeAnnulationForm.controls.sexeDeclarant.setValue(this.data.element.sexeDeclarant);
    this.modifyDemandeAnnulationForm.controls.dateNaissanceDeclarant.setValue(this.data.element.dateNaissanceDeclarant);
    this.modifyDemandeAnnulationForm.controls.lieuNaissanceDeclarant.setValue(this.data.element.lieuNaissanceDeclarant);
    this.modifyDemandeAnnulationForm.controls.numeroCINDeclarant.setValue(this.data.element.numeroCINDeclarant);
    this.modifyDemandeAnnulationForm.controls.causeAnnulation.setValue(this.data.element.causeAnnulation);
  }

  patchFinaleValues() {
    this.modifyDemandeAnnulation.id = this.data.element.id;
    this.modifyDemandeAnnulation.nomDeclarant = this.modifyDemandeAnnulationForm.value.nomDeclarant;
    this.modifyDemandeAnnulation.prenomDeclarant = this.modifyDemandeAnnulationForm.value.prenomDeclarant;
    if (this.modifyDemandeAnnulationForm.value.dateNaissanceDeclarant != null) {
      this.modifyDemandeAnnulation.dateNaissanceDeclarant = moment(this.modifyDemandeAnnulationForm.value.dateNaissanceDeclarant as Date).format('YYYY-MM-DD');
    }
    this.modifyDemandeAnnulation.lieuNaissanceDeclarant = this.modifyDemandeAnnulationForm.value.lieuNaissanceDeclarant;
    this.modifyDemandeAnnulation.numeroCINDeclarant = this.modifyDemandeAnnulationForm.value.numeroCINDeclarant;
    this.modifyDemandeAnnulation.sexeDeclarant = this.modifyDemandeAnnulationForm.value.sexeDeclarant;
    this.modifyDemandeAnnulation.typeDeclarant = this.modifyDemandeAnnulationForm.value.typeDeclarant;
    this.modifyDemandeAnnulation.numeroCarte = this.data.element.numeroCarte;
    this.modifyDemandeAnnulation.typeCarburant = this.modifyDemandeAnnulationForm.value.typeCarburant;
    this.modifyDemandeAnnulation.montant = this.modifyDemandeAnnulationForm.value.montant;
    this.modifyDemandeAnnulation.causeAnnulation = this.modifyDemandeAnnulationForm.value.causeAnnulation;
    this.modifyDemandeAnnulation.montant = this.data.element.montant;
    this.modifyDemandeAnnulation.typeCarburant = this.data.element.typeCarburant;
  }
}
