import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-historique-affectation-carte-jocker',
  templateUrl: './delete-historique-affectation-carte-jocker.component.html',
  styleUrls: ['./delete-historique-affectation-carte-jocker.component.scss']
})
export class DeleteHistoriqueAffectationCarteJockerComponent {

  constructor(public dialogRef: MatDialogRef<DeleteHistoriqueAffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
