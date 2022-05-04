import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-retou-structure-operation',
  templateUrl: './delete-retou-structure-operation.component.html',
  styleUrls: ['./delete-retou-structure-operation.component.scss']
})
export class DeleteRetouStructureOperationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteRetouStructureOperationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

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
    this.dialogRef.close({id: this.data.id});
   
  }

}
