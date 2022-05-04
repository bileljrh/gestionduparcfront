import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MatDialogRef} from '@angular/material/dialog';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { RechargeCarburantCompensationModule } from '../recharge-carburant-compensation/recharge-carburant-compensation.module';
import { CartePlafondServiceService } from '../../carte-plafond/carte-plafond-service.service';
import { CarburantServiceService } from '../../carburant-service.service';
import { CartePlafond } from '../../carte-plafond/carte-plafond';
import { NouvelleCartePlafond } from '../../gestion-cartes/gestion-carte-plafond/nouvelle-carte-plafond';

@Component({
  selector: 'app-new-recharge-carburant-compensation',
  templateUrl: './new-recharge-carburant-compensation.component.html',
  styleUrls: ['./new-recharge-carburant-compensation.component.scss'],
  providers: [MatSnackBar]

})
export class NewRechargeCarburantCompensationComponent implements OnInit {

  rechargeCarburantCompensations: RechargeCarburantCompensationModule[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  rechargeCarburantCompensation: RechargeCarburantCompensationModule = new RechargeCarburantCompensationModule();
 
  cartePlafondList: NouvelleCartePlafond[] = [];
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  rechargeCarburantCompensationForm = new FormGroup({
    'quantiteDemande': new FormControl(null),
    'observation': new FormControl(null),
    'matricule': new FormControl(null),
    'mission': new FormControl(null),
    'destination': new FormControl(null), 
    'cartePlafond': new FormControl(null), 

  });
  numCarte: number ; 
  itemPerPage = new FormControl(null);
  @ViewChild(MatSort) sort: MatSort;
  constructor(   private CartePlafond: CartePlafondServiceService,     private  carburant: CarburantServiceService ,private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, public dialogRef: MatDialogRef<NewRechargeCarburantCompensationComponent>) {
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
    if (this.rechargeCarburantCompensationForm.valid) {
 
      console.log(this.rechargeCarburantCompensation);
      this.dialogRef.close({
        cartePlafond: this.rechargeCarburantCompensationForm.value.cartePlafond,
        quantiteDemande: this.rechargeCarburantCompensationForm.value.quantiteDemande,
        observation: this.rechargeCarburantCompensationForm.value.observation,
        matricule: this.rechargeCarburantCompensationForm.value.matricule,
        mission: this.rechargeCarburantCompensationForm.value.mission,
        destination: this.rechargeCarburantCompensationForm.value.destination,

      });

    }
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }

}
