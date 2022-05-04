import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {FormControl} from '@angular/forms';
import {DeleteUtilisateurComponent} from './delete-utilisateur/delete-utilisateur.component';
import {NewUtilisateurComponent} from './new-utilisateur/new-utilisateur.component';
import {ModifyPasswordUtilisateurComponent} from './modify-password-utilisateur/modify-password-utilisateur.component';
import {ResetPasswordUtilisateurComponent} from './reset-password-utilisateur/reset-password-utilisateur.component';
import {ModifyUtilisateurComponent} from './modify-utilisateur/modify-utilisateur.component';
import {ActivateDesactivateUtilisateursComponent} from './activate-desactivate-utilisateurs/activate-desactivate-utilisateurs.component';
import {AdministrationServiceService} from '../administration-service.service';
import {Utilisateur} from './utilisateur';
import {LockUtilisateurComponent} from './lock-utilisateur/lock-utilisateur.component';
import {Structure} from '../../referentiel/specifique/structure-administrative/structure';
import {ReferentielSpecifiqueServiceService} from '../../referentiel/specifique/referentiel-specifique-service.service';
import {AuthenticationServiceService} from '../../../authentication-service.service';
import {Subscription} from 'rxjs';
import { PaginationConfiguration } from '../../pagination-configuration';

