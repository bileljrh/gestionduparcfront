import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-type-vehicule',
  templateUrl: './delete-type-vehicule.component.html',
  styleUrls: ['./delete-type-vehicule.component.scss']
})
export class DeleteTypeVehiculeComponent {

  constructor(public dialogRef: MatDialogRef<DeleteTypeVehiculeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
