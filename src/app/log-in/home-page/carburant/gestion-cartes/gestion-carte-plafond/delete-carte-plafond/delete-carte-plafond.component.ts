import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-carte-plafond',
  templateUrl: './delete-carte-plafond.component.html',
  styleUrls: ['./delete-carte-plafond.component.scss']
})
export class DeleteCartePlafondComponent {


  constructor(public dialogRef: MatDialogRef<DeleteCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
