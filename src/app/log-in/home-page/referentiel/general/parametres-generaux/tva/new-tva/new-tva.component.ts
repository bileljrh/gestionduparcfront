import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TVA} from '../tva';

@Component({
  selector: 'app-new-tva',
  templateUrl: './new-tva.component.html',
  styleUrls: ['./new-tva.component.scss']
})
export class NewTvaComponent {

  nouvelleTva: TVA = {tva: null};
  nouvelleTvaForm = new FormGroup({
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

  get f() { return this.nouvelleTvaForm.controls; }
  constructor(public dialogRef: MatDialogRef<NewTvaComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouvelleTvaForm.valid) {
      this.nouvelleTva = {
        tva: this.nouvelleTvaForm.value.tva,
      };
      this.dialogRef.close(this.nouvelleTva);
    }
  }


}
