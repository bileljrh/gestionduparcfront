import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-demande-desaffectation-carte-jocker',
  templateUrl: './confirm-demande-desaffectation-carte-jocker.component.html',
  styleUrls: ['./confirm-demande-desaffectation-carte-jocker.component.scss']
})
export class ConfirmDemandeDesaffectationCarteJockerComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ConfirmDemandeDesaffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelValidation() {
    this.dialogRef.close();
  }

  onConfirmValidation() {
    this.dialogRef.close(this.data.id);
  }

}
