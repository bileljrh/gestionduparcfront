import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant-service.service';

@Component({
  selector: 'app-delete-declaration-perte-carte',
  templateUrl: './delete-declaration-perte-carte.component.html',
  styleUrls: ['./delete-declaration-perte-carte.component.scss']
})
export class DeleteDeclarationPerteCarteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDeclarationPerteCarteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
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