@Component({
  selector: 'app-creation-utilisateurs',
  templateUrl: './creation-utilisateurs.component.html',
  styleUrls: ['./creation-utilisateurs.component.scss'],
  providers: [MatSnackBar]
})
export class CreationUtilisateursComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  VIEW_USERS: boolean;
  ADD_USERS: boolean;
  MODIFY_USERS: boolean;
  DELETE_USERS: boolean;
  ACTIVATE_USERS: boolean;
  LOCK_USERS: boolean;
  MODIFY_PASSWORD_USERS: boolean;
  RESET_PASSWORD_USERS: boolean;

  displayedColumns: string[] = [];
  ListElementTable: Utilisateur[] = [];
  user:Utilisateur[]=[];
  dataSource = new MatTableDataSource<Utilisateur>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  structureControl = new FormControl(null);
  ListStructure: Structure[] = [];
  structure = 'tousStructures';
  structureCode = '';

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  itemPerPage = new FormControl(null);
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'utilisateur sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'L\'utilisateur sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau utilisateur a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouveau utilisateur ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'L\'utilisateur sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'L\'utilisateur sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesActivatingMsg = 'L\'utilisateur sélectionné a été activé avec succès';
  snackBarFailureActivatingMsg = 'L\'utilisateur sélectionné ne pourra pas être activé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDesactivatingMsg = 'L\'utilisateur sélectionné a été désactivé avec succès';
  snackBarFailureDesactivatingMsg = 'L\'utilisateur sélectionné ne pourra pas être désactivé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesResettingPasswordMsg = 'Le mot de passe d\'utilisateur sélectionné a été réinitialisé avec succès';
  snackBarFailureResettingPasswordMsg = 'Le mot de passe d\'utilisateur sélectionné ne pourra pas être réinitialisé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingPasswordMsg = 'Le mot de passe d\'utilisateur sélectionné a été modifié avec succès';
  snackBarFailureModifyingPasswordMsg = 'Le mot de passe d\'utilisateur sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesLockingMsg = 'L\'utilisateur sélectionné a été verrouillé avec succès';
  snackBarFailureLockingMsg = 'L\'utilisateur sélectionné ne pourra pas être verrouillé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesUnlockingMsg = 'L\'utilisateur sélectionné a été déverrouillé avec succès';
  snackBarFailureUnlockingMsg = 'L\'utilisateur sélectionné ne pourra pas être déverrouillé, réessayez de nouveau s\'il vous plait';
  actions: boolean;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Administration: AdministrationServiceService, private Referentiel: ReferentielSpecifiqueServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.subscription.push(this.Referentiel.getListStructure().subscribe(value => {
      this.ListStructure = value;
    }));
    this.getTotalItems();
    this.ngxLoader.stop();
  }


  ngOnInit(): void {
    this.subscription.push(this.structureControl.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      if (value === undefined) {
        this.structure = 'tousStructures';
        this.structureCode = '';
      } else {
        this.structure = value.designation;
        this.structureCode = value.code;
      }
      this.getTotalItems();
    }));
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
    });
  }



  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRow(i: any) {
    const dialogRef = this.dialog.open(DeleteUtilisateurComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Administration.deleteSelectedUtilisateur(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModifyUtilisateurComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    console.log("test update");
    console.log(this.ListElementTable[id]);
    
    
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.modifySelectedUtilisateur(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouveauUtilisateur() {
    const dialogRef = this.dialog.open(NewUtilisateurComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        console.log(value3);
        this.ngxLoader.start();
        this.subscription.push(this.Administration.addNewUtilisateur(value3).subscribe(value2 => {
          console.log(value3);
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingMsg);
        }));
      }
    }));
  }

  getTotalItems() {
    this.subscription.push(this.Administration.getListUser(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),this.structure).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Utilisateur>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    }));
  }
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Administration.getListUser(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),this.structure).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Utilisateur>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }


  modifierMotDePasse(i: number) {
    const dialogRef = this.dialog.open(ModifyPasswordUtilisateurComponent, {
      disableClose: true,
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.modificationMot2PassUtilisateur(value3).subscribe(value => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesModifyingPasswordMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingPasswordMsg);
        }));
      }
    }));
  }

  reinitialiserMotDePasse(i: number) {
    const dialogRef = this.dialog.open(ResetPasswordUtilisateurComponent, {
      disableClose: true,
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Administration.reinitialisationMot2PassUtilisateur(value3.id, value3.mot2pass).subscribe(value => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesResettingPasswordMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureResettingPasswordMsg);
        }));
      }
    }));
  }

  ActivateDesactivateUtilisateur(i: number, active: boolean) {
    const dialogRef = this.dialog.open(ActivateDesactivateUtilisateursComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {activated: active, id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.activateDesactivateSelectedUtilisateur(value3).subscribe(value => {
          this.getTotalItems();
          this.ngxLoader.stop();
          if (active) {
            this.displayNotification(this.snackBarSuccesDesactivatingMsg);
          } else {
            this.displayNotification(this.snackBarSuccesActivatingMsg);
          }
        }, error => {
          this.ngxLoader.stop();
          if (active) {
            this.displayNotification(this.snackBarFailureDesactivatingMsg);
          } else {
            this.displayNotification(this.snackBarFailureActivatingMsg);
          }
        }));
      }
    }));
  }

  lockUtilisateur(i: any, isNotLocked: any) {
    const dialogRef = this.dialog.open(LockUtilisateurComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i, notLocked: isNotLocked}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.Administration.verrouillageDeverrouillageUtilisateur(value3).subscribe(value => {
          this.getTotalItems();
          this.ngxLoader.stop();
          if (isNotLocked) {
            this.displayNotification(this.snackBarSuccesLockingMsg);
          } else {
            this.displayNotification(this.snackBarSuccesUnlockingMsg);
          }
        }, error => {
          this.ngxLoader.stop();
          if (isNotLocked) {
            this.displayNotification(this.snackBarFailureLockingMsg);
          } else {
            this.displayNotification(this.snackBarFailureUnlockingMsg);
          }
        });
      }
    });
  }

  setDisplayedColumns() {
    this.VIEW_USERS = this.Authentication.authoritiesUtilisateur.VIEW_USERS;
    this.ADD_USERS = this.Authentication.authoritiesUtilisateur.ADD_USERS;
    this.MODIFY_USERS = this.Authentication.authoritiesUtilisateur.MODIFY_USERS;
    this.DELETE_USERS = this.Authentication.authoritiesUtilisateur.DELETE_USERS;
    this.ACTIVATE_USERS = this.Authentication.authoritiesUtilisateur.ACTIVATE_USERS;
    this.LOCK_USERS = this.Authentication.authoritiesUtilisateur.LOCK_USERS;
    this.MODIFY_PASSWORD_USERS = this.Authentication.authoritiesUtilisateur.MODIFY_PASSWORD_USERS;
    this.RESET_PASSWORD_USERS = this.Authentication.authoritiesUtilisateur.RESET_PASSWORD_USERS;
    this.actions = (this.MODIFY_USERS || this.DELETE_USERS || this.ACTIVATE_USERS || this.LOCK_USERS || this.MODIFY_PASSWORD_USERS || this.RESET_PASSWORD_USERS);
    if (this.actions) {
      this.displayedColumns = ['index', 'matricule', 'nomPrenom', 'email', 'dateDerniereConnexion', 'actions'];
    } else {
      this.displayedColumns = ['index', 'matricule', 'nomPrenom', 'email', 'dateDerniereConnexion'];
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}

