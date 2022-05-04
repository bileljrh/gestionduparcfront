import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-annulation-carte-plafond',
  templateUrl: './delete-annulation-carte-plafond.component.html',
  styleUrls: ['./delete-annulation-carte-plafond.component.scss']
})
export class DeleteAnnulationCartePlafondComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteAnnulationCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
