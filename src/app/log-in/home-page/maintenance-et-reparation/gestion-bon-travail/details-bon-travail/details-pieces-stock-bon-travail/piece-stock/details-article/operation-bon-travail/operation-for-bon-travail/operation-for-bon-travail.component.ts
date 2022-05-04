import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BonTravailOperation } from 'src/app/log-in/home-page/maintenance-et-reparation/BonTravailOperation';
import { MaintenanceAndReparationServiceService } from 'src/app/log-in/home-page/maintenance-et-reparation/maintenance-and-reparation-service.service';
import { OperationRep } from 'src/app/log-in/home-page/maintenance-et-reparation/OperationRep';
import { OperationReparation } from 'src/app/log-in/home-page/referentiel/general/operation-reparation/liste-operation-reparation/operation-reparation';


@Component({
  selector: 'app-operation-for-bon-travail',
  templateUrl: './operation-for-bon-travail.component.html',
  styleUrls: ['./operation-for-bon-travail.component.scss']
})
export class OperationForBonTravailComponent implements OnInit {


  ListFamille:['famille Test 1','Famille Test 2'];
  ListOperation:OperationReparation[]=[];
  listOp:OperationReparation[]=[];
  regulationForm: BonTravailOperation = {
    prix:0,
    operations:null,
    //famille:''
  };

  
  nouvelArticleForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required)
  });
  formControl = new FormControl();
  autoFilter: Observable<OperationRep[]>;
  listArticle: OperationRep[] = [];
  filteredOptions: Observable<OperationRep[]>;
  myControl = new FormControl();
  constructor(public dialogRef: MatDialogRef<OperationForBonTravailComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private Maintenance: MaintenanceAndReparationServiceService)
   {
     this.Maintenance.operationList().subscribe(value=>{
       this.listOp=value;
       console.log(value);
       
     })
   
  }
  onConfirm() {}/*
  onConfirm() {
    if (this.nouvelArticleForm.valid) {
      this.regulationForm = {


      };
      this.dialogRef.close(this.regulationForm);
     //console.log(this.nouvelArticleForm.value.quantiteDispo);
     console.log("op for bon travail");
     
     console.log(this.regulationForm.test);
     

    }
  
  }*/
  ngOnInit(): void {
    this.filteredOptions = this.nouvelArticleForm.controls.codeArticle.valueChanges.pipe(
      map(value => this._filter(value)),
    ); 
  }
  private _filter(operation): OperationRep[] {
    const filterValue = operation+'';
    return this.listOp.filter(option =>{
     let stropt =   option.code+''
    return stropt.startsWith(filterValue)});
  }

  public displayProperty(value) {
    if (value) {
      return value.designation;
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
