import {Component, OnInit} from '@angular/core';
import {ListCarteAgilisCash} from '../../../gestion-cartes/gestion-carte-agilis-cash/list-carte-agilis-cash';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListMonthsAndYears} from '../../../list-months-and-years';
import {NewRechargeCarteAgilisCash} from '../new-recharge-carte-agilis-cash';
import {CarburantServiceService} from '../../../carburant-service.service';
import {CarteAgilisCashServiceService} from '../../../carte-agilis-cash/carte-agilis-cash-service.service';
import {MonthsAnsYearsClass} from '../../../MonthsAnsYearsClass';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-new-recharge-carte-agilis-cash',
  templateUrl: './new-recharge-carte-agilis-cash.component.html',
  styleUrls: ['./new-recharge-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class NewRechargeCarteAgilisCashComponent implements OnInit {
  listCarteAgilisCashNotRecharged: ListCarteAgilisCash[] = [];
  nomBeneficiaire = '';
  matriculeBeneficiaire = '';
  designationStructure = '';
  codeStructure = '';
  typeCarburant = '';
  dateFinValidite = '';
  montant = 0;
  numeroPlaque = '';
  actualMonth = '';
  newRechargeForm = new FormGroup({
    destination: new FormControl(null),
    indexDepart: new FormControl(0),
  //  indexArrivee: new FormControl(0),
    distanceParcourir: new FormControl(0),
   // tauxConsommation: new FormControl(0),
    montantDemandee: new FormControl(null, Validators.required),
   // quantiteCarburantReservoir: new FormControl(0),
    dateFinValidite: new FormControl(null),
    numeroCarte: new FormControl(null, Validators.required)
  });
  listMonthsAndYears: ListMonthsAndYears[] = [];
  newRechargeCarteAgilisCash: NewRechargeCarteAgilisCash = {
    idCarteAgilisCash: null,
    moisMission: '',
    destination: '',
    indexDepart: null,
   // indexArrivee: null,
    distanceParcourir: null,
   // tauxConsommation: null,
    montant: null,
   // quantiteCarburantReservoir: null,
  };
  get f() { return this.newRechargeForm.controls; }


  constructor(public dialogRef: MatDialogRef<NewRechargeCarteAgilisCashComponent>, private Carburant: CarburantServiceService, private CarteAgilisCash: CarteAgilisCashServiceService, private monthsAnsYearsClass: MonthsAnsYearsClass, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    CarteAgilisCash.getListCarteAgilisCash().subscribe(value => {
      this.listCarteAgilisCashNotRecharged = value;
    });
    this.listMonthsAndYears = this.monthsAnsYearsClass.getListMonthsAndYears();
    this.actualMonth = moment().month() + ' - ' + moment().year();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.newRechargeForm.controls.numeroCarte.valueChanges.subscribe(value => {
      if (value.nomBeneficiaire != null) {
        this.nomBeneficiaire = value.nomBeneficiaire;
      } else {
        this.nomBeneficiaire = '';
      }
      if (value.matriculeBeneficiaire != null) {
        this.matriculeBeneficiaire = value.matriculeBeneficiaire;
      } else {
        this.matriculeBeneficiaire = '';
      }
      this.designationStructure = value.designationStructure;
      this.codeStructure = value.codeStructure;
      this.typeCarburant = value.typeCarburant;
      this.montant = value.montant;
      this.numeroPlaque = value.numeroPlaque;
      this.typeCarburant = value.typeCarburant;
      this.dateFinValidite = value.dateFinValidite;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newRechargeForm.valid) {
      this.newRechargeCarteAgilisCash = {
        idCarteAgilisCash: this.newRechargeForm.value.numeroCarte.idCarte,
        moisMission: moment().format('YYYY-MM-DD'),
        destination: this.newRechargeForm.value.destination,
        indexDepart: this.newRechargeForm.value.indexDepart,
      //  indexArrivee: this.newRechargeForm.value.indexArrivee,
        distanceParcourir: this.newRechargeForm.value.distanceParcourir,
      //  tauxConsommation: this.newRechargeForm.value.tauxConsommation,
        montant: this.newRechargeForm.value.montantDemandee,
      //  quantiteCarburantReservoir: this.newRechargeForm.value.quantiteCarburantReservoir,
      };
      this.dialogRef.close(this.newRechargeCarteAgilisCash);
    }
  }
}
