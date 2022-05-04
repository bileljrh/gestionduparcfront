import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../carburant-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ModifyDistributionFonction} from '../../modify-distribution-fonction';
import {ListBeneficiairesInternes} from '../../list-beneficiaires-internes';
import {ListMonthsAndYears} from '../../list-months-and-years';
import {MonthsAnsYearsClass} from '../../MonthsAnsYearsClass';

@Component({
  selector: 'app-modify-distribution-carburant-fonction',
  templateUrl: './modify-distribution-carburant-fonction.component.html',
  styleUrls: ['./modify-distribution-carburant-fonction.component.scss']
})
export class ModifyDistributionCarburantFonctionComponent implements OnInit {
  isSouceFonction: boolean;
  idDistribution: number;
  index: number;
  nomBeneficiaire = '';
  typeCarburant = '';
  listBeneficiairesInternes: ListBeneficiairesInternes[] = [];
  listMonthsAndYears: ListMonthsAndYears[] = [];
  displayedColumns: string[] = ['matricule', 'beneficiaire', 'numero_plaque', 'typeCarburant', 'nombre2Bons', 'supprimer', 'modifier', 'vehicule'];
  sourceCarburant: string[] = ['Fonction', 'Personnel', 'Compensation', 'Service'];
  modifyDistributionForm = new FormGroup({
    matriculeBeneficiaire: new FormControl(null),
    numero_plaque: new FormControl(null),
    moisDistribution: new FormControl(null),
    quota: new FormControl(null),
    quantiteCarburant: new FormControl(null),
    sourceCarburant: new FormControl(null),
    nombre2Bons: new FormControl(null),
  });
  modifyDistributionData: ModifyDistributionFonction = {
    idBeneficiaire: 0,
    idDistribution: 0,
    moisDistribution: '',
    quantiteCarburant: 0,
    nombre2Bons: 0,
    sourceCarburant: '',
    quota: 0,
    details2Distribution: null
  };

  constructor(private monthsAnsYearsClass: MonthsAnsYearsClass, public dialogRef: MatDialogRef<ModifyDistributionCarburantFonctionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
    this.Carburant.getListBeneficiairesInternes().subscribe(rez => {
      this.listBeneficiairesInternes = rez;
      this.listBeneficiairesInternes.forEach(value => {
        if (value.matriculeBeneficiaire === this.data.tabData.matriculeBeneficiaire) {
          this.modifyDistributionForm.controls.matriculeBeneficiaire.patchValue(value);
          this.modifyDistributionForm.controls.numero_plaque.patchValue(value);
          this.nomBeneficiaire = value.nomBeneficiaire;
          this.typeCarburant = value.typeCarburant;
        }
      });
    });
    this.listMonthsAndYears = this.monthsAnsYearsClass.getListMonthsAndYears();
  }


  ngOnInit(): void {
    this.idDistribution = this.data.tabData.idDistribution;
    this.modifyDistributionForm.controls.quantiteCarburant.setValue(this.data.tabData.quantiteCarburant);
    this.modifyDistributionForm.controls.sourceCarburant.setValue(this.data.tabData.sourceCarburant);
    this.modifyDistributionForm.controls.nombre2Bons.setValue(this.data.tabData.nombre2Bons);
    this.modifyDistributionForm.controls.moisDistribution.setValue(this.data.tabData.moisDistribution);
    this.modifyDistributionForm.controls.quota.setValue(this.data.tabData.quota);
    this.isSouceFonction = true;
    this.modifyDistributionForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.modifyDistributionData.idBeneficiaire = value.idBeneficiaire;
          this.typeCarburant = value1.typeCarburant;
          this.modifyDistributionForm.controls.numero_plaque.setValue(value1, {emitEvent: false});
        }
      });
    });
    this.modifyDistributionForm.controls.numero_plaque.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.typeCarburant = value1.typeCarburant;
          this.modifyDistributionData.idBeneficiaire = value1.idBeneficiaire;
          this.modifyDistributionForm.controls.matriculeBeneficiaire.setValue(value1, {emitEvent: false});
        }
      });
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }


  onCancelModification() {
    this.dialogRef.close();
  }

  onConfirmModification() {
    this.modifyDistributionData.idDistribution = this.idDistribution;
    this.modifyDistributionData.moisDistribution = this.modifyDistributionForm.value.moisDistribution;
    this.modifyDistributionData.quantiteCarburant = this.modifyDistributionForm.value.quantiteCarburant;
    this.modifyDistributionData.nombre2Bons = this.modifyDistributionForm.value.nombre2Bons;
    this.modifyDistributionData.sourceCarburant = this.modifyDistributionForm.value.sourceCarburant;
    this.modifyDistributionData.quota = this.modifyDistributionForm.value.quota;
    this.Carburant.modifyOneDistributionsCarburant2Fonction(this.modifyDistributionData).subscribe();
    this.dialogRef.close();
    window.location.reload();
  }


}
