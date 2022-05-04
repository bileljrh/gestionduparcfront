import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-carte-jocker',
  templateUrl: './delete-carte-jocker.component.html',
  styleUrls: ['./delete-carte-jocker.component.scss']
})
export class DeleteCarteJockerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
    this.dialogRef.close(this.data.idCarte);
  }

}
