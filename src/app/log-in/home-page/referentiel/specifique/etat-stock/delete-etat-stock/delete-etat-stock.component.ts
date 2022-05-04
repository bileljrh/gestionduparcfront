import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-etat-stock',
  templateUrl: './delete-etat-stock.component.html',
  styleUrls: ['./delete-etat-stock.component.scss']
})
export class DeleteEtatStockComponent {


  constructor(public dialogRef: MatDialogRef<DeleteEtatStockComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
