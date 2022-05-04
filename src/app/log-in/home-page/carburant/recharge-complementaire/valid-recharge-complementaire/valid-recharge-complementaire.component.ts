import {Component, Inject , OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-valid-recharge-complementaire',
  templateUrl: './valid-recharge-complementaire.component.html',
  styleUrls: ['./valid-recharge-complementaire.component.scss']
})
export class ValidRechargeComplementaireComponent {

 
  constructor(public dialogRef: MatDialogRef<ValidRechargeComplementaireComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
