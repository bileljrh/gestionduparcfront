import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MessageApplicatif} from '../message-applicatif';

@Component({
  selector: 'app-new-message-application',
  templateUrl: './new-message-application.component.html',
  styleUrls: ['./new-message-application.component.scss']
})
export class NewMessageApplicationComponent {
  newMessage: MessageApplicatif = {numero: '', code: '', message: ''};
  newMessageForm = new FormGroup({
    numero: new FormControl(null, Validators.required),
    code: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
  });

  get f() { return this.newMessageForm.controls; }
  constructor(public dialogRef: MatDialogRef<NewMessageApplicationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newMessageForm.value) {
      this.newMessage = {
        numero: this.newMessageForm.value.numero,
        code: this.newMessageForm.value.code,
        message: this.newMessageForm.value.message
      };
      this.dialogRef.close(this.newMessage);
    }
  }


}
