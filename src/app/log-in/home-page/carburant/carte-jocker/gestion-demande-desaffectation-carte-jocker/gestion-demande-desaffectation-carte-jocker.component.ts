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
import {DemandeDesaffectationCarteJockerResponse} from './demande-desaffectation-carte-jocker-response';
import {DeleteDemandeDesaffectationCarteJockerComponent} from './delete-demande-desaffectation-carte-jocker/delete-demande-desaffectation-carte-jocker.component';
import {ConfirmDemandeDesaffectationCarteJockerComponent} from './confirm-demande-desaffectation-carte-jocker/confirm-demande-desaffectation-carte-jocker.component';
import {ModifyDemandeDesaffectationCarteJockerComponent} from './modify-demande-desaffectation-carte-jocker/modify-demande-desaffectation-carte-jocker.component';
import { NouvelleDemandeAffectationCarteJockerComponent } from '../../gestion-affectation/gestion-affectation-carte-jocker/nouvelle-demande-affectation-carte-jocker/nouvelle-demande-affectation-carte-jocker.component';
import { NouvelleDemandeDesaffectationCarteJockerComponent } from './nouvelle-demande-desaffectation-carte-jocker/nouvelle-demande-desaffectation-carte-jocker.component';
import { ListAffectedVehiculesAndCartesJocker } from './list-affected-vehicules-and-cartes-jocker';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({  
  selector: 'app-gestion-demande-desaffectation-carte-jocker',
  templateUrl: './gestion-demande-desaffectation-carte-jocker.component.html',
  styleUrls: ['./gestion-demande-desaffectation-carte-jocker.component.scss'],
  providers: [MatSnackBar]
})
export class GestionDemandeDesaffectationCarteJockerComponent implements OnInit {

