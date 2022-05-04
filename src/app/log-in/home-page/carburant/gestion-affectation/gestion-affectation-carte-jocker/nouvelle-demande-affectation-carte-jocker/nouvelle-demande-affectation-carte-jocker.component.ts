import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CarteJockerServiceService} from '../../../carte-jocker/carte-jocker-service.service';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {CarteJockerDataResponseList} from '../../../gestion-cartes/gestion-cartes-jocker/carte-jocker-data-response-list';
import {MatDialogRef} from '@angular/material/dialog';
import {SelectVehicule} from '../../../../administratif/vehicules/select-vehicule';


@Component({
  selector: 'app-nouvelle-demande-affectation-carte-jocker',
  templateUrl: './nouvelle-demande-affectation-carte-jocker.component.html',
  styleUrls: ['./nouvelle-demande-affectation-carte-jocker.component.scss'],
  providers: [MatSnackBar]
})
export class NouvelleDemandeAffectationCarteJockerComponent implements OnInit {
  carteJockerList: CarteJockerDataResponseList[] = [];
  vehiculeServiceList: SelectVehicule[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  demandeAffectationCarteJockerForm = new FormGroup({
    numeroPlaque: new FormControl(null,Validators.required),
    numeroCarte: new FormControl(null,Validators.required)
  });
  get f() { return this.demandeAffectationCarteJockerForm.controls; }

  solde = '';
  dateFinValidite = '';
  designationStructure = '';
  codeStructure = '';
  nomBeneficiaire = '';
  matriculeBeneficiaire = '';
  typeCarburant = '';


  constructor(private CarteJocker: CarteJockerServiceService, private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, public dialogRef: MatDialogRef<NouvelleDemandeAffectationCarteJockerComponent>) {
    this.ngxLoader.start();
    CarteJocker.getListNotAffectedCartesJocker().subscribe(value => {
      this.carteJockerList = value;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
    CarteJocker.getListVehiculesServiceWithNoCarteJocker().subscribe(value => {
      this.vehiculeServiceList = value;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.demandeAffectationCarteJockerForm.controls.numeroPlaque.valueChanges.subscribe(value => {
      console.log(value);
      if (value.nomBeneficiaire != null) {
        this.nomBeneficiaire = value.nomBeneficiaire;
      }
      if (value.matriculeBeneficiaire != null) {
        this.matriculeBeneficiaire = value.matriculeBeneficiaire;
      }
      this.codeStructure = value.codeStructure;
      this.designationStructure = value.designationStructure;
    });
    this.demandeAffectationCarteJockerForm.controls.numeroCarte.valueChanges.subscribe(value => {
      console.log(value);
      this.solde = value.solde;
      this.dateFinValidite = value.dateFinValidite;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelAdding() {
    this.dialogRef.close();
  }

  onConfirmAdding() {
    if (this.demandeAffectationCarteJockerForm.valid) {
      this.dialogRef.close({
        idVehicule: this.demandeAffectationCarteJockerForm.value.numeroPlaque.id,
        idCarte: this.demandeAffectationCarteJockerForm.value.numeroCarte.id
      });
    }
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }

}
