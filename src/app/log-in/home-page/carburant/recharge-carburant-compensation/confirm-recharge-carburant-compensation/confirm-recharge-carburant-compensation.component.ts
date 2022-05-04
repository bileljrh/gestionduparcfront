import {Component, Inject , OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-recharge-carburant-compensation',
  templateUrl: './confirm-recharge-carburant-compensation.component.html',
  styleUrls: ['./confirm-recharge-carburant-compensation.component.scss']
})
export class ConfirmRechargeCarburantCompensationComponent  {

  constructor(public dialogRef: MatDialogRef<ConfirmRechargeCarburantCompensationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
