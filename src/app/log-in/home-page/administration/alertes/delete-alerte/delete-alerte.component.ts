import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-alerte',
  templateUrl: './delete-alerte.component.html',
  styleUrls: ['./delete-alerte.component.scss']
})
export class DeleteAlerteComponent {


  constructor(public dialogRef: MatDialogRef<DeleteAlerteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
