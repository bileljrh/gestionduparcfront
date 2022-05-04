import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-recharge-carburant-compensation',
  templateUrl: './delete-recharge-carburant-compensation.component.html',
  styleUrls: ['./delete-recharge-carburant-compensation.component.scss']
})
export class DeleteRechargeCarburantCompensationComponent implements OnInit {

 
  constructor(public dialogRef: MatDialogRef<DeleteRechargeCarburantCompensationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
