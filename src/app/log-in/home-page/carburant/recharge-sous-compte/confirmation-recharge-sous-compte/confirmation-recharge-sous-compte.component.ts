import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-recharge-sous-compte',
  templateUrl: './confirmation-recharge-sous-compte.component.html',
  styleUrls: ['./confirmation-recharge-sous-compte.component.scss']
})
export class ConfirmationRechargeSousCompteComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationRechargeSousCompteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
