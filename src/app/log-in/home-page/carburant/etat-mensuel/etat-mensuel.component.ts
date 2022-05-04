import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MonthsAnsYearsClass} from '../MonthsAnsYearsClass';
import {CarburantServiceService} from '../carburant-service.service';
import {ListMonthsAndYears} from '../list-months-and-years';
import {MatDialog} from '@angular/material/dialog';
import {DeleteEtatMensuelComponent} from './delete-etat-mensuel/delete-etat-mensuel.component';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {EtatMensuelTabData} from './etat-mensuel-tab-data';
import {ConfirmEtatMensuelComponent} from './confirm-etat-mensuel/confirm-etat-mensuel.component';
import {ValidateEtatMensuelComponent} from './validate-etat-mensuel/validate-etat-mensuel.component';
import {ModifyEtatMensuelComponent} from './modify-etat-mensuel/modify-etat-mensuel.component';
import {FormControl, FormGroup} from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';


@Component({
  selector: 'app-etat-mensuel',
  templateUrl: './etat-mensuel.component.html',
  styleUrls: ['./etat-mensuel.component.scss']
})
export class EtatMensuelComponent implements OnInit, AfterViewInit {
  Etat: string[] = ['Brouillon', 'Confirmé', 'Validé'];
  listMonthsAndYears: ListMonthsAndYears[] = [];
  displayedColumns: string[] = ['numero_plaque', 'structure', 'beneficiaire', 'pourcentageConsommation', 'poucentageVehicule', 'quantiteDemandee', 'quantiteRestantee', 'vehicule', 'modifier', 'confirmer', 'valider', 'supprimer'];
  etatMensuelTabData: EtatMensuelTabData[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(this.etatMensuelTabData);
  customSearchingEtatMensuelForm = new FormGroup({
    type: new FormControl(null),
    month: new FormControl(null)
  });
  
ADD_ETAT_MENSUEL: boolean;
MODIFY_ETAT_MENSUEL: boolean;
DELETE_ETAT_MENSUEL: boolean;
VIEW_ETAT_MENSUEL: boolean;
VEHICULE_ETAT_MENSUEL: boolean;
VALIDER_ETAT_MENSUEL: boolean;
CONFIRMER_ETAT_MENSUEL: boolean;

  setDisplayedColumns() {
    this.ADD_ETAT_MENSUEL = this.Authentication.authoritiesUtilisateur.ADD_ETAT_MENSUEL;
    this.MODIFY_ETAT_MENSUEL = this.Authentication.authoritiesUtilisateur.MODIFY_ETAT_MENSUEL;
    this.DELETE_ETAT_MENSUEL = this.Authentication.authoritiesUtilisateur.DELETE_ETAT_MENSUEL;
    this.VIEW_ETAT_MENSUEL = this.Authentication.authoritiesUtilisateur.VIEW_ETAT_MENSUEL;
    this.VEHICULE_ETAT_MENSUEL = this.Authentication.authoritiesUtilisateur.VEHICULE_ETAT_MENSUEL;
    this.VALIDER_ETAT_MENSUEL = this.Authentication.authoritiesUtilisateur.VALIDER_ETAT_MENSUEL;
    this.CONFIRMER_ETAT_MENSUEL = this.Authentication.authoritiesUtilisateur.CONFIRMER_ETAT_MENSUEL;
  }  

  constructor(private Authentication: AuthenticationServiceService, public dialog: MatDialog, private monthsAnsYearsClass: MonthsAnsYearsClass, private Carburant: CarburantServiceService) {
    Carburant.getAllEtatMensuels().subscribe(value => {
      this.etatMensuelTabData = value;
      this.dataSource = new MatTableDataSource<EtatMensuelTabData>(this.etatMensuelTabData);
    });
    this.customSearchingEtatMensuelForm.valueChanges.subscribe(value => {
      if (value.type === null) {
        value.type = 'undefined';
      }
      if (value.month === null) {
        value.month = 'undefined';
      }
      this.Carburant.getEtatMensuelsByMonthAndType(value.type, value.month).subscribe(value1 => {
        this.etatMensuelTabData = value1;
        this.dataSource = new MatTableDataSource<EtatMensuelTabData>(this.etatMensuelTabData);
      });
    });
    this.setDisplayedColumns();
  }

  ngOnInit(): void {
    this.listMonthsAndYears = this.monthsAnsYearsClass.getListMonthsAndYears();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  validateRow(id: any, index: any) {
    let dialogRef = this.dialog.open(ValidateEtatMensuelComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {idEtatMensuel: id, isValid: this.etatMensuelTabData[index].valide}
    });
  }

  modifyRow(id: any, index: any) {
    let dialogRef = this.dialog.open(ModifyEtatMensuelComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {etatMensuelRowData: this.etatMensuelTabData[index]}
    });
  }

  deleteRow(id: any) {
    let dialogRef = this.dialog.open(DeleteEtatMensuelComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {idEtatMensuel: id}
    });
  }

  confirmRow(id: any, index: any) {
    let dialogRef = this.dialog.open(ConfirmEtatMensuelComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {idEtatMensuel: id, isConfirm: this.etatMensuelTabData[index].confirme}
    });
  }

}





