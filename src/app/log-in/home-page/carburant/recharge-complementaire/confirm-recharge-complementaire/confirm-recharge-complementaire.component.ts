import {Component, Inject , OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-recharge-complementaire',
  templateUrl: './confirm-recharge-complementaire.component.html',
  styleUrls: ['./confirm-recharge-complementaire.component.scss']
})
export class ConfirmRechargeComplementaireComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmRechargeComplementaireComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelDelete() {
    this.dialogRef.close();
  }

  onConfirmDelete() {
    this.dialogRef.close(this.data.id);
  }

}
