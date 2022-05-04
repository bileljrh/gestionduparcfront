import {Component, Inject , OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-demande-quota-carte-jocker',
  templateUrl: './confirm-demande-quota-carte-jocker.component.html',
  styleUrls: ['./confirm-demande-quota-carte-jocker.component.scss']
})
export class ConfirmDemandeQuotaCarteJockerComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDemandeQuotaCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
