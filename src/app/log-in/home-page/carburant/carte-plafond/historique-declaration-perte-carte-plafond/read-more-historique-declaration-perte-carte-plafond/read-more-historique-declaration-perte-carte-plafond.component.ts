import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-read-more-historique-declaration-perte-carte-plafond',
  templateUrl: './read-more-historique-declaration-perte-carte-plafond.component.html',
  styleUrls: ['./read-more-historique-declaration-perte-carte-plafond.component.scss']
})
export class ReadMoreHistoriqueDeclarationPerteCartePlafondComponent {


  constructor(public dialogRef: MatDialogRef<ReadMoreHistoriqueDeclarationPerteCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  console.log(data.cartePlafond);
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
