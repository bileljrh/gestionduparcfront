import {Component, Inject, OnDestroy} from '@angular/core';
import {ProgrammeEntretiensPreventifs} from '../programme-entretiens-preventifs';
import {Energie} from '../../../parametres-generaux/energie/energie';
import {MarqueVehicule} from '../../../parametres-vehicules/marque-vehicule/marque-vehicule';
import {TypeVehicule} from '../../../parametres-vehicules/type-vehicule/type-vehicule';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReferentielGeneraleServiceService} from '../../../referentiel-generale-service.service';
import {Subscription} from 'rxjs';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-modify-programme-entretien',
  templateUrl: './modify-programme-entretien.component.html',
  styleUrls: ['./modify-programme-entretien.component.scss']
})
export class ModifyProgrammeEntretienComponent implements OnDestroy {

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  subscription: Subscription[] = [];
  modifiedProgramme: ProgrammeEntretiensPreventifs = {
    id: null,
    code: '',
    cycle: '',
    designation: '',
    energie: undefined,
    marque: undefined,
    type: undefined
  };
  ListEnergie: Energie[] = [];
  ListMarqueVehicule: MarqueVehicule[] = [];
  ListTypeVehicule: TypeVehicule[] = [];
  modifiedProgrammeForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    cycle: new FormControl(null, [Validators.required]),
    marque: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    energie: new FormControl(null, [Validators.required]),
  });
  codeMarque = '';
  codeType = '';
  codeEnergie = '';

  constructor(public dialogRef: MatDialogRef<ModifyProgrammeEntretienComponent>, private Referentiel: ReferentielGeneraleServiceService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.subscription.push(this.Referentiel.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListMarqueVehicule = value;
      this.ListMarqueVehicule.forEach(value1 => {
        if (value1.id === data.element.marque.id) {
          this.modifiedProgrammeForm.controls.marque.patchValue(value1);
          value1.types.forEach(value2 => {
            if (value2.id === data.element.type.id) {
              this.modifiedProgrammeForm.controls.type.patchValue(value2);
            }
          });
        }
      });
    }));
    this.modifiedProgrammeForm.controls.code.patchValue(data.element.code);
    this.modifiedProgrammeForm.controls.designation.patchValue(data.element.designation);
    this.modifiedProgrammeForm.controls.cycle.patchValue(data.element.cycle);
    this.subscription.push(this.Referentiel.getListEnergie().subscribe(value => {
      this.ListEnergie = value;
      this.ListEnergie.forEach(value1 => {
        if (value1.id === data.element.energie.id) {
          this.modifiedProgrammeForm.controls.energie.patchValue(value1);
        }
      });
    }));
    this.subscription.push(this.modifiedProgrammeForm.controls.energie.valueChanges.subscribe(value => {
      this.codeEnergie = value.code;
    }));
    this.subscription.push(this.modifiedProgrammeForm.controls.marque.valueChanges.subscribe(value => {
      this.codeMarque = value.code;
      this.codeType = '';
      this.modifiedProgrammeForm.controls.type.reset({eventEmitter: false});
      this.ListTypeVehicule = value.types;
    }));
    this.subscription.push(this.modifiedProgrammeForm.controls.type.valueChanges.subscribe(value => {
      this.codeType = value.code;
    }));
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedProgrammeForm.valid) {
      this.modifiedProgramme = {
        id: this.data.element.id,
        code: this.modifiedProgrammeForm.value.code,
        cycle: this.modifiedProgrammeForm.value.cycle,
        designation: this.modifiedProgrammeForm.value.designation,
        energie: this.modifiedProgrammeForm.value.energie,
        marque: this.modifiedProgrammeForm.value.marque,
        type: this.modifiedProgrammeForm.value.type,
      };
      this.dialogRef.close(this.modifiedProgramme);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}
