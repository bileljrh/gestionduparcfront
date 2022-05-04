import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-historique-affectation-carte-plafond',
  templateUrl: './delete-historique-affectation-carte-plafond.component.html',
  styleUrls: ['./delete-historique-affectation-carte-plafond.component.scss']
})
export class DeleteHistoriqueAffectationCartePlafondComponent implements OnInit {
  idHistorique: number;

  constructor(public dialogRef: MatDialogRef<DeleteHistoriqueAffectationCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idHistorique = data.idHistorique;
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
