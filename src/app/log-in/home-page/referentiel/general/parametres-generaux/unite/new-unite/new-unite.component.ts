import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Unite} from '../unite';

@Component({
  selector: 'app-new-unite',
  templateUrl: './new-unite.component.html',
  styleUrls: ['./new-unite.component.scss']
})
export class NewUniteComponent {

  nouvelleUnite: Unite = {unite: null};
  nouvelleUniteForm = new FormGroup({
    unite: new FormControl(null, [Validators.required]),
  });
  get f() { return this.nouvelleUniteForm.controls; }
  constructor(public dialogRef: MatDialogRef<NewUniteComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouvelleUniteForm.valid) {
      this.nouvelleUnite = {
        unite: this.nouvelleUniteForm.value.unite,
      };
      this.dialogRef.close(this.nouvelleUnite);
    }
  }


}
