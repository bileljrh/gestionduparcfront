import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarteAgilisCashServiceService} from '../../carte-agilis-cash-service.service';

@Component({
  selector: 'app-delete-historique-annulation-carte-agilis-cash',
  templateUrl: './delete-historique-annulation-carte-agilis-cash.component.html',
  styleUrls: ['./delete-historique-annulation-carte-agilis-cash.component.scss']
})
export class DeleteHistoriqueAnnulationCarteAgilisCashComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DeleteHistoriqueAnnulationCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private CarteAgilisCash: CarteAgilisCashServiceService) {
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
