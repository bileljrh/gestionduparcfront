import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-historique-recharge-carte-agilis-cash',
  templateUrl: './delete-historique-recharge-carte-agilis-cash.component.html',
  styleUrls: ['./delete-historique-recharge-carte-agilis-cash.component.scss']
})
export class DeleteHistoriqueRechargeCarteAgilisCashComponent {

  constructor(public dialogRef: MatDialogRef<DeleteHistoriqueRechargeCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelDelete() {
    this.dialogRef.close();
  }

  onConfirmDelete() {
    this.dialogRef.close(this.data.idRecharge);
  }

}
