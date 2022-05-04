import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { CarburantServiceService } from '../../../carburant-service.service';
import { CartePlafondServiceService } from '../../../carte-plafond/carte-plafond-service.service';
import { NouvelleCartePlafond } from '../../../gestion-cartes/gestion-carte-plafond/nouvelle-carte-plafond';
import { RechargeQuotaMensuel } from '../../Recharge quota mensuel';
@Component({
  selector: 'app-new-recharge-quota-mensuel',
  templateUrl: './new-recharge-quota-mensuel.component.html',
  styleUrls: ['./new-recharge-quota-mensuel.component.scss'],
  providers: [MatSnackBar],
})
export class NewRechargeQuotaMensuelComponent implements OnInit {

  rechargeQuotaMensuels: RechargeQuotaMensuel[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  rechargeQuotaMensuel: RechargeQuotaMensuel = new RechargeQuotaMensuel();
 
  cartePlafondList: NouvelleCartePlafond[] = [];
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  rechargeQuotaMensuelForm = new FormGroup({
    
    'nom': new FormControl(null),
    'prenom': new FormControl(null), 
    'matricule': new FormControl(null),
    'cartePlafond': new FormControl(null), 

  });
  numCarte: number ; 
  itemPerPage = new FormControl(null);
  @ViewChild(MatSort) sort: MatSort;
  constructor(   private CartePlafond: CartePlafondServiceService,     private  carburant: CarburantServiceService ,private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, public dialogRef: MatDialogRef<NewRechargeQuotaMensuelComponent>) {
    this.ngxLoader.start();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.CartePlafond.getListCartePlafondWithNoVehicule().subscribe(value1 => {
             console.log(value1);
      this.cartePlafondList = value1;
    });

}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelAdding() {
    this.dialogRef.close();
  }

  onConfirmAdding() {
    if (this.rechargeQuotaMensuelForm.valid) {
 
      console.log(this.rechargeQuotaMensuel);
      this.dialogRef.close({
        cartePlafond: this.rechargeQuotaMensuelForm.value.cartePlafond,
        nom: this.rechargeQuotaMensuelForm.value.nom,
        prenom: this.rechargeQuotaMensuelForm.value.prenom,
        matricule: this.rechargeQuotaMensuelForm.value.matricule,
       

      });

    }
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }


}
