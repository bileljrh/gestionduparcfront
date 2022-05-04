import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant-service.service';
import { ConfirmationDeclarationPerteCarteComponent } from '../../../carte-plafond/gestion-declaration-perte-carte/confirmation-declaration-perte-carte/confirmation-declaration-perte-carte.component';

@Component({
  selector: 'app-confirmation-perte-carte',
  templateUrl: './confirmation-perte-carte.component.html',
  styleUrls: ['./confirmation-perte-carte.component.scss']
})
export class ConfirmationPerteCarteComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ConfirmationDeclarationPerteCarteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
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
    this.dialogRef.close(this.data.id);
  }

}
