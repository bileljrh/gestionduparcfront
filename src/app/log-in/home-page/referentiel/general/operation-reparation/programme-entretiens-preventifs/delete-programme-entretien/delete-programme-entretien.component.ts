import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-programme-entretien',
  templateUrl: './delete-programme-entretien.component.html',
  styleUrls: ['./delete-programme-entretien.component.scss']
})
export class DeleteProgrammeEntretienComponent {


  constructor(public dialogRef: MatDialogRef<DeleteProgrammeEntretienComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
