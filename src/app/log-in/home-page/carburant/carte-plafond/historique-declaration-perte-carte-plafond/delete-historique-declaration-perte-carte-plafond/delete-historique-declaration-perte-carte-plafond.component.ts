import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant-service.service';

@Component({
  selector: 'app-delete-historique-declaration-perte-carte-plafond',
  templateUrl: './delete-historique-declaration-perte-carte-plafond.component.html',
  styleUrls: ['./delete-historique-declaration-perte-carte-plafond.component.scss']
})
export class DeleteHistoriqueDeclarationPerteCartePlafondComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteHistoriqueDeclarationPerteCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelDelete() {
    this.dialogRef.close();
  }

  onConfirmDelete() {
    this.dialogRef.close(this.data.id);
  }
}
