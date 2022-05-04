import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarteAgilisCashServiceService} from '../../carte-agilis-cash-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import {NewDeclarationPerteCarteAgilisCash} from '../../declaration-perte-carte-agilis-cash/new-declaration-perte-carte-agilis-cash';
import {ListCarteAgilisCash} from '../../../gestion-cartes/gestion-carte-agilis-cash/list-carte-agilis-cash';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomUser } from 'src/app/log-in/home-page/custom-user';

@Component({
  selector: 'app-modify-declarations-perte-carte-agilis-cash',
  templateUrl: './modify-declarations-perte-carte-agilis-cash.component.html',
  styleUrls: ['./modify-declarations-perte-carte-agilis-cash.component.scss']
})
export class ModifyDeclarationsPerteCarteAgilisCashComponent implements OnInit {
  rechargeCarteAgilisCash: ListCarteAgilisCash[] = [];
  typeCarburant = '';
  structure = '';
  nomBeneficiaire = '';
  soldeRestant: number = null;
  declarationPerteForm = new FormGroup({
    typeDeclarant: new FormControl(null, [Validators.required]),
    nomDeclarant: new FormControl(null, [Validators.required]),
    prenomDeclarant: new FormControl(null, [Validators.required]),
    sexeDeclarant: new FormControl(null, [Validators.required]),
    dateNaissanceDeclarant: new FormControl(null),
    lieuNaissanceDeclarant: new FormControl(null),
    numeroCINDeclarant: new FormControl(null),
    numeroPlaque: new FormControl(null),
    matriculeBeneficiaire: new FormControl(null),
    structure : new FormControl(null),
    CarteAgilis: new FormControl(null),
    typeDeclaration: new FormControl(null),
    datePerte: new FormControl(null),
    lieuPerte: new FormControl(null),
    circonstances: new FormControl(null)
  });
  modifyDeclarationPerte: NewDeclarationPerteCarteAgilisCash = {
    id : 0,
    nomDeclarant: '',
    prenomDeclarant: '',
    dateNaissanceDeclarant: '',
    lieuNaissanceDeclarant: '',
    numeroCINDeclarant: '',
    sexeDeclarant: '',
    typeDeclarant: '',
    typeDeclaration: '',
    numeroPlaque: '',
    nomBeneficiaire: '',
    matriculeBeneficiaire: '',
    idCarteagilis:null,
    structure: '',
    datePerte: '',
    lieuPerte: '',
    circonstances: '',
    confirmed: false
  };

  constructor(public dialogRef: MatDialogRef<ModifyDeclarationsPerteCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private CarteAgilisCash: CarteAgilisCashServiceService,private ngxLoader: NgxUiLoaderService) {
    console.log(data.element);
    this.ngxLoader.start();
    this.patchInitialValues();
    this.ngxLoader.stop();
  }
  patchInitialValues() {
    this.declarationPerteForm.controls.typeDeclarant.setValue(this.data.element.typeDeclarant);
    this.declarationPerteForm.controls.nomDeclarant.setValue(this.data.element.nomDeclarant);
    this.declarationPerteForm.controls.prenomDeclarant.setValue(this.data.element.prenomDeclarant);
    this.declarationPerteForm.controls.sexeDeclarant.setValue(this.data.element.sexeDeclarant);
    this.declarationPerteForm.controls.dateNaissanceDeclarant.setValue(this.data.element.dateNaissanceDeclarant);
    this.declarationPerteForm.controls.lieuNaissanceDeclarant.setValue(this.data.element.lieuNaissanceDeclarant);
    this.declarationPerteForm.controls.numeroCINDeclarant.setValue(this.data.element.numeroCINDeclarant);
    this.declarationPerteForm.controls.typeDeclaration.setValue(this.data.element.typeDeclaration);
    this.declarationPerteForm.controls.datePerte.setValue(this.data.element.datePerte);
    this.declarationPerteForm.controls.lieuPerte.setValue(this.data.element.lieuPerte);
    this.declarationPerteForm.controls.circonstances.setValue(this.data.element.circonstances);
   
  }

  ngOnInit(): void {
  
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
      this.patchFinalValues();
      this.dialogRef.close(this.modifyDeclarationPerte);   
  }
  getid(): any {
    if (localStorage.getItem('user')) {
      const user: CustomUser = JSON.parse(localStorage.getItem('user'));
      return user.id;
    } else {
      return 'Matricule anonyme';
    }
  }
  patchFinalValues() {
    const dateNaissanceDeclarant = moment(this.declarationPerteForm.value.dateNaissanceDeclarant as Date);
    this.declarationPerteForm.controls.dateNaissanceDeclarant.setValue(null);
    const datePerte = moment(this.declarationPerteForm.value.datePerte as Date);
    this.declarationPerteForm.controls.datePerte.setValue(datePerte.format('YYYY-MM-DD'));
    this.modifyDeclarationPerte = {
      id: this.data.element.id,
      idCarteagilis: this.data.element.carteagilis.id,
      nomDeclarant: this.declarationPerteForm.value.nomDeclarant,
      prenomDeclarant: this.declarationPerteForm.value.prenomDeclarant,
      dateNaissanceDeclarant: this.declarationPerteForm.value.dateNaissanceDeclarant,
      lieuNaissanceDeclarant: this.declarationPerteForm.value.lieuNaissanceDeclarant,
      numeroCINDeclarant: this.declarationPerteForm.value.numeroCINDeclarant,
      sexeDeclarant: this.declarationPerteForm.value.sexeDeclarant,
      typeDeclarant: this.declarationPerteForm.value.typeDeclarant,
      typeDeclaration: this.declarationPerteForm.value.typeDeclaration,
      numeroPlaque: this.data.element.numeroPlaque,
      nomBeneficiaire: this.data.element.nomBeneficiaire,
      matriculeBeneficiaire: this.data.element.matriculeBeneficiaire,
      structure: this.data.element.structure,
      datePerte: this.declarationPerteForm.value.datePerte,
      lieuPerte: this.declarationPerteForm.value.lieuPerte,
      circonstances: this.declarationPerteForm.value.circonstances,
      confirmed: false,
      idUser : this.getid()

    };
    this.dialogRef.close(this.modifyDeclarationPerte);
  }
  
}
