import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-annuler-demande-maintenance',
  templateUrl: './annuler-demande-maintenance.component.html',
  styleUrls: ['./annuler-demande-maintenance.component.scss']
})
export class AnnulerDemandeMaintenanceComponent  {

 
  constructor(public dialogRef: MatDialogRef<AnnulerDemandeMaintenanceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
