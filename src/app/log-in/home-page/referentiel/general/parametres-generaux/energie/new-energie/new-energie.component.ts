import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Energie} from '../energie';

@Component({
  selector: 'app-new-energie',
  templateUrl: './new-energie.component.html',
  styleUrls: ['./new-energie.component.scss']
})
export class NewEnergieComponent {

  nouvelleEnergie: Energie = {code: '', description: '', prixUnitaire: null, tva: null};
  nouvelleEnergieForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    prixUnitaire: new FormControl(null),
    tva: new FormControl(null ),
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



  get f() { return this.nouvelleEnergieForm.controls; }
  constructor(public dialogRef: MatDialogRef<NewEnergieComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.nouvelleEnergieForm.valid) {
      this.nouvelleEnergie = {
        code: this.nouvelleEnergieForm.value.code,
        description: this.nouvelleEnergieForm.value.description,
        prixUnitaire: this.nouvelleEnergieForm.value.prixUnitaire,
        tva: this.nouvelleEnergieForm.value.tva
      };
      this.dialogRef.close(this.nouvelleEnergie);
    }
  }

}
