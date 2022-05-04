import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant-service.service';

@Component({
  selector: 'app-delete-historique-perte-carte-jocker',
  templateUrl: './delete-historique-perte-carte-jocker.component.html',
  styleUrls: ['./delete-historique-perte-carte-jocker.component.scss']
})
export class DeleteHistoriquePerteCarteJockerComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DeleteHistoriquePerteCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
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
