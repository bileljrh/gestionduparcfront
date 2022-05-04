import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-ugp',
  templateUrl: './delete-ugp.component.html',
  styleUrls: ['./delete-ugp.component.scss']
})
export class DeleteUGPComponent {


  constructor(public dialogRef: MatDialogRef<DeleteUGPComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
