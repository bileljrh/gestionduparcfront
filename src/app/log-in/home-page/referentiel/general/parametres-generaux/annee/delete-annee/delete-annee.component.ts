import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-annee',
  templateUrl: './delete-annee.component.html',
  styleUrls: ['./delete-annee.component.scss']
})
export class DeleteAnneeComponent {


  constructor(public dialogRef: MatDialogRef<DeleteAnneeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
