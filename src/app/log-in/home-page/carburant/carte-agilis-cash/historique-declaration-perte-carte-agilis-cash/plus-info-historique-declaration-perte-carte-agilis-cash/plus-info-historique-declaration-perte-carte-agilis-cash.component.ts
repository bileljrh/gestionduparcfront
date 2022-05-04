import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-plus-info-historique-declaration-perte-carte-agilis-cash',
  templateUrl: './plus-info-historique-declaration-perte-carte-agilis-cash.component.html',
  styleUrls: ['./plus-info-historique-declaration-perte-carte-agilis-cash.component.scss']
})
export class PlusInfoHistoriqueDeclarationPerteCarteAgilisCashComponent {

  constructor(public dialogRef: MatDialogRef<PlusInfoHistoriqueDeclarationPerteCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
