import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {PaginationConfiguration} from '../../pagination-configuration';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {StockServiceService} from '../stock-service.service';
import {ModificationReceptionFournisseurComponent} from './modification-reception-fournisseur/modification-reception-fournisseur.component';
import {BonCommande} from '../../achat/bon-commande';
import { DeleteReceptionFournisseurComponent } from './delete-reception-fournisseur/delete-reception-fournisseur.component';
import { Subscription } from 'rxjs';
import { AchatServiceService } from '../../achat/achat-service.service';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';


@Component({
  selector: 'app-reception-fournisseur',
  templateUrl: './reception-fournisseur.component.html',
  styleUrls: ['./reception-fournisseur.component.scss'],
  providers: [MatSnackBar]
})
export class ReceptionFournisseurComponent implements OnInit {
  ListBonCommande: BonCommande[] = [];
  displayedColumns: string[] = ['index', 'code', 'fournisseur', 'date', 'details', 'supprimer'];
  dataSource = new MatTableDataSource<BonCommande>(this.ListBonCommande);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesModifiyingMsg = 'Le bon de commande sélectionné a été modifié avec succées';
  snackBarFailureModifiyingMsg = 'Le bon de commande sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
 
  snackBarSuccesDeleteMsg = 'L\'article sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'L\'article sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';

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
  listStatus: string [] = ['Non Réceptionné', 'Réceptionné'];
  status = 'All';
  VIEW_Reception_Fournisseur: boolean;
  DELETE_Reception_Fournisseur : boolean;
  DETAILS_Reception_Fournisseur: boolean;
  constructor(
    private achatService:AchatServiceService,
    private Stock: StockServiceService,
     public dialog: MatDialog, private snackBar: MatSnackBar,
     private Authentication: AuthenticationServiceService,
      private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.itemPerPage.patchValue(this.paginConfig.itemsPerPage);
    this.getTotalList();
    this.ngxLoader.stop();
    this. setDisplayedColumns();
  }
  setDisplayedColumns() {
    this.VIEW_Reception_Fournisseur = this.Authentication.authoritiesUtilisateur.VIEW_Reception_Fournisseur;
    this.DELETE_Reception_Fournisseur = this.Authentication.authoritiesUtilisateur.DELETE_Reception_Fournisseur;
    this.DETAILS_Reception_Fournisseur = this.Authentication.authoritiesUtilisateur.DETAILS_Reception_Fournisseur;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value2;
      this.Stock.getPaginationReceptionFournisseurListBySelection(this.status, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
        this.ListBonCommande = value;
        this.dataSource = new MatTableDataSource<BonCommande>(this.ListBonCommande);
        this.dataSource.sort = this.sort;
        this.ngxLoader.stop();
      }, error => {
        this.ngxLoader.stop();
        this.showNotification(this.snackBarFailureLoadingMsg);
      });
      this.ngxLoader.stop();
    });
    this.statusParameter.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      if (value === undefined) {
        this.status = 'All';
      } else {
        this.status = value;
      }
      this.getTotalList();
      this.ngxLoader.stop();
    });
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModificationReceptionFournisseurComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListBonCommande[i]}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        console.log(value3);
        this.ListBonCommande[i].demandesArticle = value3;
        console.log(  this.ListBonCommande[i]);

        this.Stock.confirmReceptionFournisseur(this.ListBonCommande[i]).subscribe(value2 => {
          console.log(this.ListBonCommande[i]);
          this.getTotalList();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesModifiyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureModifiyingMsg);
        });
      }
    });
  }

  detailsDemande(i:any){
    
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Stock.getPaginationReceptionFournisseurListBySelection(this.status, (paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListBonCommande = value;
      this.dataSource = new MatTableDataSource<BonCommande>(this.ListBonCommande);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
  }


  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }


  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

  getTotalList() {
    this.Stock.getTotalItemsReceptionFournisseurBySelection(this.status).subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.Stock.getPaginationReceptionFournisseurListBySelection(this.status, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListBonCommande = value;
      this.dataSource = new MatTableDataSource<BonCommande>(this.ListBonCommande);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
  }


  deleteRow(i: any) {

    const dialogRef = this.dialog.open(DeleteReceptionFournisseurComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(value4 => {
      if (value4 !== undefined) {
        this.subscriptions.push(this.achatService.deleteSelectedBonCommande (value4).subscribe(value2 => {
          this.getTotalList();
          this.showNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.showNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));

  }
}
