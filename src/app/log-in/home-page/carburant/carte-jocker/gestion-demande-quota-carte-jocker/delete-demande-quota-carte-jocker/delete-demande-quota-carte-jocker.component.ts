import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-demande-quota-carte-jocker',
  templateUrl: './delete-demande-quota-carte-jocker.component.html',
  styleUrls: ['./delete-demande-quota-carte-jocker.component.scss']
})
export class DeleteDemandeQuotaCarteJockerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDemandeQuotaCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
