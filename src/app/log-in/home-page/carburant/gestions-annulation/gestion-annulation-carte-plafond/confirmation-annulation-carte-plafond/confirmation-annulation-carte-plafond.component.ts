import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant-service.service';

@Component({
  selector: 'app-confirmation-annulation-carte-plafond',
  templateUrl: './confirmation-annulation-carte-plafond.component.html',
  styleUrls: ['./confirmation-annulation-carte-plafond.component.scss']
})
export class ConfirmationAnnulationCartePlafondComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationAnnulationCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
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
    this.dialogRef.close(this.data.idHistorique);
  }

}
