import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../carburant-service.service';

@Component({
  selector: 'app-delete-distribution-carburant-fonction-vehicule-personnel',
  templateUrl: './delete-distribution-carburant-fonction-vehicule-personnel.component.html',
  styleUrls: ['./delete-distribution-carburant-fonction-vehicule-personnel.component.scss']
})
export class DeleteDistributionCarburantFonctionVehiculePersonnelComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteDistributionCarburantFonctionVehiculePersonnelComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
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
