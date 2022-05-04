import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-reforme',
  templateUrl: './delete-reforme.component.html',
  styleUrls: ['./delete-reforme.component.scss']
})
export class DeleteReformeComponent {


  constructor(public dialogRef: MatDialogRef<DeleteReformeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

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
