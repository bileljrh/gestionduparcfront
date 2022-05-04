import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-beneficiaire-emprunt',
  templateUrl: './delete-beneficiaire-emprunt.component.html',
  styleUrls: ['./delete-beneficiaire-emprunt.component.scss']
})
export class DeleteBeneficiaireEmpruntComponent {


  constructor(public dialogRef: MatDialogRef<DeleteBeneficiaireEmpruntComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
