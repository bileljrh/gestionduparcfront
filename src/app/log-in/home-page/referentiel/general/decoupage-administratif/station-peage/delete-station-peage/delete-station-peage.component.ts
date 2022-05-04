import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-station-peage',
  templateUrl: './delete-station-peage.component.html',
  styleUrls: ['./delete-station-peage.component.scss']
})
export class DeleteStationPeageComponent {


  constructor(public dialogRef: MatDialogRef<DeleteStationPeageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
