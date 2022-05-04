import {Component, ViewChild} from '@angular/core';
import {MaintenanceAndReparationServiceService} from '../../maintenance-and-reparation-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {DemandeMaintenance} from '../../gestion-demande-intervention/demande-maintenance';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import {BonTravail} from '../bon-travail';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-bon-travail',
  templateUrl: './new-bon-travail.component.html',
  styleUrls: ['./new-bon-travail.component.scss']
})
export class NewBonTravailComponent {
  newBonTravail: BonTravail = {
    dateEntree: '',
    dateSortiePrevue: '',
    demandeMaintenance: {
      id: null,
      vehicule: null,
      numeroSerie: '',
      idBeneficiaire: null,
      nomBeneficiaire: '',
      matriculeBeneficiaire: '',
      structure: '',
      personnel: '',
      ugp: '',
      ugpReparation: '',
      demandeur: '',
      dateDemande: null,
      indexKm: null,
      descriptionIntervention: '',
      status: '',
      dateRDV: '',
      observation: '',
      numeroDemande: '',
    },
    indexKM: 0,
    mode: '',
    natureTravaux: '',
    observation: '',
    bonTravailArticle:[],
    bonTravailArticleExterne:[],
    bonTravailOperation:[],
    facturation:null
  };
  ListDemandeMaintnenance: DemandeMaintenance[] = [];
  newBonTravailForm = new FormGroup({
    numeroDemande: new FormControl(null, Validators.required),
    numeroDemandee: new FormControl(null, Validators.required),
    numeroSerie: new FormControl(null, Validators.required),
    dateRDV: new FormControl(null, Validators.required),
    dateEntree: new FormControl(null, Validators.required),
    dateSortiePrevue: new FormControl(null, Validators.required),
    natureTravaux: new FormControl(null, Validators.required),
    mode: new FormControl(null, Validators.required),
    indexKM: new FormControl(null, Validators.required),
    observation: new FormControl(null, Validators.required),
    
  });
  
  get f() { return this.newBonTravailForm.controls; }
  @ViewChild('picker1') picker1: any;
  @ViewChild('picker2') picker2: any;
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  ListNatureTravaux: string[] = ['Reparation', 'Service', 'Nature 3'];
  ListModes: string[] = ['INTERNE', 'EXTERNE','MIXTE'];
  today= new Date();
  jstoday = '';

  constructor(private Maintenance: MaintenanceAndReparationServiceService, public dialogRef: MatDialogRef<NewBonTravailComponent>) {
    Maintenance.getDemandeMaintenanceListAvailableForBonTravail().subscribe(value => {
      this.ListDemandeMaintnenance = value;
      console.log("hellow list demande maintenance:"+this.ListDemandeMaintnenance);
      
    });
    this.newBonTravailForm.controls.numeroDemande.valueChanges.subscribe(value => {
      this.newBonTravailForm.controls.numeroSerie.setValue(value, {eventEmitter: false});
      this.newBonTravailForm.controls.dateRDV.setValue(value, {eventEmitter: false});
      this.newBonTravailForm.controls.dateEntree.setValue(this.jstoday, {eventEmitter: false});
      this.newBonTravailForm.controls.dateSortiePrevue.setValue(value, {eventEmitter: false});
      
    });
    //this.jstoday = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss a', 'en-US', '+0530').substring(0,10);

    /*
    this.newBonTravailForm.controls.numeroSerie.valueChanges.subscribe(value => {
      this.newBonTravailForm.controls.numeroDemande.setValue(value, {eventEmitter: false});
      this.newBonTravailForm.controls.dateRDV.setValue(value, {eventEmitter: false});
    });
    this.newBonTravailForm.controls.dateRDV.valueChanges.subscribe(value => {
      this.newBonTravailForm.controls.numeroDemande.setValue(value, {eventEmitter: false});
      this.newBonTravailForm.controls.numeroSerie.setValue(value, {eventEmitter: false});
    });
    */
  }


  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.newBonTravail = {
      //dateEntree: "2020-01-01",//moment(this.newBonTravailForm.value.dateEntree as Date).format('YYYY-MM-DDTHH:mm:ss'),
     // dateSortiePrevue:"2020-01-01",// moment(this.newBonTravailForm.value.dateSortiePrevue as Date).format('YYYY-MM-DDTHH:mm:ss'),
      dateEntree: moment(this.newBonTravailForm.value.dateEntree as Date).format('YYYY-MM-DDTHH:mm:ss'),
      dateSortiePrevue: moment(this.newBonTravailForm.value.dateSortiePrevue as Date).format('YYYY-MM-DDTHH:mm:ss'),
      demandeMaintenance: this.newBonTravailForm.value.numeroDemande,
      indexKM:this.newBonTravailForm.value.indexKM,
      mode: this.newBonTravailForm.value.mode,
      natureTravaux: this.newBonTravailForm.value.natureTravaux,
      observation: this.newBonTravailForm.value.observation,
      bonTravailArticle:null,
      bonTravailArticleExterne:null,
      bonTravailOperation:null,
      facturation:null
    };
    this.dialogRef.close(this.newBonTravail);
    console.log("date d'entree !!!!");
    
    console.log(this.newBonTravail.dateEntree);
    
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closePicker() {
    this.picker1.cancel();
    this.picker2.cancel();
  }


}
