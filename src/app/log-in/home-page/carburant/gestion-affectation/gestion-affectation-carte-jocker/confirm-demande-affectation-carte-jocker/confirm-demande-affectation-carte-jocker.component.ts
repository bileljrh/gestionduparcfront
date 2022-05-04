import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-demande-affectation-carte-jocker',
  templateUrl: './confirm-demande-affectation-carte-jocker.component.html',
  styleUrls: ['./confirm-demande-affectation-carte-jocker.component.scss']
})
export class ConfirmDemandeAffectationCarteJockerComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDemandeAffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
