import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { CarburantServiceService } from '../carburant-service.service';
import { CartePlafondServiceService } from '../carte-plafond/carte-plafond-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { log } from 'console';
import { RechargeCarburantCompensationModule } from './recharge-carburant-compensation/recharge-carburant-compensation.module';
import { NewRechargeCarburantCompensationComponent } from './new-recharge-carburant-compensation/new-recharge-carburant-compensation.component';
import { ModifyRechargeCarburantCompensationComponent } from './modify-recharge-carburant-compensation/modify-recharge-carburant-compensation.component';
import { DeleteRechargeCarburantCompensationComponent } from './delete-recharge-carburant-compensation/delete-recharge-carburant-compensation.component';
import { ConfirmRechargeCarburantCompensationComponent } from './confirm-recharge-carburant-compensation/confirm-recharge-carburant-compensation.component';
import { ValidRechargeCarburantCompensationComponent } from './valid-recharge-carburant-compensation/valid-recharge-carburant-compensation.component';
import { NouvelleCartePlafond } from '../gestion-cartes/gestion-carte-plafond/nouvelle-carte-plafond';
import { HomePageComponent } from '../../home-page.component';

@Component({
  selector: 'app-recharge-carburant-compensation',
  templateUrl: './recharge-carburant-compensation.component.html',
  styleUrls: ['./recharge-carburant-compensation.component.scss'],
  providers: [MatSnackBar]

})
export class RechargeCarburantCompensationComponent implements OnInit {
  etatCarteActuel: string;
  rechargeCarburantCompensationModules: RechargeCarburantCompensationModule[] = [];
  EtatsCarte: string[] = ['Nan affecté', 'Affecté'];
  displayedColumns: string[] = ['index',  'matricule','mission','quantiteDemande', 'confirmed', 'validated', 'modifier', 'supprimer'];
  
  
  dataSource = new MatTableDataSource<RechargeCarburantCompensationModule>(this.rechargeCarburantCompensationModules);
  @ViewChild(MatSort) sort: MatSort;
  
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  TypeCarburant = new FormControl(null);
  itemPerPage = new FormControl(null);
  Carteplafond= new FormControl(null);
  cartePlafond = '';
  selectedTypeCarburant: string;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  customSearching = false;
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarSuccesDeleteMsg = 'la suppression de la demande de recharge de carburant de compensation sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la demande de recharge de carburant de compensation sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarFailureAddingMsg = 'La nouvelle demande quota  ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle demande quota a été ajouté avec succées';
  snackBarSuccesModificationMsg = 'La demande quota sélectionné a été modifié avec succès';
  snackBarFailureModificationMsg = 'La demande sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'La confirmation de la demande de recharge de carburant de compensation sélectionnée a été effectuée avec succès';
  snackBarSuccesValidationMsg = 'La validation de la demande de recharge de carburant de compensation  sélectionnée a été effectuée avec succès';
  snackBarFailureValidationMsg = 'la demande de recharge de carburant de compensation sélectionnée ne pourra pas être validée, réessayez de nouveau s\'il vous plait';

  CONFIRMATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION: boolean;
  VALIDATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION: boolean;
  ADD_DEMANDE_RECHARGE_CARBURANT_COMPENSATION: boolean;
  MODIFY_DEMANDE_RECHARGE_CARBURANT_COMPENSATION: boolean;
  DELETE_DEMANDE_RECHARGE_CARBURANT_COMPENSATION: boolean;
  VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION: boolean;

  constructor(private Authentication: AuthenticationServiceService,
    private CartePlafond: CartePlafondServiceService, 
    private home :HomePageComponent,  
    private  carburant: CarburantServiceService ,
    private router: Router, public dialog: MatDialog, 
    private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
  }
  
  setDisplayedColumns() {
    this.CONFIRMATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION = this.Authentication.authoritiesUtilisateur.CONFIRMATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION;
    this.VALIDATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION = this.Authentication.authoritiesUtilisateur.VALIDATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION;
    this.ADD_DEMANDE_RECHARGE_CARBURANT_COMPENSATION = this.Authentication.authoritiesUtilisateur.ADD_DEMANDE_RECHARGE_CARBURANT_COMPENSATION;
    this.MODIFY_DEMANDE_RECHARGE_CARBURANT_COMPENSATION = this.Authentication.authoritiesUtilisateur.MODIFY_DEMANDE_RECHARGE_CARBURANT_COMPENSATION;
    this.DELETE_DEMANDE_RECHARGE_CARBURANT_COMPENSATION = this.Authentication.authoritiesUtilisateur.DELETE_RECHARGE_CARBURANT_COMPENSATION;
    this.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION = this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION;

  }
  cartePlafondList: NouvelleCartePlafond[] = [];

