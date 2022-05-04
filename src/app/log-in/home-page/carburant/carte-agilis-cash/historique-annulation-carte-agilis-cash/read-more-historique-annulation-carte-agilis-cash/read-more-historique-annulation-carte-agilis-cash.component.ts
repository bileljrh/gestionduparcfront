import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-read-more-historique-annulation-carte-agilis-cash',
  templateUrl: './read-more-historique-annulation-carte-agilis-cash.component.html',
  styleUrls: ['./read-more-historique-annulation-carte-agilis-cash.component.scss']
})
export class ReadMoreHistoriqueAnnulationCarteAgilisCashComponent {

  constructor(public dialogRef: MatDialogRef<ReadMoreHistoriqueAnnulationCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
