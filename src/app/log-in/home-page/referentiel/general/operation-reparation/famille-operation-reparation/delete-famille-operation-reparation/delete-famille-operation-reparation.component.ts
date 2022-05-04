import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-famille-operation-reparation',
  templateUrl: './delete-famille-operation-reparation.component.html',
  styleUrls: ['./delete-famille-operation-reparation.component.scss']
})
export class DeleteFamilleOperationReparationComponent {


  constructor(public dialogRef: MatDialogRef<DeleteFamilleOperationReparationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
