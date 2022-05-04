import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modification-quantite-bon-travail',
  templateUrl: './modification-quantite-bon-travail.component.html',
  styleUrls: ['./modification-quantite-bon-travail.component.scss']
})
export class ModificationQuantiteBonTravailComponent implements OnInit {

  max: number;
  min: number;
  quantiteForm = new FormGroup({
    quantiteCommande: new FormControl(null, [Validators.required]),//, Validators.min(this.min)
    quantiteRecue: new FormControl(null, [Validators.required, Validators.min(0)]),//Validators.max(this.max),
    quantiteRestante: new FormControl(null),
    quantiteStock: new FormControl(null)
  });
  constructor(public dialogRef: MatDialogRef<ModificationQuantiteBonTravailComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.quantiteForm.controls.quantiteCommande.patchValue(data.element.quantite);
    this.quantiteForm.controls.quantiteRecue.patchValue(data.element.quantiteLivree);
    this.quantiteForm.controls.quantiteStock.patchValue(data.element.articles.quantiteStock);
    this.quantiteForm.controls.quantiteRestante.patchValue((data.element.quantite) - (data.element.quantiteLivree));
  }

  ngOnInit(): void {
    this.quantiteForm.controls.quantiteCommande.valueChanges.subscribe(value => {
      this.max = value;
      this.quantiteForm.controls.quantiteRestante.patchValue(value - this.quantiteForm.controls.quantiteLivree.value);
    });
    this.quantiteForm.controls.quantiteRecue.valueChanges.subscribe(value => {
      this.min = value;
      this.quantiteForm.controls.quantiteRestante.patchValue(this.quantiteForm.controls.quantite.value - value);
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.quantiteForm.valid) {
      this.dialogRef.close(this.quantiteForm.value);
      console.log("formulaire de quantité");
      console.log(this.quantiteForm.value);
    }

  }
}