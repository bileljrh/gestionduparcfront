import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DemandeAnnulationCartePlafond} from './demande-annulation-carte-plafond';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {CartePlafondServiceService} from '../carte-plafond-service.service';
import {NouvelleCartePlafond} from '../../gestion-cartes/gestion-carte-plafond/nouvelle-carte-plafond';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-demande-annulation-carte-plafond',
  templateUrl: './demande-annulation-carte-plafond.component.html',
  styleUrls: ['./demande-annulation-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class DemandeAnnulationCartePlafondComponent implements OnInit {
  affectationCartePlafond: NouvelleCartePlafond[] = [];
  typeCarburant = '';
  montant: number = null;
  demandeAnnulationForm = new FormGroup({
    typeDeclarant: new FormControl(null),
    nomDeclarant: new FormControl(null),
    prenomDeclarant: new FormControl(null),
    sexeDeclarant: new FormControl(null),
    dateNaissanceDeclarant: new FormControl(null),
    lieuNaissanceDeclarant: new FormControl(null),
    numeroCINDeclarant: new FormControl(null),
    numeroCarte: new FormControl(null, [Validators.required]),
    causeAnnulation: new FormControl(null, [Validators.required]),
  });
  get f() { return this.demandeAnnulationForm.controls; }
  newDemandeAnnulation: DemandeAnnulationCartePlafond = {
    nomDeclarant: '',
    prenomDeclarant: '',
    dateNaissanceDeclarant: '',
    lieuNaissanceDeclarant: '',
    numeroCINDeclarant: '',
    sexeDeclarant: '',
    typeDeclarant: '',
    numeroCarte: '',
    montant: 0,
    causeAnnulation: '',
    typeCarburant: '',
    idCard:null
  };
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle demande de d\'annulation ne pourra pas être effectué, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'une nouvelle demande de d\'annulation a été effectué avec succés';
  CONFIRMATION_DEMANDE_ANNULATION_carte_plafond: boolean; 
  setDisplayedColumns() {
    this.CONFIRMATION_DEMANDE_ANNULATION_carte_plafond = this.Authentication.authoritiesUtilisateur.CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND;

  
  }  
  constructor(  private Authentication: AuthenticationServiceService,  private CartePlafond: CartePlafondServiceService, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.CartePlafond.getListCartePlafondDisponible().subscribe(value => {
      this.affectationCartePlafond = value;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
    this.demandeAnnulationForm.controls.numeroCarte.valueChanges.subscribe(value => {
      this.typeCarburant = value.typeCarburant;
      this.montant = value.montant;
    });
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
  }

  denyCreatingNewDeclaration() {
    this.demandeAnnulationForm.reset();
    window.location.reload();
  }

  createNewDeclaration() {
    if (this.demandeAnnulationForm.valid) {
      this.patchFinalValues();
      this.ngxLoader.start();
      this.CartePlafond.createNewDemandeAnnulationCarteCarburant(this.newDemandeAnnulation).subscribe(value => {
        this.ngxLoader.stop();
        this.displayNotification(this.snackBarSuccesAddingMsg);
      }, error => {
        this.ngxLoader.stop();
        this.displayNotification(this.snackBarFailureAddingMsg);
      });
    }
  }

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  patchFinalValues() {
    if (this.demandeAnnulationForm.value.dateNaissanceDeclarant != null) {
      this.newDemandeAnnulation.dateNaissanceDeclarant = this.demandeAnnulationForm.value.dateNaissanceDeclarant;
    }
    this.newDemandeAnnulation.nomDeclarant = this.demandeAnnulationForm.value.nomDeclarant;
    this.newDemandeAnnulation.prenomDeclarant = this.demandeAnnulationForm.value.prenomDeclarant;
    this.newDemandeAnnulation.lieuNaissanceDeclarant = this.demandeAnnulationForm.value.lieuNaissanceDeclarant;
    this.newDemandeAnnulation.numeroCINDeclarant = this.demandeAnnulationForm.value.numeroCINDeclarant;
    this.newDemandeAnnulation.sexeDeclarant = this.demandeAnnulationForm.value.sexeDeclarant;
    this.newDemandeAnnulation.typeDeclarant = this.demandeAnnulationForm.value.typeDeclarant;
    this.newDemandeAnnulation.numeroCarte = this.demandeAnnulationForm.value.numeroCarte.numeroCarte;
    this.newDemandeAnnulation.idCard=this.demandeAnnulationForm.value.numeroCarte.id;
    this.newDemandeAnnulation.typeCarburant = this.typeCarburant;
    this.newDemandeAnnulation.montant = this.montant;
    this.newDemandeAnnulation.causeAnnulation = this.demandeAnnulationForm.value.causeAnnulation;
  }

}
