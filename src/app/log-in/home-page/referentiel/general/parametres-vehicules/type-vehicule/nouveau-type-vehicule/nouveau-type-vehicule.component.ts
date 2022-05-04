import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TypeVehicule} from '../type-vehicule';
import {MarqueVehicule} from '../../marque-vehicule/marque-vehicule';
import {ReferentielGeneraleServiceService} from '../../../referentiel-generale-service.service';
import {Subscription} from 'rxjs';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-nouveau-type-vehicule',
  templateUrl: './nouveau-type-vehicule.component.html',
  styleUrls: ['./nouveau-type-vehicule.component.scss']
})
export class NouveauTypeVehiculeComponent implements OnDestroy {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  subscription: Subscription[] = [];
  nouveauType: TypeVehicule = {code: '', marques: null, designation: ''};
  nouveauTypeForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    marque: new FormControl(null, [Validators.required])
  });
  get f() { return this.nouveauTypeForm.controls; }
  ListMarque: MarqueVehicule[] = [];
  codeMarque = '';

  constructor(private Referentiel: ReferentielGeneraleServiceService, public dialogRef: MatDialogRef<NouveauTypeVehiculeComponent>) {
    this.subscription.push(this.Referentiel.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListMarque = value;
    }));
    this.subscription.push(this.nouveauTypeForm.controls.marque.valueChanges.subscribe(value => {
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
    if (this.nouveauTypeForm.valid) {
      this.nouveauType = {
        code: this.nouveauTypeForm.value.code,
        marques: this.nouveauTypeForm.value.marque,
        designation: this.nouveauTypeForm.value.designation
      };
      this.dialogRef.close(this.nouveauType);
    }
  }


}
