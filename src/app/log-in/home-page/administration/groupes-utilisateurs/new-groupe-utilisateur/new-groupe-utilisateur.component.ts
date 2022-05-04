import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-groupe-utilisateur',
  templateUrl: './new-groupe-utilisateur.component.html',
  styleUrls: ['./new-groupe-utilisateur.component.scss']
})
export class NewGroupeUtilisateurComponent {
  newGoupeUtilisateurForm = new FormGroup({
    profil: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<NewGroupeUtilisateurComponent>) {

  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newGoupeUtilisateurForm.valid) {
      this.dialogRef.close(this.newGoupeUtilisateurForm.value);
    }
  }


}
