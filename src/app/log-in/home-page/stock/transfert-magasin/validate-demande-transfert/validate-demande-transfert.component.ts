import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-validate-demande-transfert',
  templateUrl: './validate-demande-transfert.component.html',
  styleUrls: ['./validate-demande-transfert.component.scss']
})
export class ValidateDemandeTransfertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ValidateDemandeTransfertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
