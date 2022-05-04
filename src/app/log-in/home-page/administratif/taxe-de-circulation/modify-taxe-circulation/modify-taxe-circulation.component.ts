import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratifServiceService} from '../../administratif-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';
import {TaxeCirculationTableData} from '../taxe-circulation-table-data';

@Component({
  selector: 'app-modify-taxe-circulation',
  templateUrl: './modify-taxe-circulation.component.html',
  styleUrls: ['./modify-taxe-circulation.component.scss']
})
export class ModifyTaxeCirculationComponent implements OnInit {
  parPlacesOuPoids: boolean;
  ParPoidsOuPlaces: string[] = ['Par poids', 'Par places'];
  modifiedTaxeCirculationForm = new FormGroup({
    numeroQuittance: new FormControl(null, Validators.required),
    montant: new FormControl(null, Validators.required),
    parPoidsOuPlaces: new FormControl('Par places'),
    poids: new FormControl(null),
    nombrePlaces: new FormControl(null),
    dateDebutCirculation: new FormControl(null, Validators.required),
    dateFinCirculation: new FormControl(null, Validators.required),
    dateFinValidite: new FormControl(null, Validators.required)
  });
  modifiedTaxeCirculation: TaxeCirculationTableData = {
    id: null,
    numeroQuittance: '',
    parPoids: false,
    poids: 0,
    parPlace: null,
    nombrePlaces: 0,
    dateDebutCirculation: '',
    dateFinCirculation: '',
    montant: 0,
    dateFinValidite: ''
  };

  constructor(private Administratif: AdministratifServiceService, public dialogRef: MatDialogRef<ModifyTaxeCirculationComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.patchInitialValues();
  }

  ngOnInit(): void {
    this.modifiedTaxeCirculationForm.controls.parPoidsOuPlaces.valueChanges.subscribe(rez => {
      if (rez === 'Par poids') {
        this.parPlacesOuPoids = false;
        this.modifiedTaxeCirculationForm.controls.nombrePlaces.patchValue(0);
        this.modifiedTaxeCirculationForm.controls.nombrePlaces.disable();
        this.modifiedTaxeCirculationForm.controls.poids.enable();
        this.modifiedTaxeCirculationForm.controls.poids.setValue(null);
      } else {
        this.parPlacesOuPoids = true;
        this.modifiedTaxeCirculationForm.controls.poids.patchValue(0);
        this.modifiedTaxeCirculationForm.controls.poids.disable();
        this.modifiedTaxeCirculationForm.controls.nombrePlaces.enable();
        this.modifiedTaxeCirculationForm.controls.nombrePlaces.setValue(null);
      }
    });
  }

  onConfirm() {
    if (this.modifiedTaxeCirculationForm.valid) {
      this.patchFinalValues();
      this.dialogRef.close(this.modifiedTaxeCirculation);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  patchInitialValues() {
    this.modifiedTaxeCirculationForm.controls.numeroQuittance.patchValue(this.data.element.numeroQuittance);
    this.modifiedTaxeCirculationForm.controls.montant.patchValue(this.data.element.montant);
    this.modifiedTaxeCirculationForm.controls.parPoidsOuPlaces.patchValue(this.data.element.parPoidsOuPlaces);
    this.modifiedTaxeCirculationForm.controls.dateDebutCirculation.patchValue(this.data.element.dateDebutCirculation);
    this.modifiedTaxeCirculationForm.controls.dateFinCirculation.patchValue(this.data.element.dateFinCirculation);
    this.modifiedTaxeCirculationForm.controls.dateFinValidite.patchValue(this.data.element.dateFinValidite);
    if (this.data.element.parPlace) {
      this.modifiedTaxeCirculationForm.controls.poids.disable();
      this.parPlacesOuPoids = false;
      this.modifiedTaxeCirculationForm.controls.parPoidsOuPlaces.patchValue('Par places');
      this.modifiedTaxeCirculationForm.controls.nombrePlaces.patchValue(this.data.element.nombrePlaces);
    } else {
      this.modifiedTaxeCirculationForm.controls.nombrePlaces.disable();
      this.parPlacesOuPoids = true;
      this.modifiedTaxeCirculationForm.controls.parPoidsOuPlaces.patchValue('Par poids');
      this.modifiedTaxeCirculationForm.controls.poids.patchValue(this.data.element.poids);
    }
  }

  patchFinalValues() {
    this.modifiedTaxeCirculation.id = this.data.element.id;
    this.modifiedTaxeCirculation.numeroQuittance = this.modifiedTaxeCirculationForm.value.numeroQuittance;
    this.modifiedTaxeCirculation.dateDebutCirculation = moment(this.modifiedTaxeCirculationForm.value.dateDebutCirculation as Date).format('YYYY-MM-DD');
    this.modifiedTaxeCirculation.dateFinCirculation = moment(this.modifiedTaxeCirculationForm.value.dateFinCirculation as Date).format('YYYY-MM-DD');
    this.modifiedTaxeCirculation.dateFinValidite = moment(this.modifiedTaxeCirculationForm.value.dateFinValidite as Date).format('YYYY-MM-DD');
    this.modifiedTaxeCirculation.montant = this.modifiedTaxeCirculationForm.value.montant;
    if (this.modifiedTaxeCirculationForm.value.parPoidsOuPlaces === 'Par poids') {
      this.modifiedTaxeCirculation.poids = this.modifiedTaxeCirculationForm.value.poids;
      this.modifiedTaxeCirculation.nombrePlaces = 0;
      this.modifiedTaxeCirculation.parPoids = true;
      this.modifiedTaxeCirculation.parPlace = false;
    } else {
      this.modifiedTaxeCirculation.nombrePlaces = this.modifiedTaxeCirculationForm.value.nombrePlaces;
      this.modifiedTaxeCirculation.poids = 0;
      this.modifiedTaxeCirculation.parPoids = false;
      this.modifiedTaxeCirculation.parPlace = true;
    }
  }

}
