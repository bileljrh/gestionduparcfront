import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AccompagnonMission} from '../../../accompagnon-mission';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-accompagnons',
  templateUrl: './new-accompagnons.component.html',
  styleUrls: ['./new-accompagnons.component.scss']
})
export class NewAccompagnonsComponent {
  newAccopagnon: AccompagnonMission = {cin: '', nom: '', prenom: ''};
  newAccopagnonForm = new FormGroup({
    cin: new FormControl(null, Validators.required),
    nom: new FormControl(null, Validators.required),
    prenom: new FormControl(null, Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<NewAccompagnonsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newAccopagnonForm.valid) {
      this.newAccopagnon = {
        cin: this.newAccopagnonForm.value.cin,
        nom: this.newAccopagnonForm.value.nom,
        prenom: this.newAccopagnonForm.value.prenom
      };
      this.dialogRef.close(this.newAccopagnon);
    }
  }
}
