import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-read-details-historique-perte-carte-jocker',
  templateUrl: './read-details-historique-perte-carte-jocker.component.html',
  styleUrls: ['./read-details-historique-perte-carte-jocker.component.scss']
})
export class ReadDetailsHistoriquePerteCarteJockerComponent  {


  constructor(public dialogRef: MatDialogRef<ReadDetailsHistoriquePerteCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  console.log(data.carteJocker);
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
