import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TVA } from 'src/app/log-in/home-page/referentiel/general/parametres-generaux/tva/tva';

@Component({
  selector: 'app-modification-quantie-article-bon-commande',
  templateUrl: './modification-quantie-article-bon-commande.component.html',
  styleUrls: ['./modification-quantie-article-bon-commande.component.scss']
})
export class ModificationQuantieArticleBonCommandeComponent implements OnInit {
  max: number= null;
  min: number= null;
  prix: null;
  remise: null;
  fraisTimbre: null;
  tva: null


  quantiteForm = new FormGroup({
    quantiteCommande: new FormControl(null, [Validators.required, Validators.min(this.min)]),
    quantiteRecue: new FormControl(null, [Validators.required, Validators.max(this.max), Validators.min(0)]),
    quantiteRestante: new FormControl(null),
    prix: new FormControl(null,  [Validators.required, Validators.min(this.min)]),
    remise: new FormControl(null,  [Validators.required, Validators.max(this.max), Validators.min(0)]),
    tva: new FormControl(null, Validators.required),
    fraisTimbre: new FormControl(null, Validators.required),
    remisePourcentage: new FormControl(null),



  });
  nouvelArticleForm: any;
  ReferentielGenerale: any;
  subscriptions: any;
  get f() { return this.nouvelArticleForm.controls; }
  listTVA: TVA[] = [];


  remisepourcentageForm: any;

  constructor(public dialogRef: MatDialogRef<ModificationQuantieArticleBonCommandeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.quantiteForm.controls.quantiteCommande.patchValue(data.element.quantiteCommandee);
    this.quantiteForm.controls.quantiteRecue.patchValue(data.element.quantiteLivree);
  }

  ngOnInit(): void {
    this.quantiteForm.controls.quantiteCommande.valueChanges.subscribe(value => {
      this.max = value;
      this.quantiteForm.controls.quantiteRestante.patchValue(value - this.quantiteForm.controls.quantiteRecue.value);
    });
    this.quantiteForm.controls.quantiteRecue.valueChanges.subscribe(value => {
      this.min = value;
      this.quantiteForm.controls.quantiteRestante.patchValue(this.quantiteForm.controls.quantiteCommande.value - value);
    });

    this.remisepourcentageForm.controls.prix.valueChanges.subscribe(value => {
      this.max = value;
      this.remisepourcentageForm.controls.remise.patchValue(value - this.remisepourcentageForm.controls.remise.value);
    });
    this.remisepourcentageForm.controls.remise.valueChanges.subscribe(value => {
      this.min = value;
      this.quantiteForm.controls.remisePourcentage.patchValue(this.quantiteForm.controls.prix.value - value);
    });
    this.subscriptions.push(this.ReferentielGenerale.getListTva().subscribe(value => {
      this.listTVA = value;
    }));






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
      console.log("formulaire de quantité ! ");
      console.log(this.quantiteForm.value);
      tva: this.nouvelArticleForm.value.tva;




    }


  }


}
