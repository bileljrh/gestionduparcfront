import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-taxe-circulation',
  templateUrl: './delete-taxe-circulation.component.html',
  styleUrls: ['./delete-taxe-circulation.component.scss']
})
export class DeleteTaxeCirculationComponent {


  constructor(public dialogRef: MatDialogRef<DeleteTaxeCirculationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

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
