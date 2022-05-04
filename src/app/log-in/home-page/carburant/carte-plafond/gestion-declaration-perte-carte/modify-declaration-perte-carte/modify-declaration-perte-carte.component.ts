import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeclarationPerteCartePlafond} from '../../declaration-perte-carte-plafond/declaration-perte-carte-plafond';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-modify-declaration-perte-carte',
  templateUrl: './modify-declaration-perte-carte.component.html',
  styleUrls: ['./modify-declaration-perte-carte.component.scss']
})
export class ModifyDeclarationPerteCarteComponent {
  modifyDeclarationForm = new FormGroup({
    typeDeclarant: new FormControl(null),
    nomDeclarant: new FormControl(null),
    prenomDeclarant: new FormControl(null),
    sexeDeclarant: new FormControl(null),
    dateNaissanceDeclarant: new FormControl(null),
    lieuNaissanceDeclarant: new FormControl(null),
    numeroCINDeclarant: new FormControl(null),
    typeDeclaration: new FormControl(null, [Validators.required]),
    datePerte: new FormControl(null, [Validators.required]),
    lieuPerte: new FormControl(null, [Validators.required]),
    cartePlafond: new FormControl(null, [Validators.required]),
    circonstances: new FormControl(null)
  });
  typeCarburant = '';
  structure = '';
  nomBeneficiaire = '';
  montant: number = null;
  modifiedDeclarationPerte: DeclarationPerteCartePlafond = {
    id: 0,
    nomDeclarant: '',
    prenomDeclarant: '',
    dateNaissanceDeclarant: '',
    lieuNaissanceDeclarant: '',
    numeroCINDeclarant: '',
    sexeDeclarant: '',
    typeDeclarant: '',
    typeDeclaration: '',
    idCarteplafond: null,
    datePerte: '',
    lieuPerte: '',
    circonstances: '',
    confirmed: false
  };

  constructor(public dialogRef: MatDialogRef<ModifyDeclarationPerteCarteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private ngxLoader: NgxUiLoaderService) {
console.log(this.data.element.carteplafond.id);
    this.ngxLoader.start();
    this.patchInitialValues();
    this.ngxLoader.stop();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifyDeclarationForm.valid) {
      this.patchFinalValues();
      this.dialogRef.close(this.modifiedDeclarationPerte);
    }
  }

  patchFinalValues() {
    this.modifiedDeclarationPerte.id = this.data.element.id;
    this.modifiedDeclarationPerte.idCarteplafond = this.data.element.carteplafond.id;
    this.modifiedDeclarationPerte.nomDeclarant = this.modifyDeclarationForm.value.nomDeclarant;
    this.modifiedDeclarationPerte.prenomDeclarant = this.modifyDeclarationForm.value.prenomDeclarant;
    if (this.modifyDeclarationForm.value.dateNaissanceDeclarant != null) {
      this.modifiedDeclarationPerte.dateNaissanceDeclarant = moment(this.modifyDeclarationForm.value.dateNaissanceDeclarant as Date).format('YYYY-MM-DD');
    }
   /* this.modifiedDeclarationPerte.lieuNaissanceDeclarant = this.modifyDeclarationForm.value.lieuNaissanceDeclarant;
    this.modifiedDeclarationPerte.numeroCINDeclarant = this.modifyDeclarationForm.value.numeroCINDeclarant;
    this.modifiedDeclarationPerte.sexeDeclarant = this.modifyDeclarationForm.value.sexeDeclarant;
    this.modifiedDeclarationPerte.typeDeclarant = this.modifyDeclarationForm.value.typeDeclarant;
    */
    this.modifiedDeclarationPerte.typeDeclaration = this.modifyDeclarationForm.value.typeDeclaration;   
    this.modifiedDeclarationPerte.datePerte = moment(this.modifyDeclarationForm.value.datePerte as Date).format('YYYY-MM-DD');
    this.modifiedDeclarationPerte.lieuPerte = this.modifyDeclarationForm.value.lieuPerte;
    this.modifiedDeclarationPerte.circonstances = this.modifyDeclarationForm.value.circonstances;
    this.modifiedDeclarationPerte.confirmed = this.data.element.confirmed;
  }

  patchInitialValues() {
    this.modifyDeclarationForm.controls.nomDeclarant.patchValue(this.data.element.nomDeclarant);
    this.modifyDeclarationForm.controls.prenomDeclarant.patchValue(this.data.element.prenomDeclarant);
    if (this.data.element.dateNaissanceDeclarant != null) {
      this.modifyDeclarationForm.controls.dateNaissanceDeclarant.patchValue(this.data.element.dateNaissanceDeclarant);
    }
    this.modifyDeclarationForm.controls.lieuNaissanceDeclarant.patchValue(this.data.element.lieuNaissanceDeclarant);
    this.modifyDeclarationForm.controls.numeroCINDeclarant.patchValue(this.data.element.numeroCINDeclarant);
    this.modifyDeclarationForm.controls.sexeDeclarant.patchValue(this.data.element.sexeDeclarant);
    this.modifyDeclarationForm.controls.typeDeclarant.patchValue(this.data.element.typeDeclarant);
    this.modifyDeclarationForm.controls.typeDeclaration.patchValue(this.data.element.typeDeclaration);
    this.modifyDeclarationForm.controls.datePerte.patchValue(this.data.element.datePerte);
    this.modifyDeclarationForm.controls.lieuPerte.patchValue(this.data.element.lieuPerte);
    this.modifyDeclarationForm.controls.circonstances.patchValue(this.data.element.circonstances);
    this.modifyDeclarationForm.controls.cartePlafond.patchValue(this.data.element.carteplafond.id);

  }
}
