import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-plus-info-historique-affectation-carte-plafond',
  templateUrl: './plus-info-historique-affectation-carte-plafond.component.html',
  styleUrls: ['./plus-info-historique-affectation-carte-plafond.component.scss']
})
export class PlusInfoHistoriqueAffectationCartePlafondComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PlusInfoHistoriqueAffectationCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  closeDialog() {

  }
}
