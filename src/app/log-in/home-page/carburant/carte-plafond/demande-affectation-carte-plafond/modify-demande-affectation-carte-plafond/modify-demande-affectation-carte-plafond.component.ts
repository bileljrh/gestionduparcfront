import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {VehiculeServiceList} from '../vehicule-service-list';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarburantServiceService} from '../../../carburant-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modify-demande-affectation-carte-plafond',
  templateUrl: './modify-demande-affectation-carte-plafond.component.html',
  styleUrls: ['./modify-demande-affectation-carte-plafond.component.scss']
})
export class ModifyDemandeAffectationCartePlafondComponent implements OnInit {

  modifyAffectationForm = new FormGroup({
    numero_plaque: new FormControl(null),
    matriculeBeneficiaire: new FormControl(null)
  });
  vehiculeServiceList: VehiculeServiceList[] = [];
  nomBeneficiaire = '';
  structure = '';
  typeCarburantVehicule = '';
  matoolipTex: string;
  newIdVehicule: number;
  idVehicule: number;

  constructor(public dialogRef: MatDialogRef<ModifyDemandeAffectationCartePlafondComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Carburant: CarburantServiceService, private router: Router) {
    this.Carburant.getListVehiculesService().subscribe(value => {
      this.vehiculeServiceList = value;
      this.vehiculeServiceList.forEach(value1 => {
        if (value1.idVehicule === data.tabData.idVehicule) {
          this.modifyAffectationForm.controls.matriculeBeneficiaire.patchValue(value1, {eventEmitter: false});
          this.modifyAffectationForm.controls.numero_plaque.patchValue(value1, {eventEmitter: false});
        }
      });
    });
    this.nomBeneficiaire = data.tabData.nomBeneficiaire;
    this.structure = data.tabData.structure;
    this.typeCarburantVehicule = data.tabData.typeCarburantVehicule;
    this.newIdVehicule = data.tabData.idVehicule;
    this.modifyAffectationForm.controls.matriculeBeneficiaire.valueChanges.subscribe(value => {
      this.newIdVehicule = value.idVehicule;
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.structure = value.structure;
      this.typeCarburantVehicule = value.typeCarburant;
      this.idVehicule = value.idVehicule;
      this.modifyAffectationForm.controls.numero_plaque.patchValue(value, {emitEvent: false});
    });
    this.modifyAffectationForm.controls.numero_plaque.valueChanges.subscribe(value => {
      this.idVehicule = value.idVehicule;
      this.newIdVehicule = value.idVehicule;
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.structure = value.structure;
      this.typeCarburantVehicule = value.typeCarburant;
      this.modifyAffectationForm.controls.matriculeBeneficiaire.patchValue(value, {emitEvent: false});
    });
    this.matoolipTex = 'Vous devez sélectionner une véhicule de source de carburant ' + data.tabData.typeCarburantCarte;
  }

  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  onCancelModification() {
    this.dialogRef.close();
  }

  onConfirmModification() {
    if ((this.isCadAndVehiculeHasSameSourceCarburant() && (this.data.tabData.idVehicule !== this.newIdVehicule))) {
      this.Carburant.modifySelectedAffectationCartePlafond(this.data.tabData.idCartePlafond, this.newIdVehicule).subscribe(value => {
        this.router.navigate(['/carburant/affectation_des_cartes']);
      });

    }
  }

  isCadAndVehiculeHasSameSourceCarburant(): boolean {
    if (this.data.tabData.typeCarburantCarte === this.typeCarburantVehicule) {
      return true;
    } else {
      return false;
    }
  }
}
