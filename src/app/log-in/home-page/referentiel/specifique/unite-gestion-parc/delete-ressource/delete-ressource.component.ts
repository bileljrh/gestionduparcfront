import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-ressource',
  templateUrl: './delete-ressource.component.html',
  styleUrls: ['./delete-ressource.component.scss']
})
export class DeleteRessourceComponent {

  constructor(public dialogRef: MatDialogRef<DeleteRessourceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
