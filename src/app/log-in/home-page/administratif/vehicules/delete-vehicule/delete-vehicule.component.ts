import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-vehicule',
  templateUrl: './delete-vehicule.component.html',
  styleUrls: ['./delete-vehicule.component.scss']
})
export class DeleteVehiculeComponent {


  constructor(public dialogRef: MatDialogRef<DeleteVehiculeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close(this.data.id);
  }
}
