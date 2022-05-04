import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import { CarExit } from '../CarExit';



@Component({
  selector: 'app-date-sortie-vehicule',
  templateUrl: './date-sortie-vehicule.component.html',
  styleUrls: ['./date-sortie-vehicule.component.scss']
})
export class DateSortieVehiculeComponent implements OnInit {
  newCarExit: CarExit = {
    dateSortie: '',
  }
  newCarExitForm = new FormGroup({
    dateSortie: new FormControl(null, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<DateSortieVehiculeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }
     
  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.newCarExit = {
      dateSortie: moment(this.newCarExitForm.value.dateSortie as Date).format('YYYY-MM-DD'),
    };

    this.dialogRef.close(this.newCarExit);
    console.log("test new car exist");
    
    console.log(this.closeDialog,this.newCarExit);
    
  }
}
