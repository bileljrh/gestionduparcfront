import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-historique-desaffectation-carte-jocker',
  templateUrl: './delete-historique-desaffectation-carte-jocker.component.html',
  styleUrls: ['./delete-historique-desaffectation-carte-jocker.component.scss']
})
export class DeleteHistoriqueDesaffectationCarteJockerComponent {

  constructor(public dialogRef: MatDialogRef<DeleteHistoriqueDesaffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelDelete() {
    this.dialogRef.close();
  }

  onConfirmDelete() {
    this.dialogRef.close(this.data.idCarte);
  }


}
