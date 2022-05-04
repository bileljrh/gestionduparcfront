import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-inventaire-stock-operation',
  templateUrl: './delete-inventaire-stock-operation.component.html',
  styleUrls: ['./delete-inventaire-stock-operation.component.scss']
})
export class DeleteInventaireStockOperationComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DeleteInventaireStockOperationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close(this.data.id);
  }

}
