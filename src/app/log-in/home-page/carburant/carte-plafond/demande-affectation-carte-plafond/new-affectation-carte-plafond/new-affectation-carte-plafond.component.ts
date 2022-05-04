import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SelectVehicule } from 'src/app/log-in/home-page/administratif/vehicules/select-vehicule';
import { NouvelleCartePlafond } from '../../../gestion-cartes/gestion-carte-plafond/nouvelle-carte-plafond';
import { CartePlafondServiceService } from '../../carte-plafond-service.service';
import { HistoriqueAffectationCartePlafond } from '../../historique-affectation-carte-plafond/historique-affectation-carte-plafond';

@Component({
  selector: 'app-new-affectation-carte-plafond',
  templateUrl: './new-affectation-carte-plafond.component.html',
  styleUrls: ['./new-affectation-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class NewAffectationCartePlafondComponent implements OnInit {

//********************************************************************************* */

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
historiqueAffectationCartePlafond:HistoriqueAffectationCartePlafond= {
dateAffectation:'',
idVehicule:0,
matriculeBeneficiaire:'',
numeroCarte:'',
montant:0,
numeroPlaque:'', 
nomBeneficiaire:'',
structure:'',
typeCarburant:'',
cartePlafond:null,


};
newDemandeAffectationCartePlafondForm = new FormGroup({
  numeroPlaque: new FormControl(null,Validators.required),
 // cartePlafond: new FormControl(null),
  idVehicule: new FormControl(null),
  structure: new FormControl(null),
  dateAffectation: new FormControl(null,Validators.required),
  numeroCarte: new FormControl(null,Validators.required),
  montant: new FormControl(null),
  nomBeneficiaire: new FormControl(null),
  matriculeBeneficiaire: new FormControl(null),
  typeCarburant: new FormControl(null),
});
get f() { return this.newDemandeAffectationCartePlafondForm.controls; }

snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
snackBarSuccessAddingMsg = 'la demande d\'affectation de carte Plafond sélectionnée a été effectuée avec succés';
snackBarFailureAddingMsg = 'la demande d\'affectation de carte Plafond sélectionnée ne pourra pas être effectuée, réessayez de nouveau s\'il vous plait';

constructor(private CartePlafond: CartePlafondServiceService, private router: Router, 
  public dialog: MatDialog, private snackBar: MatSnackBar,
   private ngxLoader: NgxUiLoaderService,
   public dialogRef: MatDialogRef<NewAffectationCartePlafondComponent>) {
  this.ngxLoader.start();
  CartePlafond.getListVehiculeWithNoCartePlafond().subscribe(value => {
    this.listVehicule = value;
  });
  this.ngxLoader.stop();

  CartePlafond.getListCartePlafondWithNoVehicule().subscribe(value => {
    this.cartePlafondList = value;
  });


  this.ngxLoader.stop();
}

ngOnInit(): void {
  this.newDemandeAffectationCartePlafondForm.controls.numeroPlaque.valueChanges.subscribe(value => {
    console.log("hello test ");
    console.log(this.newDemandeAffectationCartePlafondForm);
    this.codeStructure = value.codeStructure;
    this.designationStructure = value.designationStructure;
    this.nomBeneficiaire = value.nomBeneficiaire;
    this.matriculeBeneficiaire = value.matriculeBeneficiaire;
    this.typeCarburantVehicule = value.typeCarburant;
  });
  this.newDemandeAffectationCartePlafondForm.controls.numeroCarte.valueChanges.subscribe(value => {
    console.log(value);
    this.montant = value.montant;
    this.typeCarburantCarte = value.typeCarburant;
  });
  /*
  this.newDemandeAffectationCartePlafondForm.controls.numeroPlaque.valueChanges.subscribe(value => {
    this.typeCarburantCarte = value.typeCarburant;
    this.montant = value.montant;
    this.dateAjout = value.dateAjout;
  });
  */


}

onConfirmAdding() {
  if (this.newDemandeAffectationCartePlafondForm.valid) {
    this.historiqueAffectationCartePlafond={
    //  dateAffectation:this.newDemandeAffectationCartePlafondForm.value.dateAffectation,
      dateAffectation: moment(this.newDemandeAffectationCartePlafondForm.value.dateAffectation as Date).format('YYYY-MM-DD'),
      idVehicule:this.newDemandeAffectationCartePlafondForm.value.numeroPlaque.id,
      matriculeBeneficiaire:this.newDemandeAffectationCartePlafondForm.value.numeroPlaque.matriculeBeneficiaire,
      montant:this.newDemandeAffectationCartePlafondForm.value.montant,
      nomBeneficiaire:this.newDemandeAffectationCartePlafondForm.value.numeroPlaque.nomBeneficiaire,
      numeroCarte:this.newDemandeAffectationCartePlafondForm.value.numeroCarte.numeroCarte,
      numeroPlaque:this.newDemandeAffectationCartePlafondForm.value.numeroPlaque.numeroPlaque,
      structure:this.designationStructure,
      typeCarburant:this.typeCarburantVehicule,
      cartePlafond:this.newDemandeAffectationCartePlafondForm.value.numeroCarte
    }
    this.dialogRef.close(this.historiqueAffectationCartePlafond);
    console.log("test type carburant");
    console.log(this.historiqueAffectationCartePlafond);
    
  }
  
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
  this.newDemandeAffectationCartePlafondForm.reset({ emitEvent: false });
}

/*

createNewDemandAffectation() {
  // this.CartePlafond.createNewDemandAffectationCartePlafond(this.)

//  console.log(this.newDemandeAffectationCartePlafondForm.value.montant);
  this.historiqueAffectationCartePlafond={
    dateAffectation:this.newDemandeAffectationCartePlafondForm.value.dateAffectation,
    idVehicule:1,
    matriculeBeneficiaire:"matricule test",
    montant:this.newDemandeAffectationCartePlafondForm.value.montant,
    nomBeneficiaire:"nom test",
    numeroCarte:"123",
    numeroPlaque:this.newDemandeAffectationCartePlafondForm.value.numeroPlaque.numeroPlaque,
    structure:this.designationStructure,
    typeCarburant:this.typeCarburantVehicule,
    cartePlafond:this.newDemandeAffectationCartePlafondForm.value.numeroCarte
  }
  console.log("formulaire demande affectation carte plafond");
  console.log(this.historiqueAffectationCartePlafond.cartePlafond);
  
  console.log(this.historiqueAffectationCartePlafond);
  this.ngxLoader.start();
  this.CartePlafond.createNewDemandAffectationCartePlafond(this.historiqueAffectationCartePlafond).subscribe();




}
*/

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
    this.snackBar.open(notification, 'X', { duration: 3000 });
  }, 800);
}

closeDialog(): void {
  this.dialogRef.close();
}


onCancelAdding() {
  this.dialogRef.close();

}

}
