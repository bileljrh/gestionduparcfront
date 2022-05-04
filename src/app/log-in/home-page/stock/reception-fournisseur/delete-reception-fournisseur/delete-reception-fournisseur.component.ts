import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-reception-fournisseur',
  templateUrl: './delete-reception-fournisseur.component.html',
  styleUrls: ['./delete-reception-fournisseur.component.scss']
})
export class DeleteReceptionFournisseurComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<DeleteReceptionFournisseurComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
