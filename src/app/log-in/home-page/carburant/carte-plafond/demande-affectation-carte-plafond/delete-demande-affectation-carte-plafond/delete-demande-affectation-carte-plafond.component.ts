import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant-service.service';

@Component({
  selector: 'app-delete-demande-affectation-carte-plafond',
  templateUrl: './delete-demande-affectation-carte-plafond.component.html',
  styleUrls: ['./delete-demande-affectation-carte-plafond.component.scss']
})
export class DeleteDemandeAffectationCartePlafondComponent implements OnInit {

  idAffectationCartePlafond: number;

  constructor(public dialogRef: MatDialogRef<DeleteDemandeAffectationCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
    this.idAffectationCartePlafond = data.id;
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
