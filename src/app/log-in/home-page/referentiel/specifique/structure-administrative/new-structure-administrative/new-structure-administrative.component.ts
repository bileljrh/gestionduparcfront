import {Component, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UGP} from '../../unite-gestion-parc/ugp';
import {Structure} from '../structure';
import {ReferentielSpecifiqueServiceService} from '../../referentiel-specifique-service.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-new-structure-administrative',
  templateUrl: './new-structure-administrative.component.html',
  styleUrls: ['./new-structure-administrative.component.scss']
})
export class NewStructureAdministrativeComponent implements OnDestroy {
  subscription: Subscription[] = [];
  newStructure: Structure = {code: '', collapsed: false, designation: '', square: false, structureMere: '', typeStructure: '', ugp: null};
  newStructureForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    typeStructure: new FormControl(null, Validators.required),
    structureMere: new FormControl(null),
    ugp: new FormControl(null, Validators.required),
  });
  get f() { return this.newStructureForm.controls; }
  ListUGP: UGP[] = [];
  TypeStructure: string[] = ['structure centrale', 'structure régionale'];
  ugpCode = '';

  constructor(public dialogRef: MatDialogRef<NewStructureAdministrativeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Referentiel: ReferentielSpecifiqueServiceService) {
    this.subscription.push(this.Referentiel.getListUGP().subscribe(value => {
      this.ListUGP = value;
      if (!data.structureMere) {
        this.ListUGP.forEach(value1 => {
          if (value1.id === data.element.ugp.id) {
            this.newStructureForm.controls.ugp.patchValue(value1);
            this.ugpCode = value1.code;
          }
        });
      }
    }));
    this.subscription.push(this.newStructureForm.controls.ugp.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.ugpCode = '';
      } else {
        this.ugpCode = value.code;
      }
    }));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newStructureForm.valid) {
      if (this.data.element) {
        this.newStructure = {
          code: this.newStructureForm.value.code,
          designation: this.newStructureForm.value.designation,
          structureMere: this.data.element,
          typeStructure: this.newStructureForm.value.typeStructure,
          ugp: this.newStructureForm.value.ugp
        };
      } else {
        this.newStructure = {
          code: this.newStructureForm.value.code,
          designation: this.newStructureForm.value.designation,
          structureMere: null,
          typeStructure: this.newStructureForm.value.typeStructure,
          ugp: this.newStructureForm.value.ugp
        };
      }
      this.dialogRef.close(this.newStructure);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }


}
