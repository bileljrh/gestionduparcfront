import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarteJockerServiceService} from '../../../carte-jocker/carte-jocker-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {FormControl, FormGroup} from '@angular/forms';
import {CarteJockerDataResponseList} from '../../../gestion-cartes/gestion-cartes-jocker/carte-jocker-data-response-list';
import {SelectVehicule} from '../../../../administratif/vehicules/select-vehicule';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-modify-demande-affectation-carte-jocker',
  templateUrl: './modify-demande-affectation-carte-jocker.component.html',
  styleUrls: ['./modify-demande-affectation-carte-jocker.component.scss'],
  providers: [MatSnackBar]
})
export class ModifyDemandeAffectationCarteJockerComponent {
  carteJockerList: CarteJockerDataResponseList[] = [];
  vehiculeServiceList: SelectVehicule[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  modifyDemandeAffectationCarteJockerForm = new FormGroup({
    numeroPlaque: new FormControl(null),
    numeroCarte: new FormControl(null)
  });
  solde = '';
  dateFinValidite = '';
  designationStructure = '';
  codeStructure = '';
  nomBeneficiaire = '';
  matriculeBeneficiaire = '';
  typeCarburant = '';

  constructor(private CarteJocker: CarteJockerServiceService, private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, public dialogRef: MatDialogRef<ModifyDemandeAffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngxLoader.start();
    this.patchFinalValues();
    this.modifyDemandeAffectationCarteJockerForm.controls.numeroPlaque.valueChanges.subscribe(value => {
      if (value.nomBeneficiaire != null) {
        this.nomBeneficiaire = value.nomBeneficiaire;
      }
      if (value.matriculeBeneficiaire != null) {
        this.matriculeBeneficiaire = value.matriculeBeneficiaire;
      }
      this.codeStructure = value.codeStructure;
      this.designationStructure = value.designationStructure;
    });
    this.modifyDemandeAffectationCarteJockerForm.controls.numeroCarte.valueChanges.subscribe(value => {
      this.solde = value.solde;
      this.dateFinValidite = value.dateFinValidite;
    });
    CarteJocker.getListCardWithNoCards().subscribe(value => {
      this.carteJockerList = value;
      this.carteJockerList.forEach(value1 => {
        if (value1.id === data.element.idCarte) {
          console.log(data.element.idCarte);
          this.modifyDemandeAffectationCarteJockerForm.controls.numeroCarte.patchValue(value);
        }
      });
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
    CarteJocker.getListVehiculesServiceWithNoCarteJocker().subscribe(value => {
      this.vehiculeServiceList = value;
      this.vehiculeServiceList.forEach(value1 => {
        if (value1.id === data.element.idVehicule) {
          console.log(data.element.idVehicule);
          this.modifyDemandeAffectationCarteJockerForm.controls.numeroPlaque.patchValue(value);
        }
      });
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
    this.ngxLoader.stop();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelAdding() {
    this.dialogRef.close();
  }

  onConfirmAdding() {
    if (this.modifyDemandeAffectationCarteJockerForm.valid) {
      this.dialogRef.close({
        idVehicule: this.modifyDemandeAffectationCarteJockerForm.value.numeroPlaque.id,
        idCarte: this.modifyDemandeAffectationCarteJockerForm.value.numeroCarte.id
      });
    }
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }

  patchFinalValues() {
    this.modifyDemandeAffectationCarteJockerForm.controls.numeroPlaque.setValue(this.data.element.numeroPlaque);
    this.modifyDemandeAffectationCarteJockerForm.controls.nomBeneficiaire.setValue(this.data.element.nomBeneficiaire);
   this.modifyDemandeAffectationCarteJockerForm.controls.designationStructure.setValue(this.data.element.designationStructure);
    this.modifyDemandeAffectationCarteJockerForm.controls.carteJocker.setValue(this.data.element.carteJocker.numeroCarte);
    this.modifyDemandeAffectationCarteJockerForm.controls.solde.setValue(this.data.element.solde);
   this.modifyDemandeAffectationCarteJockerForm.controls.dateFinValidite.setValue(this.data.element.dateFinValidite);
  }
}