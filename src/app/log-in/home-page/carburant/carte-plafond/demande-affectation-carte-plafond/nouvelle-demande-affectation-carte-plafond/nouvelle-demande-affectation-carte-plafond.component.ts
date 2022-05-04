import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {CartePlafondServiceService} from '../../carte-plafond-service.service';
import {NouvelleCartePlafond} from '../../../gestion-cartes/gestion-carte-plafond/nouvelle-carte-plafond';
import {SelectVehicule} from '../../../../administratif/vehicules/select-vehicule';

@Component({
  selector: 'app-nouvelle-demande-affectation-carte-plafond',
  templateUrl: './nouvelle-demande-affectation-carte-plafond.component.html',
  styleUrls: ['./nouvelle-demande-affectation-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class NouvelleDemandeAffectationCartePlafondComponent implements OnInit {
  cartePlafondList: NouvelleCartePlafond[] = [];
  listVehicule: SelectVehicule[] = [];
  nomBeneficiaire = '';
  matriculeBeneficiaire = '';
  codeStructure = '';
  designationStructure = '';
  typeCarburantVehicule = '';
  typeCarburantCarte = '';
  montant = 0;
  dateAjout = '';
  newDemandeAffectationCartePlafondForm = new FormGroup({
    numeroPlaque: new FormControl(null),
    cartePlafond: new FormControl(null),
  });
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccessAddingMsg = 'la demande d\'affectation de carte Plafond sélectionnée a été effectuée avec succés';
  snackBarFailureAddingMsg = 'la demande d\'affectation de carte Plafond sélectionnée ne pourra pas être effectuée, réessayez de nouveau s\'il vous plait';

  constructor(private CartePlafond: CartePlafondServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    CartePlafond.getListVehiculeWithNoCartePlafond().subscribe(value => {
      this.listVehicule = value;
    });
    this.ngxLoader.stop();

    CartePlafond.getListCartePlafond().subscribe(value => {
      this.cartePlafondList = value;
    });
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.newDemandeAffectationCartePlafondForm.controls.numeroPlaque.valueChanges.subscribe(value => {
      console.log(value);
      this.codeStructure = value.codeStructure;
      this.designationStructure = value.designationStructure;
      this.nomBeneficiaire = value.nomBeneficiaire;
      this.matriculeBeneficiaire = value.matriculeBeneficiaire;
      this.typeCarburantVehicule = value.typeCarburant;
    });
    this.newDemandeAffectationCartePlafondForm.controls.cartePlafond.valueChanges.subscribe(value => {
      this.typeCarburantCarte = value.typeCarburant;
      this.montant = value.montant;
      this.dateAjout = value.dateAjout;
    });
  }

  denyCreatingNewDemandAffectation() {
    this.nomBeneficiaire = '';
    this.matriculeBeneficiaire = '';
    this.codeStructure = '';
    this.designationStructure = '';
    this.typeCarburantVehicule = '';
    this.typeCarburantCarte = '';
    this.montant = 0;
    this.dateAjout = '';
    this.newDemandeAffectationCartePlafondForm.reset({emitEvent: false});
  }

  createNewDemandAffectation() {
    this.ngxLoader.start();
  }

  isSameEnergy(): boolean {
    if ((this.newDemandeAffectationCartePlafondForm.value.numeroPlaque === null) 
    || (this.newDemandeAffectationCartePlafondForm.value.numeroPlaque === undefined) 
    || (this.newDemandeAffectationCartePlafondForm.value.cartePlafond === null) 
    || (this.newDemandeAffectationCartePlafondForm.value.cartePlafond === undefined)) {
      return false;
    } else {
    }
  }

  showNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }
}


