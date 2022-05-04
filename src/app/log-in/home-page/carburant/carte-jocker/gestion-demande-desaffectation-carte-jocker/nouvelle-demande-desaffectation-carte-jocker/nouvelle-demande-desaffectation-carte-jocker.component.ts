import {Component, Inject, OnInit} from '@angular/core';
import {ListAffectedVehiculesAndCartesJocker} from '../list-affected-vehicules-and-cartes-jocker';
import {CarteJockerServiceService} from '../../carte-jocker-service.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NouvelleDemandeDesaffectationCarteJocker} from './nouvelle-demande-desaffectation-carte-jocker';
import moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nouvelle-demande-desaffectation-carte-jocker',
  templateUrl: './nouvelle-demande-desaffectation-carte-jocker.component.html',
  styleUrls: ['./nouvelle-demande-desaffectation-carte-jocker.component.scss'],
  providers: [MatSnackBar]
})
export class NouvelleDemandeDesaffectationCarteJockerComponent implements OnInit {
  listAffectedVehiculesAndCartesJocker: ListAffectedVehiculesAndCartesJocker[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle demande de désaffectation de carte Jocker ne pourra pas être effectué, réessayez de nouveau s\'il vous plait';
  nouvelleDemandeDesaffectationForm = new FormGroup({
    numero_plaque: new FormControl(null, [Validators.required]),
    matriculeBeneficiaire: new FormControl(null, [Validators.required]),
    numeroCarte: new FormControl(null, [Validators.required]),
    soldeDesaffectation: new FormControl(null, [Validators.required]),
    dateDesaffectation: new FormControl(new Date(), [Validators.required]),
    note: new FormControl(null),
  });
  NouvelleDemandeDesaffectation: NouvelleDemandeDesaffectationCarteJocker = {
    idCarte: null,
    dateDesaffectation: '',
    soldeDesaffectation: null,
    note: '',
    structure:'',
    dateDemandeDesaffectation:''


  };
  structure = '';
  typeCarburant = '';
  nomBeneficiaire = '';
  dateAffectation = '';
  dateDemandeAffectation = '';
  solde = '';
  nombreAffectation = '';
  dateDerniereDesaffectation = '';

  date:string;
  start = new Date(Date.now());
  constructor(private CarteJocker: CarteJockerServiceService,
     private router: Router, private snackBar: MatSnackBar,
      private ngxLoader: NgxUiLoaderService,
      public dialogRef: MatDialogRef<NouvelleDemandeDesaffectationCarteJocker>,
     @Inject(MAT_DIALOG_DATA) public data: any) {
      this.date=this.start.getFullYear().toString()+"-"+(this.start.getMonth()+1)+"-"+this.start.getDay();
    this.ngxLoader.start();
    this.CarteJocker.listCarsAnnuler().subscribe((value:any) => {
      this.dateAffectation=value.dateDerniereAffectation;
      this.listAffectedVehiculesAndCartesJocker = value;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }

  ngOnInit(): void {
    this.nouvelleDemandeDesaffectationForm.controls.numero_plaque.valueChanges.subscribe(value => {
      this.nouvelleDemandeDesaffectationForm.controls.matriculeBeneficiaire.patchValue(value, {emitEvent: false});
      this.nouvelleDemandeDesaffectationForm.controls.numeroCarte.patchValue(value, {emitEvent: false});
     
      console.log("test affecttaation");
      console.log(value);
      
      
      this.structure = value.structure.designation;
      this.typeCarburant = value.typeCarburant;
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.dateAffectation = this.dateAffectation;
      this.dateDemandeAffectation = value.dateDemandeAffectation;
      this.solde = value.solde;
      this.nombreAffectation = value.nombreAffectation;
      this.dateDerniereDesaffectation = value.dateDerniereDesaffectation;
    });
    this.nouvelleDemandeDesaffectationForm.controls.numeroCarte.valueChanges.subscribe(value => {
      this.nouvelleDemandeDesaffectationForm.controls.matriculeBeneficiaire.patchValue(value, {emitEvent: false});
      this.nouvelleDemandeDesaffectationForm.controls.numero_plaque.patchValue(value, {emitEvent: false});
      this.structure = value.structure;
      this.typeCarburant = value.typeCarburant;
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.dateAffectation = value.dateDerniereAffectation;
      this.dateDemandeAffectation = value.dateDemandeAffectation;
      this.solde = value.solde;
      this.nombreAffectation = value.nombreAffectation;
      this.dateDerniereDesaffectation = value.dateDerniereDesaffectation;
    });
    this.nouvelleDemandeDesaffectationForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.nouvelleDemandeDesaffectationForm.controls.numero_plaque.patchValue(value, {emitEvent: false});
      this.nouvelleDemandeDesaffectationForm.controls.numeroCarte.patchValue(value, {emitEvent: false});
      this.structure = value.structure;
      this.typeCarburant = value.typeCarburant;
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.dateAffectation = value.dateDerniereAffectation;
      this.dateDemandeAffectation = value.dateDemandeAffectation;
      this.solde = value.solde;
      this.nombreAffectation = value.nombreAffectation;
      this.dateDerniereDesaffectation = value.dateDerniereDesaffectation;
    });
  }
  onCancel() {
    this.dialogRef.close();
  }
  denyCreatingNewDemande() {
    this.structure = '';
    this.typeCarburant = '';
    this.nomBeneficiaire = '';
    this.dateAffectation = '';
    this.dateDemandeAffectation = '';
    this.solde = '';
    this.nombreAffectation = '';
    this.dateDerniereDesaffectation = '';
    this.nouvelleDemandeDesaffectationForm.controls.numero_plaque.setValue(null, {emitEvent: false});
    this.nouvelleDemandeDesaffectationForm.controls.numeroCarte.setValue(null, {emitEvent: false});
    this.nouvelleDemandeDesaffectationForm.controls.matriculeBeneficiaire.setValue(null, {emitEvent: false});
  }

  createNewDemande() {
    console.log(this.nouvelleDemandeDesaffectationForm.value);
    
    this.ngxLoader.start();
    const dateDesaffectation = moment(this.nouvelleDemandeDesaffectationForm.value.dateDesaffectation as Date);
    this.dateDemandeAffectation
    this.nouvelleDemandeDesaffectationForm.controls.dateDesaffectation.setValue(dateDesaffectation.format('YYYY-MM-DD'));
    this.NouvelleDemandeDesaffectation = {
      idCarte: this.nouvelleDemandeDesaffectationForm.value.numeroCarte.id,
      dateDesaffectation: this.nouvelleDemandeDesaffectationForm.value.dateDesaffectation,
      soldeDesaffectation: this.nouvelleDemandeDesaffectationForm.value.soldeDesaffectation,
      note: this.nouvelleDemandeDesaffectationForm.value.note,
      structure : this.nouvelleDemandeDesaffectationForm.value.numeroCarte.codeStructure,
      dateDemandeDesaffectation:this.nouvelleDemandeDesaffectationForm.value.dateDesaffectation


    };
    this.dialogRef.close(this.NouvelleDemandeDesaffectation);
    console.log("test test desaffectatiojn");
    console.log(this.NouvelleDemandeDesaffectation);
    
    
  }
}
