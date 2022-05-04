import {Component, Inject, OnInit} from '@angular/core';
import {ListBeneficiairesExternes} from '../../list-beneficiaires-externes';
import {ListMonthsAndYears} from '../../list-months-and-years';
import {FormControl, FormGroup} from '@angular/forms';
import {ModifyDistributionFonction} from '../../modify-distribution-fonction';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MonthsAnsYearsClass} from '../../MonthsAnsYearsClass';
import {CarburantServiceService} from '../../carburant-service.service';

@Component({
  selector: 'app-modify-distribution-carburant-fonction-vehicule-personnel',
  templateUrl: './modify-distribution-carburant-fonction-vehicule-personnel.component.html',
  styleUrls: ['./modify-distribution-carburant-fonction-vehicule-personnel.component.scss']
})
export class ModifyDistributionCarburantFonctionVehiculePersonnelComponent implements OnInit {
  isSourcePersonnel: boolean;
  idDistribution: number;
  index: number;
  nomBeneficiaire = '';
  typeCarburant = '';
  listBeneficiairesExternes: ListBeneficiairesExternes[] = [];
  listMonthsAndYears: ListMonthsAndYears[] = [];
  sourceCarburant: string[] = ['Fonction', 'Personnel', 'Compensation', 'Service'];
  modifyDistributionForm = new FormGroup({
    matriculeBeneficiaire: new FormControl(),
    moisDistribution: new FormControl(null),
    quantiteCarburant: new FormControl(null),
    sourceCarburant: new FormControl(null),
    nombre2Bons: new FormControl(null),
    quota: new FormControl(null)
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

  constructor(public dialogRef: MatDialogRef<ModifyDistributionCarburantFonctionVehiculePersonnelComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private monthsAnsYearsClass: MonthsAnsYearsClass, private Carburant: CarburantServiceService) {
    this.Carburant.getListBeneficiairesExternes().subscribe(rez => {
      this.listBeneficiairesExternes = rez;
      this.listBeneficiairesExternes.forEach(value => {
        if (value.matriculeBeneficiaire === data.tabData.matriculeBeneficiaire) {
          this.modifyDistributionForm.controls.matriculeBeneficiaire.patchValue(value);
          this.nomBeneficiaire = value.nomBeneficiaire;
        }
      });
    });
    this.listMonthsAndYears = this.monthsAnsYearsClass.getListMonthsAndYears();
    this.modifyDistributionForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.listBeneficiairesExternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.modifyDistributionData.idBeneficiaire = value.idBeneficiaire;

        }
      });
    });
    this.isSourcePersonnel = false;
  }

  ngOnInit(): void {
    this.modifyDistributionForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.modifyDistributionData.idBeneficiaire = value.idBeneficiaire;
    });
    this.isSourcePersonnel = true;
    this.modifyDistributionForm.controls.sourceCarburant.setValue('Personnel');
    this.modifyDistributionForm.controls.quantiteCarburant.setValue(this.data.tabData.quantiteCarburant);
    this.modifyDistributionForm.controls.nombre2Bons.setValue(this.data.tabData.nombre2Bons);
    this.modifyDistributionForm.controls.moisDistribution.setValue(this.data.tabData.moisDistribution);
    this.modifyDistributionForm.controls.quota.setValue(this.data.tabData.quota);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelModification() {
    this.dialogRef.close();
  }

  onConfirmModification() {
    this.modifyDistributionData.idDistribution = this.data.tabData.idDistribution;
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
