import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-recharge-sous-compte',
  templateUrl: './delete-recharge-sous-compte.component.html',
  styleUrls: ['./delete-recharge-sous-compte.component.scss']
})
export class DeleteRechargeSousCompteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteRechargeSousCompteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
