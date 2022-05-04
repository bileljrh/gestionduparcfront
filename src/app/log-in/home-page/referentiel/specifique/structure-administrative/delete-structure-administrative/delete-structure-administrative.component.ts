import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-structure-administrative',
  templateUrl: './delete-structure-administrative.component.html',
  styleUrls: ['./delete-structure-administrative.component.scss']
})
export class DeleteStructureAdministrativeComponent {


  constructor(public dialogRef: MatDialogRef<DeleteStructureAdministrativeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
