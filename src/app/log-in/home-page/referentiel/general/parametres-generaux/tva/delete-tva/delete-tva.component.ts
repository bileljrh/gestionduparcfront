import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-tva',
  templateUrl: './delete-tva.component.html',
  styleUrls: ['./delete-tva.component.scss']
})
export class DeleteTvaComponent {


  constructor(public dialogRef: MatDialogRef<DeleteTvaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
