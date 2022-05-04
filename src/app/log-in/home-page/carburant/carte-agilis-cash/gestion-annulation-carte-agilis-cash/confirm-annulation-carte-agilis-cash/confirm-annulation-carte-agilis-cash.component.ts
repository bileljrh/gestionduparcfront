import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-annulation-carte-agilis-cash',
  templateUrl: './confirm-annulation-carte-agilis-cash.component.html',
  styleUrls: ['./confirm-annulation-carte-agilis-cash.component.scss']
})
export class ConfirmAnnulationCarteAgilisCashComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmAnnulationCarteAgilisCashComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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

  ngOnInit(): void {
  }


}
