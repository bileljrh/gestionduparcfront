import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-validate-demande-affectation-carte-plafond',
  templateUrl: './validate-demande-affectation-carte-plafond.component.html',
  styleUrls: ['./validate-demande-affectation-carte-plafond.component.scss']
})
export class ValidateDemandeAffectationCartePlafondComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ValidateDemandeAffectationCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelValidation() {
    this.dialogRef.close();
  }

  onConfirmValidation() {
    this.dialogRef.close(this.data.id);
  }


}
