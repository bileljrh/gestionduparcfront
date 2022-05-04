import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-valid-transfert-parc-vers-parc',
  templateUrl: './valid-transfert-parc-vers-parc.component.html',
  styleUrls: ['./valid-transfert-parc-vers-parc.component.scss']
})
export class ValidTransfertParcVersParcComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ValidTransfertParcVersParcComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

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
