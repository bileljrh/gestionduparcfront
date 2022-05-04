import {Component, OnInit, ViewChild} from '@angular/core';
import {DeclarationPerteCartePlafond} from '../declaration-perte-carte-plafond/declaration-perte-carte-plafond';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CarburantServiceService} from '../../carburant-service.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDeclarationPerteCarteComponent} from './delete-declaration-perte-carte/delete-declaration-perte-carte.component';
import {ModifyDeclarationPerteCarteComponent} from './modify-declaration-perte-carte/modify-declaration-perte-carte.component';
import {ConfirmationDeclarationPerteCarteComponent} from './confirmation-declaration-perte-carte/confirmation-declaration-perte-carte.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {CartePlafondServiceService} from '../carte-plafond-service.service';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { FormControl } from '@angular/forms';
import { DeclarationPerteCartePlafondComponent } from '../declaration-perte-carte-plafond/declaration-perte-carte-plafond.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-gestion-declaration-perte-carte',
  templateUrl: './gestion-declaration-perte-carte.component.html',
  styleUrls: ['./gestion-declaration-perte-carte.component.scss'],
  providers: [MatSnackBar]
})
export class GestionDeclarationPerteCarteComponent implements OnInit {
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
  declarationsPerteCartePlafond: DeclarationPerteCartePlafond[] = [];
  dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.declarationsPerteCartePlafond);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'la declaration de perte sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la declaration de perte sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'la declaration de perte sélectionnée a été modifiée avec succès';
  snackBarSuccesConfirmationMsg = 'la declaration de perte sélectionnée a été confirmée avec succès';
  snackBarFailureModificationMsg = 'la declaration de perte sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarFailureConfirmationMsg = 'la declaration de perte sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'une nouvelle declaration carte Plafond a été effectuée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle declaration carte Plafond ne pourra pas être effectué, réessayez de nouveau s\'il vous plait';
  listCartePlafond : DeclarationPerteCartePlafond[] = [];

  constructor(  private Authentication: AuthenticationServiceService, private CartePlafond: CartePlafondServiceService, private Carburant: CarburantServiceService, public dialog: MatDialog, private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.Carburant.getListDeclarationPerteCartePlafondByConfirmation('False').subscribe(value => {
      this.declarationsPerteCartePlafond = value;
      this.dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.declarationsPerteCartePlafond);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }

  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.CartePlafond.getPaginationDeclarationdespertecartePlafond(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),'false').subscribe(value1 => {
        this.listCartePlafond = value1;
        this.dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.listCartePlafond);
        this.dataSource.sort = this.sort;
        this.ngxLoader.stop();
      }, error => {
        setTimeout(() => {
          this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
        }, 800);
        this.ngxLoader.stop();
      });
    });
    this.setDisplayedColumns();

  }

  VIEW_DECLARATION_PERTE_CARTE_PLAFOND:boolean;
  MODIFY_DECLARATION_PERTE_CARTE_PLAFOND:boolean;
  DELETE_DECLARATION_PERTE_CARTE_PLAFOND:boolean;
  ADD_DECLARATION_PERTE_CARTE_PLAFOND:boolean;
  CONFIRMATION_DECLARATION_PERTE_CARTE_PLAFOND:boolean;
  setDisplayedColumns() {
    this.VIEW_DECLARATION_PERTE_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.VIEW_DECLARATION_PERTE_CARTE_PLAFOND;

    this.MODIFY_DECLARATION_PERTE_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.MODIFY_DECLARATION_PERTE_CARTE_PLAFOND;
  
    this.DELETE_DECLARATION_PERTE_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.DELETE_DECLARATION_PERTE_CARTE_PLAFOND;

    this.ADD_DECLARATION_PERTE_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.ADD_DECLARATION_PERTE_CARTE_PLAFOND;
    this.CONFIRMATION_DECLARATION_PERTE_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.CONFIRMATION_DECLARATION_PERTE_CARTE_PLAFOND;

  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteRow(i: number) {
    const dialogRef = this.dialog.open(DeleteDeclarationPerteCarteComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Carburant.deleteOneDeclarationPerteCartePlafond(value3).subscribe(value1 => {
          this.Carburant.getListDeclarationPerteCartePlafondByConfirmation('False').subscribe(value => {
            this.declarationsPerteCartePlafond = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.declarationsPerteCartePlafond);
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
    const dialogRef = this.dialog.open(ModifyDeclarationPerteCarteComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.declarationsPerteCartePlafond[index]}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.CartePlafond.modifySelectedDeclarationPerteCartePlafond(value3).subscribe(value1 => {
          this.Carburant.getListDeclarationPerteCartePlafondByConfirmation('False').subscribe(value => {
            this.declarationsPerteCartePlafond = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.declarationsPerteCartePlafond);
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
    const dialogRef = this.dialog.open(ConfirmationDeclarationPerteCarteComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Carburant.confirmOneDeclarationPerteCartePlafond(value3).subscribe(value1 => {
          this.Carburant.getListDeclarationPerteCartePlafondByConfirmation('False').subscribe(value => {
            this.declarationsPerteCartePlafond = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.declarationsPerteCartePlafond);
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
  getTotalItems() {
    this.CartePlafond.getTotalNumberDeclarationCartePlafond().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CartePlafond.getPaginationDeclarationdespertecartePlafond(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),'false').subscribe(value => {
      this.listCartePlafond = value;
      this.dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.listCartePlafond);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }
  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  nouvelleDeclarationperteCarteJocker(){
    const dialogRef =this.dialog.open(DeclarationPerteCartePlafondComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '1000px',
    }); 
    dialogRef.afterClosed().subscribe(value => {
      console.log("value declation perte");
      console.log(value);
      
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CartePlafond.createNewDeclarationPerteCartePlafond(value).subscribe(value1 => {
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
    this.CartePlafond.getPaginationDeclarationdespertecartePlafond((paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString(),'false').subscribe(value => {
      this.listCartePlafond = value;
      this.dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.listCartePlafond);
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
}
