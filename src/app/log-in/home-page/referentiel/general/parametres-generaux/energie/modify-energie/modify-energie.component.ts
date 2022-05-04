import {Component, Inject} from '@angular/core';
import {Energie} from '../energie';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modify-energie',
  templateUrl: './modify-energie.component.html',
  styleUrls: ['./modify-energie.component.scss']
})
export class ModifyEnergieComponent {

  modifiedEnergie: Energie = {id: null, code: '', description: '', prixUnitaire: 0, tva: 0};
  modifiedEnergieForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    prixUnitaire: new FormControl(null),
    tva: new FormControl(null),
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

  constructor(public dialogRef: MatDialogRef<ModifyEnergieComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifiedEnergieForm.controls.code.patchValue(data.element.code);
    this.modifiedEnergieForm.controls.description.patchValue(data.element.description);
    this.modifiedEnergieForm.controls.prixUnitaire.patchValue(data.element.prixUnitaire);
    this.modifiedEnergieForm.controls.tva.patchValue(data.element.tva);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedEnergieForm.valid) {
      this.modifiedEnergie = {
        id: this.data.element.id,
        code: this.modifiedEnergieForm.value.code,
        description: this.modifiedEnergieForm.value.description,
        prixUnitaire: this.modifiedEnergieForm.value.prixUnitaire,
        tva: this.modifiedEnergieForm.value.tva
      };
      this.dialogRef.close(this.modifiedEnergie);
    }
  }

}
