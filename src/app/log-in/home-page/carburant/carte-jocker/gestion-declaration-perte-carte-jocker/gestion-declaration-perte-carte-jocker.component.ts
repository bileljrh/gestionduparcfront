import {Component, OnInit, ViewChild} from '@angular/core';
import {DeclarationPerteCartejocker} from './new-declaration-perte-carte/declaration-perte-carte-jocker';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CarburantServiceService} from '../../carburant-service.service';
import {MatDialog} from '@angular/material/dialog';
import {DeletePerteCarteComponent} from './delete-perte-carte/delete-perte-carte.component';

import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {CarteJockerServiceService} from '../carte-jocker-service.service';
import { ModifyPerteCarteComponent } from './modify-perte-carte/modify-perte-carte.component';
import { ConfirmationPerteCarteComponent } from './confirmation-perte-carte/confirmation-perte-carte.component';
import { NewDeclarationPerteCarteComponent } from './new-declaration-perte-carte/new-declaration-perte-carte.component';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { NouvelleCarteJocker } from '../../gestion-cartes/gestion-cartes-jocker/nouvelle-carte-jocker/nouvelle-carte-jocker';
import { FormControl } from '@angular/forms';
import moment from 'moment';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
@Component({
  selector: 'app-gestion-declaration-perte-carte-jocker',
  templateUrl: './gestion-declaration-perte-carte-jocker.component.html',
  styleUrls: ['./gestion-declaration-perte-carte-jocker.component.scss'],
  providers: [MatSnackBar]
})
export class GestionDeclarationPerteCarteJockerComponent implements OnInit {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  itemPerPage = new FormControl(null);
  Structure: string[] = ['Structure 1', 'Structure 2', 'Structure 3', 'Structure 4', 'Structure 5', 'Structure 6', 'Structure 7'];
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  displayedColumns: string[] = ['index', 'numeroCarte', 'datePerte', 'lieuPerte', 'confirmer', 'modifier', 'supprimer'];
  declarationsPerteCarteJocker: DeclarationPerteCartejocker[] = [];
  dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.declarationsPerteCarteJocker);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'la declaration de perte sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la declaration de perte sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'la declaration de perte sélectionnée a été modifiée avec succès';
  snackBarSuccesConfirmationMsg = 'la declaration de perte sélectionnée a été confirmée avec succès';
  snackBarFailureModificationMsg = 'la declaration de perte sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarFailureConfirmationMsg = 'la declaration de perte sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'une nouvelle declaration carte Jocker a été effectuée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle declaration carte Jocker ne pourra pas être effectué, réessayez de nouveau s\'il vous plait';


  ADD_DECLARATION_PERTE_CARTE_JOCKER: boolean;
  DELETE_DECLARATION_PERTE_CARTE_JOCKER: boolean;
  MODIFY_DECLARATION_PERTE_CARTE_JOCKER: boolean;
  CONFIRMATION_DECLARATION_PERTE_CARTE_JOCKER: boolean;
  VIEW_DECLARATION_PERTE_CARTE_JOCKER: boolean;
  
  constructor( private Authentication: AuthenticationServiceService,  private CarteJocker: CarteJockerServiceService, private Carburant: CarburantServiceService, public dialog: MatDialog, private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.Carburant.getListDeclarationPerteCarteJockerByConfirmation('False').subscribe(value => {
      this.declarationsPerteCarteJocker = value;
      this.dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.declarationsPerteCarteJocker);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
    this.setDisplayedColumns();

  }

  
  setDisplayedColumns() {
    this.ADD_DECLARATION_PERTE_CARTE_JOCKER= this.Authentication.authoritiesUtilisateur.ADD_DECLARATION_PERTE_CARTE_JOCKER;
    this.DELETE_DECLARATION_PERTE_CARTE_JOCKER= this.Authentication.authoritiesUtilisateur.DELETE_DECLARATION_PERTE_CARTE_JOCKER;
    this.MODIFY_DECLARATION_PERTE_CARTE_JOCKER= this.Authentication.authoritiesUtilisateur.MODIFY_DECLARATION_PERTE_CARTE_JOCKER;
    this.CONFIRMATION_DECLARATION_PERTE_CARTE_JOCKER= this.Authentication.authoritiesUtilisateur.CONFIRMATION_DECLARATION_PERTE_CARTE_JOCKER;
    this.VIEW_DECLARATION_PERTE_CARTE_JOCKER= this.Authentication.authoritiesUtilisateur.VIEW_DECLARATION_PERTE_CARTE_JOCKER;
  
  }
  ngOnInit(): void {   
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.CarteJocker.getPaginationDeclarationdespertecarteJocker(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),'false').subscribe(value1 => {
        this.cartejockerlist = value1;
        this.dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.cartejockerlist);
        this.dataSource.sort = this.sort;
        this.ngxLoader.stop();
      }, error => {
        setTimeout(() => {
          this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
        }, 800);
        this.ngxLoader.stop();
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteRow(i: number) {
    const dialogRef = this.dialog.open(DeletePerteCarteComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Carburant.deleteOneDeclarationPerteCarteJocker(value3).subscribe(value1 => {
          this.Carburant.getListDeclarationPerteCarteJockerByConfirmation('False').subscribe(value => {
            this.declarationsPerteCarteJocker = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.declarationsPerteCarteJocker);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
          }, error => {
            this.ngxLoader.stop();
            setTimeout(() => {
              this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
            }, 800);
          });
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarSuccesDeleteMsg, 'X', {duration: 3000});
          }, 800);
        }, error => {
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureDeleteMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });

  }

  onModifyRow(index: number) {
    const dialogRef = this.dialog.open(ModifyPerteCarteComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.declarationsPerteCarteJocker[index]}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.CarteJocker.modifySelectedDeclarationPerteCarteJocker(value3).subscribe(value1 => {
          this.Carburant.getListDeclarationPerteCarteJockerByConfirmation('False').subscribe(value => {
            this.declarationsPerteCarteJocker = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.declarationsPerteCarteJocker);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
          }, error => {
            this.ngxLoader.stop();
            setTimeout(() => {
              this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
            }, 800);
          });
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarSuccesModificationMsg, 'X', {duration: 3000});
          }, 800);
        }, error => {
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureModificationMsg, 'X', {duration: 3000});
          }, 800);
        });

      }
    });

  }

  onConfirmRow(i: any) {
    const dialogRef = this.dialog.open(ConfirmationPerteCarteComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Carburant.confirmOneDeclarationPerteCarteJocker(value3).subscribe(value1 => {
          this.Carburant.getListDeclarationPerteCarteJockerByConfirmation('False').subscribe(value => {
            this.declarationsPerteCarteJocker = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.declarationsPerteCarteJocker);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
          }, error => {
            this.ngxLoader.stop();
            setTimeout(() => {
              this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
            }, 800);
          });
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarSuccesConfirmationMsg, 'X', {duration: 3000});
          }, 800);
        }, error => {
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureConfirmationMsg, 'X', {duration: 3000});
          }, 800);
        });

      }
    });
  }
  cartejockerlist : DeclarationPerteCartejocker[] = []

 
  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

 
  nouvelleDeclarationperteCarteJocker(){
    const dialogRef = this.dialog.open(NewDeclarationPerteCarteComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '1000px',
    }); 
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.createNewDeclarationPerteCarteJocker(value).subscribe(value1 => {
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
         

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.CarteJocker.getPaginationDeclarationdespertecarteJocker((paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString(),'false').subscribe(value => {
      this.cartejockerlist = value;
      this.dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.cartejockerlist);
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
  getTotalItems() {
    this.CarteJocker.getTotalNumberDeclarationCarteJocker().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CarteJocker.getPaginationDeclarationdespertecarteJocker(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),'false').subscribe(value => {
      this.cartejockerlist = value;
      this.dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.cartejockerlist);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }
  
}


