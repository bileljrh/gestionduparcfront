import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant-service.service';
import { DeleteDeclarationPerteCarteComponent } from '../../../carte-plafond/gestion-declaration-perte-carte/delete-declaration-perte-carte/delete-declaration-perte-carte.component';

@Component({
  selector: 'app-delete-perte-carte',
  templateUrl: './delete-perte-carte.component.html',
  styleUrls: ['./delete-perte-carte.component.scss']
})
export class DeletePerteCarteComponent implements OnInit {


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

