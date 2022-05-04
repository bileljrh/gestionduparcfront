import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-sous-famille-article',
  templateUrl: './delete-sous-famille-article.component.html',
  styleUrls: ['./delete-sous-famille-article.component.scss']
})
export class DeleteSousFamilleArticleComponent {

  constructor(public dialogRef: MatDialogRef<DeleteSousFamilleArticleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close({id: this.data.id});
    console.log(this.data.id);
    
  }
}
