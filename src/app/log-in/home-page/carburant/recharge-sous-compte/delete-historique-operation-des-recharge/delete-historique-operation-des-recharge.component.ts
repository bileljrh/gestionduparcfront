import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-historique-operation-des-recharge',
  templateUrl: './delete-historique-operation-des-recharge.component.html',
  styleUrls: ['./delete-historique-operation-des-recharge.component.scss']
})
export class DeleteHistoriqueOperationDesRechargeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteHistoriqueOperationDesRechargeComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
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
