import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MatDialogRef} from '@angular/material/dialog';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { CartePlafondServiceService } from '../../carte-plafond/carte-plafond-service.service';
import { CarburantServiceService } from '../../carburant-service.service';
import { CartePlafond } from '../../carte-plafond/carte-plafond';
import { NouvelleCartePlafond } from '../../gestion-cartes/gestion-carte-plafond/nouvelle-carte-plafond';
import { RechargeComplementaireModule } from '../recharge-complementaire/recharge-complementaire.module';

@Component({
  selector: 'app-new-recharge-complementaire',
  templateUrl: './new-recharge-complementaire.component.html',
  styleUrls: ['./new-recharge-complementaire.component.scss'],
  providers: [MatSnackBar]

})
export class NewRechargeComplementaireComponent implements OnInit {

  rechargeComplementaires: RechargeComplementaireModule[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  rechargeComplementaire: RechargeComplementaireModule = new RechargeComplementaireModule();
 
  cartePlafondList: NouvelleCartePlafond[] = [];
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  rechargeComplementaireForm = new FormGroup({
    'quantiteDemande': new FormControl(null),
    'observation': new FormControl(null),
    'matricule': new FormControl(null), 
    'cartePlafond': new FormControl(null), 

  });
  numCarte: number ; 
  itemPerPage = new FormControl(null);
  @ViewChild(MatSort) sort: MatSort;
  constructor(   private CartePlafond: CartePlafondServiceService,     private  carburant: CarburantServiceService ,private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, public dialogRef: MatDialogRef<NewRechargeComplementaireComponent>) {
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
    if (this.rechargeComplementaireForm.valid) {
 
      console.log(this.rechargeComplementaire);
      this.dialogRef.close({
        cartePlafond: this.rechargeComplementaireForm.value.cartePlafond,
        quantiteDemande: this.rechargeComplementaireForm.value.quantiteDemande,
        observation: this.rechargeComplementaireForm.value.observation,
        matricule: this.rechargeComplementaireForm.value.matricule,
     

      });

    }
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }

}
