import {Component, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';



@Component({

  selector: 'app-delete-assurance',

  templateUrl: './delete-assurance.component.html',

  styleUrls: ['./delete-assurance.component.scss']

})

export class DeleteAssuranceComponent {




  constructor(public dialogRef: MatDialogRef<DeleteAssuranceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {



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