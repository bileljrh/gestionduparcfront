import { Component, OnInit } from '@angular/core';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaginationConfiguration } from '../../pagination-configuration';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StockServiceService } from '../stock-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { NewTransfertParcVersParcComponent } from '../new-transfert-parc-vers-parc/new-transfert-parc-vers-parc.component';
import { ParcTransfert } from '../../referentiel/specifique/unite-gestion-parc/ParcTransfert';
import { ValidTransfertParcVersParcComponent } from '../valid-transfert-parc-vers-parc/valid-transfert-parc-vers-parc.component';
import { DeleteTransfertParcVersParcComponent } from '../delete-transfert-parc-vers-parc/delete-transfert-parc-vers-parc.component';
import { ModifyTransfertParcVersParcComponent } from '../modify-transfert-parc-vers-parc/modify-transfert-parc-vers-parc.component';
import { ConfirmTransfertParcVersParcComponent } from '../confirm-transfert-parc-vers-parc/confirm-transfert-parc-vers-parc.component';
import { ModifyArticleForTransfertComponent } from '../modify-article-for-transfert/modify-article-for-transfert.component';

@Component({
  selector: 'app-transfert-parc-vers-parc',
  templateUrl: './transfert-parc-vers-parc.component.html',
  styleUrls: ['./transfert-parc-vers-parc.component.scss'],
  providers: [MatSnackBar]
})
export class TransfertParcVersParcComponent implements OnInit {


  listUGP:UGP[]=[]
  ListParcTransfert: ParcTransfert[] = [];
  displayedColumns: string[] = ['index', 'dateTransfert','confirmed','validated','modifier','supprimer'];
  dataSource = new MatTableDataSource<ParcTransfert>(this.ListParcTransfert);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le transfert sélectionné a été supprimé avec succées';
  snackBarFailureDeleteMsg = 'Le transfert sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau transfert a été ajouté avec succées';
  snackBarFailureAddingMsg = 'Le nouveau transfert ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifiyingMsg = 'Le nouveau transfert a été modifié avec succées';
  snackBarFailureModifiyingMsg = 'Le nouveau transfert ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'la declaration de perte sélectionnée a été confirmée avec succès';
  snackBarFailureConfirmationMsg = 'la declaration de perte sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesValidationMsg = 'le transfert d article sélectionnée a été validé avec succès';
  snackBarFailureValidationMsg = 'le transfert d article  sélectionnée ne pourra pas être validé, réessayez de nouveau s\'il vous plait';
 



  VIEW_TRANSFERT_PARC_VERS_MAGASIN: boolean;
  CONFIRM_TRANSFERT_PARC_VERS_MAGASIN : boolean;
  ADD_TRANSFERT_PARC_VERS_MAGASIN : boolean;
  VALID_TRANSFERT_PARC_VERS_MAGASIN : boolean;
  MODIFY_TRANSFERT_PARC_VERS_MAGASIN : boolean;
  DELETE_TRANSFERT_PARC_VERS_MAGASIN : boolean;


  UgpControl= new FormControl(null);
  ugp = '';
  statusParameter = new FormControl(null);
  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  private subscriptions: Subscription[] = [];
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];


  constructor(
    public dialog: MatDialog,
    private ngxLoader: NgxUiLoaderService,
    private Stock:StockServiceService,
    private snackBar: MatSnackBar,
    private Authentication: AuthenticationServiceService,

  ) {
  
    this.ngxLoader.start();
    this.itemPerPage.patchValue(this.paginConfig.itemsPerPage);
    this.getTotalList();
    this.ngxLoader.stop();
    this.setDisplayedColumns();
    this.getItemsUgp();

  }
  

  setDisplayedColumns() {
   this.VIEW_TRANSFERT_PARC_VERS_MAGASIN = this.Authentication.authoritiesUtilisateur.VIEW_TRANSFERT_PARC_VERS_MAGASIN;
    this.CONFIRM_TRANSFERT_PARC_VERS_MAGASIN = this.Authentication.authoritiesUtilisateur.CONFIRM_TRANSFERT_PARC_VERS_MAGASIN;
    this.ADD_TRANSFERT_PARC_VERS_MAGASIN = this.Authentication.authoritiesUtilisateur.ADD_TRANSFERT_PARC_VERS_MAGASIN;
    this.VALID_TRANSFERT_PARC_VERS_MAGASIN = this.Authentication.authoritiesUtilisateur.VALID_TRANSFERT_PARC_VERS_MAGASIN;
    this.MODIFY_TRANSFERT_PARC_VERS_MAGASIN = this.Authentication.authoritiesUtilisateur.MODIFY_TRANSFERT_PARC_VERS_MAGASIN;
    this.DELETE_TRANSFERT_PARC_VERS_MAGASIN = this.Authentication.authoritiesUtilisateur.DELETE_TRANSFERT_PARC_VERS_MAGASIN;
  
  }
    
  deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeleteTransfertParcVersParcComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Stock.deleteDemandeParcTransfert(value).subscribe(value1 => {
          this.getTotalList();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }


  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyTransfertParcVersParcComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1100px',
      data: {element: this.ListParcTransfert[i]}
    });

    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Stock.updateDemandeTransferUgp(value3).subscribe(value2 => {
          this.getTotalList();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesModifiyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifiyingMsg);
        });
      }
    });
  }


  getTotalList() {
    this.subscriptions.push(this.Stock.getTotalItemParcTransfertList().subscribe(value => {
      this.paginConfig.totalItems = value;
    }));
    this.Stock.getPaginationParcTransfert(this.ugp,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListParcTransfert = value;
      this.dataSource = new MatTableDataSource<ParcTransfert>(this.ListParcTransfert);
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
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }    

    return table;
  }

  
  confirmRow(i: any) {
    const dialogRef = this.dialog.open(ConfirmTransfertParcVersParcComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Stock.confirmTransfertParc(value).subscribe(value1 => {
          this.getTotalList();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesConfirmationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureConfirmationMsg);
        });
      }
    });
  }

  validateRow(i: any) {
    const dialogRef = this.dialog.open(ValidTransfertParcVersParcComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Stock.validTransfertParc(value).subscribe(value1 => {
          this.getTotalList();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesValidationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureValidationMsg);
        });
      }
    });
  }
    



  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Stock.getPaginationParcTransfert(this.ugp,(paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListParcTransfert = value;
      this.dataSource = new MatTableDataSource<ParcTransfert>(this.ListParcTransfert);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
  }

  

  TrasfertNvArticle(){
    const dialogRef = this.dialog.open(NewTransfertParcVersParcComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Stock.addNewAricleUgp(value3).subscribe(value2 => {
          
          this.getTotalList();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        });
      }
    });

    console.log("test3");
  }
  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }
  
  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value2;
      this.getTotalList();
      this.ngxLoader.stop();
    });

    this.UgpControl.valueChanges.subscribe(value2 => {
      console.log("la valuer de value 2 ugp");

      console.log(value2);

      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.ugp = '';
      } else {
        this.ugp = value2.designation;
        console.log("l'ugp'!!");
        console.log(this.ugp);
        
      }
      this.getTotalList();
      this.ngxLoader.stop();
    });

    this.getItemsUgp();
  }



//list ugp 
getItemsUgp() {
    
  this.Stock.getAllUgps().subscribe(value => {
    console.log(value);
    this.listUGP=value;
  

   });
}

}
