import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../carburant-service.service';
import {ListBeneficiairesInternes} from '../../list-beneficiaires-internes';
import {FormControl, FormGroup} from '@angular/forms';
import {ModifyEtatMensuel} from './modify-etat-mensuel';

@Component({
  selector: 'app-modify-etat-mensuel',
  templateUrl: './modify-etat-mensuel.component.html',
  styleUrls: ['./modify-etat-mensuel.component.scss']
})
export class ModifyEtatMensuelComponent implements OnInit {
  typeCarburant: string;
  nomBeneficiaire: string;
  structure: string;
  listBeneficiairesInternes: ListBeneficiairesInternes[] = [];
  modifyEtatMensuelForm = new FormGroup({
    numero_plaque: new FormControl(),
    matriculeBeneficiaire: new FormControl(),
    quantiteDemandee: new FormControl(),
    quantiteAccordee: new FormControl(),
    quantiteRestantee: new FormControl(),
    quantiteRetournee: new FormControl(),
    indexFinMois: new FormControl(),
    indexFinMoisPrecedant: new FormControl(),
    quantiteCarburant: new FormControl(),
    distanceParcourus: new FormControl(),
    nombreHeuresTravail: new FormControl(),
    pourcentageConsommation: new FormControl(),
    jourOuvrables: new FormControl(),
    jours2Dispense: new FormControl(),
    jours2Production: new FormControl(),
    jours2Repos: new FormControl(),
    pourcentageVehicule: new FormControl(),
    etatMensuel: new FormControl()
  });
  modifyEtatMensuel: ModifyEtatMensuel = {
    idEtatMensuel: null,
    idBeneficiaire: null,
    quantiteRestantee: null,
    quantiteDemandee: null,
    quantiteAccordee: null,
    quantiteCarburant: null,
    quantiteRetournee: null,
    indexFinMois: null,
    indexFinMoisPrecedant: null,
    nombreHeuresTravail: null,
    distanceParcourus: null,
    pourcentageConsommation: null,
    jourOuvrables: null,
    jours2Production: null,
    jours2Dispense: null,
    jours2Repos: null,
    brouillon: null,
    confirme: null,
    valide: null
  };
  idBeneficiaire: number;
  etatMensuel: string[] = ['Brouillon', 'Confirmé', 'Validé'];

