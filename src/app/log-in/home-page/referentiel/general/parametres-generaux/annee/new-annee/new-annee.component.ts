import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Annee} from '../annee';

@Component({
  selector: 'app-new-annee',
  templateUrl: './new-annee.component.html',
  styleUrls: ['./new-annee.component.scss']
})
export class NewAnneeComponent {

  nouvelleAnnee: Annee = {annee: null};
  nouvelleAnneeForm = new FormGroup({
    annee: new FormControl(null, [Validators.required]),
  });
  get f() { return this.nouvelleAnneeForm.controls; }
  constructor(public dialogRef: MatDialogRef<NewAnneeComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouvelleAnneeForm.valid) {
      this.nouvelleAnnee = {
        annee: this.nouvelleAnneeForm.value.annee,
      };
      this.dialogRef.close(this.nouvelleAnnee);
    }
  }


}
