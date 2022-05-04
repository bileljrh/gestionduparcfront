import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import moment from 'moment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { RechargeCarburantCompensationModule } from '../recharge-carburant-compensation/recharge-carburant-compensation.module';
import { CarburantServiceService } from '../../carburant-service.service';
@Component({
  selector: 'app-modify-recharge-carburant-compensation',
  templateUrl: './modify-recharge-carburant-compensation.component.html',
  styleUrls: ['./modify-recharge-carburant-compensation.component.scss'],
  providers: [MatSnackBar]

})
export class ModifyRechargeCarburantCompensationComponent implements OnInit {
  modificarionRechargeCarburantCompensationModuleForm = new FormGroup({
    mission:new FormControl(null, Validators.required),
    destination: new FormControl(null, Validators.required),
    observation: new FormControl(null, Validators.required),
  });
  modificarionRechargeCarburantCompensationModule: RechargeCarburantCompensationModule = {
    id: null,
    mission: '',
    destination: '',
    observation: '',
  };

  constructor(public dialogRef: MatDialogRef<ModifyRechargeCarburantCompensationComponent>,     private  carburant: CarburantServiceService ,    private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, @Inject(MAT_DIALOG_DATA) public data: any) {
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
    if (this.modificarionRechargeCarburantCompensationModuleForm.valid) {
      this.modificarionRechargeCarburantCompensationModule = {
        id: this.data.element.id,
        mission: this.modificarionRechargeCarburantCompensationModuleForm.value.mission,
        destination: this.modificarionRechargeCarburantCompensationModuleForm.value.destination,
        observation: this.modificarionRechargeCarburantCompensationModuleForm.value.observation,
      };
      this.dialogRef.close(this.modificarionRechargeCarburantCompensationModule);
    }
  }

  patchInitialValues() {
    this.modificarionRechargeCarburantCompensationModuleForm.controls.mission.patchValue(this.data.element.mission);
    this.modificarionRechargeCarburantCompensationModuleForm.controls.destination.patchValue(this.data.element.destination);
    this.modificarionRechargeCarburantCompensationModuleForm.controls.observation.patchValue(this.data.element.observation);
  }

}
