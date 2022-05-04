import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../carburant-service.service';

@Component({
  selector: 'app-confirm-etat-mensuel',
  templateUrl: './confirm-etat-mensuel.component.html',
  styleUrls: ['./confirm-etat-mensuel.component.scss']
})
export class ConfirmEtatMensuelComponent implements OnInit {
  isConfirm: boolean;
  idEtatMensuel: number;

  constructor(public dialogRef: MatDialogRef<ConfirmEtatMensuelComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
    this.isConfirm = data.isConfirm;
    this.idEtatMensuel = data.idEtatMensuel;
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  onCancelConfirmation() {
    this.dialogRef.close();
  }

  onConfirmConfirmation() {
    if (this.isConfirm) {
      this.Carburant.unconfirmOneEtatMensuels(this.idEtatMensuel).subscribe(value => {
        window.location.reload();
      });
    } else {
      this.Carburant.confirmOneEtatMensuels(this.idEtatMensuel).subscribe(value => {
        window.location.reload();
      });
    }
    this.dialogRef.close();
  }

}
