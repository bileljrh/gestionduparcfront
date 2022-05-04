import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-lieu-parking',
  templateUrl: './delete-lieu-parking.component.html',
  styleUrls: ['./delete-lieu-parking.component.scss']
})
export class DeleteLieuParkingComponent {


  constructor(public dialogRef: MatDialogRef<DeleteLieuParkingComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
