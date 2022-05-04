import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDeclarationsPerteCarteAgilisCashComponent} from './delete-declarations-perte-carte-agilis-cash/delete-declarations-perte-carte-agilis-cash.component';
import {CarteAgilisCashServiceService} from '../carte-agilis-cash-service.service';
import {ModifyDeclarationsPerteCarteAgilisCashComponent} from './modify-declarations-perte-carte-agilis-cash/modify-declarations-perte-carte-agilis-cash.component';
import {DeclarationPerteCarteAgilisCash} from './declaration-perte-carte-agilis-cash';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NewRechargeCarteAgilisCashComponent} from '../../gestion-affectation/gestion-recharge-carte-agilis-cash/new-recharge-carte-agilis-cash/new-recharge-carte-agilis-cash.component';
import { ConfirmDeclarationsPerteCarteAgilisCashComponent } from './confirm-declarations-perte-carte-agilis-cash/confirm-declarations-perte-carte-agilis-cash.component';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { FormControl } from '@angular/forms';
import { DeclarationPerteCarteAgilisCashComponent } from '../declaration-perte-carte-agilis-cash/declaration-perte-carte-agilis-cash.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-gestion-declarations-perte-carte-agilis-cash',
  templateUrl: './gestion-declarations-perte-carte-agilis-cash.component.html',
  styleUrls: ['./gestion-declarations-perte-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class GestionDeclarationsPerteCarteAgilisCashComponent implements OnInit {
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
  displayedColumns: string[] = ['index', 'structure', 'matriculeBeneficiaire', 'datePerte', 'lieuPerte', 'supprimer', 'modifier', 'confirmer'];
  declarationsPerteCarteAgilisCash: DeclarationPerteCarteAgilisCash[] = [];
  dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.declarationsPerteCarteAgilisCash);
  
  VIEW_DECLARATION_PERTE_AGILIS:boolean;
  DELETE_DECLARATION_PERTE_AGILIS:boolean;
  MODIFY_DECLARATION_PERTE_AGILIS:boolean;
  ADD_DECLARATION_PERTE_AGILIS:boolean;
  CONFIRMER_DECLARATION_PERTE_AGILIS:boolean;

  

  setDisplayedColumns() {
    this.VIEW_DECLARATION_PERTE_AGILIS= this.Authentication.authoritiesUtilisateur.VIEW_DECLARATION_PERTE_AGILIS;
    this.DELETE_DECLARATION_PERTE_AGILIS = this.Authentication.authoritiesUtilisateur.DELETE_DECLARATION_PERTE_AGILIS;
    this.MODIFY_DECLARATION_PERTE_AGILIS = this.Authentication.authoritiesUtilisateur.MODIFY_DECLARATION_PERTE_AGILIS;
    this.ADD_DECLARATION_PERTE_AGILIS = this.Authentication.authoritiesUtilisateur.ADD_DECLARATION_PERTE_AGILIS;
    this.CONFIRMER_DECLARATION_PERTE_AGILIS = this.Authentication.authoritiesUtilisateur.CONFIRMER_DECLARATION_PERTE_AGILIS;

}

  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'la déclaration de perte sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la déclaration de perte sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'la déclaration de perte sélectionnée a été modifiée avec succès';
  snackBarFailureModificationMsg = 'la déclaration de perte sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'la déclaration de perte sélectionnée a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'la déclaration de perte sélectionnée ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarFailureConfirmationMsg = 'la declaration de perte sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'la declaration de perte sélectionnée a été confirmée avec succès';
  listCarteCash : DeclarationPerteCarteAgilisCash[] = [];

  constructor(private Authentication: AuthenticationServiceService, private CarteAgilisCash: CarteAgilisCashServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.CarteAgilisCash.getListDeclarationPerteCarteAgilisCashByConfirmation('False').subscribe(value => {
      this.declarationsPerteCarteAgilisCash = value;
      this.dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.declarationsPerteCarteAgilisCash);
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
      this.CarteAgilisCash.getPaginationDeclarationdespertecarteAgilis(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),"false").subscribe(value1 => {
        this.listCarteCash = value1;
        this.dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.listCarteCash);
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
    const dialogRef = this.dialog.open(DeleteDeclarationsPerteCarteAgilisCashComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.deleteOneDeclarationPerteCarteAgilisCash(value3).subscribe(value2 => {
          this.CarteAgilisCash.getHistoriqueDeclarationPerteCarteAgilisCashByConfirmation('False').subscribe(value => {
            this.declarationsPerteCarteAgilisCash = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.declarationsPerteCarteAgilisCash);
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
    const dialogRef = this.dialog.open(ModifyDeclarationsPerteCarteAgilisCashComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.declarationsPerteCarteAgilisCash[index]}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.modifyOneDeclarationPerteCarteAgilisCash(value3).subscribe(value2 => {
          this.CarteAgilisCash.getListDeclarationPerteCarteAgilisCashByConfirmation('False').subscribe(value => {
            this.declarationsPerteCarteAgilisCash = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.declarationsPerteCarteAgilisCash);
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

  ajouterNouvelleDeclarationPerteCarteAgilisCash() {
    const dialogRef = this.dialog.open(DeclarationPerteCarteAgilisCashComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteAgilisCash.createOneDeclarationPerteCarteAgilisCash(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  }

  getTotalItems() {
    this.CarteAgilisCash.getTotalNumberDeclarationCarteAgilis().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CarteAgilisCash.getPaginationDeclarationdespertecarteAgilis(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),'false').subscribe(value => {
      this.listCarteCash = value;
      this.dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.listCarteCash);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
  }
  

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

onConfirmRow(i: any) {
    const dialogRef = this.dialog.open(ConfirmDeclarationsPerteCarteAgilisCashComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.confirmOneDeclarationPerteCarteAgilisCash(value3).subscribe(value1 => {
          this.CarteAgilisCash.getListDeclarationPerteCarteAgilisCashByConfirmation('False').subscribe(value => {
            this.declarationsPerteCarteAgilisCash = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.declarationsPerteCarteAgilisCash);
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

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.CarteAgilisCash.getPaginationDeclarationdespertecarteAgilis((paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString(),'false').subscribe(value => {
      this.listCarteCash = value;
      this.dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.listCarteCash);
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

