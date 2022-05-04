import {Component, OnInit, ViewChild} from '@angular/core';
import {ListMonthsAndYears} from '../list-months-and-years';
import {MonthsAnsYearsClass} from '../MonthsAnsYearsClass';
import {FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {ListBeneficiairesInternes} from '../list-beneficiaires-internes';
import {ListBeneficiairesExternes} from '../list-beneficiaires-externes';
import {CarburantServiceService} from '../carburant-service.service';
import {DetailsDistributionFonction} from '../details-distribution-fonction';
import {NouvelleDistributionCarburantFonction} from './nouvelle-distribution-carburant-fonction';
import moment from 'moment';


@Component({
  selector: 'app-nouvelle-distribution-carburant-fonction',
  templateUrl: './nouvelle-distribution-carburant-fonction.component.html',
  styleUrls: ['./nouvelle-distribution-carburant-fonction.component.scss']
})
export class NouvelleDistributionCarburantFonctionComponent implements OnInit {
  listBeneficiairesInternes: ListBeneficiairesInternes[] = [];
  listBeneficiairesExternes: ListBeneficiairesExternes[] = [];
  listMonthsAndYears: ListMonthsAndYears[] = [];
  nomBeneficiaireExterne = '';
  nomBeneficiaireInterne = '';
  typeCarburant = '';
  sourceCarburnat: string[] = ['Fonction', 'Personnel', 'Compensation', 'Service'];
  newDistributionForm = new FormGroup({
    matriculeBeneficiaireInterne: new FormControl(null),
    matriculeBeneficiaireExterne: new FormControl(null),
    numero_plaque: new FormControl(null),
    quota: new FormControl(null),
    moisDistribution: new FormControl(null),
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
  detailsDistributionTab: DetailsDistributionFonction[] = [
    {
      id: null,
      dateMission: null,
      destination: null,
      indexKmDepart: null,
      indexKmArrivee: null,
      distanceParcouru: null,
      droit2Recomponse: null,
      quantiteMoisPrecedant: null,
      taux2Consommation: null,
      nombre2Bons: null,
      reste: null
    }
  ];
  displayedColumns1: string[] = ['dateMission', 'destination', 'indexKmDepart', 'indexKmArrivee', 'distanceParcouru', 'droit2Recomponse'];
  dataSource1 = new MatTableDataSource<DetailsDistributionFonction>(this.detailsDistributionTab);
  @ViewChild(MatSort) sort: MatSort;
  newDistributionData: NouvelleDistributionCarburantFonction = {
    idBeneficiaire: null,
    moisDistribution: null,
    nombre2Bons: null,
    quantiteCarburant: null,
    quota: null,
    sourceCarburant: null,
    details2Distribution: {
      id: null,
      dateMission: null,
      destination: null,
      indexKmDepart: null,
      indexKmArrivee: null,
      distanceParcouru: null,
      droit2Recomponse: null,
      quantiteMoisPrecedant: null,
      taux2Consommation: null,
      nombre2Bons: null,
      reste: null
    }
  };
  disableSourceCarburant = false;
  isCompensationDistribution: boolean;
  isVehiculePersonnelDistribution: boolean;
  isDistributionFunction: boolean;

  constructor(private monthsAnsYearsClass: MonthsAnsYearsClass, private activeRoute: ActivatedRoute, private Carburant: CarburantServiceService, private route: Router) {
    this.isCompensationDistribution = false;
    Carburant.getListBeneficiairesExternes().subscribe(value => {
      this.listBeneficiairesExternes = value;
    });
    Carburant.getListBeneficiairesInternes().subscribe(value => {
      this.listBeneficiairesInternes = value;
    });
  }

  ngOnInit(): void {
    this.listMonthsAndYears = this.monthsAnsYearsClass.getListMonthsAndYears();
    this.activeRoute.queryParams.subscribe(params => {
      this.newDistributionForm.controls.sourceCarburant.setValue(params.type);
      if (params.type === 'Compensation') {
        this.isCompensationDistribution = true;
        this.isVehiculePersonnelDistribution = false;
        this.isDistributionFunction = false;
        this.newDistributionForm.controls.sourceCarburant.setValue(params.type);
        this.disableSourceCarburant = true;
      } else if (params.type === 'Personnel') {
        this.isVehiculePersonnelDistribution = true;
        this.isCompensationDistribution = false;
        this.isDistributionFunction = false;
        this.newDistributionForm.controls.sourceCarburant.setValue(params.type);
        this.disableSourceCarburant = true;
      } else {
        this.isDistributionFunction = true;
        this.isCompensationDistribution = false;
        this.isVehiculePersonnelDistribution = false;
        this.newDistributionForm.controls.sourceCarburant.setValue(params.type);
        this.disableSourceCarburant = true;
      }
    });
    this.newDistributionForm.controls.matriculeBeneficiaireInterne.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.newDistributionForm.controls.numero_plaque.setValue(value1, {emitEvent: false});
          this.nomBeneficiaireInterne = value1.nomBeneficiaire;
          this.typeCarburant = value1.typeCarburant;
        }
      });
    });
    this.newDistributionForm.controls.numero_plaque.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.newDistributionForm.controls.matriculeBeneficiaireInterne.setValue(value1, {emitEvent: false});
          this.nomBeneficiaireInterne = value1.nomBeneficiaire;
        }
      });
    });
    this.newDistributionForm.controls.matriculeBeneficiaireExterne.valueChanges.subscribe(value => {
      this.listBeneficiairesExternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaireExterne = value1.nomBeneficiaire;
        }
      });
    });
  }

  denyCreatingNewDistribution() {
    this.newDistributionForm.reset();
  }

  createNewDistribution() {
    if (this.isDistributionFunction) {
      this.newDistributionData.idBeneficiaire = this.newDistributionForm.value.matriculeBeneficiaireInterne.idBeneficiaire;
      this.newDistributionData.moisDistribution = this.newDistributionForm.value.moisDistribution;
      this.newDistributionData.nombre2Bons = this.newDistributionForm.value.nombre2Bons;
      this.newDistributionData.quantiteCarburant = this.newDistributionForm.value.quantiteCarburant;
      this.newDistributionData.quota = this.newDistributionForm.value.quota;
      this.newDistributionData.sourceCarburant = 'Fonction';
      this.newDistributionData.details2Distribution = null;
      this.Carburant.createNewDistributionCarburant2Fonction(this.newDistributionData).subscribe();
      this.route.navigate(['/carburant/distribution_de_carburant_de_fonction']);
    }
    if (this.isCompensationDistribution) {
      this.newDistributionData.idBeneficiaire = this.newDistributionForm.value.matriculeBeneficiaireInterne.idBeneficiaire;
      this.newDistributionData.moisDistribution = this.newDistributionForm.value.moisDistribution;
      this.newDistributionData.nombre2Bons = this.newDistributionForm.value.nombre2Bons;
      this.newDistributionData.quantiteCarburant = this.newDistributionForm.value.quantiteCarburant;
      this.newDistributionData.quota = 0;
      this.newDistributionData.sourceCarburant = 'Compensation';
      const dateMission = moment(this.newDistributionForm.value.dateMission as Date);
      this.newDistributionForm.controls.dateMission.setValue(dateMission.format('YYYY-MM-DD'));
      this.newDistributionData.details2Distribution.dateMission = this.newDistributionForm.value.dateMission;
      this.newDistributionData.details2Distribution.destination = this.newDistributionForm.value.destination;
      this.newDistributionData.details2Distribution.indexKmDepart = this.newDistributionForm.value.indexKmDepart;
      this.newDistributionData.details2Distribution.indexKmArrivee = this.newDistributionForm.value.indexKmArrivee;
      this.newDistributionData.details2Distribution.distanceParcouru = this.newDistributionForm.value.distanceParcouru;
      this.newDistributionData.details2Distribution.droit2Recomponse = this.newDistributionForm.value.droit2Recomponse;
      this.newDistributionData.details2Distribution.quantiteMoisPrecedant = this.newDistributionForm.value.quantiteMoisPrecedant;
      this.newDistributionData.details2Distribution.taux2Consommation = this.newDistributionForm.value.taux2Consommation;
      this.newDistributionData.details2Distribution.nombre2Bons = this.newDistributionForm.value.nombre2Bons;
      this.newDistributionData.details2Distribution.reste = this.newDistributionForm.value.reste;
      this.Carburant.createNewDistributionCarburant2Fonction(this.newDistributionData).subscribe();
      this.route.navigate(['/carburant/distribution_de_carburant_de_fonction_(compensation)']);

    }
    if (this.isVehiculePersonnelDistribution) {
      this.newDistributionData.idBeneficiaire = this.newDistributionForm.value.matriculeBeneficiaireExterne.idBeneficiaire;
      this.newDistributionData.moisDistribution = this.newDistributionForm.value.moisDistribution;
      this.newDistributionData.nombre2Bons = this.newDistributionForm.value.nombre2Bons;
      this.newDistributionData.quantiteCarburant = this.newDistributionForm.value.quantiteCarburant;
      this.newDistributionData.quota = 0;
      this.newDistributionData.sourceCarburant = 'Personnel';
      this.newDistributionData.details2Distribution = null;
      this.Carburant.createNewDistributionCarburant2Fonction(this.newDistributionData).subscribe();
      this.route.navigate(['/carburant/distribution_de_carburant_de_fonction_(véhicule_personelle)']);
    }
  }
}
