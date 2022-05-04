import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-transfert-parc-vers-parc',
  templateUrl: './confirm-transfert-parc-vers-parc.component.html',
  styleUrls: ['./confirm-transfert-parc-vers-parc.component.scss']
})
export class ConfirmTransfertParcVersParcComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmTransfertParcVersParcComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

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
