import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ListBeneficiairesInternes} from '../../list-beneficiaires-internes';
import {ListMonthsAndYears} from '../../list-months-and-years';
import {FormControl, FormGroup} from '@angular/forms';
import {ModifyDistributionFonction} from '../../modify-distribution-fonction';
import {DetailsDistributionFonction} from '../../details-distribution-fonction';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MonthsAnsYearsClass} from '../../MonthsAnsYearsClass';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../carburant-service.service';
import moment from 'moment';

@Component({
  selector: 'app-modify-distribution-carburant-fonction-compensation',
  templateUrl: './modify-distribution-carburant-fonction-compensation.component.html',
  styleUrls: ['./modify-distribution-carburant-fonction-compensation.component.scss']
})
export class ModifyDistributionCarburantFonctionCompensationComponent implements OnInit, AfterViewInit {
  isSourceCompensation: boolean;
  idDistribution: number;
  index: number;
  nomBeneficiaire = '';
  typeCarburant = '';
  listBeneficiairesInternes: ListBeneficiairesInternes[] = [];
  listMonthsAndYears: ListMonthsAndYears[] = [];
  sourceCarburant: string[] = ['Fonction', 'Personnel', 'Compensation', 'Service'];
  modifyDistributionForm = new FormGroup({
    matriculeBeneficiaire: new FormControl(null),
    numero_plaque: new FormControl(null),
    moisDistribution: new FormControl(null),
    quota: new FormControl(null),
    quantiteCarburant: new FormControl(null),
    sourceCarburant: new FormControl(null),
    nombre2Bons: new FormControl(null),
    dateMission: new FormControl(null),
    destination: new FormControl(null),
    indexKmDepart: new FormControl(null),
    indexKmArrivee: new FormControl(null),
    distanceParcouru: new FormControl(null),
    droit2Recomponse: new FormControl(null),
    quantiteMoisPrecedant: new FormControl(null),
    taux2Consommation: new FormControl(null),
    nombre2BonsDetailsDistribution: new FormControl(null),
    reste: new FormControl(null)
  });
  modifyDistributionData: ModifyDistributionFonction = {
    idBeneficiaire: 0,
    idDistribution: 0,
    moisDistribution: '',
    quantiteCarburant: 0,
    nombre2Bons: 0,
    sourceCarburant: '',
    quota: 0,
    details2Distribution: {
      id: null,
      dateMission: '',
      destination: '',
      indexKmDepart: 0,
      indexKmArrivee: 0,
      distanceParcouru: 0,
      droit2Recomponse: 0,
      quantiteMoisPrecedant: 0,
      taux2Consommation: 0,
      nombre2Bons: 0,
      reste: 0
    }
  };
  detailsDistributionTab: DetailsDistributionFonction[] = [
    {
      id: null,
      dateMission: '',
      destination: '',
      indexKmDepart: 0,
      indexKmArrivee: 0,
      distanceParcouru: 0,
      droit2Recomponse: 0,
      quantiteMoisPrecedant: 0,
      taux2Consommation: 0,
      nombre2Bons: 0,
      reste: 0
    }
  ];
  displayedColumns1: string[] = ['dateMission', 'destination', 'indexKmDepart', 'indexKmArrivee', 'distanceParcouru', 'droit2Recomponse'];
  dataSource1 = new MatTableDataSource<DetailsDistributionFonction>(this.detailsDistributionTab);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private monthsAnsYearsClass: MonthsAnsYearsClass, public dialogRef: MatDialogRef<ModifyDistributionCarburantFonctionCompensationComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
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
    this.isSourceCompensation = true;
    this.modifyDistributionForm.controls.sourceCarburant.setValue('Fonction');
    this.modifyDistributionForm.controls.quantiteCarburant.setValue(this.data.tabData.quantiteCarburant);
    this.modifyDistributionForm.controls.sourceCarburant.setValue(this.data.tabData.sourceCarburant);
    this.modifyDistributionForm.controls.nombre2Bons.setValue(this.data.tabData.nombre2Bons);
    this.modifyDistributionForm.controls.moisDistribution.setValue(this.data.tabData.moisDistribution);
    this.modifyDistributionForm.controls.quota.setValue(this.data.tabData.quota);
    this.modifyDistributionForm.controls.dateMission.setValue(this.data.tabData.details2Distribution.dateMission);
    this.modifyDistributionForm.controls.destination.setValue(this.data.tabData.details2Distribution.destination);
    this.modifyDistributionForm.controls.distanceParcouru.setValue(this.data.tabData.details2Distribution.distanceParcouru);
    this.modifyDistributionForm.controls.droit2Recomponse.setValue(this.data.tabData.details2Distribution.droit2Recomponse);
    this.modifyDistributionForm.controls.indexKmArrivee.setValue(this.data.tabData.details2Distribution.indexKmArrivee);
    this.modifyDistributionForm.controls.indexKmDepart.setValue(this.data.tabData.details2Distribution.indexKmDepart);
    this.modifyDistributionForm.controls.nombre2BonsDetailsDistribution.setValue(this.data.tabData.details2Distribution.nombre2Bons);
    this.modifyDistributionForm.controls.quantiteMoisPrecedant.setValue(this.data.tabData.details2Distribution.quantiteMoisPrecedant);
    this.modifyDistributionForm.controls.reste.setValue(this.data.tabData.details2Distribution.reste);
    this.modifyDistributionForm.controls.taux2Consommation.setValue(this.data.tabData.details2Distribution.taux2Consommation);
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

  ngAfterViewInit() {
    this.dataSource1.sort = this.sort;
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
    this.modifyDistributionData.quota = this.modifyDistributionForm.value.quota;
    this.modifyDistributionData.quantiteCarburant = this.modifyDistributionForm.value.quantiteCarburant;
    this.modifyDistributionData.nombre2Bons = this.modifyDistributionForm.value.nombre2Bons;
    this.modifyDistributionData.sourceCarburant = this.modifyDistributionForm.value.sourceCarburant;
    const dateMission = moment(this.modifyDistributionForm.value.dateMission as Date);
    this.modifyDistributionForm.controls.dateMission.setValue(dateMission.format('YYYY-MM-DD'));
    this.modifyDistributionData.details2Distribution.dateMission = this.modifyDistributionForm.value.dateMission;
    this.modifyDistributionData.details2Distribution.destination = this.modifyDistributionForm.value.destination;
    this.modifyDistributionData.details2Distribution.indexKmDepart = this.modifyDistributionForm.value.indexKmDepart;
    this.modifyDistributionData.details2Distribution.indexKmArrivee = this.modifyDistributionForm.value.indexKmArrivee;
    this.modifyDistributionData.details2Distribution.distanceParcouru = this.modifyDistributionForm.value.distanceParcouru;
    this.modifyDistributionData.details2Distribution.droit2Recomponse = this.modifyDistributionForm.value.droit2Recomponse;
    this.modifyDistributionData.details2Distribution.quantiteMoisPrecedant = this.modifyDistributionForm.value.quantiteMoisPrecedant;
    this.modifyDistributionData.details2Distribution.taux2Consommation = this.modifyDistributionForm.value.taux2Consommation;
    this.modifyDistributionData.details2Distribution.nombre2Bons = this.modifyDistributionForm.value.nombre2BonsDetailsDistribution;
    this.modifyDistributionData.details2Distribution.reste = this.modifyDistributionForm.value.reste;
    this.Carburant.modifyOneDistributionsCarburant2Fonction(this.modifyDistributionData).subscribe();
    this.dialogRef.close();
    window.location.reload();
  }

}
