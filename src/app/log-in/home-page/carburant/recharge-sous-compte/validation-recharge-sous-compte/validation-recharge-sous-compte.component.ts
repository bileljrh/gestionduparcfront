import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-validation-recharge-sous-compte',
  templateUrl: './validation-recharge-sous-compte.component.html',
  styleUrls: ['./validation-recharge-sous-compte.component.scss']
})
export class ValidationRechargeSousCompteComponent  {

  constructor(public dialogRef: MatDialogRef<ValidationRechargeSousCompteComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
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
