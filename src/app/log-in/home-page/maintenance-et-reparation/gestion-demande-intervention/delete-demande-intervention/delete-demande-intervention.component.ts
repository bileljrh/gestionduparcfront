import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant/carburant-service.service';

@Component({
  selector: 'app-delete-demande-intervention',
  templateUrl: './delete-demande-intervention.component.html',
  styleUrls: ['./delete-demande-intervention.component.scss']
})
export class DeleteDemandeInterventionComponent {


  constructor(public dialogRef: MatDialogRef<DeleteDemandeInterventionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
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
