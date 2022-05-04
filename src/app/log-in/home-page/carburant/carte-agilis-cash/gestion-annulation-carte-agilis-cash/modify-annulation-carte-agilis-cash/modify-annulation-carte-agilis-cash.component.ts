import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';
import {CarteAgilisCashServiceService} from '../../carte-agilis-cash-service.service';
import { DemandeAnnulationCarteAgilisCash } from '../../demande-annulation-carte-agilis-cash/demande-annulation-carte-agilis-cash';

@Component({   
  selector: 'app-modify-annulation-carte-agilis-cash',
  templateUrl: './modify-annulation-carte-agilis-cash.component.html',
  styleUrls: ['./modify-annulation-carte-agilis-cash.component.scss']
})
export class ModifyAnnulationCarteAgilisCashComponent implements OnInit {

  modifyDemandeAnnulationForm = new FormGroup({
    typeDeclarant: new FormControl(null),
    nomDeclarant: new FormControl(null),
    prenomDeclarant: new FormControl(null),
    sexeDeclarant: new FormControl(null),
    dateNaissanceDeclarant: new FormControl(null),
    lieuNaissanceDeclarant: new FormControl(null),
    numeroCINDeclarant: new FormControl(null),
    causeAnnulation: new FormControl(null),
    matriculeBeneficiaire:new FormControl(null),
    nomBeneficiaire:new FormControl(null),

    
  });
  modifyDemandeAnnulation: DemandeAnnulationCarteAgilisCash = {
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
    causeAnnulation: '',
    matriculeBeneficiaire:'',
    nomBeneficiaire:'',
    numero_plaque:'',
    soldeRestant:0,
    structure:'',



    };


  constructor(public dialogRef: MatDialogRef<ModifyAnnulationCarteAgilisCashComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, 
     private CarteAgilisCash: CarteAgilisCashServiceService) {
      this.patchInitialValues();
  }

  ngOnInit(): void {
    console.log("test valeurs data ");
    
    console.log(this.modifyDemandeAnnulationForm.value);
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelDelete() {
    this.dialogRef.close();
  }

  onConfirmDelete() {
    this.dialogRef.close(this.data.id);
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
    this.modifyDemandeAnnulationForm.controls.matriculeBeneficiaire.setValue(this.data.element.matriculeBeneficiaire);
    this.modifyDemandeAnnulationForm.controls.nomBeneficiaire.setValue(this.data.element.nomBeneficiaire);

    console.log(this.modifyDemandeAnnulationForm.value);
    
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
    this.modifyDemandeAnnulation.causeAnnulation = this.modifyDemandeAnnulationForm.value.causeAnnulation;
    this.modifyDemandeAnnulation.typeCarburant = this.data.element.typeCarburant;
    this.modifyDemandeAnnulation.matriculeBeneficiaire=this.data.element.matriculeBeneficiaire;
    this.modifyDemandeAnnulation.nomBeneficiaire=this.data.element.nomBeneficiaire;
    this.modifyDemandeAnnulation.soldeRestant=this.data.element.soldeRestant;
   // this.modifyDemandeAnnulation.structure=this.data.element.structure;

  }

}
