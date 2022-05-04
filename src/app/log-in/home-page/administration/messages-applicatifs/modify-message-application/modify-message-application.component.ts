import {Component, Inject} from '@angular/core';
import {MessageApplicatif} from '../message-applicatif';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modify-message-application',
  templateUrl: './modify-message-application.component.html',
  styleUrls: ['./modify-message-application.component.scss']
})
export class ModifyMessageApplicationComponent {

  modifiedMessage: MessageApplicatif = {id: null, numero: '', code: '', message: ''};
  modifiedMessageForm = new FormGroup({
    numero: new FormControl(null, Validators.required),
    code: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<ModifyMessageApplicationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedMessageForm.controls.numero.patchValue(data.element.numero);
    this.modifiedMessageForm.controls.code.patchValue(data.element.code);
    this.modifiedMessageForm.controls.message.patchValue(data.element.message);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedMessageForm.value) {
      this.modifiedMessage = {
        id: this.data.element.id,
        numero: this.modifiedMessageForm.value.numero,
        code: this.modifiedMessageForm.value.code,
        message: this.modifiedMessageForm.value.message
      };
      this.dialogRef.close(this.modifiedMessage);
    }
  }


}
