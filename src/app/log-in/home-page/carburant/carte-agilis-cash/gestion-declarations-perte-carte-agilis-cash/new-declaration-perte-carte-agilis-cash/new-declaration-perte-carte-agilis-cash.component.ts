import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListCarteAgilisCash} from '../../../gestion-cartes/gestion-carte-agilis-cash/list-carte-agilis-cash';
import {DemandeAnnulationCarteAgilisCash} from '../../demande-annulation-carte-agilis-cash/demande-annulation-carte-agilis-cash';
import {CarteAgilisCashServiceService} from '../../carte-agilis-cash-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import moment from 'moment';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-declaration-perte-carte-agilis-cash',
  templateUrl: './new-declaration-perte-carte-agilis-cash.component.html',
  styleUrls: ['./new-declaration-perte-carte-agilis-cash.component.scss']
})
export class NewDeclarationPerteCarteAgilisCashComponent {
  typeCarburant = '';
  structure = '';
  nomBeneficiaire = '';
  soldeRestant: number = null;
  demandeAnnulationForm = new FormGroup({
    typeDeclarant: new FormControl(null, [Validators.required]),
    nomDeclarant: new FormControl(null, [Validators.required]),
    prenomDeclarant: new FormControl(null, [Validators.required]),
    sexeDeclarant: new FormControl(null, [Validators.required]),
    dateNaissanceDeclarant: new FormControl(null),
    lieuNaissanceDeclarant: new FormControl(null),
    numeroCINDeclarant: new FormControl(null),
    numero_plaque: new FormControl(null),
    matriculeBeneficiaire: new FormControl(null),
    numeroCarte: new FormControl(null),
    causeAnnulation: new FormControl(null)
  });
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
    causeAnnulation: ''
  };
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle demande d\'annulation du carte Agilis Cash a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle demande d\'annulation du carte Agilis Cash ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';


  constructor(public dialogRef: MatDialogRef<NewDeclarationPerteCarteAgilisCashComponent>, private CarteAgilisCash: CarteAgilisCashServiceService, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.CarteAgilisCash.getListAllCarteAgilisCash().subscribe(value => {
      this.rechargeCarteAgilisCash = value;
      this.ngxLoader.stop();
    });
    this.ngxLoader.stop();
  }


  createNewDemande() {
    const dateNaissanceDeclarant = moment(this.demandeAnnulationForm.value.dateNaissanceDeclarant as Date);
    this.demandeAnnulationForm.controls.dateNaissanceDeclarant.setValue(dateNaissanceDeclarant.format('YYYY-MM-DD'));
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
      matriculeBeneficiaire: this.demandeAnnulationForm.value.matriculeBeneficiaire.matriculeBeneficiaire,
      structure: this.structure,
      numeroCarte: this.demandeAnnulationForm.value.numeroCarte.numeroCarte,
      typeCarburant: this.typeCarburant,
      soldeRestant: this.soldeRestant,
      causeAnnulation: this.demandeAnnulationForm.value.causeAnnulation
    };
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
  }

}
