import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModifyMot2Pass} from '../modify-mot2-pass';

@Component({
  selector: 'app-modify-password-utilisateur',
  templateUrl: './modify-password-utilisateur.component.html',
  styleUrls: ['./modify-password-utilisateur.component.scss']
})
export class ModifyPasswordUtilisateurComponent {
  ModifyMot2Pass: ModifyMot2Pass = {ancienMot2pass: '', id: 0, nouveauMot2pass: ''};
  modifyMot2PasseForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModifyPasswordUtilisateurComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder) {
    this.modifyMot2PasseForm = this.formBuilder.group({
      ancienMot2pass: new FormControl('', Validators.compose([
        Validators.required
      ])),
      nouveauMot2pass: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      repeatNouveauMot2pass: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]))
    }, {
      validators: this.password.bind(this)
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifyMot2PasseForm.valid) {
      this.ModifyMot2Pass = {
        ancienMot2pass: this.modifyMot2PasseForm.value.ancienMot2pass,
        id: this.data.id,
        nouveauMot2pass: this.modifyMot2PasseForm.value.nouveauMot2pass
      };
      this.dialogRef.close(this.ModifyMot2Pass);
    }
  }

  password(formGroup: FormGroup) {
    const {value: password} = formGroup.get('nouveauMot2pass');
    const {value: confirmPassword} = formGroup.get('repeatNouveauMot2pass');
    return password === confirmPassword ? null : {passwordNotMatch: true};
  }

}
