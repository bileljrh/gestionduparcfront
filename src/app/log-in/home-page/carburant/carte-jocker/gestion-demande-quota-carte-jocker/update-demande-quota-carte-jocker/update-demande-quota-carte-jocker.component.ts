import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import moment from 'moment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DemandeQuotaCarteJockerService } from '../demande-quota-carte-jocker.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModificarionDemandeQuotaCarteJocker } from './ModificarionDemandeQuotaCarteJocker';
import { Router } from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-update-demande-quota-carte-jocker',
  templateUrl: './update-demande-quota-carte-jocker.component.html',
  styleUrls: ['./update-demande-quota-carte-jocker.component.scss'],
  providers: [MatSnackBar]

})
export class UpdateDemandeQuotaCarteJockerComponent  {
  modificarionDemandeQuotaCarteJockerForm = new FormGroup({
    demandeur: new FormControl(null, Validators.required),
    quantiteValide: new FormControl(null, Validators.required),
    causeDeBlocage: new FormControl(null, Validators.required),
  });
  modificarionDemandeQuotaCarteJocker: ModificarionDemandeQuotaCarteJocker = {
    id: null,
    demandeur:  '',
    quantiteValide:  null,
    causeDeBlocage: ''
    
  };


  constructor(public dialogRef: MatDialogRef<UpdateDemandeQuotaCarteJockerComponent>, private demandeQuotaCarteJockerService: DemandeQuotaCarteJockerService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngxLoader.start();
    this.patchInitialValues();
    console.log(data);
    this.ngxLoader.stop();
  }


  onCancel() {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modificarionDemandeQuotaCarteJockerForm.valid) {
      this.modificarionDemandeQuotaCarteJocker = {
        id: this.data.element.id,
        demandeur: this.modificarionDemandeQuotaCarteJockerForm.value.demandeur,
        quantiteValide: this.modificarionDemandeQuotaCarteJockerForm.value.quantiteValide,
        causeDeBlocage: this.modificarionDemandeQuotaCarteJockerForm.value.causeDeBlocage,
      };
      this.dialogRef.close(this.modificarionDemandeQuotaCarteJocker);
    }
  }

  patchInitialValues() {
    this.modificarionDemandeQuotaCarteJockerForm.controls.demandeur.patchValue(this.data.element.demandeur);
    this.modificarionDemandeQuotaCarteJockerForm.controls.quantiteValide.patchValue(this.data.element.quantiteValide);
    this.modificarionDemandeQuotaCarteJockerForm.controls.causeDeBlocage.patchValue(this.data.element.causeDeBlocage);
  }

}
