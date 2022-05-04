import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarteAgilisCashServiceService} from '../../carte-agilis-cash-service.service';

@Component({
  selector: 'app-delete-declarations-perte-carte-agilis-cash',
  templateUrl: './delete-declarations-perte-carte-agilis-cash.component.html',
  styleUrls: ['./delete-declarations-perte-carte-agilis-cash.component.scss']
})
export class DeleteDeclarationsPerteCarteAgilisCashComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDeclarationsPerteCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private CarteAgilisCash: CarteAgilisCashServiceService) {
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
