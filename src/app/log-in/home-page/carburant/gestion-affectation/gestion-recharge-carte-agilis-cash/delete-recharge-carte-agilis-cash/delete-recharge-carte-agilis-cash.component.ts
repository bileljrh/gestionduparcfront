import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarteAgilisCashServiceService} from '../../../carte-agilis-cash/carte-agilis-cash-service.service';

@Component({
  selector: 'app-delete-recharge-carte-agilis-cash',
  templateUrl: './delete-recharge-carte-agilis-cash.component.html',
  styleUrls: ['./delete-recharge-carte-agilis-cash.component.scss']
})
export class DeleteRechargeCarteAgilisCashComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteRechargeCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private CarteAgilis: CarteAgilisCashServiceService) {
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

  ngOnInit(): void {
  }


}
