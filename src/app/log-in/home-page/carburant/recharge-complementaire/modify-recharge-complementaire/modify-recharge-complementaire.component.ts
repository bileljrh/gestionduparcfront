import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import moment from 'moment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { CarburantServiceService } from '../../carburant-service.service';
import { RechargeComplementaireModule } from '../recharge-complementaire/recharge-complementaire.module';
@Component({
  selector: 'app-modify-recharge-complementaire',
  templateUrl: './modify-recharge-complementaire.component.html',
  styleUrls: ['./modify-recharge-complementaire.component.scss'],
  providers: [MatSnackBar]

})
export class ModifyRechargeComplementaireComponent implements OnInit {
  modificarionRechargeComplementaireModuleForm = new FormGroup({
    mission:new FormControl(null, Validators.required),
    destination: new FormControl(null, Validators.required),
    observation: new FormControl(null, Validators.required),
  });
  modificarionRechargeComplementaireModule: RechargeComplementaireModule = {
    id: null,
    observation: '',
  };

  constructor(public dialogRef: MatDialogRef<ModifyRechargeComplementaireComponent>,  
       private  carburant: CarburantServiceService ,  
         private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar,
          private ngxLoader: NgxUiLoaderService,
     @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngxLoader.start();
    this.patchInitialValues();
    console.log(data);
    this.ngxLoader.stop();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onCancel() {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modificarionRechargeComplementaireModuleForm.valid) {
      this.modificarionRechargeComplementaireModule = {
        id: this.data.element.id,
        observation: this.modificarionRechargeComplementaireModuleForm.value.observation,
      };
      this.dialogRef.close(this.modificarionRechargeComplementaireModule);
    }
  }

  patchInitialValues() {
    this.modificarionRechargeComplementaireModuleForm.controls.observation.patchValue(this.data.element.observation);
  }

}
