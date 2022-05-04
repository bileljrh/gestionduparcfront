import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-historique-regulation',
  templateUrl: './delete-historique-regulation.component.html',
  styleUrls: ['./delete-historique-regulation.component.scss']
})
export class DeleteHistoriqueRegulationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteHistoriqueRegulationComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

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
