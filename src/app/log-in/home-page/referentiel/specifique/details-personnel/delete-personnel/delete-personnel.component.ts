import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-personnel',
  templateUrl: './delete-personnel.component.html',
  styleUrls: ['./delete-personnel.component.scss']
})
export class DeletePersonnelComponent {


  constructor(public dialogRef: MatDialogRef<DeletePersonnelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
