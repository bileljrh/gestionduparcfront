import {Component, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Structure} from '../structure';
import {UGP} from '../../unite-gestion-parc/ugp';
import {ReferentielSpecifiqueServiceService} from '../../referentiel-specifique-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-modify-structure-administrative',
  templateUrl: './modify-structure-administrative.component.html',
  styleUrls: ['./modify-structure-administrative.component.scss']
})
export class ModifyStructureAdministrativeComponent implements OnDestroy {
  subscription: Subscription[] = [];
  modifiedStructure: Structure = {
    id: null,
    code: '',
    collapsed: false,
    designation: '',
    square: false,
    structureMere: '',
    typeStructure: '',
    ugp: null
  };
  modifiedStructureForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    typeStructure: new FormControl(null, Validators.required),
    structureMere: new FormControl(null),
    ugp: new FormControl(null, Validators.required)
  });
  ListUGP: UGP[] = [];
  TypeStructure: string[] = ['structure centrale', 'structure régionale'];
  structureMere: string;
  ugpCode = '';

  constructor(public dialogRef: MatDialogRef<ModifyStructureAdministrativeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Referentiel: ReferentielSpecifiqueServiceService) {
    if (data.parent !== undefined) {
      this.structureMere = data.parent.designation;
    }
    this.subscription.push(this.Referentiel.getListUGP().subscribe(value => {
      this.ListUGP = value;
      if (data.element.ugp !== null) {
        this.ListUGP.forEach(value1 => {
          if (value1.id === data.element.ugp.id) {
            this.modifiedStructureForm.controls.ugp.patchValue(value1);
            this.ugpCode = value1.code;
          }
        });
      }
    }));
    this.modifiedStructureForm.controls.code.patchValue(data.element.code);
    this.modifiedStructureForm.controls.designation.patchValue(data.element.designation);
    this.modifiedStructureForm.controls.typeStructure.patchValue(data.element.typeStructure);
    this.modifiedStructureForm.controls.ugp.patchValue(data.element.ugp);
    this.subscription.push(this.modifiedStructureForm.controls.ugp.valueChanges.subscribe(value => {
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
    if (this.modifiedStructureForm.valid) {
      this.modifiedStructure = {
        id: this.data.element.id,
        code: this.modifiedStructureForm.value.code,
        designation: this.modifiedStructureForm.value.designation,
        structureMere: null,
        typeStructure: this.modifiedStructureForm.value.typeStructure,
        ugp: this.modifiedStructureForm.value.ugp
      };
      this.dialogRef.close(this.modifiedStructure);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }


}
