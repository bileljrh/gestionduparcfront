import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ListMonthsAndYears} from '../list-months-and-years';
import {DistributionFonctionTabData} from '../distribution-fonction-tab-data';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MonthsAnsYearsClass} from '../MonthsAnsYearsClass';
import {MatSort} from '@angular/material/sort';
import moment from 'moment';
import {DetailsDistributionFonction} from '../details-distribution-fonction';
import {ModifyDistributionFonction} from '../modify-distribution-fonction';
import {ListBeneficiairesInternes} from '../list-beneficiaires-internes';
import {CarburantServiceService} from '../carburant-service.service';
import {MatDialog} from '@angular/material/dialog';
import {ModifyDistributionCarburantFonctionCompensationComponent} from './modify-distribution-carburant-fonction-compensation/modify-distribution-carburant-fonction-compensation.component';
import {DeleteDistributionCarburantFonctionCompensationComponent} from './delete-distribution-carburant-fonction-compensation/delete-distribution-carburant-fonction-compensation.component';


@Component({
  selector: 'app-distribution-carburant-fonction-compensation',
  templateUrl: './distribution-carburant-fonction-compensation.component.html',
  styleUrls: ['./distribution-carburant-fonction-compensation.component.scss']
})
export class DistributionCarburantFonctionCompensationComponent implements OnInit, AfterViewInit {
  isSourceCompensation: boolean;
  idDistribution: number;
  index: number;
  nomBeneficiaire = '';
  typeCarburant = '';
  listBeneficiairesInternes: ListBeneficiairesInternes[] = [];
  UGP: string[] = ['UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5', 'UGP 6', 'UGP 7'];
  listMonthsAndYears: ListMonthsAndYears[] = [];
  tabData: DistributionFonctionTabData [] = [];
  displayedColumns: string[] = ['matricule', 'beneficiaire', 'numero_plaque', 'typeCarburant', 'nombre2Bons', 'supprimer', 'modifier', 'vehicule'];
  dataSource = new MatTableDataSource<DistributionFonctionTabData>(this.tabData);
  @ViewChild('elementContainer') TABref: ElementRef;
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
  monthForm = new FormControl();
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private router: Router, private monthsAnsYearsClass: MonthsAnsYearsClass, private Carburant: CarburantServiceService, public dialog: MatDialog) {
    this.modifyDistributionForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.modifyDistributionForm.controls.numero_plaque.setValue(value1, {emitEvent: false});
          this.nomBeneficiaire = value1.nomBeneficiaire;
        }
      });
    });
    this.modifyDistributionForm.controls.numero_plaque.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.modifyDistributionForm.controls.matriculeBeneficiaire.setValue(value1, {emitEvent: false});
          this.nomBeneficiaire = value1.nomBeneficiaire;
        }
      });
    });
    this.Carburant.getListDistributionsCarburant2FonctionBySource('Compensation').subscribe(rez => {
      this.tabData = rez;
      this.dataSource.data = this.tabData as DistributionFonctionTabData [];
      this.dataSource.sort = this.sort;
    });
    this.isSourceCompensation = false;
  }

  ngOnInit(): void {
    this.Carburant.getListBeneficiairesInternes().subscribe(rez => {
      this.listBeneficiairesInternes = rez;
    });
    this.listMonthsAndYears = this.monthsAnsYearsClass.getListMonthsAndYears();
    this.monthForm.valueChanges.subscribe(value => {
      if (value === null) {
        value = 'undefined';
      }
      this.Carburant.getDistributionsCarburant2FonctionByMonthAndType('Compensation', value).subscribe(value1 => {
        this.tabData = value1;
        if (this.tabData.length > 0) {
          this.tabData.forEach(value2 => {
            const moisDistribution = moment(value2.moisDistribution as unknown as Date);
            value2.moisDistribution = moisDistribution.format('YYYY-MM-DD');
          });
        }
        this.dataSource.data = this.tabData as DistributionFonctionTabData [];
      });
    });
  }

  redirect2Vehicule(idVehicule: any) {
    if (idVehicule !== null) {
      this.router.navigateByUrl('administratif/véhicule/' + idVehicule);
    }
  }

  createNewDistribution() {
    this.router.navigate(['/carburant/nouvelle_distribution_de_carburant_de_fonction'], {queryParams: {type: 'Compensation'}});
  }

  modifyRow(id: any, index: any) {
    let dialogRef = this.dialog.open(ModifyDistributionCarburantFonctionCompensationComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {tabData: this.tabData[index]}
    });
  }

  deleteRow(id: any) {
    let dialogRef = this.dialog.open(DeleteDistributionCarburantFonctionCompensationComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {idEtatMensuel: id}
    });
  }

}
