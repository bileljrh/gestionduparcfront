import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { PaginationConfiguration } from '../../pagination-configuration';
import { Magasin } from '../../referentiel/specifique/unite-gestion-parc/magasin';
import { StockServiceService } from '../stock-service.service';
import { MagasinArticle } from './MagasinArticle';
import '@angular/compiler';
import { NouveauTransfertComponent } from './nouveau-transfert/nouveau-transfert.component';
import { magasinVirtuel } from './MagasinVirtuel';
import { ConfirmDemandeTransfertComponent } from './confirm-demande-transfert/confirm-demande-transfert.component';
import { ValidateDemandeTransfertComponent } from './validate-demande-transfert/validate-demande-transfert.component';
import { ModifyListArticleATransfererComponent } from './modify-list-article-atransferer/modify-list-article-atransferer.component';
import { DeleteDemandeTransfertComponent } from './delete-demande-transfert/delete-demande-transfert.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { MagasinRotationNull } from './MagasinRotationNull';
import { ArticesForTransfertToVirtualMagasinComponent } from './nouveau-transfert/artices-for-transfert-to-virtual-magasin/artices-for-transfert-to-virtual-magasin.component';
import { NouveauTransfertRotationNullComponent } from './nouveau-transfert-rotation-null/nouveau-transfert-rotation-null.component';

@Component({
  selector: 'app-transfert-magasin',
  templateUrl: './transfert-magasin.component.html',
  styleUrls: ['./transfert-magasin.component.scss'],
  providers: [MatSnackBar]
})
export class TransfertMagasinComponent implements OnInit {

  listUGP:UGP[]=[]
  ListMagasin: MagasinRotationNull[] = [];
  displayedColumns: string[] = ['index','codeArticle', 'quantiteStock','prix','designation','creationDate','confirmed','validated','supprimer'];
  dataSource = new MatTableDataSource<MagasinRotationNull>(this.ListMagasin);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'transfert vers magasin rotation null  sélectionné a été supprimé avec succées';
  snackBarFailureDeleteMsg = 'transfert vers magasin rotation null sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'transfert vers magasin rotation null a été ajouté avec succées';
  snackBarFailureAddingMsg = ' Cet article déja transfert';
  snackBarSuccesModifiyingMsg = 'transfert vers magasin rotation null a été modifié avec succées';
  snackBarFailureModifiyingMsg = 'transfert vers magasin rotation null ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'transfert vers magasin rotation null sélectionnée a été confirmée avec succès';
  snackBarFailureConfirmationMsg = 'transfert vers magasin rotation null sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';
 
  VIEW_Bon_Transfert_vers_magasin: boolean;
  CONFIRM_Bon_Transfert_vers_magasin : boolean;
  ADD_Bon_Transfert_vers_magasin : boolean;
  VALIDER_Bon_Transfert_vers_magasin : boolean;
  MODIFY_Bon_Transfert_vers_magasin : boolean;
  DELETE_Bon_Transfert_vers_magasin : boolean;


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
    this.VIEW_Bon_Transfert_vers_magasin = this.Authentication.authoritiesUtilisateur.VIEW_Bon_Transfert_vers_magasin;
    this.CONFIRM_Bon_Transfert_vers_magasin = this.Authentication.authoritiesUtilisateur.CONFIRM_Bon_Transfert_vers_magasin;
    this.ADD_Bon_Transfert_vers_magasin = this.Authentication.authoritiesUtilisateur.ADD_Bon_Transfert_vers_magasin;
    this.VALIDER_Bon_Transfert_vers_magasin = this.Authentication.authoritiesUtilisateur.VALIDER_Bon_Transfert_vers_magasin;
    this.MODIFY_Bon_Transfert_vers_magasin = this.Authentication.authoritiesUtilisateur.MODIFY_Bon_Transfert_vers_magasin;
    this.DELETE_Bon_Transfert_vers_magasin = this.Authentication.authoritiesUtilisateur.DELETE_Bon_Transfert_vers_magasin;
  
  }
    
  deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeleteDemandeTransfertComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Stock.deleteDemandeMV(value).subscribe(value1 => {
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


  modifyRow(index: number) {
    const dialogRef = this.dialog.open(ModifyListArticleATransfererComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: index}
    });

    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Stock.updateDemandeTransferMV (value3).subscribe(value2 => {
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
  
    this.Stock.getPaginationMagasinVirtuel(this.ugp,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListMagasin = value;
      this.dataSource = new MatTableDataSource<MagasinRotationNull>(this.ListMagasin);
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
    const dialogRef = this.dialog.open(ConfirmDemandeTransfertComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Stock.confirmTransfert(value).subscribe(value1 => {
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
    const dialogRef = this.dialog.open(ValidateDemandeTransfertComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Stock.validateStock(value).subscribe(value1 => {
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
    



  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Stock.getPaginationMagasinVirtuel(this.ugp,(paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListMagasin = value;
      this.dataSource = new MatTableDataSource<MagasinRotationNull>(this.ListMagasin);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
  }

  

  TrasfertNvArticle(){
    const dialogRef = this.dialog.open(NouveauTransfertRotationNullComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        console.log("test");
        console.log(value3)
        this.Stock.addNewAriclesMV(value3).subscribe(value2 => {
          
          this.getTotalList();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
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
      this.Stock.getPaginationMagasinVirtuel(this.ugp,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
        this.ListMagasin = value;
        this.dataSource = new MatTableDataSource<MagasinRotationNull>(this.ListMagasin);
        this.dataSource.sort = this.sort;
        this.ngxLoader.stop();
      }, error => {
        this.ngxLoader.stop();
        this.showNotification(this.snackBarFailureLoadingMsg);
      });
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
