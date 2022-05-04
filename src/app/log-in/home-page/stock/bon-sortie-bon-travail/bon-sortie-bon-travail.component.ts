import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { DemandeMaintenance } from '../../maintenance-et-reparation/gestion-demande-intervention/demande-maintenance';
import { PaginationConfiguration } from '../../pagination-configuration';
import { DetailsBonSortieBonTravailComponent } from './details-bon-sortie-bon-travail/details-bon-sortie-bon-travail.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StockServiceService } from '../stock-service.service';
import { BonTravail } from '../../maintenance-et-reparation/gestion-bon-travail/bon-travail';
import { BonDeTravail } from '../../maintenance-et-reparation/BonDeTravail';
import { BonTravailList } from './bon-tavail-list';
import { Magasin } from '../../referentiel/specifique/unite-gestion-parc/magasin';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { __values } from 'tslib';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-bon-sortie-bon-travail',
  templateUrl: './bon-sortie-bon-travail.component.html',
  styleUrls: ['./bon-sortie-bon-travail.component.scss'],
  providers: [MatSnackBar]

})
export class BonSortieBonTravailComponent implements OnInit {
  bonTravail: BonTravailList[] = [];

  ListDemande: string[] = ['vehicule test'];
  displayedColumns: string[] = ['index', 'Vehicule', 'atelier', 'datepiece', 'details'];
  dataSource = new MatTableDataSource<BonTravailList>(this.bonTravail);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesModifiyingMsg = 'Le bon de commande sélectionné a été modifié avec succées';
  snackBarFailureModifiyingMsg = 'Le bon de commande sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';

  snackBarSuccesDeleteMsg = 'L\'article sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'L\'article sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  magasins: Magasin[] = [];
  ugps: UGP[] = [];
  listStatus: DemandeMaintenance[] = [];
  id: Number;
  status = '';
  magasin = '';
  ugp = '';


  UgpControl = new FormControl(null);
  StatusControl = new FormControl(null);
  MagasinControl = new FormControl(null);
  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };


  VIEW_Bon_Travail_Sortie: boolean;
  DETAILS_Bon_Travail_Sortie: boolean;


  private subscriptions: Subscription[] = [];
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  paginator: any;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private ngxLoader: NgxUiLoaderService,
    private Authentication: AuthenticationServiceService,
    private stockServiceService: StockServiceService) {
    this.ngxLoader.start();

    this.ngxLoader.stop();

    this.getTotalList();
    this.getItemsMagasin();
    this.getItemsUgp();



    this.getItemsStatus();
    this.ngxLoader.stop();


    this.setDisplayedColumns();
  }

  setDisplayedColumns() {
    this.VIEW_Bon_Travail_Sortie = this.Authentication.authoritiesUtilisateur.VIEW_Bon_Travail_Sortie;
    this.DETAILS_Bon_Travail_Sortie = this.Authentication.authoritiesUtilisateur.DETAILS_Bon_Travail_Sortie;

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
  displayPageContent(paginConfig: PaginationConfiguration) {

  }

  modifyRow(i) {
    const dialogRef = this.dialog.open(DetailsBonSortieBonTravailComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: { element: this.bonTravail[i] }
    });

    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        console.log("valeur de modif");
        console.log(value3);
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        console.log(value3);
        this.stockServiceService.confirmReceptionArticlesBonDeTravail(value3).subscribe(value2 => {

          console.log("value 2 !!!");

          console.log(value2
          );

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


  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;

      this.getItemsMagasin();
      this.getItemsUgp();
      this.ngxLoader.stop();
      this.getItemsStatus();
      this.getTotalList();


      this.ngxLoader.stop();
      console.log(this.ugp);
      console.log(this.magasins);
    });



    this.StatusControl.valueChanges.subscribe(value2 => {
      console.log("la valuer de value 2 status");

      console.log(value2);

      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.status = '';
      } else {
        this.status = value2.status
        console.log("le status'!!");
        console.log(this.status);

      }
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


    this.MagasinControl.valueChanges.subscribe(value2 => {
      console.log("la valuer de value 2 magasin");

      console.log(value2);

      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.magasin = '';
      } else {
        this.magasin = value2.designation;
        console.log("la magasin'!!");
        console.log(this.magasin);

      }
      this.getTotalList();
      this.ngxLoader.stop();
    });

  }


  getTotalList() {

    this.stockServiceService.getTotalItemsBonTravailList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.stockServiceService.getAllBonTravail(this.magasin, this.status, this.ugp, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      console.log(this.bonTravail);
      this.bonTravail = value;
      console.log(this.bonTravail);
      this.dataSource = new MatTableDataSource<BonTravailList>(this.bonTravail);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', { duration: 3000 });
      }, 800);
    });
  }





  getItemsMagasin() {
    this.stockServiceService.getAllMagasins().subscribe(value => {
      console.log(value);
      this.magasins = value;

    });
  }

  getItemsUgp() {

    this.stockServiceService.getAllUgps().subscribe(value => {
      console.log(value);
      this.ugps = value;


    });
  }

  getItemsStatus() {

    this.stockServiceService.getAllStatus().subscribe(value => {
      console.log(value);
      this.listStatus = value;


    });
  }
  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', { duration: 800 });
    });
  }


}
