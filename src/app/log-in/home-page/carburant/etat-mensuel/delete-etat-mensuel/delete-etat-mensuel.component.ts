import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../carburant-service.service';

@Component({
  selector: 'app-delete-etat-mensuel',
  templateUrl: './delete-etat-mensuel.component.html',
  styleUrls: ['./delete-etat-mensuel.component.scss']
})
export class DeleteEtatMensuelComponent implements OnInit {

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
    this.Carburant.deleteOneEtatMensuels(this.data.idEtatMensuel).subscribe(value => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

}
