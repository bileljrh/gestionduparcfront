   import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratifServiceService} from '../../administratif-service.service';
import moment from 'moment';
import {MatDialogRef} from '@angular/material/dialog';
import {TaxeCirculation} from '../taxe-circulation';
import {SelectVehicule} from '../../vehicules/select-vehicule';

@Component({
  selector: 'app-new-taxe-de-circulation',
  templateUrl: './new-taxe-de-circulation.component.html',
  styleUrls: ['./new-taxe-de-circulation.component.scss']
})
export class NewTaxeDeCirculationComponent implements OnInit {
  parPlacesOuPoids: boolean;
  ListVehicules: SelectVehicule[] = [];
  ParPoidsOuPlaces: string[] = ['Par poids', 'Par places'];
  newTaxeCirculationForm = new FormGroup({
    numeroQuittance: new FormControl(null, Validators.required),
    montant: new FormControl(null, Validators.required),
    numeroPlaque: new FormControl(null, Validators.required),
    parPoidsOuPlaces: new FormControl('Par places'),
    poids: new FormControl(null),
    nombrePlaces: new FormControl(null),
    dateDebutCirculation: new FormControl(null, Validators.required),
    dateFinCirculation: new FormControl(null, Validators.required),
    dateFinValidite: new FormControl(null, Validators.required)
  });
  get f() { return this.newTaxeCirculationForm.controls; }

  newTaxeCirculation: TaxeCirculation = {
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

  constructor(private Administratif: AdministratifServiceService, public dialogRef: MatDialogRef<NewTaxeDeCirculationComponent>) {
    this.Administratif.getSelectVehiculeByStrucutureForTaxeCirculation().subscribe(value => {
      this.ListVehicules = value;
    });
  }

  ngOnInit(): void {
    this.parPlacesOuPoids = true;
    this.newTaxeCirculationForm.controls.poids.disable();
    this.newTaxeCirculationForm.controls.nombrePlaces.enable();
    this.newTaxeCirculationForm.controls.parPoidsOuPlaces.valueChanges.subscribe(rez => {
      if (rez === 'Par poids') {
        this.parPlacesOuPoids = false;
        this.newTaxeCirculationForm.controls.nombrePlaces.patchValue(0);
        this.newTaxeCirculationForm.controls.nombrePlaces.disable();
        this.newTaxeCirculationForm.controls.poids.enable();
        this.newTaxeCirculationForm.controls.poids.setValue(null);
      } else {
        this.parPlacesOuPoids = true;
        this.newTaxeCirculationForm.controls.poids.patchValue(0);
        this.newTaxeCirculationForm.controls.poids.disable();
        this.newTaxeCirculationForm.controls.nombrePlaces.enable();
        this.newTaxeCirculationForm.controls.nombrePlaces.setValue(null);
      }
    });
  }

  onConfirm() {
    if (this.newTaxeCirculationForm.valid) {
      this.newTaxeCirculation.numeroQuittance = this.newTaxeCirculationForm.value.numeroQuittance;
      this.newTaxeCirculation.dateDebutCirculation = moment(this.newTaxeCirculationForm.value.dateDebutCirculation as Date).format('YYYY-MM-DD');
      this.newTaxeCirculation.dateFinCirculation = moment(this.newTaxeCirculationForm.value.dateFinCirculation as Date).format('YYYY-MM-DD');
      this.newTaxeCirculation.dateFinValidite = moment(this.newTaxeCirculationForm.value.dateFinValidite as Date).format('YYYY-MM-DD');
      this.newTaxeCirculation.montant = this.newTaxeCirculationForm.value.montant;
      if (this.newTaxeCirculationForm.value.parPoidsOuPlaces === 'Par poids') {
        this.newTaxeCirculation.poids = this.newTaxeCirculationForm.value.poids;
        this.newTaxeCirculation.nombrePlaces = 0;
        this.newTaxeCirculation.parPoids = true;
        this.newTaxeCirculation.parPlace = false;
      } else {
        this.newTaxeCirculation.nombrePlaces = this.newTaxeCirculationForm.value.nombrePlaces;
        this.newTaxeCirculation.poids = 0;
        this.newTaxeCirculation.parPoids = false;
        this.newTaxeCirculation.parPlace = true;
      }
      this.dialogRef.close({newTaxeCirculation: this.newTaxeCirculation, id: this.newTaxeCirculationForm.value.numeroPlaque.id});
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
  validateDateDebutDateFin(group : FormGroup): any{
    let valid = true;
     if (this.newTaxeCirculationForm.controls.dateDebutValidite < this.newTaxeCirculationForm .controls.dateDebutValidite) {
      valid = false;
    }
     
    return valid;
    }

}
