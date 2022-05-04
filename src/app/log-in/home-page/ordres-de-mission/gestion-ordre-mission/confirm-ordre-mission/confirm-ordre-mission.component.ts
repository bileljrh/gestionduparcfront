import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-ordre-mission',
  templateUrl: './confirm-ordre-mission.component.html',
  styleUrls: ['./confirm-ordre-mission.component.scss']
})
export class ConfirmOrdreMissionComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmOrdreMissionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

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
