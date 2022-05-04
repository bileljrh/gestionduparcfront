import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MonthsAnsYearsClass} from '../../../MonthsAnsYearsClass';
import {ListMonthsAndYears} from '../../../list-months-and-years';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NewRechargeCarteAgilisCash} from '../new-recharge-carte-agilis-cash';
import { ListCarteAgilisCash } from '../../../gestion-cartes/gestion-carte-agilis-cash/list-carte-agilis-cash';
import { CarteAgilisCashServiceService } from '../../../carte-agilis-cash/carte-agilis-cash-service.service';

@Component({
  selector: 'app-modify-recharge-carte-agilis-cash',
  templateUrl: './modify-recharge-carte-agilis-cash.component.html',
  styleUrls: ['./modify-recharge-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class ModifyRechargeCarteAgilisCashComponent {
  listCarteAgilisCashNotRecharged: ListCarteAgilisCash[] = [];
  modifiedRechargeForm = new FormGroup({
    destination: new FormControl(null),
    indexDepart: new FormControl(0),
  //  indexArrivee: new FormControl(0),
    distanceParcourir: new FormControl(0),
  //  tauxConsommation: new FormControl(0),
    montant: new FormControl(0, Validators.required),
  //  quantiteCarburantReservoir: new FormControl(0),
    montantConfirmee: new FormControl(0),
    montantAccordee: new FormControl(0),
    numeroCarte: new FormControl(null, Validators.required)
  });
  listMonthsAndYears: ListMonthsAndYears[] = [];
  modifiedRechargeCarteAgilisCash: NewRechargeCarteAgilisCash = {
    id: null,
    moisMission: '',
    destination: '',
    idCarteAgilisCash: null,
    indexDepart: null,
  //  indexArrivee: null,
    distanceParcourir: null,
  //  tauxConsommation: null,
    montant: null,
  //  quantiteCarburantReservoir: null,
    montantConfirmee: 0,
    montantAccordee: 0,
  };

  get f() { return this.modifiedRechargeForm.controls; }
  constructor(public dialogRef: MatDialogRef<ModifyRechargeCarteAgilisCashComponent>,
    private CarteAgilisCash: CarteAgilisCashServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private monthsAnsYearsClass: MonthsAnsYearsClass, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    console.log(data.element);
    CarteAgilisCash.getListCarteAgilisCash().subscribe(value => {
      this.listCarteAgilisCashNotRecharged = value;
    });
    this.listMonthsAndYears = this.monthsAnsYearsClass.getListMonthsAndYears();
    this.patchInitialValues();
    this.ngxLoader.stop();
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
    if (this.modifiedRechargeForm.valid) {
      this.patchFinalValues();
      this.dialogRef.close(this.modifiedRechargeCarteAgilisCash);
    }
  }

  patchInitialValues() {
    this.modifiedRechargeForm.controls.destination.patchValue(this.data.element.destination);
    this.modifiedRechargeForm.controls.indexDepart.patchValue(this.data.element.indexDepart);
    this.modifiedRechargeForm.controls.numeroCarte.patchValue(this.data.element.numeroCarte);
  
   // this.modifiedRechargeForm.controls.indexArrivee.patchValue(this.data.element.indexArrivee);
    this.modifiedRechargeForm.controls.distanceParcourir.patchValue(this.data.element.distanceParcourir);
   // this.modifiedRechargeForm.controls.tauxConsommation.patchValue(this.data.element.tauxConsommation);
    this.modifiedRechargeForm.controls.montant.patchValue(this.data.element.montant);
    this.modifiedRechargeForm.controls.montantConfirmee.patchValue(this.data.element.montantConfirmee);
    this.modifiedRechargeForm.controls.montantAccordee.patchValue(this.data.element.montantAccordee);
  //  this.modifiedRechargeForm.controls.quantiteCarburantReservoir.patchValue(this.data.element.quantiteCarburantReservoir);
  }

  patchFinalValues() {
    this.modifiedRechargeCarteAgilisCash.id = this.data.element.id;
    this.modifiedRechargeCarteAgilisCash.idCarteAgilisCash = this.modifiedRechargeForm.value.numeroCarte;
    this.modifiedRechargeCarteAgilisCash.destination = this.modifiedRechargeForm.value.destination;
    this.modifiedRechargeCarteAgilisCash.indexDepart = this.modifiedRechargeForm.value.indexDepart;
  //  this.modifiedRechargeCarteAgilisCash.indexArrivee = this.modifiedRechargeForm.value.indexArrivee;
    this.modifiedRechargeCarteAgilisCash.distanceParcourir = this.modifiedRechargeForm.value.distanceParcourir;
  //  this.modifiedRechargeCarteAgilisCash.tauxConsommation = this.modifiedRechargeForm.value.tauxConsommation;
    this.modifiedRechargeCarteAgilisCash.montant = this.modifiedRechargeForm.value.montant;
   // this.modifiedRechargeCarteAgilisCash.quantiteCarburantReservoir = this.modifiedRechargeForm.value.quantiteCarburantReservoir;
    this.modifiedRechargeCarteAgilisCash.montantConfirmee = this.modifiedRechargeForm.value.montantConfirmee;
    this.modifiedRechargeCarteAgilisCash.montantAccordee = this.modifiedRechargeForm.value.montantAccordee;
  }

  dateToMonth(date: string): string {
    return date.substr(3);
  }

}
