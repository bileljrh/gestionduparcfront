import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {OperationReparation} from '../operation-reparation';
import {ReferentielGeneraleServiceService} from '../../../referentiel-generale-service.service';
import {FamilleOperationReparation} from '../../famille-operation-reparation/famille-operation-reparation';
import {Subscription} from 'rxjs';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';

@Component({
  selector: 'app-nouvelle-operation-reparation',
  templateUrl: './nouvelle-operation-reparation.component.html',
  styleUrls: ['./nouvelle-operation-reparation.component.scss']
})
export class NouvelleOperationReparationComponent implements OnDestroy {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  subscription: Subscription[] = [];
  ListFamillesOperationReparation: FamilleOperationReparation [] = [];
  codeFamille = '';
  nouvelleOperation: OperationReparation = {code: '', designation: '', familleOperations: null};
  nouvelleOperationForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    famille: new FormControl(null, [Validators.required]),
  });
  get f() { return this.nouvelleOperationForm.controls; }
  constructor(public dialogRef: MatDialogRef<NouvelleOperationReparationComponent>, private Referentiel: ReferentielGeneraleServiceService) {
    this.subscription.push(this.Referentiel.getListFamilleOperationReparation(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListFamillesOperationReparation = value;
    }));
    this.subscription.push(this.nouvelleOperationForm.controls.famille.valueChanges.subscribe(value => {
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
    if (this.nouvelleOperationForm.valid) {
      this.nouvelleOperation = {
        code: this.nouvelleOperationForm.value.code,
        designation: this.nouvelleOperationForm.value.designation,
        familleOperations: this.nouvelleOperationForm.value.famille,
      };
      this.dialogRef.close(this.nouvelleOperation);
    }
  }


}