  ngOnInit(): void {
  
    this.CartePlafond.getListCartePlafondWithNoVehicule().subscribe(value1 => {
      console.log(value1);
this.cartePlafondList = value1;
});

    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      this.ngxLoader.stop();
     
    });

  this.Carteplafond.valueChanges.subscribe(value2 => {
      
      console.log(value2);

      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.cartePlafond = '';
      } else {
        this.cartePlafond = value2.numeroCarte;
        console.log("l'cartePlafond'!!");
        console.log(this.cartePlafond);
        
      }
      this.getTotalItems();
      this.ngxLoader.stop();
    });
  }
  getTotalItems() {
  /*   this.carburant.getTotalNumberRechargeCarburantCompensationModule().subscribe(value => {
      this.paginConfig.totalItems = value;
    }); */
    this.carburant.getPaginationRechargeCarburantCompensationModuleList(this.cartePlafond,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.rechargeCarburantCompensationModules = value;
      console.log(this.rechargeCarburantCompensationModules);
      this.dataSource = new MatTableDataSource<RechargeCarburantCompensationModule>(this.rechargeCarburantCompensationModules);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }
  
  
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.carburant.getPaginationRechargeCarburantCompensationModuleList(this.cartePlafond,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.rechargeCarburantCompensationModules = value;
      console.log(this.carburant);
      this.dataSource = new MatTableDataSource<RechargeCarburantCompensationModule>(this.rechargeCarburantCompensationModules);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }
  
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
  
  
  
  ajouterNouvelleRechargeCarburantCompensationModule() {
      const dialogRef = this.dialog.open(NewRechargeCarburantCompensationComponent, {
        panelClass: 'mat-dialog-container-class',
        width: '900px',
      });
      dialogRef.afterClosed().subscribe(value => {
        if (value !== undefined) {
          this.ngxLoader.start();
          this.paginConfig.currentPage = 0;
          this.carburant.createRechargeCarburantCompensationModule(value).subscribe(value1 => {
            this.getTotalItems();
            this.home.t=this.home.t+1;
            this.home.compensation=true;
            this.ngxLoader.stop();
            this.displayNotification(this.snackBarSuccesAddingMsg);
          }, error => {
            this.ngxLoader.stop();
            this.displayNotification(this.snackBarFailureAddingMsg);
          });
        }
      });
    }
  
  
    modifyRow(i: any) {
      const dialogRef = this.dialog.open(ModifyRechargeCarburantCompensationComponent, {
        disableClose: true,
        panelClass: 'mat-dialog-container-class',
        width: '1100px',
        data: {element: this.rechargeCarburantCompensationModules[i]}
      });
      console.log(this.rechargeCarburantCompensationModules[i]);

      dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.paginConfig.currentPage = 0;
          this.carburant.updateRechargeCarburantCompensationModulel(value3).subscribe(value2 => {
            this.getTotalItems();
            this.ngxLoader.stop();
            this.displayNotification(this.snackBarSuccesModificationMsg);
          }, error => {
            this.ngxLoader.stop();
            this.displayNotification(this.snackBarFailureModificationMsg);
          });
        }
      });
    }


    
  deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeleteRechargeCarburantCompensationComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.carburant.deleteRechargeCarburantCompensationModule(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }

  confirmRow(i: any) {
    const dialogRef = this.dialog.open(ConfirmRechargeCarburantCompensationComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.carburant.confirmSelectedRechargeCarburantCompensationModule(value).subscribe(value1 => {
          this.getTotalItems();
          this.home.t=this.home.t+1;
          this.home.compensation=true;
          
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesConfirmationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModificationMsg);
        });
      }
    });
  }

  validateRow(i: any) {
    const dialogRef = this.dialog.open(ValidRechargeCarburantCompensationComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.carburant.validateSelectedRechargeCarburantCompensationModule(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesValidationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureValidationMsg);
        });
      }
    });
  }
  
    
    displayNotification(notification: string) {
      setTimeout(() => {
        this.snackBar.open(notification, 'X', {duration: 3000});
      }, 800);
    }
  

}
