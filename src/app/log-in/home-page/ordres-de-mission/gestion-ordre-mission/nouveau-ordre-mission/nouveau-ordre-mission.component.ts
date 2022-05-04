import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrdreMissionServiceService} from '../../ordre-mission-service.service';
import {MatTableDataSource} from '@angular/material/table';
import {AccompagnonMission} from '../../accompagnon-mission';
import moment from 'moment';
import {MatDialogRef} from '@angular/material/dialog';
import {SelectVehicule} from '../../../administratif/vehicules/select-vehicule';
import {NewOrdreMission} from '../../new-ordre-mission';

@Component({
  selector: 'app-nouveau-ordre-mission',
  templateUrl: './nouveau-ordre-mission.component.html',
  styleUrls: ['./nouveau-ordre-mission.component.scss']
})
export class NouveauOrdreMissionComponent implements OnInit {
  newOrdreMission: NewOrdreMission = {
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
  accompagnonsArray: FormArray;
  newOrdreMissionForm = new FormGroup({
    numeroOrdre: new FormControl(),
    dateOrdre: new FormControl(null, Validators.required),
    numeroPlaque: new FormControl(null, Validators.required),
    heureDateDepart: new FormControl(null, Validators.required),
    indexDepart: new FormControl(),
    lieuDepart: new FormControl(),
    destination: new FormControl(null, Validators.required),
    dateDebutValidite: new FormControl(null, Validators.required),
    dateFinValidite: new FormControl(null, Validators.required),
    heureDateRetour: new FormControl(null, Validators.required),
    indexRetour: new FormControl(null),
    objectifMission: new FormControl(null),
    marchandiseTransportee: new FormControl(null)
  });
  get f() { return this.newOrdreMissionForm.controls; }

  ListVehicule: SelectVehicule[] = [];
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
  listAccompagnons: AccompagnonMission[] = [{
    id: null,
    cin: '',
    nom: '',
    prenom: '',
  }];
  emptyAccompagnons: AccompagnonMission = {
    id: null,
    cin: '',
    nom: '',
    prenom: '',
  };
  dataSource = new MatTableDataSource<AccompagnonMission>(this.listAccompagnons);
  nomBeneficiaire = '';
  matriculeBeneficiaire = '';
  designationStructure = '';
  codeStructure = '';
  min1 = '';
  min2 = '';
  max1 = '';
  max2 = '';

  constructor(private OrdreMissionService: OrdreMissionServiceService, private fb: FormBuilder, public dialogRef: MatDialogRef<NouveauOrdreMissionComponent>) {
    OrdreMissionService.getSelectVehiculeByStrucutureForOrdreMission().subscribe(value => {
      this.ListVehicule = value;
    });
  }

  ngOnInit(): void {
    this.accompagnonsArray = this.fb.array([this.createFormGroupRow()]);
    this.newOrdreMissionForm.addControl('accompagnons', this.accompagnonsArray);
    this.newOrdreMissionForm.controls.numeroPlaque.valueChanges.subscribe(value => {
      console.log(value);
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.matriculeBeneficiaire = value.matriculeBeneficiaire;
      this.designationStructure = value.designationStructure;
      this.codeStructure = value.codeStructure;
    });
    this.newOrdreMissionForm.controls.heureDateDepart.valueChanges.subscribe(value => {
      this.min1 = moment(value as Date).format('YYYY-MM-DDTHH:mm:ss');
    });
    this.newOrdreMissionForm.controls.heureDateRetour.valueChanges.subscribe(value => {
      this.max1 = moment(value as Date).format('YYYY-MM-DDTHH:mm:ss');
    });
    this.newOrdreMissionForm.controls.dateDebutValidite.valueChanges.subscribe(value => {
      this.min2 = moment(value as Date).format('YYYY-MM-DDTHH:mm:ss');
    });
    this.newOrdreMissionForm.controls.dateFinValidite.valueChanges.subscribe(value => {
      this.max2 = moment(value as Date).format('YYYY-MM-DDTHH:mm:ss');
    });
  }

  closePicker() {
    this.picker1.cancel();
    this.picker2.cancel();
    this.picker3.cancel();
    this.picker4.cancel();
    this.picker5.cancel();
  }

  createFormGroupRow(): FormGroup {
    return this.fb.group(
      {
        cin: ['', Validators.required],
        prenom: ['', Validators.required],
        nom: ['', Validators.required],
      }
    );
  }

  deleteRow(i: any) {
    const item = this.newOrdreMissionForm.controls.accompagnons as FormArray;
    item.removeAt(item.length - 1);
    this.listAccompagnons.splice(i, 1);
    this.dataSource = new MatTableDataSource<AccompagnonMission>(this.listAccompagnons);
  }

  addRow() {
    const item = this.newOrdreMissionForm.controls.accompagnons as FormArray;
    item.push(this.createFormGroupRow());
    this.listAccompagnons.push(this.emptyAccompagnons);
    this.dataSource = new MatTableDataSource<AccompagnonMission>(this.listAccompagnons);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newOrdreMissionForm.valid) {
      this.patchFinalValues();
      this.dialogRef.close(this.newOrdreMission);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  patchFinalValues() {
    this.newOrdreMission.dateDebutValidite = moment(this.newOrdreMissionForm.value.dateDebutValidite as Date).format('YYYY-MM-DDTHH:mm:ss');
    this.newOrdreMission.dateFinValidite = moment(this.newOrdreMissionForm.value.dateFinValidite as Date).format('YYYY-MM-DDTHH:mm:ss');
    this.newOrdreMission.dateOrdre = moment(this.newOrdreMissionForm.value.dateOrdre as Date).format('YYYY-MM-DDTHH:mm:ss');
    this.newOrdreMission.destination = this.newOrdreMissionForm.value.destination;
    this.newOrdreMission.heureDateDepart = moment(this.newOrdreMissionForm.value.heureDateDepart as Date).format('YYYY-MM-DDTHH:mm:ss');
    this.newOrdreMission.heureDateRetour = moment(this.newOrdreMissionForm.value.heureDateRetour as Date).format('YYYY-MM-DDTHH:mm:ss');
    this.newOrdreMission.indexDepart = this.newOrdreMissionForm.value.indexDepart;
    this.newOrdreMission.indexRetour = this.newOrdreMissionForm.value.indexRetour;
    this.newOrdreMission.lieuDepart = this.newOrdreMissionForm.value.lieuDepart;
    this.newOrdreMission.marchandiseTransportee = this.newOrdreMissionForm.value.marchandiseTransportee;
    this.newOrdreMission.numeroOrdre = this.newOrdreMissionForm.value.numeroOrdre;
    this.newOrdreMission.objectifMission = this.newOrdreMissionForm.value.objectifMission;
    this.newOrdreMission.idVehicule = this.newOrdreMissionForm.value.numeroPlaque.id;
    this.newOrdreMission.accompagnons = this.newOrdreMissionForm.value.accompagnons;
  }


}
