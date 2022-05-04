import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NouvelleCarteJocker} from './nouvelle-carte-jocker';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-nouvelle-carte-jocker',
  templateUrl: './nouvelle-carte-jocker.component.html',
  styleUrls: ['./nouvelle-carte-jocker.component.scss']
})
export class NouvelleCarteJockerComponent implements OnInit {
  nouvelleCarteJocker: NouvelleCarteJocker = {
    numeroCarte: '',
    solde: '',
    dateValiditee: null
    };
  nouvelleCarteJockerForm = new FormGroup({
    numeroCarte: new FormControl(null,Validators.required),
    solde: new FormControl(null,Validators.required),
    dateFinValiditee: new FormControl(null,Validators.required),
  });
  get f() { return this.nouvelleCarteJockerForm.controls; }

  constructor(public dialogRef: MatDialogRef<NouvelleCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
    if (this.nouvelleCarteJockerForm.valid) {
      this.nouvelleCarteJocker = {
        numeroCarte: this.nouvelleCarteJockerForm.value.numeroCarte,
        solde: this.nouvelleCarteJockerForm.value.solde,
        dateValiditee: moment(this.nouvelleCarteJockerForm.value.dateValiditee as Date).format('YYYY-MM-DD')
      };
      console.log(this.nouvelleCarteJocker);
      this.dialogRef.close(this.nouvelleCarteJocker);
    }
  }
}
