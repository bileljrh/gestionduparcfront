import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface consommation {
  id: number,
  index_avant_fin_mois: number,
  qte_reservoir_avant: number,
  qte_reservoir: number,
  index_fin_mois: number

}
@Component({
  selector: 'app-calculate-consommation',
  templateUrl: './calculate-consommation.component.html',
  styleUrls: ['./calculate-consommation.component.scss']
})
export class CalculateConsommationComponent implements OnInit {

  consom: consommation;

  private id: number;

  quantiteForm = new FormGroup({
    index_avant_fin_mois: new FormControl(null, [Validators.required]),
    qte_reservoir_avant: new FormControl(null, [Validators.required, Validators.min(0)]),
    qte_reservoir: new FormControl(null, [Validators.required]),
    index_fin_mois: new FormControl(null, [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<CalculateConsommationComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.quantiteForm.controls.qte_reservoir.patchValue(data.element.qte_reservoir);
    this.quantiteForm.controls.qte_reservoir_avant.patchValue(data.element.qte_reservoir_avant);
    this.quantiteForm.controls.index_fin_mois.patchValue(data.element.index_fin_mois);
    this.quantiteForm.controls.index_avant_fin_mois.patchValue(data.element.index_avant_fin_mois);
    console.log("l id");
    console.log(data.element.id);

    this.id = data.element.id;

  }

  ngOnInit(): void {
    /*   this.quantiteForm.controls.quantiteCommande.valueChanges.subscribe(value => {
        this.quantiteForm.controls.quantiteRestante.patchValue(value - this.quantiteForm.controls.quantiteRecue.value);
      });
      this.quantiteForm.controls.quantiteRecue.valueChanges.subscribe(value => {
        this.quantiteForm.controls.quantiteRestante.patchValue(this.quantiteForm.controls.quantiteCommande.value - value);
      }); */
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.quantiteForm.valid) {
      this.consom = {
        id: this.data.element.id,
        index_avant_fin_mois: this.quantiteForm.value.index_avant_fin_mois,
        qte_reservoir_avant: this.quantiteForm.value.qte_reservoir_avant,
        qte_reservoir: this.quantiteForm.value.qte_reservoir,
        index_fin_mois: this.quantiteForm.value.index_fin_mois
      }

      this.dialogRef.close(this.consom);
    }
    console.log("log !");
    console.log(this.consom);


  }



}
