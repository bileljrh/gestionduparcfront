import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-recharge-quota-mensuel',
  templateUrl: './confirm-recharge-quota-mensuel.component.html',
  styleUrls: ['./confirm-recharge-quota-mensuel.component.scss']
})
export class ConfirmRechargeQuotaMensuelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmRechargeQuotaMensuelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelConfirmation() {
    this.dialogRef.close();
  }

  onConfirmConfirmation() {
    this.dialogRef.close(this.data.id);
  }

}
