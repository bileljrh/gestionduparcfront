import {Component, Inject , OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-valid-demande-quota-carte-jocker',
  templateUrl: './valid-demande-quota-carte-jocker.component.html',
  styleUrls: ['./valid-demande-quota-carte-jocker.component.scss']
})
export class ValidDemandeQuotaCarteJockerComponent {

  
  constructor(public dialogRef: MatDialogRef<ValidDemandeQuotaCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