  constructor(public dialogRef: MatDialogRef<ModifyEtatMensuelComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService) {
    this.modifyEtatMensuelForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.modifyEtatMensuelForm.controls.numero_plaque.setValue(value1, {emitEvent: false});
          this.modifyEtatMensuelForm.controls.pourcentageVehicule.setValue(value1.pourcentageVehicule);
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.typeCarburant = value1.typeCarburant;
          this.structure = value1.structure;
          this.idBeneficiaire = value1.idBeneficiaire;
        }
      });
    });
    this.modifyEtatMensuelForm.controls.numero_plaque.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.modifyEtatMensuelForm.controls.matriculeBeneficiaire.setValue(value1, {emitEvent: false});
          this.modifyEtatMensuelForm.controls.pourcentageVehicule.setValue(value1.pourcentageVehicule);
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.typeCarburant = value1.typeCarburant;
          this.structure = value1.structure;
          this.idBeneficiaire = value1.idBeneficiaire;
        }
      });
    });
  }

  ngOnInit(): void {
    this.Carburant.getListBeneficiairesInternes().subscribe(data => {
      this.listBeneficiairesInternes = data;
      this.listBeneficiairesInternes.forEach(value => {
        if (value.numero_plaque === this.data.etatMensuelRowData.numero_plaque) {
          this.modifyEtatMensuelForm.controls.matriculeBeneficiaire.setValue(value);
        }
      });
    });
    this.modifyEtatMensuelForm.controls.quantiteDemandee.patchValue(this.data.etatMensuelRowData.quantiteDemandee);
    this.modifyEtatMensuelForm.controls.quantiteAccordee.patchValue(this.data.etatMensuelRowData.quantiteAccordee);
    this.modifyEtatMensuelForm.controls.quantiteRestantee.patchValue(this.data.etatMensuelRowData.quantiteRestantee);
    this.modifyEtatMensuelForm.controls.quantiteRetournee.patchValue(this.data.etatMensuelRowData.quantiteRetournee);
    this.modifyEtatMensuelForm.controls.indexFinMois.patchValue(this.data.etatMensuelRowData.indexFinMois);
    this.modifyEtatMensuelForm.controls.indexFinMoisPrecedant.patchValue(this.data.etatMensuelRowData.indexFinMoisPrecedant);
    this.modifyEtatMensuelForm.controls.quantiteCarburant.patchValue(this.data.etatMensuelRowData.quantiteCarburant);
    this.modifyEtatMensuelForm.controls.distanceParcourus.patchValue(this.data.etatMensuelRowData.distanceParcourus);
    this.modifyEtatMensuelForm.controls.nombreHeuresTravail.patchValue(this.data.etatMensuelRowData.nombreHeuresTravail);
    this.modifyEtatMensuelForm.controls.pourcentageConsommation.patchValue(this.data.etatMensuelRowData.pourcentageConsommation);
    this.modifyEtatMensuelForm.controls.jourOuvrables.patchValue(this.data.etatMensuelRowData.jourOuvrables);
    this.modifyEtatMensuelForm.controls.jours2Dispense.patchValue(this.data.etatMensuelRowData.jours2Dispense);
    this.modifyEtatMensuelForm.controls.jours2Production.patchValue(this.data.etatMensuelRowData.jours2Production);
    this.modifyEtatMensuelForm.controls.jours2Repos.patchValue(this.data.etatMensuelRowData.jours2Repos);
    this.modifyEtatMensuelForm.controls.pourcentageVehicule.patchValue(this.data.etatMensuelRowData.pourcentageVehicule);
    if ((this.data.etatMensuelRowData.valide) && !(this.data.etatMensuelRowData.confirme)) {
      this.modifyEtatMensuelForm.controls.etatMensuel.patchValue('Validé');
    } else if (!(this.data.etatMensuelRowData.valide) && (this.data.etatMensuelRowData.confirme)) {
      this.modifyEtatMensuelForm.controls.etatMensuel.patchValue('Confirmé');
    } else {
      this.modifyEtatMensuelForm.controls.etatMensuel.patchValue('Brouillon');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  onCancelModification() {
    this.dialogRef.close();
  }

  onConfirmModification() {
    this.modifyEtatMensuel.idEtatMensuel = this.data.etatMensuelRowData.idEtatMensuel;
    this.modifyEtatMensuel.idBeneficiaire = this.idBeneficiaire;
    this.modifyEtatMensuel.quantiteRestantee = this.modifyEtatMensuelForm.value.quantiteRestantee;
    this.modifyEtatMensuel.quantiteDemandee = this.modifyEtatMensuelForm.value.quantiteDemandee;
    this.modifyEtatMensuel.quantiteAccordee = this.modifyEtatMensuelForm.value.quantiteAccordee;
    this.modifyEtatMensuel.quantiteCarburant = this.modifyEtatMensuelForm.value.quantiteCarburant;
    this.modifyEtatMensuel.quantiteRetournee = this.modifyEtatMensuelForm.value.quantiteRetournee;
    this.modifyEtatMensuel.indexFinMois = this.modifyEtatMensuelForm.value.indexFinMois;
    this.modifyEtatMensuel.indexFinMoisPrecedant = this.modifyEtatMensuelForm.value.indexFinMoisPrecedant;
    this.modifyEtatMensuel.nombreHeuresTravail = this.modifyEtatMensuelForm.value.nombreHeuresTravail;
    this.modifyEtatMensuel.distanceParcourus = this.modifyEtatMensuelForm.value.distanceParcourus;
    this.modifyEtatMensuel.pourcentageConsommation = this.modifyEtatMensuelForm.value.pourcentageConsommation;
    this.modifyEtatMensuel.jourOuvrables = this.modifyEtatMensuelForm.value.jourOuvrables;
    this.modifyEtatMensuel.jours2Production = this.modifyEtatMensuelForm.value.jours2Production;
    this.modifyEtatMensuel.jours2Dispense = this.modifyEtatMensuelForm.value.jours2Dispense;
    this.modifyEtatMensuel.jours2Repos = this.modifyEtatMensuelForm.value.jours2Repos;
    if (this.modifyEtatMensuelForm.value.etatMensuel === 'Validé') {
      this.modifyEtatMensuel.brouillon = false;
      this.modifyEtatMensuel.confirme = false;
      this.modifyEtatMensuel.valide = true;
    } else if (this.modifyEtatMensuelForm.value.etatMensuel === 'Confirmé') {
      this.modifyEtatMensuel.brouillon = false;
      this.modifyEtatMensuel.confirme = true;
      this.modifyEtatMensuel.valide = false;
    } else {
      this.modifyEtatMensuel.brouillon = true;
      this.modifyEtatMensuel.confirme = false;
      this.modifyEtatMensuel.valide = false;
    }
    this.Carburant.modifyOneEtatMensuels(this.modifyEtatMensuel).subscribe(value => {
      window.location.reload();
    });
  }

}
