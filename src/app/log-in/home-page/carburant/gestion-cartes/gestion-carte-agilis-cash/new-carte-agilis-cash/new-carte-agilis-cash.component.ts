import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import moment from 'moment';
import {NewCarteAgilisCash} from '../new-carte-agilis-cash';
import {CarteAgilisCashServiceService} from '../../../carte-agilis-cash/carte-agilis-cash-service.service';
import {SelectVehicule} from '../../../../administratif/vehicules/select-vehicule';


@Component({
  selector: 'app-new-carte-agilis-cash',
  templateUrl: './new-carte-agilis-cash.component.html',
  styleUrls: ['./new-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class NewCarteAgilisCashComponent implements OnInit {
  nouvelleCarteAgilisCash: NewCarteAgilisCash = {
    numeroCarte: '',
    montant: 0,
    dateFinValidite: '',
    idVehicule: null,
    idCarte: null,
    typeCarburant: ''
  };
  ListVehicule: SelectVehicule[] = [];
  codeStructure = '';
  designationStructure = '';
  nomBeneficiaire = '';
  matriculeBeneficiaire = '';
  typeCarburant = '';
  newCarteAgilisCashForm = new FormGroup({
    numeroPlaque: new FormControl(null, Validators.required),
    numeroCarte: new FormControl(null, Validators.required),
    montant: new FormControl(null, Validators.required),
    dateFinValidite: new FormControl(new Date(), Validators.required)
  });
  get f() { return this.newCarteAgilisCashForm.controls; }
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';

  constructor(public dialogRef: MatDialogRef<NewCarteAgilisCashComponent>, private CarteAgilisCash: CarteAgilisCashServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    CarteAgilisCash.getSelectVehiculeByStrucutureForAgilisCash().subscribe(value => {
      this.ListVehicule = value;
      this.ngxLoader.stop();
    });
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.newCarteAgilisCashForm.controls.numeroPlaque.valueChanges.subscribe(value => {
      this.codeStructure = value.codeStructure;
      this.designationStructure = value.designationStructure;
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.matriculeBeneficiaire = value.matriculeBeneficiaire;
      this.typeCarburant = value.typeCarburant;
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newCarteAgilisCashForm.valid) {
      this.nouvelleCarteAgilisCash = {
        numeroCarte: this.newCarteAgilisCashForm.value.numeroCarte,
        montant: this.newCarteAgilisCashForm.value.montant,
        dateFinValidite: moment(this.newCarteAgilisCashForm.value.dateFinValidite as Date).format('YYYY-MM-DD'),
        idVehicule: this.newCarteAgilisCashForm.value.numeroPlaque.id,
        typeCarburant: this.newCarteAgilisCashForm.value.numeroPlaque.typeCarburant
      };
      this.dialogRef.close(this.nouvelleCarteAgilisCash);
    }
  }

}
