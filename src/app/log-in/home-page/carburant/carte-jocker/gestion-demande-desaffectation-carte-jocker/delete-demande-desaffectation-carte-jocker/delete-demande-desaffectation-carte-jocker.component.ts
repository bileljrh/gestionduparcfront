import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-demande-desaffectation-carte-jocker',
  templateUrl: './delete-demande-desaffectation-carte-jocker.component.html',
  styleUrls: ['./delete-demande-desaffectation-carte-jocker.component.scss']
})
export class DeleteDemandeDesaffectationCarteJockerComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDemandeDesaffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
