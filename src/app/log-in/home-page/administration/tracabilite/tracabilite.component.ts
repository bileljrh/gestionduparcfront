import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {PaginationConfiguration} from '../../pagination-configuration';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Tracabilite} from './tracabilite';
import {Utilisateur} from '../creation-utilisateurs/utilisateur';
import {AdministrationServiceService} from '../administration-service.service';
import {DeleteTracabiliteComponent} from './delete-tracabilite/delete-tracabilite.component';
import moment from 'moment';
import {DetailsTracabiliteComponent} from './details-tracabilite/details-tracabilite.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../authentication-service.service';

@Component({
  selector: 'app-tracabilite',
  templateUrl: './tracabilite.component.html',
  styleUrls: ['./tracabilite.component.scss'],
  providers: [MatSnackBar]
})
export class TracabiliteComponent implements OnInit, OnDestroy {
  DELETE_TRACABILITES: boolean;
  VIEW_TRACABILITES: boolean;
  subscription: Subscription[] = [];
  ListElement: Tracabilite[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Tracabilite>(this.ListElement);
  @ViewChild(MatSort) sort: MatSort;
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  UGP: string[] = ['UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5', 'UGP 6'];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La traçabilité sélectionnée a été supprimée avec succées';
  snackBarFailureDeleteMsg = 'La traçabilité sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  customSearching = false;
  ListUtilisateur: Utilisateur[] = [];
  ListModule: string[] = ['Achat', 'Administratif', 'Administration', 'Carburant', 'Exploitation', 'Maintenance et réparation', 'Ordre de Mission', 'Reférentiel', 'Stock'];
  idUser = -1;
  nomModule = 'tousModules';
  dateMin = '2021-01-01';
  dateMax = '2021-01-01';
  utilisateurControl = new FormControl(null);
  moduleControl = new FormControl(null);
  dateMinControl = new FormControl(null);
  dateMaxControl = new FormControl(null);
  matricule = '';
  min: string;
  max: string;

  constructor(private Administration: AdministrationServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.subscription.push(Administration.getListUtilisateur('tousStructures').subscribe(value => {
      this.ListUtilisateur = value;
    }));
    this.itemPerPage.patchValue(this.paginConfig.itemsPerPage);
    this.getTotalList();
    this.ngxLoader.stop();
  }

 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.subscription.push(this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalList();
      this.ngxLoader.stop();
    }));
    this.subscription.push(this.utilisateurControl.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      if (value === undefined) {
        this.idUser = -1;
        this.matricule = '';
      } else {
        this.idUser = value.id;
        this.matricule = value.matricule;
      }
      this.paginConfig.currentPage = 0;
      this.getTotalList();
      this.ngxLoader.stop();
    }));
    this.subscription.push(this.moduleControl.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      if (value === undefined) {
        this.nomModule = 'tousModules';
      } else {
        this.nomModule = value;
      }
      this.paginConfig.currentPage = 0;
      this.getTotalList();
      this.ngxLoader.stop();
    }));
    this.subscription.push(this.dateMinControl.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.dateMin = moment(value as Date).format('YYYY-MM-DD');
      this.min = this.dateMin;
      this.paginConfig.currentPage = 0;
      this.getTotalList();
      this.ngxLoader.stop();
    }));
    this.subscription.push(this.dateMaxControl.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.dateMax = moment(value as Date).format('YYYY-MM-DD');
      this.max = this.dateMax;
      this.paginConfig.currentPage = 0;
      this.getTotalList();
      this.ngxLoader.stop();
    }));
  }

  deleteRow(i: number) {
    const dialogRef = this.dialog.open(DeleteTracabiliteComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.subscription.push(this.Administration.deleteSelectedTracabilite(value3).subscribe(value => {
          this.getTotalList();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }
/*
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.subscription.push(this.Administration.getPaginationListTracabilite((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString(), this.idUser.toString(), this.nomModule, this.dateMin, this.dateMax).subscribe(value => {
      this.ListElement = value;
      console.log(this.ListElement);      
      this.dataSource = new MatTableDataSource<Tracabilite>(this.ListElement);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    }));
  }
*/

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Administration.getPaginationListTracabilite(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),this.idUser.toString(), this.nomModule, this.dateMin, this.dateMax).subscribe(value => {
      this.ListElement = value;
      this.dataSource = new MatTableDataSource<Tracabilite>(this.ListElement);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
    this.getTotalList();
  }
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  handleCustomSearching() {
    this.customSearching = !this.customSearching;
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

  getTotalList() {
    this.subscription.push(this.Administration.getTotalItemTracabilite(this.idUser.toString(), this.nomModule, this.dateMin, this.dateMax).subscribe(value => {
     console.log("*******************ok*************");
     console.log(value);
      this.paginConfig.totalItems = value;
    }));
    this.subscription.push(this.Administration.getPaginationListTracabilite(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(), this.idUser.toString(), this.nomModule, this.dateMin, this.dateMax).subscribe(value => {
      this.ListElement = value;
      this.dataSource = new MatTableDataSource<Tracabilite>(this.ListElement);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop(); 
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  moreDetailsRow(i: any) {
    const dialogRef = this.dialog.open(DetailsTracabiliteComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElement[i]}
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

  setDisplayedColumns() {
    this.DELETE_TRACABILITES = this.Authentication.authoritiesUtilisateur.DELETE_TRACABILITES;
    this.VIEW_TRACABILITES = this.Authentication.authoritiesUtilisateur.VIEW_TRACABILITES;
    if (this.DELETE_TRACABILITES) {
      this.displayedColumns = ['index', 'operation', 'nomModule', 'dateOperation', 'user', 'details', 'supprimer'];
    } else {
      this.displayedColumns = ['index', 'operation', 'nomModule', 'dateOperation', 'user', 'details'];
    }
  }
}
