import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ListMonthsAndYears} from '../list-months-and-years';
import {DistributionFonctionTabData} from '../distribution-fonction-tab-data';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MonthsAnsYearsClass} from '../MonthsAnsYearsClass';
import {DetailsDistributionFonction} from '../details-distribution-fonction';
import {ModifyDistributionFonction} from '../modify-distribution-fonction';
import {ListBeneficiairesExternes} from '../list-beneficiaires-externes';
import {CarburantServiceService} from '../carburant-service.service';
import moment from 'moment';
import {ModifyDistributionCarburantFonctionVehiculePersonnelComponent} from './modify-distribution-carburant-fonction-vehicule-personnel/modify-distribution-carburant-fonction-vehicule-personnel.component';
import {DeleteDistributionCarburantFonctionVehiculePersonnelComponent} from './delete-distribution-carburant-fonction-vehicule-personnel/delete-distribution-carburant-fonction-vehicule-personnel.component';
import {MatDialog} from '@angular/material/dialog';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';


@Component({
  selector: 'app-distribution-carburant-fonction-vehicule-personnel',
  templateUrl: './distribution-carburant-fonction-vehicule-personnel.component.html',
  styleUrls: ['./distribution-carburant-fonction-vehicule-personnel.component.scss']
})
export class DistributionCarburantFonctionVehiculePersonnelComponent implements OnInit, AfterViewInit {
  isSourcePersonnel: boolean;
  idDistribution: number;
  index: number;
  ask4Modify: boolean;
  ask4Delete: boolean;
  containerX: number;
  containerY: number;
  nomBeneficiaire = '';
  typeCarburant = '';
  listBeneficiairesExternes: ListBeneficiairesExternes[] = [];
  UGP: string[] = ['UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5', 'UGP 6', 'UGP 7'];
  listMonthsAndYears: ListMonthsAndYears[] = [];
  tabData: DistributionFonctionTabData [] = [];
  displayedColumns: string[] = ['matricule', 'beneficiaire', 'typeCarburant', 'nombre2Bons', 'supprimer', 'modifier'];
  dataSource = new MatTableDataSource<DistributionFonctionTabData>(this.tabData);
  @ViewChild('elementContainer') TABref: ElementRef;
  sourceCarburant: string[] = ['Fonction', 'Personnel', 'Compensation', 'Service'];
  modifyDistributionForm = new FormGroup({
    matriculeBeneficiaire: new FormControl(null),
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
  monthForm = new FormControl();
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
  dataSource1 = new MatTableDataSource<DetailsDistributionFonction>(this.detailsDistributionTab);
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource1.sort = this.sort;
  }

  ADD_DISTRIBUTION_CARBURANT_VEHICULE: boolean;
  MODIFY_DISTRIBUTION_CARBURANT_VEHICULE: boolean;
  DELETE_DISTRIBUTION_CARBURANT_VEHICULE: boolean;
  VIEW_DISTRIBUTION_CARBURANT_VEHICULE: boolean;

  setDisplayedColumns() {
    this.ADD_DISTRIBUTION_CARBURANT_VEHICULE = this.Authentication.authoritiesUtilisateur.ADD_DISTRIBUTION_CARBURANT_VEHICULE;
    this.MODIFY_DISTRIBUTION_CARBURANT_VEHICULE = this.Authentication.authoritiesUtilisateur.MODIFY_DISTRIBUTION_CARBURANT_VEHICULE;
    this.DELETE_DISTRIBUTION_CARBURANT_VEHICULE = this.Authentication.authoritiesUtilisateur.DELETE_DISTRIBUTION_CARBURANT_VEHICULE;
    this.VIEW_DISTRIBUTION_CARBURANT_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_DISTRIBUTION_CARBURANT_VEHICULE;

  }  
  constructor(private Authentication: AuthenticationServiceService,  private router: Router, private monthsAnsYearsClass: MonthsAnsYearsClass, private Carburant: CarburantServiceService, public dialog: MatDialog) {
    this.modifyDistributionForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.listBeneficiairesExternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaire = value1.nomBeneficiaire;
        }
      });
    });
    this.Carburant.getListDistributionsCarburant2FonctionBySource('Personnel').subscribe(rez => {
      this.tabData = rez;
      if (this.tabData.length > 0) {
        this.tabData.forEach(value => {
          const moisDistribution = moment(value.moisDistribution as unknown as Date);
          value.moisDistribution = moisDistribution.format('YYYY-MM-DD');
        });
      }
      this.dataSource.data = this.tabData as DistributionFonctionTabData [];
      this.dataSource.sort = this.sort;
    });
    this.isSourcePersonnel = false;
    this.setDisplayedColumns();

  }

  ngOnInit(): void {
    this.Carburant.getListBeneficiairesExternes().subscribe(rez => {
      this.listBeneficiairesExternes = rez;
    });
    this.listMonthsAndYears = this.monthsAnsYearsClass.getListMonthsAndYears();
    this.monthForm.valueChanges.subscribe(value => {
      if (value === null) {
        value = 'undefined';
      }
      this.Carburant.getDistributionsCarburant2FonctionByMonthAndType('Personnel', value).subscribe(value1 => {
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
    this.router.navigate(['/carburant/nouvelle_distribution_de_carburant_de_fonction'], {queryParams: {type: 'Personnel'}});
  }


  modifyRow(id: any, index: any) {
    let dialogRef = this.dialog.open(ModifyDistributionCarburantFonctionVehiculePersonnelComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {tabData: this.tabData[index]}
    });
  }

  deleteRow(id: any) {
    let dialogRef = this.dialog.open(DeleteDistributionCarburantFonctionVehiculePersonnelComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {idEtatMensuel: id}
    });
  }

}
