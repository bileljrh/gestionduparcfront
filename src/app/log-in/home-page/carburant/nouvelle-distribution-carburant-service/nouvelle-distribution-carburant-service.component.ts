import {Component, OnInit} from '@angular/core';
import {ListMonthsAndYears} from '../list-months-and-years';
import {MonthsAnsYearsClass} from '../MonthsAnsYearsClass';
import {DistributionServiceTabData} from '../distribution-service-tab-data';
import {CarburantServiceService} from '../carburant-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nouvelle-distribution-carburant-service',
  templateUrl: './nouvelle-distribution-carburant-service.component.html',
  styleUrls: ['./nouvelle-distribution-carburant-service.component.scss']
})
export class NouvelleDistributionCarburantServiceComponent implements OnInit {
  idDistribution2Service = null;
  nomBeneficiaire = '';
  typeCarburant = '';
  MatriculeBeneficiaire: string[] = [];
  NumeroPlaque: string[] = [];
  listMonthsAndYears: ListMonthsAndYears[] = [];
  Source: string[] = ['Service'];
  validatedEtatMensuelList: DistributionServiceTabData[] = [];
  validatedEtatMensuelForm = new FormGroup({
    matriculeBeneficiaire: new FormControl(null),
    nomBeneficiaire: new FormControl(null),
    numero_plaque: new FormControl(null),
    structure: new FormControl(null),
    moisEtat: new FormControl(null),
    quantiteCarburant: new FormControl(null),
    quantiteAccordee: new FormControl(null),
    sourceCarburant: new FormControl('Service')
  });

  constructor(private monthsAnsYearsClass: MonthsAnsYearsClass, private Carburant: CarburantServiceService, private router: Router) {
    Carburant.getValidatedEtatMensuelList().subscribe(value => {
      this.validatedEtatMensuelList = value;
      this.validatedEtatMensuelList.forEach(value1 => {
        this.MatriculeBeneficiaire.push(value1.matriculeBeneficiaire);
        this.NumeroPlaque.push(value1.numero_plaque);
      });
    });
    this.validatedEtatMensuelForm.controls.numero_plaque.valueChanges.subscribe(value => {
      this.validatedEtatMensuelList.forEach(value1 => {
        if (value1.numero_plaque === value) {
          this.idDistribution2Service = value1.idEtatMensuel;
          this.validatedEtatMensuelForm.controls.matriculeBeneficiaire.patchValue(value1.matriculeBeneficiaire, {emitEvent: false});
          this.validatedEtatMensuelForm.controls.nomBeneficiaire.patchValue(value1.nomBeneficiaire);
          this.validatedEtatMensuelForm.controls.structure.patchValue(value1.structure);
          this.validatedEtatMensuelForm.controls.moisEtat.patchValue(value1.moisEtat);
          this.validatedEtatMensuelForm.controls.quantiteCarburant.patchValue(value1.quantiteCarburant);
          this.validatedEtatMensuelForm.controls.quantiteAccordee.patchValue(value1.quantiteAccordee);
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.typeCarburant = value1.typeCarburant;
        }
      });
    });
    this.validatedEtatMensuelForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.validatedEtatMensuelList.forEach(value1 => {
        if (value1.matriculeBeneficiaire === value) {
          this.idDistribution2Service = value1.idEtatMensuel;
          this.validatedEtatMensuelForm.controls.numero_plaque.patchValue(value1.numero_plaque, {emitEvent: false});
          this.validatedEtatMensuelForm.controls.nomBeneficiaire.patchValue(value1.nomBeneficiaire);
          this.validatedEtatMensuelForm.controls.structure.patchValue(value1.structure);
          this.validatedEtatMensuelForm.controls.moisEtat.patchValue(value1.moisEtat);
          this.validatedEtatMensuelForm.controls.quantiteCarburant.patchValue(value1.quantiteCarburant);
          this.validatedEtatMensuelForm.controls.quantiteAccordee.patchValue(value1.quantiteAccordee);
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.typeCarburant = value1.typeCarburant;
        }
      });
    });
  }

  ngOnInit(): void {
    this.listMonthsAndYears = this.monthsAnsYearsClass.getListMonthsAndYears();
  }

  onCancel() {

  }

  onConfirm() {
    this.Carburant.createNewDistribution2Service(this.idDistribution2Service).subscribe(value => {
      this.router.navigate(['/carburant/distribution_de_carburant_de_service']);
    });
  }
}
