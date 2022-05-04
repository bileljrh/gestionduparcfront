import {Component, Inject , OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-valid-recharge-carburant-compensation',
  templateUrl: './valid-recharge-carburant-compensation.component.html',
  styleUrls: ['./valid-recharge-carburant-compensation.component.scss']
})
export class ValidRechargeCarburantCompensationComponent  {

 
  constructor(public dialogRef: MatDialogRef<ValidRechargeCarburantCompensationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
