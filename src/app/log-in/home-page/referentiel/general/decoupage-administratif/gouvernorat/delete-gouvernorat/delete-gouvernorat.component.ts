import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-gouvernorat',
  templateUrl: './delete-gouvernorat.component.html',
  styleUrls: ['./delete-gouvernorat.component.scss']
})
export class DeleteGouvernoratComponent {


  constructor(public dialogRef: MatDialogRef<DeleteGouvernoratComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
