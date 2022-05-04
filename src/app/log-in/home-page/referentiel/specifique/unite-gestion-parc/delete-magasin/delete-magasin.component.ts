import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-magasin',
  templateUrl: './delete-magasin.component.html',
  styleUrls: ['./delete-magasin.component.scss']
})
export class DeleteMagasinComponent {

  constructor(public dialogRef: MatDialogRef<DeleteMagasinComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
