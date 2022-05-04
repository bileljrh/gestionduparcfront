import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-recharge-complementaire',
  templateUrl: './delete-recharge-complementaire.component.html',
  styleUrls: ['./delete-recharge-complementaire.component.scss']
})
export class DeleteRechargeComplementaireComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteRechargeComplementaireComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
