import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../carburant-service.service';
import {DeleteEtatMensuelComponent} from '../../etat-mensuel/delete-etat-mensuel/delete-etat-mensuel.component';

@Component({
  selector: 'app-delete-distribution-carburant-fonction',
  templateUrl: './delete-distribution-carburant-fonction.component.html',
  styleUrls: ['./delete-distribution-carburant-fonction.component.scss']
})
export class DeleteDistributionCarburantFonctionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEtatMensuelComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
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
    this.Carburant.deleteOneDistributionCarburant2Fonction(this.data.idEtatMensuel).subscribe(value => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

}
