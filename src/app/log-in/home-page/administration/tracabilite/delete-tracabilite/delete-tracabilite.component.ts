import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-tracabilite',
  templateUrl: './delete-tracabilite.component.html',
  styleUrls: ['./delete-tracabilite.component.scss']
})
export class DeleteTracabiliteComponent {


  constructor(public dialogRef: MatDialogRef<DeleteTracabiliteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
