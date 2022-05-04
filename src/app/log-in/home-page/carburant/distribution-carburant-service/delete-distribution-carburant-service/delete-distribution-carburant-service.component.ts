import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../carburant-service.service';

@Component({
  selector: 'app-delete-distribution-carburant-service',
  templateUrl: './delete-distribution-carburant-service.component.html',
  styleUrls: ['./delete-distribution-carburant-service.component.scss']
})
export class DeleteDistributionCarburantServiceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDistributionCarburantServiceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
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
    this.Carburant.deleteOneDistributionCarburant2Service(this.data.idEtatMensuel).subscribe(value => {
      this.dialogRef.close();
      window.location.reload();
    });
  }
}
