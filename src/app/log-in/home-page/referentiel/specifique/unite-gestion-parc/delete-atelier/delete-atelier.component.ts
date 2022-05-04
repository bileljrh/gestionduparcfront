import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-atelier',
  templateUrl: './delete-atelier.component.html',
  styleUrls: ['./delete-atelier.component.scss']
})
export class DeleteAtelierComponent {


  constructor(public dialogRef: MatDialogRef<DeleteAtelierComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
