import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';
import {NouvelleCartePlafond} from '../nouvelle-carte-plafond';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-modify-carte-plafond',
  templateUrl: './modify-carte-plafond.component.html',
  styleUrls: ['./modify-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class ModifyCartePlafondComponent {
  modifiedCartePlafond: NouvelleCartePlafond = {
    id: null,
    numeroCarte: '',
    montant: 0,
    dateValiditee: '',
    status:''
  };
  
  modifiedCartePlafondForm = new FormGroup({
    numeroCarte: new FormControl(null, Validators.required),
    montant: new FormControl(null, Validators.required),
    dateValiditee: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required)
  });

  get f() { return this.modifiedCartePlafondForm.controls; }
  statusCarte:string[]=['actif','en opposition temporaire','désactivé']

  constructor(public dialogRef: MatDialogRef<ModifyCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.patchInitialValues();
    this.ngxLoader.stop();
  }


  onCancel() {
    this.dialogRef.close();
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedCartePlafondForm.valid) {
      this.modifiedCartePlafond = {
        id: this.data.element.id,
        numeroCarte: this.modifiedCartePlafondForm.value.numeroCarte,
        montant: this.modifiedCartePlafondForm.value.montant,
        status:this.modifiedCartePlafondForm.value.status,
        dateValiditee: moment(this.modifiedCartePlafondForm.value.dateValiditee as Date).format('YYYY-MM-DD'),
     
        
      };
      this.dialogRef.close(this.modifiedCartePlafond);
    }
  }

  patchInitialValues() {
    this.modifiedCartePlafondForm.controls.numeroCarte.patchValue(this.data.element.numeroCarte);
    this.modifiedCartePlafondForm.controls.montant.patchValue(this.data.element.montant);
    this.modifiedCartePlafondForm.controls.dateValiditee.patchValue(this.data.element.dateValiditee);
    this.modifiedCartePlafondForm.controls.status.patchValue(this.data.element.status);
  }


}

