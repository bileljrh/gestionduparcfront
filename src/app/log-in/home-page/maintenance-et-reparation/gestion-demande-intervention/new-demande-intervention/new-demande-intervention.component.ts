import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListVehiculeDataByStructure, ListVehiculeDemandeIntervention} from '../list-vehicule-demande-intervention';
import {DemandeMaintenance} from '../demande-maintenance';
import moment from 'moment';
import {MaintenanceAndReparationServiceService} from '../../maintenance-and-reparation-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Vehicule } from '../../../administratif/vehicules/vehicule';
import { formatDate } from '@angular/common';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-new-demande-intervention',
  templateUrl: './new-demande-intervention.component.html',
  styleUrls: ['./new-demande-intervention.component.scss']
})
export class NewDemandeInterventionComponent implements OnInit {
  data= [] ;
  benificaire:string;
  structureName:string;
  newDemande: DemandeMaintenance = {
    dateDemande: '',
    dateRDV: '',
    demandeur: '',
    idBeneficiaire: 0,
    vehicule:null,
    indexKm: 0,
    matriculeBeneficiaire: '',
    nomBeneficiaire: '',
    numeroSerie: '',
    status: '',
    structure: '',
    ugp: '',
    ugpReparation: '',
    descriptionIntervention: '',
    personnel:'',
  };
  listVehiculeData: [] = [];
  listVehiculeByUgp: [] = [];
  listBeneficicareById: Vehicule[] = [];
  oneBeneficiaire:number;
  oneStructure:number;
  listStructureById: [] = [];
  uniteGestionParc:'';
  newDemandeForm = new FormGroup({
    structure: new FormControl(null),
    numeroSerie: new FormControl(null),
    beneficiaire: new FormControl(null),
    demandeur: new FormControl(null),
    dateDemande: new FormControl(null),
    ugpReparation: new FormControl(null),
    indexKm: new FormControl(null),
    descriptionIntervention: new FormControl(null),
    vehicule: new FormControl(null, Validators.required),
    observation: new FormControl(null, Validators.required),

  });
  get f() { return this.newDemandeForm.controls; }
  listStructure: string[] = [];
  @ViewChild('picker') picker: any;
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  ugp: string[] = [];
  ugpReparation: string[] = ['centre mecanique auto','parc centrale','parc Béja'];
  nomBeneficiaire = '';
  today= new Date();
  jstoday = '';
  codeMainetnance='';
  serieVehiucle:'';
  vehiculeControl = new FormControl();
  listVehiculeDataByStructure: ListVehiculeDataByStructure[] = [];
  filteredOptions: Observable<ListVehiculeDataByStructure[]>;

  changeUgp(valuee){
    this.maintenanceAndReparationService.getVehiculeByUgp((valuee.id)).subscribe((value:any) => {
    
      this.listVehiculeByUgp = value;
      console.log("liste de vehicule ::::");
      this.uniteGestionParc=valuee.designation;
      console.log(this.listVehiculeByUgp);
      console.log("les valeurs de l'ugp selectionne:::");
      console.log(this.uniteGestionParc);
      
     
      
    });
   }
   
   changeVehicule(value){
    console.log(value.beneficiaire.id);
    console.log(value.structure.id);
    this.maintenanceAndReparationService.getBeneficiaire(value.beneficiaire.id).subscribe(value => {
      this.listBeneficicareById = value.id;

      this.newDemandeForm.value.beneficiaire=value.id;
      console.log();
      
      console.log('iam here'+this.newDemandeForm.value.beneficiaire);
      
      this.benificaire=value.nom;
      console.log(this.benificaire);
      
      
      console.log(this.listBeneficicareById);    
    });
    
    this.maintenanceAndReparationService.findstructurebyid(value.structure.id).subscribe(value => {
      this.listStructureById = value;
     this.oneStructure=value.id;
      this.structureName=value.designation;
      console.log(this.listStructureById); 
         
    });
   }

