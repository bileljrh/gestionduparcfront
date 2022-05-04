import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {ModificationDemandeDesaffectationCarteJocker} from '../modification-demande-desaffectation-carte-jocker';
import moment from 'moment';
import { HistoriqueDesaffectationCarteJocker } from '../../historique-desaffectation-carte-jocker/historique-desaffectation-carte-jocker';

@Component({
  selector: 'app-modify-demande-desaffectation-carte-jocker',
  templateUrl: './modify-demande-desaffectation-carte-jocker.component.html',
  styleUrls: ['./modify-demande-desaffectation-carte-jocker.component.scss']
})
export class ModifyDemandeDesaffectationCarteJockerComponent implements OnInit {
  modifyDemandeDesaffectationForm = new FormGroup({
    soldeDesaffectation: new FormControl(),
    dateDemandeDesaffectation: new FormControl(),
    note: new FormControl()
  });
  modificationDemandeDesaffectation: HistoriqueDesaffectationCarteJocker = {
    id: null,
    soldeDesaffectation: null,
    dateDemandeDesaffectation: '',
    note: ''
  };

  constructor(public dialogRef: MatDialogRef<ModifyDemandeDesaffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifyDemandeDesaffectationForm.controls.soldeDesaffectation.patchValue(data.demandeDesaffectation.soldeDesaffectation);
    this.modifyDemandeDesaffectationForm.controls.dateDemandeDesaffectation.patchValue(data.demandeDesaffectation.dateDemandeDesaffectation);
    this.modifyDemandeDesaffectationForm.controls.note.patchValue(data.demandeDesaffectation.note);
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onCancelModification() {
    this.dialogRef.close();
  }

  onConfirmModification() {
    const dateDemandeDesaffectation = moment(this.modifyDemandeDesaffectationForm.value.dateDemandeDesaffectation as Date);
    this.modifyDemandeDesaffectationForm.controls.dateDemandeDesaffectation.setValue(dateDemandeDesaffectation.format('YYYY-MM-DD'));
    this.modificationDemandeDesaffectation = {
      id: this.data.demandeDesaffectation.id,
      soldeDesaffectation: this.modifyDemandeDesaffectationForm.value.soldeDesaffectation,
      dateDemandeDesaffectation: this.modifyDemandeDesaffectationForm.value.dateDemandeDesaffectation,
      note: this.modifyDemandeDesaffectationForm.value.note
    };
    console.log("desaffectation test");
    console.log(this.modificationDemandeDesaffectation);
    
    this.dialogRef.close(this.modificationDemandeDesaffectation);
  }


}
