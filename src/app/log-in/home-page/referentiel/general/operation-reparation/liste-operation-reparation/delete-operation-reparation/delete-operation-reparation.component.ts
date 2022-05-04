import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-operation-reparation',
  templateUrl: './delete-operation-reparation.component.html',
  styleUrls: ['./delete-operation-reparation.component.scss']
})
export class DeleteOperationReparationComponent {


  constructor(public dialogRef: MatDialogRef<DeleteOperationReparationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
