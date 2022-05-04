import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DistributionFonctionTabData} from '../distribution-fonction-tab-data';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MonthsAnsYearsClass} from '../MonthsAnsYearsClass';
import {ListMonthsAndYears} from '../list-months-and-years';
import {ModifyDistributionFonction} from '../modify-distribution-fonction';
import {ListBeneficiairesInternes} from '../list-beneficiaires-internes';
import {CarburantServiceService} from '../carburant-service.service';
import {MatSort} from '@angular/material/sort';
import moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {ModifyDistributionCarburantFonctionComponent} from './modify-distribution-carburant-fonction/modify-distribution-carburant-fonction.component';
import {DeleteDistributionCarburantFonctionComponent} from './delete-distribution-carburant-fonction/delete-distribution-carburant-fonction.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';


@Component({
  selector: 'app-distribution-carburant-fonction',
  templateUrl: './distribution-carburant-fonction.component.html',
  styleUrls: ['./distribution-carburant-fonction.component.scss'],
})
export class DistributionCarburantFonctionComponent implements OnInit {
  isSouceFonction: boolean;
  idDistribution: number;
  index: number;
  ask4Modify: boolean;
  ask4Delete: boolean;
  containerX: number;
  containerY: number;
  nomBeneficiaire = '';
  typeCarburant = '';
  listBeneficiairesInternes: ListBeneficiairesInternes[] = [];
  UGP: string[] = ['UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5', 'UGP 6', 'UGP 7'];
  listMonthsAndYears: ListMonthsAndYears[] = [];
  tabData: DistributionFonctionTabData [] = [];
  displayedColumns: string[] = ['matricule', 'beneficiaire', 'numero_plaque', 'typeCarburant', 'nombre2Bons', 'supprimer', 'modifier', 'vehicule'];
  dataSource = new MatTableDataSource<DistributionFonctionTabData>(this.tabData);
  @ViewChild('elementContainer') TABref: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
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
  monthForm = new FormControl();
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

  
ADD_DISTRIBUTION_CARBURANT_FONCTION: boolean;
MODIFY_DISTRIBUTION_CARBURANT_FONCTION: boolean;
DELETE_DISTRIBUTION_CARBURANT_FONCTION: boolean;
VIEW_DISTRIBUTION_CARBURANT_FONCTION: boolean;
VEHICULE_DISTRIBUTION_CARBURANT_FONCTION: boolean;

  setDisplayedColumns() {
    this.ADD_DISTRIBUTION_CARBURANT_FONCTION = this.Authentication.authoritiesUtilisateur.ADD_DISTRIBUTION_CARBURANT_FONCTION;
    this.MODIFY_DISTRIBUTION_CARBURANT_FONCTION = this.Authentication.authoritiesUtilisateur.MODIFY_DISTRIBUTION_CARBURANT_FONCTION;
    this.DELETE_DISTRIBUTION_CARBURANT_FONCTION = this.Authentication.authoritiesUtilisateur.DELETE_DISTRIBUTION_CARBURANT_FONCTION;
    this.VIEW_DISTRIBUTION_CARBURANT_FONCTION = this.Authentication.authoritiesUtilisateur.VIEW_DISTRIBUTION_CARBURANT_FONCTION;
    this.VEHICULE_DISTRIBUTION_CARBURANT_FONCTION = this.Authentication.authoritiesUtilisateur.VEHICULE_DISTRIBUTION_CARBURANT_FONCTION;

  }
  constructor(private Authentication: AuthenticationServiceService, private router: Router, private monthsAnsYearsClass: MonthsAnsYearsClass, private Carburant: CarburantServiceService, public dialog: MatDialog) {
    this.modifyDistributionForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.modifyDistributionData.idBeneficiaire = value.idBeneficiaire;
          this.modifyDistributionForm.controls.numero_plaque.setValue(value1, {emitEvent: false});
        }
      });
    });
    this.modifyDistributionForm.controls.numero_plaque.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.modifyDistributionData.idBeneficiaire = value1.idBeneficiaire;
          this.modifyDistributionForm.controls.matriculeBeneficiaire.setValue(value1, {emitEvent: false});
        }
      });
    });
    this.Carburant.getListDistributionsCarburant2FonctionBySource('Fonction').subscribe(rez => {
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
    this.isSouceFonction = false;
    this.setDisplayedColumns();
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
      this.Carburant.getDistributionsCarburant2FonctionByMonthAndType('Fonction', value).subscribe(value1 => {
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

  deleteDistributionRow(idDistribution: any) {
    this.idDistribution = idDistribution;
    this.containerX = this.TABref.nativeElement.offsetTop;
    this.containerY = this.TABref.nativeElement.offsetLeft;
    this.ask4Modify = false;
    this.ask4Delete = true;
  }

  onDenyDelete() {
    this.ask4Modify = false;
    this.ask4Delete = false;
  }

  onConfirmDelete() {
    this.Carburant.deleteOneDistributionCarburant2Fonction(this.idDistribution).subscribe(value => {
      this.ask4Modify = false;
      this.ask4Delete = false;
      window.location.reload();
    });
  }


  onDenyModify() {
    this.ask4Modify = false;
    this.ask4Delete = false;
    this.modifyDistributionForm.reset();
  }

  onConfirmModify() {
  }

  redirect2Vehicule(idVehicule: any) {
    if (idVehicule !== null) {
      this.router.navigateByUrl('administratif/véhicule/' + idVehicule);
    }
  }

  createNewDistribution() {
    this.router.navigate(['/carburant/nouvelle_distribution_de_carburant_de_fonction'], {queryParams: {type: 'Fonction'}});
  }

  modifyRow(id: any, index: any) {
    let dialogRef = this.dialog.open(ModifyDistributionCarburantFonctionComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {tabData: this.tabData[index]}
    });
  }

  deleteRow(id: any) {
    let dialogRef = this.dialog.open(DeleteDistributionCarburantFonctionComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {idEtatMensuel: id}
    });
  }

}
