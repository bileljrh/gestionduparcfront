import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-ordre-mission',
  templateUrl: './delete-ordre-mission.component.html',
  styleUrls: ['./delete-ordre-mission.component.scss']
})
export class DeleteOrdreMissionComponent {


  constructor(public dialogRef: MatDialogRef<DeleteOrdreMissionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

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
