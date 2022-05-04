import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant-service.service';

@Component({
  selector: 'app-confirmation-declaration-perte-carte',
  templateUrl: './confirmation-declaration-perte-carte.component.html',
  styleUrls: ['./confirmation-declaration-perte-carte.component.scss']
})
export class ConfirmationDeclarationPerteCarteComponent implements OnInit {

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