   nomPrenom = '';
  constructor(private maintenanceAndReparationService: MaintenanceAndReparationServiceService,
    private Authentication: AuthenticationServiceService,
     public dialogRef: MatDialogRef<NewDemandeInterventionComponent>) {
    this.maintenanceAndReparationService.ugpList().subscribe(value => {
      this.listVehiculeData = value;
      this.jstoday = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss a', 'en-US', '+0530').substring(0,10);
      console.log(this.jstoday);      
      this.nomPrenom = Authentication.getNomPrenom();
    });
    this.newDemandeForm.controls.vehicule.valueChanges.subscribe(value => {
      this.newDemandeForm.controls.numeroSerie.setValue(value.numeroSerie, {emitEvent: false});
   //   this.prixUnitaire = value.prix;
    });
    //this.nouvelOperationForm.controls.code.valueChanges.subscribe(value => {
     // this.nouvelOperationForm.controls.designation.setValue(value, {emitEvent: false});
     // this.prixUnitaire = value.prix;
  
    //});
 
    
    this.maintenanceAndReparationService.genCode().subscribe(value => {
      this.codeMainetnance = value;
      console.log("code maintenance"+this.codeMainetnance);
      
    });
  }
 

  

  ngOnInit(): void {
    this.newDemandeForm.controls.structure.valueChanges.subscribe(value => {
      this.nomBeneficiaire = '';
      // this.newDemandeForm.controls.numeroSerie.reset(null, {emitEvent: false});
      this.newDemandeForm.controls.beneficiaire.reset(null, {emitEvent: false});
      this.getListVehiculeDataByStructure(value);
    });
    this.newDemandeForm.controls.numeroSerie.valueChanges.subscribe(value => {
      // this.newDemandeForm.controls.beneficiaire.setValue(value, {emitEvent: false});
      // this.nomBeneficiaire = value.nomBeneficiaire;
    });
    this.newDemandeForm.controls.beneficiaire.valueChanges.subscribe(value => {
      this.newDemandeForm.controls.numeroSerie.setValue(value, {emitEvent: false});
      this.nomBeneficiaire = value.nomBeneficiaire;
    });

    this.filteredOptions = this.vehiculeControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.numeroSerie),
        map(name => name ? this._filter(name) : this.listVehiculeDataByStructure.slice())
      );


  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.newDemande = {
     // dateDemande: moment(this.newDemandeForm.value.dateDemande as Date).format('YYYY-MM-DDTHH:mm:ss'),
      dateRDV: null,
      demandeur: this.Authentication.getNomPrenom(),
      idBeneficiaire: 0,
      vehicule: this.newDemandeForm.value.vehicule,
      indexKm: this.newDemandeForm.value.indexKm,
      matriculeBeneficiaire: 'mat2020',
      nomBeneficiaire: this.benificaire,
      numeroSerie: this.newDemandeForm.value.numeroSerie,
      status: 'En cours',
      structure: this.structureName,
      ugp: this.uniteGestionParc,
      ugpReparation: this.newDemandeForm.value.ugpReparation,
      descriptionIntervention: this.newDemandeForm.value.descriptionIntervention,
      dateDemande:this.newDemandeForm.value.dateDemande,
      observation:this.newDemandeForm.value.observation,
      
    };
    this.dialogRef.close(this.newDemande);
    console.log("vehicule : demande maintenance :"+this.newDemandeForm.value.vehicule);
    console.log("unite de gestion de parc !!!");

    console.log(this.newDemandeForm.value.ugp);
    console.log(this.newDemandeForm.value.structure);
    console.log("Structure namùe "+this.structureName);
    console.log("personnel ");
    console.log(this.newDemandeForm.value.personnel);
    
    
    
    
    
  }

  closeDialog() {
    this.dialogRef.close();
  }


  getListVehiculeDataByStructure(structure: string) {
    this.listVehiculeDataByStructure = [];
    /*
    this.listVehiculeData.forEach(value => {
      if (value.structure === structure) {
        this.filteredOptions.subscribe(value1 => {
          this.listVehiculeDataByStructure = value.vehiculesData;
        });
      }
    });
    */
  }

  closePicker() {
    this.picker.cancel();
  }

  displayFn(listVehiculeDataByStructure: ListVehiculeDataByStructure): string {
    return listVehiculeDataByStructure && listVehiculeDataByStructure.numeroSerie ? listVehiculeDataByStructure.numeroSerie : '';
  }

  private _filter(numeroSerie: string): ListVehiculeDataByStructure[] {
    const filterValue = numeroSerie.toLowerCase();

    return this.listVehiculeDataByStructure.filter(option => option.numeroSerie.toLowerCase().indexOf(filterValue) === 0);
  }

}
