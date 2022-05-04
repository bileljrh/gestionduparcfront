import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarteAgilisCashServiceService} from '../../carte-agilis-cash-service.service';

@Component({
  selector: 'app-delete-historique-declaration-perte-carte-agilis-cash',
  templateUrl: './delete-historique-declaration-perte-carte-agilis-cash.component.html',
  styleUrls: ['./delete-historique-declaration-perte-carte-agilis-cash.component.scss']
})
export class DeleteHistoriqueDeclarationPerteCarteAgilisCashComponent {

  constructor(public dialogRef: MatDialogRef<DeleteHistoriqueDeclarationPerteCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private CarteAgilis: CarteAgilisCashServiceService) {
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
