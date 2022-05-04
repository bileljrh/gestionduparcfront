import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DeclarationPerteCartejocker} from './declaration-perte-carte-jocker';
import moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Router} from '@angular/router';
import {NouvelleCarteJocker} from '../../../gestion-cartes/gestion-cartes-jocker/nouvelle-carte-jocker/nouvelle-carte-jocker';
import { CarteJockerServiceService } from '../../carte-jocker-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomUser } from 'src/app/log-in/home-page/custom-user';

@Component({
  selector: 'app-new-declaration-perte-carte',
  templateUrl: './new-declaration-perte-carte.component.html',
  styleUrls: ['./new-declaration-perte-carte.component.scss'],
  providers: [MatSnackBar]
})
export class NewDeclarationPerteCarteComponent implements OnInit{
listUser : CustomUser[] = [];
  listCarteJocker: NouvelleCarteJocker[] = [];
  solde :'';
  dateFinValiditee : '';
  matricule : '';

  declarationPerteForm = new FormGroup({
    typeDeclarant: new FormControl(null),
    nomDeclarant: new FormControl(null),
    prenomDeclarant: new FormControl(null),
    sexeDeclarant: new FormControl(null),
    dateNaissanceDeclarant: new FormControl(null),
    lieuNaissanceDeclarant: new FormControl(null),
    numeroCINDeclarant: new FormControl(null),
    typeDeclaration: new FormControl(null),
    datePerte: new FormControl(null),
    lieuPerte: new FormControl(null),
    circonstances: new FormControl(null),
    numeroCarte: new FormControl(null,),
    matricule : new FormControl(null),
  });
  
  get f() { return this.declarationPerteForm.controls; }
  newDeclarationPerte: DeclarationPerteCartejocker = {
    nomDeclarant: '',
    prenomDeclarant: '',
    dateNaissanceDeclarant: '',
    lieuNaissanceDeclarant: '',
    numeroCINDeclarant: '',
    sexeDeclarant: '',
    typeDeclarant: '',
    typeDeclaration: '',
    idCartejocker:null,
    datePerte: '',
    lieuPerte: '',
    circonstances: '',
    confirmed: false,
    idUser :null,
  };
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvele déclaration de perte ne pourra pas être effectué, réessayez de nouveau s\'il vous plait';
  snackBarSuccessAddingMsg = 'L\'ajout d\'une nouvele déclaration de perte a été effectué avec succés';

  subscriptions: Subscription[] = [];

  constructor(public dialogRef: MatDialogRef<NewDeclarationPerteCarteComponent>,private CarteJocker: CarteJockerServiceService, private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.CarteJocker.getuserbyid(this.getid()).subscribe(value=> {
      this.listUser = value;
      this.matricule = value.matricule;
    });
    this.CarteJocker.getListCarteJocker().subscribe(value => {
      this.listCarteJocker = value;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
    this.ngxLoader.stop();  
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
     this.solde = value.solde;
      this.dateFinValiditee = value.dateFinValiditee;
    });
  }
  denyCreatingNewDeclaration() {
    this.declarationPerteForm.controls.numeroCarte.patchValue(null, {emitEvent: false});
    this.dateFinValiditee = '';
    this.solde = null;
    this.matricule = '';
  }

  createDeclaration() {
    if (this.declarationPerteForm.valid) {
      this.newDeclarationPerte = {
        dateNaissanceDeclarant:null,// moment(this.declarationPerteForm.value.dateNaissanceDeclarant as Date).format('YYYY-MM-DD'),
        nomDeclarant: this.declarationPerteForm.value.nomDeclarant,
        prenomDeclarant: this.declarationPerteForm.value.prenomDeclarant,
        lieuNaissanceDeclarant: this.declarationPerteForm.value.lieuNaissanceDeclarant,
        sexeDeclarant: this.declarationPerteForm.value.sexeDeclarant,
        numeroCINDeclarant: this.declarationPerteForm.value.numeroCINDeclarant,
        typeDeclarant: this.declarationPerteForm.value.typeDeclarant,
        typeDeclaration: this.declarationPerteForm.value.typeDeclaration,
        idCartejocker: this.declarationPerteForm.value.numeroCarte.id,
        datePerte: moment(this.declarationPerteForm.value.datePerte as Date).format('YYYY-MM-DD'),
        lieuPerte: this.declarationPerteForm.value.lieuPerte,
        circonstances: this.declarationPerteForm.value.circonstances,
        confirmed: false,
        idUser : this.getid()
      };
      this.ngxLoader.start();
      this.CarteJocker.createNewDeclarationPerteCarteJocker(this.newDeclarationPerte).subscribe(value => {
        this.ngxLoader.stop();
        this.dialogRef.close(this.declarationPerteForm);
        this.displayNotification(this.snackBarSuccessAddingMsg);
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
    this.newDeclarationPerte.nomDeclarant = this.declarationPerteForm.value.nomDeclarant;
    this.newDeclarationPerte.prenomDeclarant = this.declarationPerteForm.value.prenomDeclarant;
    if (this.declarationPerteForm.value.dateNaissanceDeclarant != null) {
      this.newDeclarationPerte.dateNaissanceDeclarant = moment(this.declarationPerteForm.value.dateNaissanceDeclarant as Date).format('YYYY-MM-DD');
    }
    this.newDeclarationPerte.lieuNaissanceDeclarant = this.declarationPerteForm.value.lieuNaissanceDeclarant;
    this.newDeclarationPerte.numeroCINDeclarant = this.declarationPerteForm.value.numeroCINDeclarant;
    this.newDeclarationPerte.sexeDeclarant = this.declarationPerteForm.value.sexeDeclarant;
    this.newDeclarationPerte.typeDeclarant = this.declarationPerteForm.value.typeDeclarant;
    this.newDeclarationPerte.typeDeclaration = this.declarationPerteForm.value.typeDeclaration;
    this.newDeclarationPerte.idCartejocker = this.declarationPerteForm.value.numeroCarte.id;
    this.newDeclarationPerte.datePerte = moment(this.declarationPerteForm.value.datePerte as Date).format('YYYY-MM-DD');
    this.newDeclarationPerte.lieuPerte = this.declarationPerteForm.value.lieuPerte;
    this.newDeclarationPerte.circonstances = this.declarationPerteForm.value.circonstances;
    this.newDeclarationPerte.confirmed = false;
    this.newDeclarationPerte.idUser =this.getid()


  } 
  closeDialog(): void {
    this.dialogRef.close();
  }

}
