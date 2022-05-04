import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarteAgilisCashServiceService} from '../../carte-agilis-cash-service.service';

@Component({
  selector: 'app-delete-annulation-carte-agilis-cash',
  templateUrl: './delete-annulation-carte-agilis-cash.component.html',
  styleUrls: ['./delete-annulation-carte-agilis-cash.component.scss']
})
export class DeleteAnnulationCarteAgilisCashComponent {

  constructor(public dialogRef: MatDialogRef<DeleteAnnulationCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private CarteAgilisCash: CarteAgilisCashServiceService) {
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
