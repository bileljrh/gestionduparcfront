import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-regulation-stock-operation',
  templateUrl: './delete-regulation-stock-operation.component.html',
  styleUrls: ['./delete-regulation-stock-operation.component.scss']
})
export class DeleteRegulationStockOperationComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<DeleteRegulationStockOperationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

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
    this.dialogRef.close( {id: this.data.id});
   
  }
}
