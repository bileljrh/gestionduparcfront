import {Component, Inject} from '@angular/core';
import {NewCarteAgilisCash} from '../new-carte-agilis-cash';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CarteAgilisCashServiceService} from '../../../carte-agilis-cash/carte-agilis-cash-service.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import moment from 'moment';

@Component({
  selector: 'app-modify-carte-agilis-cash',
  templateUrl: './modify-carte-agilis-cash.component.html',
  styleUrls: ['./modify-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class ModifyCarteAgilisCashComponent {
  modifiedCarteAgilisCash: NewCarteAgilisCash = {
    idCarte: null,
    numeroCarte: '',
    montant: 0,
    dateFinValidite: '',
    idVehicule: null,
    typeCarburant: ''
  };
  codeStructure = '';
  designationStructure = '';
  nomBeneficiaire = '';
  matriculeBeneficiaire = '';
  typeCarburant = '';
  modifiedCarteAgilisCashForm = new FormGroup({
    numeroCarte: new FormControl(null, Validators.required),
    montant: new FormControl(null, Validators.required),
    dateFinValidite: new FormControl(new Date(), Validators.required)
  });
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';

  constructor(public dialogRef: MatDialogRef<ModifyCarteAgilisCashComponent>, private CarteAgilisCash: CarteAgilisCashServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngxLoader.start();
    this.patchInitialValues();
    this.ngxLoader.stop();
  }

  onCancel() {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedCarteAgilisCashForm.valid) {
      this.modifiedCarteAgilisCash = {
        idCarte: this.data.element.id,
        numeroCarte: this.modifiedCarteAgilisCashForm.value.numeroCarte,
        montant: this.modifiedCarteAgilisCashForm.value.montant,
        dateFinValidite: moment(this.modifiedCarteAgilisCashForm.value.dateFinValidite as Date).format('YYYY-MM-DD'),
        idVehicule: null,
        typeCarburant: this.data.element.typeCarburant
      };
      this.dialogRef.close(this.modifiedCarteAgilisCash);
    }
  }

  patchInitialValues() {
    this.modifiedCarteAgilisCashForm.controls.numeroCarte.patchValue(this.data.element.numeroCarte);
    this.modifiedCarteAgilisCashForm.controls.montant.patchValue(this.data.element.montant);
    this.modifiedCarteAgilisCashForm.controls.dateFinValidite.patchValue(this.data.element.dateFinValidite);
  }

}
