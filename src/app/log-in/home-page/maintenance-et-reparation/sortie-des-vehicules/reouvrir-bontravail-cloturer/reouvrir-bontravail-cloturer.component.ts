import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-reouvrir-bontravail-cloturer',
  templateUrl: './reouvrir-bontravail-cloturer.component.html',
  styleUrls: ['./reouvrir-bontravail-cloturer.component.scss']
})
export class ReouvrirBontravailCloturerComponent {

  constructor(public dialogRef: MatDialogRef<ReouvrirBontravailCloturerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
