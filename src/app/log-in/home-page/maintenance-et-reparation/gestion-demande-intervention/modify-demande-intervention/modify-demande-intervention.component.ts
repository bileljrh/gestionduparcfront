import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DemandeMaintenance } from '../demande-maintenance';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vehicule } from '../../../administratif/vehicules/vehicule';
import { ReferentielGeneraleServiceService } from '../../../referentiel/general/referentiel-generale-service.service';
import { MaintenanceAndReparationServiceService } from '../../maintenance-and-reparation-service.service';

@Component({
  selector: 'app-modify-demande-intervention',
  templateUrl: './modify-demande-intervention.component.html',
  styleUrls: ['./modify-demande-intervention.component.scss']
})
export class ModifyDemandeInterventionComponent implements OnInit {
  modifyDemande: DemandeMaintenance = {
    numeroDemande: null,
    dateDemande: '',
    dateRDV: '',
    demandeur: '',
    idBeneficiaire: 0,
    vehicule: null,
    indexKm: 0,
    matriculeBeneficiaire: '',
    nomBeneficiaire: '',
    numeroSerie: '',
    observation: '',
    status: '',
    structure: '',
    ugp: '',
    ugpReparation: '',
    descriptionIntervention: '',
    id: null,
    personnel: ''
  };
  modifyDemandeForm = new FormGroup({

    ugp: new FormControl(null),
    demandeur: new FormControl(null),
    dateDemande: new FormControl(null),
    ugpReparation: new FormControl(null),
    indexKm: new FormControl(null),
    observation: new FormControl(null),
    status: new FormControl(null, Validators.required),
    dateRDV: new FormControl(null,[this.checkstatus]), 
    descriptionIntervention: new FormControl(null, Validators.required),
    vehicule: new FormControl(null),
  });
  ugpReparation: string[] = [];
  @ViewChild('picker') picker: any;
  @ViewChild('picker') picker1: any;
  //codeVehicule: '';
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  Status: string[] = ['En cours', 'Accord', 'Refus'];
  //ListVehicule: Vehicule[] = [];
  vehiculetest: Vehicule[] = [];
  statusDI: string;

  constructor(public dialogRef: MatDialogRef<ModifyDemandeInterventionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Maintenance: MaintenanceAndReparationServiceService,
    private Referentiel: ReferentielGeneraleServiceService) {
    this.modifyDemande = data.element;
    //this.vehiculetest=data.element.vehicule.numeroSerie;
    console.log("le status de la demande:");
    this.statusDI = data.element.status;
    console.log(this.statusDI);

    this.Maintenance.getOneVehicule(data.element.vehicule.id).subscribe((value: any) => {
      this.vehiculetest = value.marque;
      console.log("vehicule test");

      console.log(value);

    })

    console.log("status demande intervention !!");

    this.statusDemandeIntervention();
  }
  statusDemandeIntervention() {
    return (this.data.element.status == ("finis"));
  }

  ngOnInit(): void {

    this.modifyDemandeForm.controls.vehicule.patchValue(this.data.element.vehicule);
    this.modifyDemandeForm.controls.demandeur.setValue(this.modifyDemande.demandeur);
    this.modifyDemandeForm.controls.dateDemande.setValue(this.modifyDemande.dateDemande);
    this.modifyDemandeForm.controls.ugpReparation.setValue(this.modifyDemande.ugpReparation);
    this.modifyDemandeForm.controls.indexKm.setValue(this.modifyDemande.indexKm);
    this.modifyDemandeForm.controls.descriptionIntervention.setValue(this.modifyDemande.descriptionIntervention);
    this.modifyDemandeForm.controls.status.setValue(this.modifyDemande.status);
    this.modifyDemandeForm.controls.observation.setValue(this.modifyDemande.observation);
    this.modifyDemandeForm.controls.dateRDV.setValue(this.modifyDemande.dateRDV);
    //  this.modifyDemandeForm.controls.vehicule.setValue(this.modifyDemande.vehicule)


  }

  onCancel() {
    this.dialogRef.close();
  }


  stat: boolean;
  dateRendezVous: string;
  changeStatus(value) {
    if ((value == "Accord")) {
      this.stat = true;
      //this.dateRendezVous=moment(this.modifyDemandeForm.value.dateRDV as Date).format('YYYY-MM-DDTHH:mm:ss');

      //this.dateRendezVous=null
    }
    else {
      this.stat = false;
      // this.dateRendezVous=null;
    }
    console.log("status !!");
    console.log(this.dateRendezVous);
    console.log(this.data.element.status);

    console.log(this.stat);
  }

  checkstatus(form: FormGroup): ValidationErrors {
    console.log(form);
    
    if  (form.value &&  form.value == "Accord"  ) {
      return Validators.required(this.modifyDemandeForm.get('dateRDV')) ? {
        checkstatus: true,
      } : null;
    }
    return null;
  }
  
 /*
  public checkstatus() : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
       const control1 = group.controls['status'];
       if (control1.value == "Accord") {
        return Validators.required(this.modifyDemandeForm.get('dateRDV')) ? {
          checkstatus: true,
        } : null;
       } 
       return null;
 };
}
*/


  onConfirm() {
    if (this.modifyDemandeForm.valid) {
 let dateval = this.modifyDemandeForm.value.status == "Accord" ? moment(this.modifyDemandeForm.value.dateRDV as Date).format('YYYY-MM-DDTHH:mm:ss') : null
     console.log(dateval);
     
 this.modifyDemande = {
        numeroDemande: this.modifyDemande.numeroDemande,
        dateDemande: moment(this.modifyDemandeForm.value.dateDemande as Date).format('YYYY-MM-DDTHH:mm:ss'),
        // if (this.modifyDemandeForm.value.status=="Accord") {
        //   dateRDV:moment(this.modifyDemandeForm.value.dateRDV as Date).format('YYYY-MM-DDTHH:mm:ss'),
        //};
        dateRDV: dateval,

        demandeur: this.modifyDemandeForm.value.demandeur,
        idBeneficiaire: this.modifyDemande.idBeneficiaire,
        vehicule: this.modifyDemande.vehicule,
        indexKm: this.modifyDemandeForm.value.indexKm,
        matriculeBeneficiaire: this.modifyDemande.matriculeBeneficiaire,
        nomBeneficiaire: this.modifyDemande.nomBeneficiaire,
        numeroSerie: this.modifyDemande.numeroSerie,
        observation: this.modifyDemandeForm.value.observation,
        status: this.modifyDemandeForm.value.status,
        structure: this.modifyDemande.structure,
        ugp: this.modifyDemande.ugp,
        ugpReparation: this.modifyDemandeForm.value.ugpReparation,
        descriptionIntervention: this.modifyDemandeForm.value.descriptionIntervention,
        personnel: '',
        id: this.modifyDemande.id
      };
      this.dialogRef.close(this.modifyDemande);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closePicker() {
    this.picker.cancel();
    this.picker1.cancel();
  }

}
