import {Component, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OperationReparation} from '../operation-reparation';
import {FamilleOperationReparation} from '../../famille-operation-reparation/famille-operation-reparation';
import {ReferentielGeneraleServiceService} from '../../../referentiel-generale-service.service';
import {Subscription} from 'rxjs';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-modification-operation-reparation',
  templateUrl: './modification-operation-reparation.component.html',
  styleUrls: ['./modification-operation-reparation.component.scss']
})
export class ModificationOperationReparationComponent implements OnDestroy {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  subscription: Subscription[] = [];
  modifiedOperation: OperationReparation = {id: null, code: '', designation: '', familleOperations: null};
  modifiedOperationForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    famille: new FormControl(null, [Validators.required]),
  });
  ListFamillesOperationReparation: FamilleOperationReparation [] = [];
  codeFamille = '';


  constructor(public dialogRef: MatDialogRef<ModificationOperationReparationComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Referentiel: ReferentielGeneraleServiceService) {
    this.modifiedOperationForm.controls.code.setValue(data.element.code);
    this.modifiedOperationForm.controls.designation.setValue(data.element.designation);
    this.subscription.push(this.Referentiel.getListFamilleOperationReparation(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListFamillesOperationReparation = value;
      this.ListFamillesOperationReparation.forEach(value1 => {
        if (value1.id === data.element.familleOperations.id) {
          this.modifiedOperationForm.controls.famille.setValue(value1);
          this.codeFamille = value1.code;
        }
      });
    }));
    this.subscription.push(this.modifiedOperationForm.controls.famille.valueChanges.subscribe(value => {
      this.codeFamille = value.code;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedOperationForm.valid) {
      this.modifiedOperation = {
        id: this.data.element.id,
        code: this.modifiedOperationForm.value.code,
        designation: this.modifiedOperationForm.value.designation,
        familleOperations: this.modifiedOperationForm.value.famille,
      };
      this.dialogRef.close(this.modifiedOperation);
    }
  }

}