  listAffectedVehiculesAndCartesJocker: ListAffectedVehiculesAndCartesJocker[] = [];
  list:boolean;
  EtatsCarte: string[] = ['Nan affecté', 'Affecté'];
  DateMin = new FormControl(null);
  DateMax = new FormControl(null);
  displayedColumns: string[] = ['index', 'structure', 'numeroCarte', 'matriculeBeneficiaire', 'soldeAffectation', 'supprimer', 'modifier', 'confirm'];
  demandeDesaffectationCarteJockerList: DemandeDesaffectationCarteJockerResponse[] = [];
  dataSource = new MatTableDataSource<DemandeDesaffectationCarteJockerResponse>(this.demandeDesaffectationCarteJockerList);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarSuccesDeleteMsg = 'la demande de désaffectation de carte Jocker sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'la demande de désaffectation de carte Jocker sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'La modification de la demande de désaffectation de carte Jocker sélectionnée a été effectuée avec succès';
  snackBarFailureModificationMsg = 'la demande de désaffectation de carte Jocker sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'La confirmation de la demande de désaffectation sélectionnée a été effectuée avec succès';
  snackBarFailureConfirmationMsg = 'la confirmation de la demande de désaffectation sélectionnée ne pourra pas être effectuée, réessayez de nouveau s\'il vous plait';
  dateMin = '1970-01-01';
  dateMax = '1970-01-01';
  
CONFIRMATION_DEMANDE_DESAFFECTATION_CARTE_JOCKER: boolean;
VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER: boolean;
MODIFY_DEMANDE_DESAFFECTATION_CARTE_JOCKER: boolean;
DELETE_DEMANDE_DESAFFECTATION_CARTE_JOCKER: boolean;
ADD_DEMANDE_DESAFFECTATION_CARTE_JOCKER: boolean;

setDisplayedColumns() {
  this.CONFIRMATION_DEMANDE_DESAFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.CONFIRMATION_DEMANDE_DESAFFECTATION_CARTE_JOCKER;
  this.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER;
  this.MODIFY_DEMANDE_DESAFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.MODIFY_DEMANDE_DESAFFECTATION_CARTE_JOCKER;
  this.DELETE_DEMANDE_DESAFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.DELETE_DEMANDE_DESAFFECTATION_CARTE_JOCKER;
  this.ADD_DEMANDE_DESAFFECTATION_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.ADD_DEMANDE_DESAFFECTATION_CARTE_JOCKER;

}
  constructor( private Authentication: AuthenticationServiceService, private CarteJocker: CarteJockerServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.CarteJocker.getTotalNumberDemandesDesaffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CarteJocker.getPaginationHistoriqueDesaffectationCarteAgilis(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.demandeDesaffectationCarteJockerList = value;
      this.dataSource = new MatTableDataSource<DemandeDesaffectationCarteJockerResponse>(this.demandeDesaffectationCarteJockerList);
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

  


  ngOnInit(): void {
    this.DateMin.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      const DateMinMoment = moment(value as Date);
      this.paginConfig.currentPage = 0;
      this.dateMin = DateMinMoment.format('YYYY-MM-DD');
      this.CarteJocker.getTotalNumberDemandesDesaffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value1 => {
        this.paginConfig.totalItems = value1;
      });
      this.CarteJocker.getPaginationHistoriqueDesaffectationCarteAgilis(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
        this.demandeDesaffectationCarteJockerList = value1;
        this.dataSource = new MatTableDataSource<DemandeDesaffectationCarteJockerResponse>(this.demandeDesaffectationCarteJockerList);
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
      this.CarteJocker.getTotalNumberDemandesDesaffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value1 => {
        this.paginConfig.totalItems = value1;
      });
      this.CarteJocker.getPaginationHistoriqueDesaffectationCarteAgilis(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
        this.demandeDesaffectationCarteJockerList = value1;
        this.dataSource = new MatTableDataSource<DemandeDesaffectationCarteJockerResponse>(this.demandeDesaffectationCarteJockerList);
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
      this.CarteJocker.getTotalNumberDemandesDesaffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value1 => {
        this.paginConfig.totalItems = value1;
      });
      this.CarteJocker.getPaginationHistoriqueDesaffectationCarteAgilis(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
        this.demandeDesaffectationCarteJockerList = value1;
        this.dataSource = new MatTableDataSource<DemandeDesaffectationCarteJockerResponse>(this.demandeDesaffectationCarteJockerList);
        this.dataSource.sort = this.sort;
        this.ngxLoader.stop();
      }, error => {
        this.ngxLoader.stop();
        setTimeout(() => {
          this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
        }, 800);
      });
    });
    
    this.isEmpty();
  }

  isEmpty(){
    this.CarteJocker.listCarsAnnuler().subscribe((value:any)=>{
      console.log(value);
      if(value.length!=0){
        console.log(value.length);
      this.list=true;
      }
      this.ngxLoader.stop();
   });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  deleteRow(id: any) {
    const dialogRef = this.dialog.open(DeleteDemandeDesaffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {idCarte: id}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.paginConfig.currentPage = 0;
        this.ngxLoader.start();
        this.CarteJocker.getTotalNumberDemandesDesaffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value1 => {
          this.paginConfig.totalItems = value1;
        });
        this.CarteJocker.deleteSelectedHistoriqueDesaffectationCarteJocker(value).subscribe(value1 => {
          this.CarteJocker.getPaginationHistoriqueDesaffectationCarteAgilis(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value2 => {
            this.demandeDesaffectationCarteJockerList = value2;
            this.dataSource = new MatTableDataSource<DemandeDesaffectationCarteJockerResponse>(this.demandeDesaffectationCarteJockerList);
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
    this.CarteJocker.getPaginationHistoriqueDesaffectationCarteAgilis((paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.demandeDesaffectationCarteJockerList = value;
      this.dataSource = new MatTableDataSource<DemandeDesaffectationCarteJockerResponse>(this.demandeDesaffectationCarteJockerList);
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

  modifyRow(i: number) {
    const dialogRef = this.dialog.open(ModifyDemandeDesaffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {demandeDesaffectation: this.demandeDesaffectationCarteJockerList[i]}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.getTotalNumberDemandesDesaffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value1 => {
          this.paginConfig.totalItems = value1;
        });
        this.CarteJocker.modifySelectedDemandeDesaffectationCarteJocker(value).subscribe(value1 => {
          this.CarteJocker.getPaginationHistoriqueDesaffectationCarteAgilis( this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value2 => {
            this.demandeDesaffectationCarteJockerList = value2;
            this.dataSource = new MatTableDataSource<DemandeDesaffectationCarteJockerResponse>(this.demandeDesaffectationCarteJockerList);
            this.dataSource.sort = this.sort;
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
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureModificationMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });
  }

  redirectToVehicule(idVehicule: any) {

  }


  confirmRow(i: any) {
    const dialogRef = this.dialog.open(ConfirmDemandeDesaffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.confirmSelectedDemandeDesaffectationCarteJocker(value).subscribe(value1 => {
          this.CarteJocker.getTotalNumberDemandesDesaffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value2 => {
            this.paginConfig.totalItems = value2;
          });
          this.CarteJocker.getPaginationHistoriqueDesaffectationCarteAgilis(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value2 => {
            this.demandeDesaffectationCarteJockerList = value2;
            this.dataSource = new MatTableDataSource<DemandeDesaffectationCarteJockerResponse>(this.demandeDesaffectationCarteJockerList);
            this.dataSource.sort = this.sort;
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
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureConfirmationMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });
  }

  nouvelleDesaffectationCarteJocker() {
    const dialogRef = this.dialog.open(NouvelleDemandeDesaffectationCarteJockerComponent, {
      panelClass: 'mat-dialog-container-class'
    }); 
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.CarteJocker.createNouvelleDemandeDesaffectationCarteJockerRequest(value).subscribe(value1 => {
          
          this.CarteJocker.getTotalNumberDemandesDesaffectationCarteJockerByFilteredDate(this.dateMin, this.dateMax).subscribe(value2 => {
            this.paginConfig.totalItems = value2;
          });
          this.isEmpty();
          this.CarteJocker.getPaginationHistoriqueDesaffectationCarteAgilis(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value2 => {
            this.demandeDesaffectationCarteJockerList = value2;
            this.dataSource = new MatTableDataSource<DemandeDesaffectationCarteJockerResponse>(this.demandeDesaffectationCarteJockerList);
            this.dataSource.sort = this.sort;
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
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureConfirmationMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });
  } 
  

}
