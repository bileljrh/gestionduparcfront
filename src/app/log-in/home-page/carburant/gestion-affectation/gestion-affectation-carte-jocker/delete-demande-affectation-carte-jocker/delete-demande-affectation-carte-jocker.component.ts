import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-demande-affectation-carte-jocker',
  templateUrl: './delete-demande-affectation-carte-jocker.component.html',
  styleUrls: ['./delete-demande-affectation-carte-jocker.component.scss']
})
export class DeleteDemandeAffectationCarteJockerComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDemandeAffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelDelete() {
    this.dialogRef.close();
  }

  onConfirmDelete() {
    this.dialogRef.close({idCarte: this.data.idCarte, idHistorique: this.data.idHistorique});
  }

}
