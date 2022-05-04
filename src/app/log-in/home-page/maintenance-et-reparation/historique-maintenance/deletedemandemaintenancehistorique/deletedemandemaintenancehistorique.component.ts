import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintenanceAndReparationServiceService } from '../../maintenance-and-reparation-service.service';

@Component({
  selector: 'app-deletedemandemaintenancehistorique',
  templateUrl: './deletedemandemaintenancehistorique.component.html',
  styleUrls: ['./deletedemandemaintenancehistorique.component.scss']
})
export class DeletedemandemaintenancehistoriqueComponent {

  constructor(public dialogRef: MatDialogRef<DeletedemandemaintenancehistoriqueComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private historique: MaintenanceAndReparationServiceService) {
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
