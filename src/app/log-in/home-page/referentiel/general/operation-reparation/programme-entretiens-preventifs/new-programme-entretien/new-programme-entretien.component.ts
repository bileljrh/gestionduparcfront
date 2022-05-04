import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Energie} from '../../../parametres-generaux/energie/energie';
import {MarqueVehicule} from '../../../parametres-vehicules/marque-vehicule/marque-vehicule';
import {TypeVehicule} from '../../../parametres-vehicules/type-vehicule/type-vehicule';
import {ProgrammeEntretiensPreventifs} from '../programme-entretiens-preventifs';
import {ReferentielGeneraleServiceService} from '../../../referentiel-generale-service.service';
import {Subscription} from 'rxjs';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-new-programme-entretien',
  templateUrl: './new-programme-entretien.component.html',
  styleUrls: ['./new-programme-entretien.component.scss']
})
export class NewProgrammeEntretienComponent implements OnDestroy {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  subscription: Subscription[] = [];
  nouveauProgramme: ProgrammeEntretiensPreventifs = {
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
  nouveauProgrammeForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    cycle: new FormControl(null, [Validators.required]),
    marque: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    energie: new FormControl(null, [Validators.required]),
  });
  get f() { return this.nouveauProgrammeForm.controls; }
  
  codeMarque = '';
  codeType = '';
  codeEnergie = '';

  constructor(public dialogRef: MatDialogRef<NewProgrammeEntretienComponent>, private Referentiel: ReferentielGeneraleServiceService) {


    this.subscription.push(this.Referentiel.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListMarqueVehicule = value;
    }));
    this.subscription.push(this.Referentiel.getListEnergie().subscribe(value => {
      this.ListEnergie = value;
    }));
    this.subscription.push(this.nouveauProgrammeForm.controls.energie.valueChanges.subscribe(value => {
      this.codeEnergie = value.code;
    }));
    this.subscription.push(this.nouveauProgrammeForm.controls.marque.valueChanges.subscribe(value => {
      this.codeMarque = value.code;
      this.codeType = '';
      this.nouveauProgrammeForm.controls.type.reset({eventEmitter: false});
      this.ListTypeVehicule = value.types;
    }));
    this.subscription.push(this.nouveauProgrammeForm.controls.type.valueChanges.subscribe(value => {
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
    if (this.nouveauProgrammeForm.valid) {
      this.nouveauProgramme = {
        code: this.nouveauProgrammeForm.value.code,
        cycle: this.nouveauProgrammeForm.value.cycle,
        designation: this.nouveauProgrammeForm.value.designation,
        energie: this.nouveauProgrammeForm.value.energie,
        marque: this.nouveauProgrammeForm.value.marque,
        type: this.nouveauProgrammeForm.value.type,
      };
      this.dialogRef.close(this.nouveauProgramme);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}
