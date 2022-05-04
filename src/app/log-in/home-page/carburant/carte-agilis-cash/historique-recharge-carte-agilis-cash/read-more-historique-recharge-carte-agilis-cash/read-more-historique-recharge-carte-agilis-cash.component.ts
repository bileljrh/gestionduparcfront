import {Component, Inject, OnInit} from '@angular/core';
import {ListMonthsAndYears} from '../../../list-months-and-years';
import {ListRechargeCarteAgilisCash} from '../../../gestion-affectation/gestion-recharge-carte-agilis-cash/list-recharge-carte-agilis-cash';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-read-more-historique-recharge-carte-agilis-cash',
  templateUrl: './read-more-historique-recharge-carte-agilis-cash.component.html',
  styleUrls: ['./read-more-historique-recharge-carte-agilis-cash.component.scss']
})
export class ReadMoreHistoriqueRechargeCarteAgilisCashComponent implements OnInit {
  listMonthsAndYears: ListMonthsAndYears[] = [];
  modifyRechargeCarteAgilisCash: ListRechargeCarteAgilisCash = {
    moisMission: '',
    destination: '',
    indexDepart: null,
    indexArrivee: null,
    distanceParcourir: null,
    tauxConsommation: null,
    montantDemandee: null,
    quantiteCarburantReservoir: null,
    idVehicule: null,
    numero_plaque: '',
    structure: '',
    idBeneficiaire: null,
    nomBeneficiaire: '',
    matriculeBeneficiaire: '',
    id: null,
    numeroCarte: '',
    typeCarburant: '',
    dateDemandeAffectation: '',
    soldeRestant: null,
    confirmed: false
  };

  constructor(public dialogRef: MatDialogRef<ReadMoreHistoriqueRechargeCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }


  closeDialog() {
    this.dialogRef.close();
  }


}
