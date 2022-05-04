import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-visite-technique',
  templateUrl: './delete-visite-technique.component.html',
  styleUrls: ['./delete-visite-technique.component.scss']
})
export class DeleteVisiteTechniqueComponent {


  constructor(public dialogRef: MatDialogRef<DeleteVisiteTechniqueComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

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
