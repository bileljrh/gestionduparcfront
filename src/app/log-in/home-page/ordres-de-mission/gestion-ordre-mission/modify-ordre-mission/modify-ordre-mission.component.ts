import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import {AccompagnonMission} from '../../accompagnon-mission';
import {MatTableDataSource} from '@angular/material/table';
import {NewOrdreMission} from '../../new-ordre-mission';
import {NewAccompagnonsComponent} from './new-accompagnons/new-accompagnons.component';

@Component({
  selector: 'app-modify-ordre-mission',
  templateUrl: './modify-ordre-mission.component.html',
  styleUrls: ['./modify-ordre-mission.component.scss']
})
export class ModifyOrdreMissionComponent {
  modifiedOrdreMission: NewOrdreMission = {
    id: null,
    accompagnons: [],
    confirmed: false,
    dateDebutValidite: '',
    dateFinValidite: '',
    dateOrdre: '',
    depassantDateRetour: false,
    destination: '',
    heureDateDepart: '',
    heureDateRetour: '',
    idVehicule: null,
    indexDepart: 0,
    indexRetour: 0,
    lieuDepart: '',
    marchandiseTransportee: '',
    numeroOrdre: '',
    objectifMission: ''
  };
  modifiedOrdreMissionForm = new FormGroup({
    numeroOrdre: new FormControl(null),
    dateOrdre: new FormControl(null, Validators.required),
    heureDateDepart: new FormControl(null, Validators.required),
    indexDepart: new FormControl(null),
    lieuDepart: new FormControl(null),
    destination: new FormControl(null, Validators.required),
    dateDebutValidite: new FormControl(null, Validators.required),
    dateFinValidite: new FormControl(null, Validators.required),
    heureDateRetour: new FormControl(null),
    indexRetour: new FormControl(null),
    objectifMission: new FormControl(null),
    marchandiseTransportee: new FormControl(null)
  });
  @ViewChild('picker') picker1: any;
  @ViewChild('picker') picker2: any;
  @ViewChild('picker') picker3: any;
  @ViewChild('picker') picker4: any;
  @ViewChild('picker') picker5: any;
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  structure = '';
  panelOpenState = false;
  displayedColumns: string[] = ['index', 'CIN', 'prénom', 'nom', 'supprimer', 'ajouter'];
  listAccompagnons: AccompagnonMission[] = [];
  dataSource = new MatTableDataSource<AccompagnonMission>(this.listAccompagnons);
  nomBeneficiaire = '';
  matriculeBeneficiaire = '';
  designationStructure = '';
  codeStructure = '';

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModifyOrdreMissionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.patchInitialValues();
  }

  closePicker() {
    this.picker1.cancel();
    this.picker2.cancel();
    this.picker3.cancel();
    this.picker4.cancel();
    this.picker5.cancel();
  }

  deleteRow(i: any) {
    this.listAccompagnons.splice(i, 1);
    this.dataSource = new MatTableDataSource<AccompagnonMission>(this.listAccompagnons);
  }

  addRow() {
    const dialogRef = this.dialog.open(NewAccompagnonsComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.listAccompagnons.push(value3);
        this.dataSource = new MatTableDataSource<AccompagnonMission>(this.listAccompagnons);
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedOrdreMissionForm.valid) {
      this.patchFinalValues();
      console.log(this.modifiedOrdreMission);
      this.dialogRef.close(this.modifiedOrdreMission);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  patchFinalValues() {
    this.modifiedOrdreMission.id = this.data.element.id;
    this.modifiedOrdreMission.dateDebutValidite = moment(this.modifiedOrdreMissionForm.value.dateDebutValidite as Date).format('YYYY-MM-DDTHH:mm:ss');
    this.modifiedOrdreMission.dateFinValidite = moment(this.modifiedOrdreMissionForm.value.dateFinValidite as Date).format('YYYY-MM-DDTHH:mm:ss');
    this.modifiedOrdreMission.dateOrdre = moment(this.modifiedOrdreMissionForm.value.dateOrdre as Date).format('YYYY-MM-DDTHH:mm:ss');
    this.modifiedOrdreMission.destination = this.modifiedOrdreMissionForm.value.destination;
    this.modifiedOrdreMission.heureDateDepart = moment(this.modifiedOrdreMissionForm.value.heureDateDepart as Date).format('YYYY-MM-DDTHH:mm:ss');
    if (this.modifiedOrdreMissionForm.value.heureDateRetour != null) {
      this.modifiedOrdreMission.heureDateRetour = moment(this.modifiedOrdreMissionForm.value.heureDateRetour as Date).format('YYYY-MM-DDTHH:mm:ss');
    }
    this.modifiedOrdreMission.indexDepart = this.modifiedOrdreMissionForm.value.indexDepart;
    this.modifiedOrdreMission.indexRetour = this.modifiedOrdreMissionForm.value.indexRetour;
    this.modifiedOrdreMission.lieuDepart = this.modifiedOrdreMissionForm.value.lieuDepart;
    this.modifiedOrdreMission.marchandiseTransportee = this.modifiedOrdreMissionForm.value.marchandiseTransportee;
    this.modifiedOrdreMission.numeroOrdre = this.modifiedOrdreMissionForm.value.numeroOrdre;
    this.modifiedOrdreMission.objectifMission = this.modifiedOrdreMissionForm.value.objectifMission;
    this.modifiedOrdreMission.idVehicule = this.data.element.idVehicule;
    this.modifiedOrdreMission.accompagnons = this.listAccompagnons;
  }

  patchInitialValues() {
    if (this.data.element.accompagnons.length > 0) {
      this.listAccompagnons = this.data.element.accompagnons;
    }
    this.listAccompagnons = this.data.element.accompagnons;
    this.dataSource = new MatTableDataSource<AccompagnonMission>(this.listAccompagnons);
    this.modifiedOrdreMissionForm.controls.numeroOrdre.patchValue(this.data.element.numeroOrdre);
    this.modifiedOrdreMissionForm.controls.dateOrdre.patchValue(this.data.element.dateOrdre);
    this.modifiedOrdreMissionForm.controls.heureDateDepart.patchValue(this.data.element.heureDateDepart);
    this.modifiedOrdreMissionForm.controls.indexDepart.patchValue(this.data.element.indexDepart);
    this.modifiedOrdreMissionForm.controls.lieuDepart.patchValue(this.data.element.lieuDepart);
    this.modifiedOrdreMissionForm.controls.destination.patchValue(this.data.element.destination);
    this.modifiedOrdreMissionForm.controls.dateDebutValidite.patchValue(this.data.element.dateDebutValidite);
    this.modifiedOrdreMissionForm.controls.dateFinValidite.patchValue(this.data.element.dateFinValidite);
    this.modifiedOrdreMissionForm.controls.indexRetour.patchValue(this.data.element.indexRetour);
    this.modifiedOrdreMissionForm.controls.objectifMission.patchValue(this.data.element.objectifMission);
    this.modifiedOrdreMissionForm.controls.marchandiseTransportee.patchValue(this.data.element.marchandiseTransportee);
    if (this.data.element.heureDateRetour != null) {
      this.modifiedOrdreMissionForm.controls.heureDateRetour.patchValue(this.data.element.heureDateRetour);
    }
  }

}
