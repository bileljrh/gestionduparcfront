import {Component, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TypeVehicule} from '../type-vehicule';
import {MarqueVehicule} from '../../marque-vehicule/marque-vehicule';
import {ReferentielGeneraleServiceService} from '../../../referentiel-generale-service.service';
import {Subscription} from 'rxjs';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-modification-type-vehicule',
  templateUrl: './modification-type-vehicule.component.html',
  styleUrls: ['./modification-type-vehicule.component.scss']
})
export class ModificationTypeVehiculeComponent implements OnDestroy {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  subscription: Subscription[] = [];
  modifiedType: TypeVehicule = {id: null, code: '', marques: null, designation: ''};
  modifiedTypeForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    marque: new FormControl(null, [Validators.required])
  });
  ListMarque: MarqueVehicule[] = [];
  codeMarque = '';

  constructor(public dialogRef: MatDialogRef<ModificationTypeVehiculeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Referentiel: ReferentielGeneraleServiceService) {
    this.subscription.push(this.Referentiel.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListMarque = value;
      this.ListMarque.forEach(value1 => {
        if (value1.designation === data.marque) {
          this.modifiedTypeForm.controls.marque.patchValue(value1);
        }
      });
    }));
    this.modifiedTypeForm.controls.code.setValue(data.element.code);
    this.modifiedTypeForm.controls.designation.setValue(data.element.designation);
    this.subscription.push(this.modifiedTypeForm.controls.marque.valueChanges.subscribe(value => {
      this.codeMarque = value.code;
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
    if (this.modifiedTypeForm.valid) {
      this.modifiedType = {
        id: this.data.element.id,
        code: this.modifiedTypeForm.value.code,
        marques: this.modifiedTypeForm.value.marque,
        designation: this.modifiedTypeForm.value.designation
      };
      this.dialogRef.close(this.modifiedType);
    }
  }


}
