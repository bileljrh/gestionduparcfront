import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarteAgilisCashServiceService} from '../../../carte-agilis-cash/carte-agilis-cash-service.service';

@Component({
  selector: 'app-confirm-recharge-carte-agilis-cash',
  templateUrl: './confirm-recharge-carte-agilis-cash.component.html',
  styleUrls: ['./confirm-recharge-carte-agilis-cash.component.scss']
})
export class ConfirmRechargeCarteAgilisCashComponent  {

  constructor(public dialogRef: MatDialogRef<ConfirmRechargeCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private CarteAgilis: CarteAgilisCashServiceService) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close(this.data.id);
  }


}
