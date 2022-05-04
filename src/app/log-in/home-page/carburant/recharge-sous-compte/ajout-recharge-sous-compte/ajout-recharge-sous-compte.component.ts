import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { CarburantServiceService } from '../../carburant-service.service';
import { RechargeSousCompte } from '../RechargeSousCompte';

@Component({
  selector: 'app-ajout-recharge-sous-compte',
  templateUrl: './ajout-recharge-sous-compte.component.html',
  styleUrls: ['./ajout-recharge-sous-compte.component.scss'],
  providers: [MatSnackBar]
})
export class AjoutRechargeSousCompteComponent implements OnInit {

  demandeRechargeSousCompte: RechargeSousCompte[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  demandeRecharge: RechargeSousCompte = new RechargeSousCompte();
  carburantList: string[] = ['essence', 'gazole',  'huile végétale', 'biodiesel', 'bioéthanol', 'algocarburant', 'biogaz'];
  demandeRechargeSousCompteList: RechargeSousCompte[] = [];
  etatCarteActuel: string;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };

  demandeRechargeSousCompteForm = new FormGroup({
    'typeCarburantForm': new FormControl(null, Validators.required),
    'demandeurForm': new FormControl(null, Validators.required),
    'quantiteDemandeForm': new FormControl(null, Validators.required), 
    'numCarteForm': new FormControl(null, Validators.required), 
  });
  get f() { return this.demandeRechargeSousCompteForm.controls; }

  numCarte: number ; 
  itemPerPage = new FormControl(null);
  @ViewChild(MatSort) sort: MatSort;
  constructor( private Carburant: CarburantServiceService ,
     private router: Router, private snackBar: MatSnackBar,
      private ngxLoader: NgxUiLoaderService, 
      public dialogRef: MatDialogRef< AjoutRechargeSousCompteComponent>) {
    this.ngxLoader.start();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    
}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelAdding() {
    this.dialogRef.close();
  }

  onConfirmAdding() {
    if (this.demandeRechargeSousCompteForm.valid) {
 
      console.log(this.demandeRechargeSousCompte);
      this.dialogRef.close({
        numCarte: this.demandeRechargeSousCompteForm.value.numCarteForm,
        typeCarburant: this.demandeRechargeSousCompteForm.value.typeCarburantForm,
        demandeur: this.demandeRechargeSousCompteForm.value.demandeurForm,
        causeDeBlocage: this.demandeRechargeSousCompteForm.value.causeDeBlocageForm,
        quantiteDemande: this.demandeRechargeSousCompteForm.value.quantiteDemandeForm,
        dateDemande: this.demandeRechargeSousCompteForm.value.dateDemandeForm,
      });

    }
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }


}
