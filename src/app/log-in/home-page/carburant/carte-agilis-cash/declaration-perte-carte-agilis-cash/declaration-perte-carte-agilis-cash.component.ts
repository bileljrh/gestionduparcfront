import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import {CarteAgilisCashServiceService} from '../carte-agilis-cash-service.service';
import {ListCarteAgilisCash} from '../../gestion-cartes/gestion-carte-agilis-cash/list-carte-agilis-cash';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NewDeclarationPerteCarteAgilisCash} from './new-declaration-perte-carte-agilis-cash';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomUser } from '../../../custom-user';

@Component({
  selector: 'app-declaration-perte-carte-agilis-cash',
  templateUrl: './declaration-perte-carte-agilis-cash.component.html',
  styleUrls: ['./declaration-perte-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class DeclarationPerteCarteAgilisCashComponent {
  listUser : CustomUser[] = [];
  matricule : '';
  rechargeCarteAgilisCash: ListCarteAgilisCash[] = [];
  typeCarburant = '';
  structure = '';
  nomBeneficiaire = '';
  soldeRestant: number = null;
  declarationPerteForm = new FormGroup({
    typeDeclarant: new FormControl(null),
    nomDeclarant: new FormControl(null),
    prenomDeclarant: new FormControl(null),
    sexeDeclarant: new FormControl(null),
    dateNaissanceDeclarant: new FormControl(null),
    lieuNaissanceDeclarant: new FormControl(null),
    numeroCINDeclarant: new FormControl(null),
    numeroCarte:  new FormControl(null, [Validators.required]),
    typeDeclaration: new FormControl(null),
    datePerte: new FormControl(null),
    lieuPerte: new FormControl(null),
    circonstances: new FormControl(null),
    numeroPlaque: new FormControl(null),
    matriculeBeneficiaire: new FormControl(null),
    structure : new FormControl(null),
    matricule : new FormControl(null)

  });
  matriculeBeneficiaire: '';
  numeroSerie: '';
  numeroPlaque: '';
  
  get f() { return this.declarationPerteForm.controls; }
  newDeclarationPerte: NewDeclarationPerteCarteAgilisCash = {
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
    structure: '',
    idCarteagilis:null,
    datePerte: '',
    lieuPerte: '',
    circonstances: '',
    confirmed: false,
    idUser :null,
  };
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle déclaration de perte a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle déclaration de perte ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';


  constructor(public dialogRef: MatDialogRef<DeclarationPerteCarteAgilisCashComponent>,private CarteAgilisCash: CarteAgilisCashServiceService, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.CarteAgilisCash.getuserbyid(this.getid()).subscribe(value=> {
      this.listUser = value;
      this.matricule = value.matricule;
    });
    this.CarteAgilisCash.getListCarteAgilis().subscribe(value => {
      this.rechargeCarteAgilisCash = value;
      console.log(this.rechargeCarteAgilisCash);
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
    this.declarationPerteForm.controls.numeroCarte.valueChanges.subscribe(value => {
      this.typeCarburant = value.typeCarburant;
      this.soldeRestant = value.soldeRestant;
    });
    
  }
  getid(): any {
    if (localStorage.getItem('user')) {
      const user: CustomUser = JSON.parse(localStorage.getItem('user'));
      return user.id;
    } else {
      return 'Matricule anonyme';
    }
  }
  ngOnInit(): void {
    this.declarationPerteForm.controls.numeroCarte.valueChanges.subscribe(value => {   
     this.soldeRestant = value.soldeRestant;
      this.typeCarburant = value.typeCarburant;
    });
  }
  denyCreatingNewDeclaration() {
    this.declarationPerteForm.reset();
  }

  createNewDeclaration() {
    this.ngxLoader.start();
    const dateNaissanceDeclarant = moment(this.declarationPerteForm.value.dateNaissanceDeclarant as Date);
    this.declarationPerteForm.controls.dateNaissanceDeclarant.setValue(null);
    const datePerte = moment(this.declarationPerteForm.value.datePerte as Date);
    this.declarationPerteForm.controls.datePerte.setValue(datePerte.format('YYYY-MM-DD'));
    this.newDeclarationPerte = {
      nomDeclarant: this.declarationPerteForm.value.nomDeclarant,
      prenomDeclarant: this.declarationPerteForm.value.prenomDeclarant,
      dateNaissanceDeclarant: this.declarationPerteForm.value.dateNaissanceDeclarant,
      lieuNaissanceDeclarant: this.declarationPerteForm.value.lieuNaissanceDeclarant,
      numeroCINDeclarant: this.declarationPerteForm.value.numeroCINDeclarant,
      sexeDeclarant: this.declarationPerteForm.value.sexeDeclarant,
      typeDeclarant: this.declarationPerteForm.value.typeDeclarant,
      typeDeclaration: this.declarationPerteForm.value.typeDeclaration,
      numeroPlaque: this.declarationPerteForm.value.numeroPlaque,
      nomBeneficiaire: this.declarationPerteForm.value.nomBeneficiaire,
      matriculeBeneficiaire: this.declarationPerteForm.value.matriculeBeneficiaire,
      structure: this.declarationPerteForm.value.structure,
      idCarteagilis: this.declarationPerteForm.value.numeroCarte.id,
      datePerte: this.declarationPerteForm.value.datePerte,
      lieuPerte: this.declarationPerteForm.value.lieuPerte,
      circonstances: this.declarationPerteForm.value.circonstances,
      confirmed: false,
      idUser : this.getid()
    };
    this.CarteAgilisCash.createOneDeclarationPerteCarteAgilisCash(this.newDeclarationPerte).subscribe(value => {
      this.ngxLoader.stop();
      this.closeDialog();
      setTimeout(() => {
        this.snackBar.open(this.snackBarSuccesAddingMsg, 'X', {duration: 3000});
      }, 800);
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureAddingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
