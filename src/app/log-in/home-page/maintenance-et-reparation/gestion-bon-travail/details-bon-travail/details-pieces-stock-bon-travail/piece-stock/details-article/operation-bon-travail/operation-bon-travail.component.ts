import { animate, state, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DemandeArticle } from 'src/app/log-in/home-page/achat/demande-article';
import { BonTravailOperation } from 'src/app/log-in/home-page/maintenance-et-reparation/BonTravailOperation';
import { DemandeMaintenance } from 'src/app/log-in/home-page/maintenance-et-reparation/gestion-demande-intervention/demande-maintenance';
import { MaintenanceAndReparationServiceService } from 'src/app/log-in/home-page/maintenance-et-reparation/maintenance-and-reparation-service.service';
import { OperationRep } from 'src/app/log-in/home-page/maintenance-et-reparation/OperationRep';
import { FamilleOperationReparation } from 'src/app/log-in/home-page/referentiel/general/operation-reparation/famille-operation-reparation/famille-operation-reparation';
import { OperationReparation } from 'src/app/log-in/home-page/referentiel/general/operation-reparation/liste-operation-reparation/operation-reparation';

@Component({
  selector: 'app-operation-bon-travail',
  templateUrl: './operation-bon-travail.component.html',
  styleUrls: ['./operation-bon-travail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OperationBonTravailComponent implements OnInit {
 

  ListFamille :string[] = ['famille 1', 'famille 2', 'famille 3', 'famille 4', 'famille 5', 'famille 6'];
  ListOperation:OperationReparation[]=[];
  listOp:OperationReparation[]=[];
  listFamilleOperation:FamilleOperationReparation[]=[];
  prixFact = 0 ;
  operationForm: BonTravailOperation = {
    prix:0,
    operations:null,
    dateDebut:''
   // famille:''
  };
  
  nouvelOperationForm = new FormGroup({
    code: new FormControl(null, Validators.required),
   designation: new FormControl(null, Validators.required),
   prixUnitaire:new FormControl(null,Validators.required),
   dateDebut:new FormControl(null,Validators.required)
  
  });
  formControl = new FormControl();
  autoFilter: Observable<OperationRep[]>;
  filteredOptions: Observable<OperationRep[]>;
  myControl = new FormControl();
  
  constructor(public dialogRef: MatDialogRef<OperationBonTravailComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private Maintenance: MaintenanceAndReparationServiceService)
   {
     this.Maintenance.showoperationbyfamille(1).subscribe(value=>{
      
       
     });
     this.nouvelOperationForm.controls.designation.valueChanges.subscribe(value => {
      this.nouvelOperationForm.controls.code.setValue(value, {emitEvent: false});
    });

    this.Maintenance.showAllFamille().subscribe(value=>{
      this.listFamilleOperation=value;
      console.log("operation Reparation");
      
      console.log(value);
      
    });
    this.nouvelOperationForm.controls.code.valueChanges.subscribe(value => {
      this.nouvelOperationForm.controls.designation.setValue(value, {emitEvent: false});
    });
  }
 

  onConfirm() {
    if (this.nouvelOperationForm.valid) {
      this.operationForm = {
        operations:this.nouvelOperationForm.value.code,
        prix:this.nouvelOperationForm.value.prixUnitaire,
        dateDebut: moment(this.nouvelOperationForm.value.dateDebut as Date).format('YYYY-MM-DD'),

      };
      this.dialogRef.close(this.operationForm);
      console.log("operation form ");
      console.log(this.operationForm);
      
      
    }
    
  }
  ngOnInit(): void {
    this.filteredOptions = this.nouvelOperationForm.controls.code.valueChanges.pipe(
      map(value => this._filter(value)),
    ); 

  }
  private _filter(code): OperationRep[] {
    const filterValue = code+'';
    return this.listOp.filter(option =>{
     let stropt =   option.code+''
    return stropt.startsWith(filterValue)});
  }

  public displayProperty(value) {
    if (value) {
      return value.code;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
  onChange(value){
    this.Maintenance.showoperationbyfamille((value)).subscribe((value:any) => {
      this.listOp=value;     
    });
}
}