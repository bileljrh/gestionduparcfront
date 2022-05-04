import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-message-application',
  templateUrl: './delete-message-application.component.html',
  styleUrls: ['./delete-message-application.component.scss']
})
export class DeleteMessageApplicationComponent {


  constructor(public dialogRef: MatDialogRef<DeleteMessageApplicationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
