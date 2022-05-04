import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-carte-agilis-cash',
  templateUrl: './delete-carte-agilis-cash.component.html',
  styleUrls: ['./delete-carte-agilis-cash.component.scss']
})
export class DeleteCarteAgilisCashComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
