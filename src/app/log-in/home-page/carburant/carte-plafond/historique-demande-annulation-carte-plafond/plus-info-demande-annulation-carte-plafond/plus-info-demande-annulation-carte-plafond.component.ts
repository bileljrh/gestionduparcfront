import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-plus-info-demande-annulation-carte-plafond',
  templateUrl: './plus-info-demande-annulation-carte-plafond.component.html',
  styleUrls: ['./plus-info-demande-annulation-carte-plafond.component.scss']
})
export class PlusInfoDemandeAnnulationCartePlafondComponent {


  constructor(public dialogRef: MatDialogRef<PlusInfoDemandeAnnulationCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
