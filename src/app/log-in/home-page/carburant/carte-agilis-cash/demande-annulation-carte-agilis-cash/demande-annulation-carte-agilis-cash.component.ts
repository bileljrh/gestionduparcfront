import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import {DemandeAnnulationCarteAgilisCash} from './demande-annulation-carte-agilis-cash';
import {CarteAgilisCashServiceService} from '../carte-agilis-cash-service.service';
import {ListCarteAgilisCash} from '../../gestion-cartes/gestion-carte-agilis-cash/list-carte-agilis-cash';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { Vehicule } from '../../../administratif/vehicules/vehicule';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-demande-annulation-carte-agilis-cash',
  templateUrl: './demande-annulation-carte-agilis-cash.component.html',
  styleUrls: ['./demande-annulation-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class DemandeAnnulationCarteAgilisCashComponent {
  typeCarburant = '';
  matbeneficiare='';
  structure = '';
  nomBeneficiaire = '';
  numSerie:'';
  soldeRestant: number = null;
  demandeAnnulationForm = new FormGroup({
    typeDeclarant: new FormControl(null),
    nomDeclarant: new FormControl(null),
    prenomDeclarant: new FormControl(null),
    sexeDeclarant: new FormControl(null),
    dateNaissanceDeclarant: new FormControl(null),
    lieuNaissanceDeclarant: new FormControl(null),
    numeroCINDeclarant: new FormControl(null),
    numero_plaque: new FormControl(null),
    matriculeBeneficiaire: new FormControl(null),
    numeroCarte: new FormControl(null, [Validators.required]),
    causeAnnulation:new FormControl(null, [Validators.required]),

   
  });
  
  get f() { return this.demandeAnnulationForm.controls; }
  laVehicule:Vehicule[]=[];
  rechargeCarteAgilisCash: ListCarteAgilisCash[] = [];
  newDemandeAnnulation: DemandeAnnulationCarteAgilisCash = {
    nomDeclarant: '',
    prenomDeclarant: '',
    dateNaissanceDeclarant: '',
    lieuNaissanceDeclarant: '',
    numeroCINDeclarant: '',
    sexeDeclarant: '',
    typeDeclarant: '',
    numero_plaque: '',
    nomBeneficiaire: '',
    matriculeBeneficiaire: '',
    structure: '',
    numeroCarte: '',
    typeCarburant: '',
    soldeRestant: 0,
    causeAnnulation: '',
    idCard:null

  };



  

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle demande d\'annulation du carte Agilis Cash a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle demande d\'annulation du carte Agilis Cash ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';


  constructor(private CarteAgilisCash: CarteAgilisCashServiceService, 
    private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService,
    public dialogRef: MatDialogRef<DemandeAnnulationCarteAgilisCashComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngxLoader.start();
    this.CarteAgilisCash.getListAllCarteAgilisCash().subscribe(value => {
      this.rechargeCarteAgilisCash = value;
      
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
    this.demandeAnnulationForm.controls.numeroCarte.valueChanges.subscribe(value => {
      this.typeCarburant = value.typeCarburant;
      this.structure = value.vehicule.structure.designation;
      this.nomBeneficiaire = value.vehicule.beneficiaire.nom;
      this.matbeneficiare=value.vehicule.beneficiaire.matricule;
      this.numSerie=value.vehicule.numeroSerie;
      this.soldeRestant = value.soldeRestant;
      this.demandeAnnulationForm.controls.numero_plaque.patchValue(value, {emitEvent: false});
      this.demandeAnnulationForm.controls.matriculeBeneficiaire.patchValue(value, {emitEvent: false});
    });
    this.demandeAnnulationForm.controls.numero_plaque.valueChanges.subscribe(value => {

      this.typeCarburant = value.typeCarburant;
      this.structure = value.structure;
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.soldeRestant = value.soldeRestant;
      this.demandeAnnulationForm.controls.numeroCarte.patchValue(value, {emitEvent: false});
      this.demandeAnnulationForm.controls.matriculeBeneficiaire.patchValue(value, {emitEvent: false});
    });
    this.demandeAnnulationForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.typeCarburant = value.typeCarburant;
      this.structure = value.structure;
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.soldeRestant = value.soldeRestant;
      this.demandeAnnulationForm.controls.numeroCarte.patchValue(value, {emitEvent: false});
      this.demandeAnnulationForm.controls.numero_plaque.patchValue(value, {emitEvent: false});
    });
  }
  onCancel() {
    this.dialogRef.close();
  }

  denyCreatingNewDeclaration() {
    this.demandeAnnulationForm.reset();
    window.location.reload();
  }

  createNewDemande() {
    const dateNaissanceDeclarant = moment(this.demandeAnnulationForm.value.dateNaissanceDeclarant as Date);
    this.demandeAnnulationForm.controls.dateNaissanceDeclarant.setValue(null);
    this.newDemandeAnnulation = {
      nomDeclarant: this.demandeAnnulationForm.value.nomDeclarant,
      prenomDeclarant: this.demandeAnnulationForm.value.prenomDeclarant,
      dateNaissanceDeclarant: this.demandeAnnulationForm.value.dateNaissanceDeclarant,
      lieuNaissanceDeclarant: this.demandeAnnulationForm.value.lieuNaissanceDeclarant,
      numeroCINDeclarant: this.demandeAnnulationForm.value.numeroCINDeclarant,
      sexeDeclarant: this.demandeAnnulationForm.value.sexeDeclarant,
      typeDeclarant: this.demandeAnnulationForm.value.typeDeclarant,
      numero_plaque: this.demandeAnnulationForm.value.numero_plaque.numero_plaque,
      nomBeneficiaire: this.nomBeneficiaire,
      matriculeBeneficiaire: this.matbeneficiare,
      structure: this.structure,
      numeroCarte: this.demandeAnnulationForm.value.numeroCarte.numeroCarte,
      typeCarburant: this.typeCarburant,
      soldeRestant: this.soldeRestant,
      causeAnnulation: this.demandeAnnulationForm.value.causeAnnulation,
      idCard:this.demandeAnnulationForm.value.numeroCarte.id
    };
    this.dialogRef.close(this.newDemandeAnnulation);
    /*
    this.CarteAgilisCash.createNewDemandeAnnulationCarteCarburant(this.newDemandeAnnulation).subscribe(value => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarSuccesAddingMsg, 'X', {duration: 3000});
      }, 800);
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureAddingMsg, 'X', {duration: 3000});
      }, 800);
    });
    */
  }


  

}
