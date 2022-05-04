import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-activate-desactivate-utilisateurs',
  templateUrl: './activate-desactivate-utilisateurs.component.html',
  styleUrls: ['./activate-desactivate-utilisateurs.component.scss']
})
export class ActivateDesactivateUtilisateursComponent {


  constructor(public dialogRef: MatDialogRef<ActivateDesactivateUtilisateursComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
