import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-gps',
  templateUrl: './delete-gps.component.html',
  styleUrls: ['./delete-gps.component.scss']
})
export class DeleteGPSComponent {

  constructor(public dialogRef: MatDialogRef<DeleteGPSComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

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
