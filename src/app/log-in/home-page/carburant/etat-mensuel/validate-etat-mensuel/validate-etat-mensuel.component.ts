import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../carburant-service.service';

@Component({
  selector: 'app-validate-etat-mensuel',
  templateUrl: './validate-etat-mensuel.component.html',
  styleUrls: ['./validate-etat-mensuel.component.scss']
})
export class ValidateEtatMensuelComponent implements OnInit {
  isValid: boolean;
  idEtatMensuel: number;

  constructor(public dialogRef: MatDialogRef<ValidateEtatMensuelComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
    this.isValid = data.isValid;
    this.idEtatMensuel = data.idEtatMensuel;
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
    if (this.isValid) {
      this.Carburant.unvalidateOneEtatMensuels(this.idEtatMensuel).subscribe(value => {
        window.location.reload();
      });
    } else {
      this.Carburant.validateOneEtatMensuels(this.idEtatMensuel).subscribe(value => {
        window.location.reload();
      });
    }
    this.dialogRef.close();
  }

}
