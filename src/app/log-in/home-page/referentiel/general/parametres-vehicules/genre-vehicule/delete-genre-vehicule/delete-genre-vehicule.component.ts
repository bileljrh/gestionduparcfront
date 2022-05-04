import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-genre-vehicule',
  templateUrl: './delete-genre-vehicule.component.html',
  styleUrls: ['./delete-genre-vehicule.component.scss']
})
export class DeleteGenreVehiculeComponent {


  constructor(public dialogRef: MatDialogRef<DeleteGenreVehiculeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
