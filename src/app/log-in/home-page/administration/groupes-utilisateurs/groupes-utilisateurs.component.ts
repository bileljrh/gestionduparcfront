import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdministrationServiceService} from '../administration-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Role} from './role';
import {DeleteGroupeUtilisateurComponent} from './delete-groupe-utilisateur/delete-groupe-utilisateur.component';
import {NewGroupeUtilisateurComponent} from './new-groupe-utilisateur/new-groupe-utilisateur.component';
import {AssignUserComponent} from './assign-user/assign-user.component';
import {DroitAccesComponent} from './droit-acces/droit-acces.component';
import {ModifyGroupeUtilisateurComponent} from './modify-groupe-utilisateur/modify-groupe-utilisateur.component';
import {AuthenticationServiceService} from '../../../authentication-service.service';
import {Subscription} from 'rxjs';
import { PaginationConfiguration } from '../../pagination-configuration';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-groupes-utilisateurs',
  templateUrl: './groupes-utilisateurs.component.html',
  styleUrls: ['./groupes-utilisateurs.component.scss'],
  providers: [MatSnackBar]
})
export class GroupesUtilisateursComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  VIEW_GROUPES_USERS: boolean;
  ADD_GROUPES_USERS: boolean;
  MODIFY_GROUPES_USERS: boolean;
  DELETE_GROUPES_USERS: boolean;
  displayedColumns: string[] = [];
  ListElementTable: Role[] = [];
  dataSource = new MatTableDataSource<Role>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  itemPerPage = new FormControl(null);
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];


  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesAddingGroupeUtilisateurMsg = 'Le nouveau groupe d\'utilisateur a été ajouté avec succès';
  snackBarFailureAddingGroupeUtilisateurMsg = 'Le nouveau groupe d\'utilisateur ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingGroupeUtilisateurMsg = 'Le groupe d\'utilisateur sélectionné a été modifié avec succès';
  snackBarFailureModifyingGroupeUtilisateurMsg = 'Le groupe d\'utilisateur sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteGroupeUtilisateurMsg = 'Le groupe d\'utilisateur sélectionné a été supprimé avec succès';
  snackBarFailureDeleteingGroupeUtilisateurMsg = 'Le groupe d\'utilisateur sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingAuthoritiesMsg = 'Les autorités sélectionnées ont été ajoutées avec succès au groupe';
  snackBarFailureAddingAuthoritiesMsg = 'Les autorités sélectionnées ne pourront pas être ajoutées au groupe, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingUtilisateursMsg = 'Les utilisateurs sélectionnés ont été ajoutés avec succès au groupe';
  snackBarFailureAddingUtilisateursMsg = 'Les autorités sélectionnés ne pourront pas être ajoutés au groupe, réessayez de nouveau s\'il vous plait';

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Administration: AdministrationServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.getTotalItems();
    this.ngxLoader.stop();
  }


  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  deleteRow(i: any) {
    const dialogRef = this.dialog.open(DeleteGroupeUtilisateurComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.deleteSelectedGroupeUtilisateur(value3).subscribe(value => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteGroupeUtilisateurMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteingGroupeUtilisateurMsg);
        }));
      }
    }));
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyGroupeUtilisateurComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[i]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.modifySelectedGroupeUtilisateur(value3).subscribe(value => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesModifyingGroupeUtilisateurMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingGroupeUtilisateurMsg);
        }));
      }
    }));
  }

  addUsers4Group(i: number, index: number) {
    const dialogRef = this.dialog.open(AssignUserComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[index]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.addGroupeUtilisateurs(i, value3).subscribe(value => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesAddingUtilisateursMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingUtilisateursMsg);
        }));
      }
    }));
  }

  ajouterNouveauGroupe() {
    const dialogRef = this.dialog.open(NewGroupeUtilisateurComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.addNewGroupeUtilisateur(value3.profil, value3.designation).subscribe(value => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesAddingGroupeUtilisateurMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingGroupeUtilisateurMsg);
        }));
      }
    }));
  }

  addAuthorities(i: number, index: number) {
    const dialogRef = this.dialog.open(DroitAccesComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[index]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.addGroupeAuthorities(i, value3).subscribe(value => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesAddingAuthoritiesMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingAuthoritiesMsg);
        }));
      }
    }));
  }

  getTotalItems() {
    this.subscription.push(this.Administration.getListGroupeUtilisateur(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Role>(this.ListElementTable);
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
   this.subscription.push(this.Administration.getListGroupeUtilisateur(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Role>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    }));
  }

  setDisplayedColumns() {
    this.VIEW_GROUPES_USERS = this.Authentication.authoritiesUtilisateur.VIEW_GROUPES_USERS;
    this.ADD_GROUPES_USERS = this.Authentication.authoritiesUtilisateur.ADD_GROUPES_USERS;
    this.DELETE_GROUPES_USERS = this.Authentication.authoritiesUtilisateur.DELETE_GROUPES_USERS;
    this.MODIFY_GROUPES_USERS = this.Authentication.authoritiesUtilisateur.MODIFY_GROUPES_USERS;
    this.MODIFY_GROUPES_USERS = this.Authentication.authoritiesUtilisateur.MODIFY_GROUPES_USERS;
    if (this.DELETE_GROUPES_USERS) {
      if (this.MODIFY_GROUPES_USERS) {
        this.displayedColumns = ['index', 'profil', 'designation', 'utilisateur', 'autorites', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'profil', 'designation', 'supprimer'];
      }
    } else {
      if (this.MODIFY_GROUPES_USERS) {
        this.displayedColumns = ['index', 'profil', 'designation', 'utilisateur', 'autorites', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'profil', 'designation'];
      }
    }
  }

  ngOnInit():void{
    this.getTotalItems();
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
    });
  }
  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}
