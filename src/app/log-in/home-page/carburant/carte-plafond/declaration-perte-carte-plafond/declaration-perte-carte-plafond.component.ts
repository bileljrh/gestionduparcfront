import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeclarationPerteCartePlafond} from './declaration-perte-carte-plafond';
import moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Router} from '@angular/router';
import {CartePlafondServiceService} from '../carte-plafond-service.service';
import {NouvelleCartePlafond} from '../../gestion-cartes/gestion-carte-plafond/nouvelle-carte-plafond';
import { NullTemplateVisitor } from '@angular/compiler';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomUser } from '../../../custom-user';

@Component({
  selector: 'app-declaration-perte-carte-plafond',
  templateUrl: './declaration-perte-carte-plafond.component.html',
  styleUrls: ['./declaration-perte-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class DeclarationPerteCartePlafondComponent implements OnInit {
  listUser : CustomUser[]=[];
  listCartePlafond: NouvelleCartePlafond[] = [];
  typeCarburant = '';
  montant: number = null;
  matricule : '';
  declarationPerteForm = new FormGroup({
    typeDeclarant: new FormControl(null),
    nomDeclarant: new FormControl(null),
    prenomDeclarant: new FormControl(null),
    sexeDeclarant: new FormControl(null),
    dateNaissanceDeclarant: new FormControl(null),
    lieuNaissanceDeclarant: new FormControl(null),
    numeroCINDeclarant:  new FormControl(null),
    numeroCarte: new FormControl(null, [Validators.required]),
    typeDeclaration: new FormControl(null),
    datePerte: new FormControl(null, [Validators.required]),
    lieuPerte: new FormControl(null, [Validators.required]),
    circonstances:  new FormControl(null, [Validators.required]),
    matricule : new FormControl(null),

  });
  get f() { return this.declarationPerteForm.controls; }
  newDeclarationPerte: DeclarationPerteCartePlafond = {
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
    confirmed: false,
    idUser :null,
  };
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvele déclaration de perte ne pourra pas être effectué, réessayez de nouveau s\'il vous plait';
  snackBarSuccessAddingMsg = 'L\'ajout d\'une nouvele déclaration de perte a été effectué avec succés';


  constructor(public dialogRef: MatDialogRef<DeclarationPerteCartePlafondComponent>,private CartePlafond: CartePlafondServiceService, private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService,public dialog: MatDialog) {
    this.ngxLoader.start();
    this.CartePlafond.getuserbyid(this.getid()).subscribe(value=> {
      this.listUser = value;
      this.matricule = value.matricule;
    });
    this.CartePlafond.getListCartePlafond().subscribe(value => {
      this.listCartePlafond = value;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
      console.log(this.snackBarFailureLoadingMsg);
      
    });
    this.ngxLoader.stop();
  }
  getid(): any {
    if (localStorage.getItem('user')) {
      const user: CustomUser = JSON.parse(localStorage.getItem('user'));
      return user.id;
    } else {
      return 'id anonyme';
    }
  }

  ngOnInit(): void {
    this.declarationPerteForm.controls.numeroCarte.valueChanges.subscribe(value => {
      console.log(value);
      this.typeCarburant = value.typeCarburant;
      this.montant = value.montant;
    });
  }

  denyCreatingNewDeclaration() {
    this.dialogRef.close();

  }

  createNewDeclaration() {
    if (this.declarationPerteForm.valid) {
      this.ngxLoader.start();
      this.patchFinalValues();
      console.log(this.newDeclarationPerte);
      this.CartePlafond.createNewDeclarationPerteCartePlafond(this.newDeclarationPerte).subscribe(value => {
        this.ngxLoader.stop();
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
    this.newDeclarationPerte.idCarteplafond = this.declarationPerteForm.value.numeroCarte.id;
    this.newDeclarationPerte.datePerte = moment(this.declarationPerteForm.value.datePerte as Date).format('YYYY-MM-DD');
    this.newDeclarationPerte.lieuPerte = this.declarationPerteForm.value.lieuPerte;
    this.newDeclarationPerte.circonstances = this.declarationPerteForm.value.circonstances;
    this.newDeclarationPerte.confirmed = false;
    this.newDeclarationPerte.idUser = this.getid()

  }
  closeDialog(){
    this.dialogRef.close();
  }
}
