import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant/carburant-service.service';

@Component({
  selector: 'app-delete-bon-travail',
  templateUrl: './delete-bon-travail.component.html',
  styleUrls: ['./delete-bon-travail.component.scss']
})
export class DeleteBonTravailComponent {


  constructor(public dialogRef: MatDialogRef<DeleteBonTravailComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
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
