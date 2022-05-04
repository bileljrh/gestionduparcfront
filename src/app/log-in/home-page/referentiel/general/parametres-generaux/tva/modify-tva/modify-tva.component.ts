import {Component, Inject} from '@angular/core';
import {TVA} from '../tva';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modify-tva',
  templateUrl: './modify-tva.component.html',
  styleUrls: ['./modify-tva.component.scss']
})
export class ModifyTvaComponent {

  modifiedTva: TVA = {id: null, tva: null};
  modifiedTvaForm = new FormGroup({
    tva: new FormControl(null, [Validators.required]),
  });

  // prix  réel avec 6 chiffre après la virgule
private regex: RegExp = new RegExp(/^\d*\.?\d{0,6}$/g);
private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
numberOnly(event): boolean {
 let value = event.target.value;
    if (this.specialKeys.indexOf(event.key) !== -1) {
    return;
  }
  let current: string = value;
  const position = event.target.selectionStart;
  const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
  if (next && !String(next).match(this.regex)) {
    event.preventDefault();
  }
}

  constructor(public dialogRef: MatDialogRef<ModifyTvaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedTvaForm.controls.tva.patchValue(data.element.tva);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedTvaForm.valid) {
      this.modifiedTva = {
        id: this.data.element.id,
        tva: this.modifiedTvaForm.value.tva,
      };
      this.dialogRef.close(this.modifiedTva);
    }
  }

}
