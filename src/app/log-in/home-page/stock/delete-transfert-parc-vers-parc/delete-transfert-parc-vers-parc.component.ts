import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-transfert-parc-vers-parc',
  templateUrl: './delete-transfert-parc-vers-parc.component.html',
  styleUrls: ['./delete-transfert-parc-vers-parc.component.scss']
})
export class DeleteTransfertParcVersParcComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTransfertParcVersParcComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

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
