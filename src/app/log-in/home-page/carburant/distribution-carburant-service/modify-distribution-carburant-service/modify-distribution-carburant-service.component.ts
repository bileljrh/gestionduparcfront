import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../carburant-service.service';
import {ListMonthsAndYears} from '../../list-months-and-years';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-modify-distribution-carburant-service',
  templateUrl: './modify-distribution-carburant-service.component.html',
  styleUrls: ['./modify-distribution-carburant-service.component.scss']
})
export class ModifyDistributionCarburantServiceComponent implements OnInit {
  listMonthsAndYears: ListMonthsAndYears[] = [];
  modifyDistribution2ServiceForm = new FormGroup({
    matriculeBeneficiaire: new FormControl(null),
    nomBeneficiaire: new FormControl(null),
    numero_plaque: new FormControl(null),
    structure: new FormControl(null),
    moisEtat: new FormControl(null),
    quantiteCarburant: new FormControl(null),
    quantiteAccordee: new FormControl(null),
    sourceCarburant: new FormControl('Service')
  });
  moisDistribution: string;

  constructor(public dialogRef: MatDialogRef<ModifyDistributionCarburantServiceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {

  }

  ngOnInit(): void {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }


  onCancelModification() {
    this.dialogRef.close();
  }

  onConfirmModification() {
    this.dialogRef.close();
    window.location.reload();
  }


}
