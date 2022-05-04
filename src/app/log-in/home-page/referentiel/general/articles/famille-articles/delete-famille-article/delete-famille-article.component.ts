import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-famille-article',
  templateUrl: './delete-famille-article.component.html',
  styleUrls: ['./delete-famille-article.component.scss']
})
export class DeleteFamilleArticleComponent {

  constructor(public dialogRef: MatDialogRef<DeleteFamilleArticleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

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
