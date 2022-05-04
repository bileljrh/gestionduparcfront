import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { HomePageComponent } from '../../home-page.component';
import { PaginationConfiguration } from '../../pagination-configuration';
import { CarburantServiceService } from '../carburant-service.service';
import { AjoutRechargeSousCompteComponent } from './ajout-recharge-sous-compte/ajout-recharge-sous-compte.component';
import { ConfirmationRechargeSousCompteComponent } from './confirmation-recharge-sous-compte/confirmation-recharge-sous-compte.component';
import { DeleteRechargeSousCompteComponent } from './delete-recharge-sous-compte/delete-recharge-sous-compte.component';
import { RechargeSousCompte } from './RechargeSousCompte';
import { ValidationRechargeSousCompteComponent } from './validation-recharge-sous-compte/validation-recharge-sous-compte.component';

@Component({
  selector: 'app-recharge-sous-compte',
  templateUrl: './recharge-sous-compte.component.html',
  styleUrls: ['./recharge-sous-compte.component.scss'],
  providers: [MatSnackBar]
})
export class RechargeSousCompteComponent implements OnInit {

  etatCarteActuel: string;
  demandeRechargeSousCompte: RechargeSousCompte[] = [];
  EtatsCarte: string[] = ['Nan affecté', 'Affecté'];
  displayedColumns: string[] = ['index', 'numCarte','demandeur', 'typeCarburant', 'quantiteDemande','creationDate','confirmed', 'validated',  'supprimer'];
  
  
  dataSource = new MatTableDataSource<RechargeSousCompte>(this.demandeRechargeSousCompte);
  @ViewChild(MatSort) sort: MatSort;
  
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  TypeCarburant = new FormControl(null);
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
  snackBarSuccesDeleteMsg = 'la suppression de la demande de recharge sous compte sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la demande de recharge sous compte sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarFailureAddingMsg = 'La nouvelle demande de recharge sous compte  ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle demande de recharge sous compte a été ajouté avec succées';
  snackBarSuccesModificationMsg = 'La demande de recharge sous compte sélectionné a été modifié avec succès';
  snackBarFailureModificationMsg = 'La demande sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'La confirmation de la demande de recharge sous compte sélectionnée a été effectuée avec succès';
  snackBarSuccesValidationMsg = 'La validation de la demande de recharge sous compte sélectionnée a été effectuée avec succès';
  snackBarFailureValidationMsg = 'la demande de recharge sous compte sélectionnée ne pourra pas être validée, réessayez de nouveau s\'il vous plait';

  VIEW_DEMANDE_RECHARGE_SOUS_COMPTE: boolean;
  ADD_DEMANDE_RECHARGE_SOUS_COMPTE: boolean;
  VALID_DEMANDE_RECHARGE_SOUS_COMPTE: boolean;
  CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE: boolean;
  DELETE_DEMANDE_RECHARGE_SOUS_COMPTE: boolean;

  constructor(private Authentication: AuthenticationServiceService,
    private Carburant: CarburantServiceService,   
    private router: Router, public dialog: MatDialog,
    private home :HomePageComponent,
 
    private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
  }
  
  setDisplayedColumns() {
    this.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE = this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE;
    this.ADD_DEMANDE_RECHARGE_SOUS_COMPTE = this.Authentication.authoritiesUtilisateur.ADD_DEMANDE_RECHARGE_SOUS_COMPTE;
    this.VALID_DEMANDE_RECHARGE_SOUS_COMPTE = this.Authentication.authoritiesUtilisateur.VALID_DEMANDE_RECHARGE_SOUS_COMPTE;
    this.CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE = this.Authentication.authoritiesUtilisateur.CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE;
    this.DELETE_DEMANDE_RECHARGE_SOUS_COMPTE = this.Authentication.authoritiesUtilisateur.DELETE_DEMANDE_RECHARGE_SOUS_COMPTE;
  }
  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      console.log(this.getTotalItems());
      this.ngxLoader.stop();
    });
  }
  
  getTotalItems() {
    
    this.Carburant.getTotalDemandeRechargeSousCompte(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.demandeRechargeSousCompte = value;
      console.log(this.demandeRechargeSousCompte);
      this.dataSource = new MatTableDataSource<RechargeSousCompte>(this.demandeRechargeSousCompte);
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
    this.Carburant.getTotalDemandeRechargeSousCompte((paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.demandeRechargeSousCompte = value;
      console.log("test demande quota carte jocker");
      console.log(this.Carburant);
      this.dataSource = new MatTableDataSource<RechargeSousCompte>(this.demandeRechargeSousCompte);
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
  

  ajouterNouvelleDemandeRecharge() {
        
  const dialogRef = this.dialog.open(AjoutRechargeSousCompteComponent, {
        panelClass: 'mat-dialog-container-class',
        width: '900px',
      });
      dialogRef.afterClosed().subscribe(value => {
        if (value !== undefined) {
          this.ngxLoader.start();
          this.paginConfig.currentPage = 0;
          this.Carburant.createDemandeRechargeSousCompte(value).subscribe(value1 => {
            this.getTotalItems();
            this.ngxLoader.stop();
            this.displayNotification(this.snackBarSuccesAddingMsg);
             this.home.t=this.home.t+1;
             this.home.souscompte=true;
          }, error => {
            this.ngxLoader.stop();
            this.displayNotification(this.snackBarFailureAddingMsg);
          });
        }
      });
      
    }
  
  
                 
    
  deleteRow(index: number) {
    
    const dialogRef = this.dialog.open(DeleteRechargeSousCompteComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Carburant.deleteDemandeRechargeSousCompte(value).subscribe(value1 => {
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
    
    const dialogRef = this.dialog.open(ConfirmationRechargeSousCompteComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Carburant.confirmSelectedDemandeRechargeSousCompte(value).subscribe(value1 => {
          this.getTotalItems();
          this.home.t=this.home.t+1;
          this.home.souscompte=true;
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
    
    const dialogRef = this.dialog.open(ValidationRechargeSousCompteComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Carburant.validateSelectedDemandeRechargeSousCompte(value).subscribe(value1 => {
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
  
