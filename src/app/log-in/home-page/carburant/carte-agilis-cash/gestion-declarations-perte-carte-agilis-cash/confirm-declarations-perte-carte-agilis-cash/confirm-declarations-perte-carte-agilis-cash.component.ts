import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarteAgilisCashServiceService} from '../../carte-agilis-cash-service.service';

@Component({
  selector: 'app-confirm-declarations-perte-carte-agilis-cash',
  templateUrl: './confirm-declarations-perte-carte-agilis-cash.component.html',
  styleUrls: ['./confirm-declarations-perte-carte-agilis-cash.component.scss']
})
export class ConfirmDeclarationsPerteCarteAgilisCashComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDeclarationsPerteCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private CarteAgilisCash: CarteAgilisCashServiceService) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelConfirmation() {
    this.dialogRef.close();
  }

  onConfirmConfirmation() {
    this.dialogRef.close(this.data.id);
  }


}
