import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-unite',
  templateUrl: './delete-unite.component.html',
  styleUrls: ['./delete-unite.component.scss']
})
export class DeleteUniteComponent {


  constructor(public dialogRef: MatDialogRef<DeleteUniteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
