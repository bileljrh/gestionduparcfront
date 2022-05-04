import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {NouvelleCarteJocker} from '../nouvelle-carte-jocker/nouvelle-carte-jocker';
import moment from 'moment';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-modify-carte-jocker',
  templateUrl: './modify-carte-jocker.component.html',
  styleUrls: ['./modify-carte-jocker.component.scss']
})
export class ModifyCarteJockerComponent implements OnInit {
  modifiedCarteJocker: NouvelleCarteJocker = {
    id: null,
    numeroCarte: '',
    solde: '',
    dateValiditee: ''
  };
  modifiedCarteJockerForm = new FormGroup({
    numeroCarte: new FormControl(),
    solde: new FormControl(),
    dateValiditee: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<ModifyCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.patchInitialValues();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }


  onCancelAdding() {
    this.dialogRef.close();

  }

  onConfirmAdding() {
    if (this.modifiedCarteJockerForm.valid) {
      this.modifiedCarteJocker = {
        id: this.data.element.id,
        numeroCarte: this.modifiedCarteJockerForm.value.numeroCarte,
        solde: this.modifiedCarteJockerForm.value.solde,
        dateValiditee: moment(this.modifiedCarteJockerForm.value.dateValiditee as Date).format('YYYY-MM-DD')
      };
      this.dialogRef.close(this.modifiedCarteJocker);
    }
  }

  patchInitialValues() {
    this.modifiedCarteJockerForm.controls.numeroCarte.patchValue(this.data.element.numeroCarte);
    this.modifiedCarteJockerForm.controls.solde.patchValue(this.data.element.solde);
    this.modifiedCarteJockerForm.controls.dateValiditee.patchValue(this.data.element.dateValiditee);
  }

}
