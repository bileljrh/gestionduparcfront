import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-groupe-utilisateur',
  templateUrl: './delete-groupe-utilisateur.component.html',
  styleUrls: ['./delete-groupe-utilisateur.component.scss']
})
export class DeleteGroupeUtilisateurComponent {


  constructor(public dialogRef: MatDialogRef<DeleteGroupeUtilisateurComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
