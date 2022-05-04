import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PaginationConfiguration} from '../../../pagination-configuration';
import {CarteJockerServiceService} from '../carte-jocker-service.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import moment from 'moment';
import {DeleteHistoriqueAffectationCarteJockerComponent} from './delete-historique-affectation-carte-jocker/delete-historique-affectation-carte-jocker.component';
import {HistoriqueAffectationCarteJocker} from './historique-affectation-carte-jocker';
import {ReadMoreHistoriqueAffectationCarteJockerComponent} from './read-more-historique-affectation-carte-jocker/read-more-historique-affectation-carte-jocker.component';


@Component({
  selector: 'app-historique-affectation-carte-jocker',
  templateUrl: './historique-affectation-carte-jocker.component.html',
  styleUrls: ['./historique-affectation-carte-jocker.component.scss'],
  providers: [MatSnackBar]
})
export class HistoriqueAffectationCarteJockerComponent implements OnInit {

  EtatsCarte: string[] = ['Nan affecté', 'Affecté'];
  DateMin = new FormControl(null);
  DateMax = new FormControl(null);
  displayedColumns: string[] = ['index', 'structure', 'numeroCarte', 'matriculeBeneficiaire', 'numero_plaque', 'dateAffectation', 'supprimer', 'vehicule', 'plusInfo'];
  historiqueAffectationCarteJocker: HistoriqueAffectationCarteJocker[] = [];
  dataSource = new MatTableDataSource<HistoriqueAffectationCarteJocker>(this.historiqueAffectationCarteJocker);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  TypeCarburant = new FormControl(null);
  itemPerPage = new FormControl(null);
  selectedTypeCarburant: string;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarSuccesDeleteMsg = 'la demande d\'affectation de carte Jocker sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la demande d\'affectation de carte Jocker sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'une nouvelle carte Jocker a été effectuée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle carte Jocker ne pourra pas être effectué, réessayez de nouveau s\'il vous plait';
  dateMin = '1970-01-01';
  dateMax = '1970-01-01';


  constructor(private CarteJocker: CarteJockerServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.CarteJocker.getTotalNumberHistoriqueAffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CarteJocker.getPaginationHistoriqueAffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.historiqueAffectationCarteJocker = value;
      this.dataSource = new MatTableDataSource<HistoriqueAffectationCarteJocker>(this.historiqueAffectationCarteJocker);
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
    this.DateMin.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      const DateMinMoment = moment(value as Date);
      this.paginConfig.currentPage = 0;
      this.dateMin = DateMinMoment.format('YYYY-MM-DD');
      this.CarteJocker.getTotalNumberHistoriqueAffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value1 => {
        this.paginConfig.totalItems = value1;
      });

      this.CarteJocker.getPaginationHistoriqueAffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
        this.historiqueAffectationCarteJocker = value1;
        this.dataSource = new MatTableDataSource<HistoriqueAffectationCarteJocker>(this.historiqueAffectationCarteJocker);
        this.dataSource.sort = this.sort;
        this.ngxLoader.stop();
      }, error => {
        this.ngxLoader.stop();
        setTimeout(() => {
          this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
        }, 800);
      });
    });
    this.DateMax.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      const DateMaxMoment = moment(value as Date);
      this.dateMax = DateMaxMoment.format('YYYY-MM-DD');
      this.CarteJocker.getTotalNumberHistoriqueAffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value1 => {
        this.paginConfig.totalItems = value1;
      });

      this.CarteJocker.getPaginationHistoriqueAffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
        this.historiqueAffectationCarteJocker = value1;
        this.dataSource = new MatTableDataSource<HistoriqueAffectationCarteJocker>(this.historiqueAffectationCarteJocker);
        this.dataSource.sort = this.sort;
        this.ngxLoader.stop();
      }, error => {
        this.ngxLoader.stop();
        setTimeout(() => {
          this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
        }, 800);
      });
    });
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.CarteJocker.getPaginationHistoriqueAffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
        this.historiqueAffectationCarteJocker = value1;
        this.dataSource = new MatTableDataSource<HistoriqueAffectationCarteJocker>(this.historiqueAffectationCarteJocker);
        this.dataSource.sort = this.sort;
        this.ngxLoader.stop();
      }, error => {
        this.ngxLoader.stop();
        setTimeout(() => {
          this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
        }, 800);
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  deleteRow(id: any) {
    const dialogRef = this.dialog.open(DeleteHistoriqueAffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {idCarte: id}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.CarteJocker.deleteSelectedHistoriqueAffectationCarteJocker(value).subscribe(value1 => {
          this.CarteJocker.getPaginationHistoriqueAffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value2 => {
            this.historiqueAffectationCarteJocker = value2;
            this.dataSource = new MatTableDataSource<HistoriqueAffectationCarteJocker>(this.historiqueAffectationCarteJocker);
            this.dataSource.sort = this.sort;
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
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureDeleteMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.CarteJocker.getPaginationHistoriqueAffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax, (paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.historiqueAffectationCarteJocker = value;
      this.dataSource = new MatTableDataSource<HistoriqueAffectationCarteJocker>(this.historiqueAffectationCarteJocker);
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

  redirectToVehicule(idVehicule: any) {

  }

  readMore(i: any) {
    const dialogRef = this.dialog.open(ReadMoreHistoriqueAffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {carteJocker: this.historiqueAffectationCarteJocker[i]}
    });
  }
}
