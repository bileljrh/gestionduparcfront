import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { HomePageComponent } from '../../../home-page.component';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { CarburantServiceService } from '../../carburant-service.service';
import { CarburantService } from '../../carburant.service';
import { CartePlafondServiceService } from '../../carte-plafond/carte-plafond-service.service';
import { NouvelleCartePlafond } from '../../gestion-cartes/gestion-carte-plafond/nouvelle-carte-plafond';
import { RechargeQuotaMensuel } from '../Recharge quota mensuel';
import { ConfirmRechargeQuotaMensuelComponent } from './confirm-recharge-quota-mensuel/confirm-recharge-quota-mensuel.component';
import { NewRechargeQuotaMensuelComponent } from './new-recharge-quota-mensuel/new-recharge-quota-mensuel.component';
import { ValidRechargeQuotaMensuelComponent } from './valid-recharge-quota-mensuel/valid-recharge-quota-mensuel.component';
@Component({
  selector: 'app-recharge-quota-mensuel',
  templateUrl: './recharge-quota-mensuel.component.html',
  styleUrls: ['./recharge-quota-mensuel.component.scss'],
  providers: [MatSnackBar]
})
export class RechargeQuotaMensuelComponent implements OnInit {
  
  rechargeQuota: RechargeQuotaMensuel[] = [];
  cartePlafondList: NouvelleCartePlafond[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'matricule','confirmed', 'validated'];
  
  
  dataSource = new MatTableDataSource<RechargeQuotaMensuel>(this.rechargeQuota);
  @ViewChild(MatSort) sort: MatSort;
  
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  matriculeForm = new FormControl(null);
  CartePlafond= new FormControl(null);
  cartePlafond = '';
  itemPerPage = new FormControl(null);
  selectedTypeCarburant: string;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  customSearching = false;
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarSuccesDeleteMsg = 'la suppression de la recharge quota mensuel sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la recharge quota mensuel sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarFailureAddingMsg = 'La nouvelle  recharge quota mensuel  ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle recharge quota mensuel a été ajouté avec succées';
  snackBarSuccesModificationMsg = 'la recharge quota mensuel sélectionné a été modifié avec succès';
  snackBarFailureModificationMsg = 'la recharge quota mensuel sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'La confirmation de la recharge quota mensuel sélectionnée a été effectuée avec succès';
  snackBarSuccesValidationMsg = 'La validation de la recharge quota mensuel sélectionnée a été effectuée avec succès';
  snackBarFailureValidationMsg = 'la recharge quota mensuel sélectionnée ne pourra pas être validée, réessayez de nouveau s\'il vous plait';

  CONFIRM_RECHARGE_QUOTA_MENSUEL: boolean;
  VALID_RECHARGE_QUOTA_MENSUEL: boolean;
  ADD_RECHARGE_QUOTA_MENSUEL: boolean;
 
  VIEW_RECHARGE_QUOTA_MENSUEL: boolean;

  constructor(private Carte: CartePlafondServiceService,private Authentication: AuthenticationServiceService,
    private Carburant: CarburantServiceService,   
    private router: Router, public dialog: MatDialog, 
    private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService,
    private home :HomePageComponent,) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
   
  }
  
  setDisplayedColumns() {
   this.CONFIRM_RECHARGE_QUOTA_MENSUEL = this.Authentication.authoritiesUtilisateur.CONFIRM_RECHARGE_QUOTA_MENSUEL;
    this.VALID_RECHARGE_QUOTA_MENSUEL = this.Authentication.authoritiesUtilisateur.VALID_RECHARGE_QUOTA_MENSUEL;
    this.ADD_RECHARGE_QUOTA_MENSUEL = this.Authentication.authoritiesUtilisateur.ADD_RECHARGE_QUOTA_MENSUEL;
    this.VIEW_RECHARGE_QUOTA_MENSUEL = this.Authentication.authoritiesUtilisateur.VIEW_RECHARGE_QUOTA_MENSUEL;

  }
  ngOnInit(): void {

    this.Carte.getListCartePlafondWithNoVehicule().subscribe(value1 => {
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

    this.CartePlafond.valueChanges.subscribe(value2 => {
      
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
   /* this.Carburant.getTotalDemandeAffectationCarteJockerByFilteredDate().subscribe(value => {
      this.paginConfig.totalItems = value;
    });*/
    this.Carburant. getTotalRechargeQuotaMensuel(this.cartePlafond,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.rechargeQuota = value;
      console.log(this.rechargeQuota);
      this.dataSource = new MatTableDataSource<RechargeQuotaMensuel>(this.rechargeQuota);
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
  this.getTotalItems();
  }
  
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  ajouterNouvelleRechargeQuotaMensuel() {
      const dialogRef = this.dialog.open(NewRechargeQuotaMensuelComponent, {
        panelClass: 'mat-dialog-container-class',
        width: '900px',
      });
      dialogRef.afterClosed().subscribe(value => {
        if (value !== undefined) {
          this.ngxLoader.start();
          this.paginConfig.currentPage = 0;
          this.Carburant.createRechargeQuotaMensuel(value).subscribe(value1 => {
            this.getTotalItems();
            this.ngxLoader.stop();
            this.displayNotification(this.snackBarSuccesAddingMsg);
            this.home.t=this.home.t+1;
            this.home.quotamensuel=true;
          }, error => {
            this.ngxLoader.stop();
            this.displayNotification(this.snackBarFailureAddingMsg);
          });
        }
      });
    }
  
  confirmRow(i: any) {
    const dialogRef = this.dialog.open(ConfirmRechargeQuotaMensuelComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Carburant.confirmRechargeQuotaMensuel(value).subscribe(value1 => {
          this.getTotalItems();
          this.home.t=this.home.t+1;
          this.home.quotamensuel=true;
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
    const dialogRef = this.dialog.open(ValidRechargeQuotaMensuelComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Carburant.validateRechargeQuotaMensuel(value).subscribe(value1 => {
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
