import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { CarteJockerServiceService } from '../../carte-jocker-service.service';
import { ConfirmDemandeQuotaCarteJockerComponent } from '../confirm-demande-quota-carte-jocker/confirm-demande-quota-carte-jocker.component';
import { CreateDemandeQuotaCarteJockerComponent } from '../create-demande-quota-carte-jocker/create-demande-quota-carte-jocker.component';
import { DeleteDemandeQuotaCarteJockerComponent } from '../delete-demande-quota-carte-jocker/delete-demande-quota-carte-jocker.component';
import { DemandeQuotaCarteJockerService } from '../demande-quota-carte-jocker.service';
import { DemandeQuotaCarteJocker } from '../DemandeQuotaCarteJocker';
import { UpdateDemandeQuotaCarteJockerComponent } from '../update-demande-quota-carte-jocker/update-demande-quota-carte-jocker.component';
import { ValidDemandeQuotaCarteJockerComponent } from '../valid-demande-quota-carte-jocker/valid-demande-quota-carte-jocker.component';
import { log } from 'console';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-demande-quota-carburant-carte-jocker',
  templateUrl: './demande-quota-carburant-carte-jocker.component.html',
  styleUrls: ['./demande-quota-carburant-carte-jocker.component.scss'],
  providers: [MatSnackBar]
})
export class DemandeQuotaCarburantCarteJockerComponent implements OnInit {
  etatCarteActuel: string;
  demandeQuotaCarteJockers: DemandeQuotaCarteJocker[] = [];
  EtatsCarte: string[] = ['Nan affecté', 'Affecté'];
  displayedColumns: string[] = ['index', 'numCarte', 'typeCarburant', 'quantiteDemande','confirmed', 'validated', 'modifier', 'supprimer'];
  
  
  dataSource = new MatTableDataSource<DemandeQuotaCarteJocker>(this.demandeQuotaCarteJockers);
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
  snackBarSuccesDeleteMsg = 'la suppression de la demande quota de carte Jocker sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la demande quota de carte Jocker sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarFailureAddingMsg = 'La nouvelle demande quota  ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle demande quota a été ajouté avec succées';
  snackBarSuccesModificationMsg = 'La demande quota sélectionné a été modifié avec succès';
  snackBarFailureModificationMsg = 'La demande sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'La confirmation de la demande quota de carte jocker sélectionnée a été effectuée avec succès';
  snackBarSuccesValidationMsg = 'La validation de la demande quota  de carte Jocker sélectionnée a été effectuée avec succès';
  snackBarFailureValidationMsg = 'la demande quota de carte Jocker sélectionnée ne pourra pas être validée, réessayez de nouveau s\'il vous plait';

  CONFIRMATION_DEMANDE_QUOTA_CARTE_JOCKER: boolean;
  VALIDATION_DEMANDE_QUOTA_CARTE_JOCKER: boolean;
  ADD_DEMANDE_QUOTA_CARTE_JOCKER: boolean;
  MODIFY_DEMANDE_QUOTA_CARTE_JOCKER: boolean;
  DELETE_DEMANDE_QUOTA_CARTE_JOCKER: boolean;
  VIEW_DEMANDE_QUOTA_CARTE_JOCKER: boolean;

  constructor(private Authentication: AuthenticationServiceService,
    private CarteJocker: CarteJockerServiceService,   
    private  demandeQuotaCarteJockerService: DemandeQuotaCarteJockerService ,
    private router: Router, public dialog: MatDialog, 
    private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
  }
  
  setDisplayedColumns() {
    this.CONFIRMATION_DEMANDE_QUOTA_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.CONFIRMATION_DEMANDE_QUOTA_CARTE_JOCKER;
    this.VALIDATION_DEMANDE_QUOTA_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.VALIDATION_DEMANDE_QUOTA_CARTE_JOCKER;
    this.ADD_DEMANDE_QUOTA_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.ADD_DEMANDE_QUOTA_CARTE_JOCKER;
    this.MODIFY_DEMANDE_QUOTA_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.MODIFY_DEMANDE_QUOTA_CARTE_JOCKER;
    this.DELETE_DEMANDE_QUOTA_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.DELETE_DEMANDE_QUOTA_CARTE_JOCKER;
    this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_QUOTA_CARTE_JOCKER;

  }
  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      this.ngxLoader.stop();
    });
  }
  
  getTotalItems() {
    this.CarteJocker.getTotalDemandeAffectationCarteJockerByFilteredDate().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.demandeQuotaCarteJockerService.getPaginationDemandeQuotaCarteJockerList(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.demandeQuotaCarteJockers = value;
      console.log(this.demandeQuotaCarteJockers);
      this.dataSource = new MatTableDataSource<DemandeQuotaCarteJocker>(this.demandeQuotaCarteJockers);
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
    this.demandeQuotaCarteJockerService.getPaginationDemandeQuotaCarteJockerList((paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.demandeQuotaCarteJockers = value;
      console.log("test demande quota carte jocker");
      console.log(this.demandeQuotaCarteJockerService);
      this.dataSource = new MatTableDataSource<DemandeQuotaCarteJocker>(this.demandeQuotaCarteJockers);
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
  
  
  
  ajouterNouvelleDemandeQuotaCarteJocker() {
      const dialogRef = this.dialog.open(CreateDemandeQuotaCarteJockerComponent, {
        panelClass: 'mat-dialog-container-class',
        width: '900px',
      });
      dialogRef.afterClosed().subscribe(value => {
        if (value !== undefined) {
          this.ngxLoader.start();
          this.paginConfig.currentPage = 0;
          this.demandeQuotaCarteJockerService.createDemandeQuotaCarteJocker(value).subscribe(value1 => {
            this.getTotalItems();
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
      const dialogRef = this.dialog.open(UpdateDemandeQuotaCarteJockerComponent, {
        disableClose: true,
        panelClass: 'mat-dialog-container-class',
        width: '1100px',
        data: {element: this.demandeQuotaCarteJockers[i]}
      });
      console.log(this.demandeQuotaCarteJockers[i]);

      dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.paginConfig.currentPage = 0;
          this.demandeQuotaCarteJockerService.updateDemandeQuotaCarteJockerl(value3).subscribe(value2 => {
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
    const dialogRef = this.dialog.open(DeleteDemandeQuotaCarteJockerComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.demandeQuotaCarteJockerService.deleteDemandeQuotaCarteJocker(value).subscribe(value1 => {
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
    const dialogRef = this.dialog.open(ConfirmDemandeQuotaCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.demandeQuotaCarteJockerService.confirmSelectedDemandeQuotaCarteJocker(value).subscribe(value1 => {
          this.getTotalItems();
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
    const dialogRef = this.dialog.open(ValidDemandeQuotaCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.demandeQuotaCarteJockerService.validateSelectedDemandeQuotaCarteJocker(value).subscribe(value1 => {
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
