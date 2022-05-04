import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-details-tracabilite',
  templateUrl: './details-tracabilite.component.html',
  styleUrls: ['./details-tracabilite.component.scss']
})
export class DetailsTracabiliteComponent {
  nomPrenom: string;

  constructor(public dialogRef: MatDialogRef<DetailsTracabiliteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nomPrenom = data.element.user.nom + ' ' + data.element.user.prenom;
  }


  closeDialog(): void {
    this.dialogRef.close();
  }


}
