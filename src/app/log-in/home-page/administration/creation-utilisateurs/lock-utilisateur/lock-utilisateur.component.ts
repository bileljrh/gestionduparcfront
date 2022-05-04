import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-lock-utilisateur',
  templateUrl: './lock-utilisateur.component.html',
  styleUrls: ['./lock-utilisateur.component.scss']
})
export class LockUtilisateurComponent {


  constructor(public dialogRef: MatDialogRef<LockUtilisateurComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
