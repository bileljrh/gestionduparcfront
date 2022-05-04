import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password-utilisateur',
  templateUrl: './reset-password-utilisateur.component.html',
  styleUrls: ['./reset-password-utilisateur.component.scss']
})
export class ResetPasswordUtilisateurComponent {
  resetMot2PasseForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ResetPasswordUtilisateurComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder) {
    this.resetMot2PasseForm = this.formBuilder.group({
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
    if (this.resetMot2PasseForm.valid) {
      this.dialogRef.close({mot2pass: this.resetMot2PasseForm.value.nouveauMot2pass, id: this.data.id});
    }
  }

  password(formGroup: FormGroup) {
    const {value: password} = formGroup.get('nouveauMot2pass');
    const {value: confirmPassword} = formGroup.get('repeatNouveauMot2pass');
    return password === confirmPassword ? null : {passwordNotMatch: true};
  }

}
