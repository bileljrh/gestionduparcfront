import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-valid-recharge-quota-mensuel',
  templateUrl: './valid-recharge-quota-mensuel.component.html',
  styleUrls: ['./valid-recharge-quota-mensuel.component.scss']
})
export class ValidRechargeQuotaMensuelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ValidRechargeQuotaMensuelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelConfirmation() {
    this.dialogRef.close();
  }

  onConfirmValidation() {
    this.dialogRef.close(this.data.id);
  }
}
