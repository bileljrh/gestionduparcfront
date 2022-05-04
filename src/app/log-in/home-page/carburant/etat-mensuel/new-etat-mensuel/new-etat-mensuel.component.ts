import {Component, OnInit} from '@angular/core';
import {ListBeneficiairesInternes} from '../../list-beneficiaires-internes';
import {FormControl, FormGroup} from '@angular/forms';
import {CarburantServiceService} from '../../carburant-service.service';
import {MonthsAnsYearsClass} from '../../MonthsAnsYearsClass';
import {ListMonthsAndYears} from '../../list-months-and-years';
import {NewEtatMensuel} from './new-etat-mensuel';
import {Router} from '@angular/router';


@Component({
  selector: 'app-new-etat-mensuel',
  templateUrl: './new-etat-mensuel.component.html',
  styleUrls: ['./new-etat-mensuel.component.scss']
})
export class NewEtatMensuelComponent implements OnInit {
  typeCarburant = '';
  nomBeneficiaire = '';
  structure = '';
  listBeneficiairesInternes: ListBeneficiairesInternes[] = [];
  newEtatMensuelForm = new FormGroup({
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
    etatMensuel: new FormControl(),
    moisEtat: new FormControl()
  });
  newEtatMensuel: NewEtatMensuel = {
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
    valide: null,
    moisEtat: null
  };
  idBeneficiaire: number;
  etatMensuel: string[] = ['Brouillon', 'Confirmé', 'Validé'];
  listMonthsAndYears: ListMonthsAndYears[] = [];

  constructor(private Carburant: CarburantServiceService, private monthsAnsYearsClass: MonthsAnsYearsClass, private route: Router) {
    this.newEtatMensuelForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.newEtatMensuelForm.controls.numero_plaque.setValue(value1, {emitEvent: false});
          this.newEtatMensuelForm.controls.pourcentageVehicule.setValue(value1.pourcentageVehicule);
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.typeCarburant = value1.typeCarburant;
          this.structure = value1.structure;
          this.idBeneficiaire = value1.idBeneficiaire;
        }
      });
    });
    this.newEtatMensuelForm.controls.numero_plaque.valueChanges.subscribe(value => {
      this.listBeneficiairesInternes.forEach(value1 => {
        if (value1 === value) {
          this.nomBeneficiaire = value1.nomBeneficiaire;
          this.newEtatMensuelForm.controls.matriculeBeneficiaire.setValue(value1, {emitEvent: false});
          this.newEtatMensuelForm.controls.pourcentageVehicule.setValue(value1.pourcentageVehicule);
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
    });
    this.listMonthsAndYears = this.monthsAnsYearsClass.getListMonthsAndYears();
  }


  onConfirm() {
    this.newEtatMensuel.idBeneficiaire = this.idBeneficiaire;
    this.newEtatMensuel.quantiteRestantee = this.newEtatMensuelForm.value.quantiteRestantee;
    this.newEtatMensuel.quantiteDemandee = this.newEtatMensuelForm.value.quantiteDemandee;
    this.newEtatMensuel.quantiteAccordee = this.newEtatMensuelForm.value.quantiteAccordee;
    this.newEtatMensuel.quantiteCarburant = this.newEtatMensuelForm.value.quantiteCarburant;
    this.newEtatMensuel.quantiteRetournee = this.newEtatMensuelForm.value.quantiteRetournee;
    this.newEtatMensuel.indexFinMois = this.newEtatMensuelForm.value.indexFinMois;
    this.newEtatMensuel.indexFinMoisPrecedant = this.newEtatMensuelForm.value.indexFinMoisPrecedant;
    this.newEtatMensuel.nombreHeuresTravail = this.newEtatMensuelForm.value.nombreHeuresTravail;
    this.newEtatMensuel.distanceParcourus = this.newEtatMensuelForm.value.distanceParcourus;
    this.newEtatMensuel.pourcentageConsommation = this.newEtatMensuelForm.value.pourcentageConsommation;
    this.newEtatMensuel.jourOuvrables = this.newEtatMensuelForm.value.jourOuvrables;
    this.newEtatMensuel.jours2Production = this.newEtatMensuelForm.value.jours2Production;
    this.newEtatMensuel.jours2Dispense = this.newEtatMensuelForm.value.jours2Dispense;
    this.newEtatMensuel.jours2Repos = this.newEtatMensuelForm.value.jours2Repos;
    this.newEtatMensuel.moisEtat = this.newEtatMensuelForm.value.moisEtat;
    if (this.newEtatMensuelForm.value.etatMensuel === 'Validé') {
      this.newEtatMensuel.brouillon = false;
      this.newEtatMensuel.confirme = false;
      this.newEtatMensuel.valide = true;
    } else if (this.newEtatMensuelForm.value.etatMensuel === 'Confirmé') {
      this.newEtatMensuel.brouillon = false;
      this.newEtatMensuel.confirme = true;
      this.newEtatMensuel.valide = false;
    } else {
      this.newEtatMensuel.brouillon = true;
      this.newEtatMensuel.confirme = false;
      this.newEtatMensuel.valide = false;
    }
    this.Carburant.createNewEtatMensuel(this.newEtatMensuel).subscribe(value => {
      this.route.navigate(['carburant', 'etat_mensuel_(16_auto)']);
    });
  }

  onDeny() {
    this.newEtatMensuelForm.reset();
    this.route.navigate(['carburant', 'etat_mensuel_(16_auto)']);
  }
}
