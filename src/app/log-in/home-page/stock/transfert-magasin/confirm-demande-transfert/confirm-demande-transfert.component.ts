import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-demande-transfert',
  templateUrl: './confirm-demande-transfert.component.html',
  styleUrls: ['./confirm-demande-transfert.component.scss']
})
export class ConfirmDemandeTransfertComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmDemandeTransfertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

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
