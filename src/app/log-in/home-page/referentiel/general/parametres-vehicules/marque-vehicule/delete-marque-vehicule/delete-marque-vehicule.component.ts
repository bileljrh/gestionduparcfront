import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-marque-vehicule',
  templateUrl: './delete-marque-vehicule.component.html',
  styleUrls: ['./delete-marque-vehicule.component.scss']
})
export class DeleteMarqueVehiculeComponent {


  constructor(public dialogRef: MatDialogRef<DeleteMarqueVehiculeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
