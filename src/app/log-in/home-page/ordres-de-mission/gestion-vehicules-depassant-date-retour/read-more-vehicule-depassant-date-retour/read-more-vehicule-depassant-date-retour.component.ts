import {Component, Inject, ViewChild} from '@angular/core';
import {AccompagnonMission} from '../../accompagnon-mission';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NewOrdreMission} from '../../new-ordre-mission';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-read-more-vehicule-depassant-date-retour',
  templateUrl: './read-more-vehicule-depassant-date-retour.component.html',
  styleUrls: ['./read-more-vehicule-depassant-date-retour.component.scss']
})
export class ReadMoreVehiculeDepassantDateRetourComponent {
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
  displayedColumns: string[] = ['index', 'CIN', 'prénom', 'nom'];
  listAccompagnons: AccompagnonMission[] = [];
  dataSource = new MatTableDataSource<AccompagnonMission>(this.listAccompagnons);
  nomBeneficiaire = '';
  matriculeBeneficiaire = '';
  designationStructure = '';
  codeStructure = '';

  constructor(public dialogRef: MatDialogRef<ReadMoreVehiculeDepassantDateRetourComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.patchInitialValues();
  }

  closePicker() {
    this.picker1.cancel();
    this.picker2.cancel();
    this.picker3.cancel();
    this.picker4.cancel();
    this.picker5.cancel();
  }

  closeDialog() {
    this.dialogRef.close();
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
