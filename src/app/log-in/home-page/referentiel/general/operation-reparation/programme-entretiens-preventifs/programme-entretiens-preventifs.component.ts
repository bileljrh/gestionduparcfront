import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {TypeVehicule} from '../../parametres-vehicules/type-vehicule/type-vehicule';
import {MarqueVehicule} from '../../parametres-vehicules/marque-vehicule/marque-vehicule';
import {FormControl} from '@angular/forms';
import {ProgrammeEntretiensPreventifs} from './programme-entretiens-preventifs';
import {DeleteProgrammeEntretienComponent} from './delete-programme-entretien/delete-programme-entretien.component';
import {ModifyProgrammeEntretienComponent} from './modify-programme-entretien/modify-programme-entretien.component';
import {NewProgrammeEntretienComponent} from './new-programme-entretien/new-programme-entretien.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-programme-entretiens-preventifs',
  templateUrl: './programme-entretiens-preventifs.component.html',
  styleUrls: ['./programme-entretiens-preventifs.component.scss']
})
export class ProgrammeEntretiensPreventifsComponent implements OnInit, OnDestroy {
 
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  itemPerPage = new FormControl(null);
  
  VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS: boolean;
  ADD_PROGRAMMES_ENTRETIENS_PREVENTIFS: boolean;
  MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS: boolean;
  DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS: boolean;
  subscription: Subscription[] = [];
  displayedColumns: string[] = [];
  ListElementTable: ProgrammeEntretiensPreventifs[] = [];
  dataSource = new MatTableDataSource<ProgrammeEntretiensPreventifs>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le programme sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le programme sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau programme a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouveau programme ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'Le programme sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'Le programme sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  TypeVehiculeControl = new FormControl(null);
  MarqueVehiculeControl = new FormControl(null);
  ListTypeVehicule: TypeVehicule[] = [];
  ListMarqueVehicule: MarqueVehicule[] = [];
  type = 'tousTypes';
  marque = 'tousMarques';
  codeMarque = '';
  codeType = '';

  constructor(public dialog: MatDialog, private ngxLoader: NgxUiLoaderService, private snackBar: MatSnackBar, private Referentiel: ReferentielGeneraleServiceService, private Authentication: AuthenticationServiceService) {
    this.subscription.push(this.Referentiel.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListMarqueVehicule = value;
    }));
    this.setDisplayedColumns();
    this.getTotalItems();
  }

  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      this.ngxLoader.stop();
    });
    this.subscription.push(this.TypeVehiculeControl.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.type = 'tousTypes';
        this.codeType = '';
      } else {
        this.type = value.designation;
        this.codeType = value.code;
      }
      this.getTotalItems();
    }));
    this.subscription.push(this.MarqueVehiculeControl.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.TypeVehiculeControl.reset({eventEmitter: false});
        this.ListTypeVehicule = [];
        this.marque = 'tousMarques';
        this.codeType = '';
        this.codeMarque = '';
      } else {
        this.marque = value.designation;
        this.codeMarque = value.code;
        this.ListTypeVehicule = value.types;
        this.codeType = '';
        this.TypeVehiculeControl.reset({eventEmitter: false});
        this.type = 'tousTypes';
      }
      this.getTotalItems();
    }));
  }

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRow(i: any) {
    const dialogRef = this.dialog.open(DeleteProgrammeEntretienComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.deleteSelectedProgrammeEntretiensPreventifs(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModifyProgrammeEntretienComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.modifySelectedProgrammeEntretiensPreventifs(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouveauProgramme() {
    const dialogRef = this.dialog.open(NewProgrammeEntretienComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.Referentiel.addNewProgrammeEntretiensPreventifs(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureAddingMsg);
        }));
      }
    }));
  }
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
  getTotalItems() {
    this.subscription.push(this.Referentiel.getListProgrammeEntretiensPreventifs(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),this.marque, this.type).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<ProgrammeEntretiensPreventifs>(this.ListElementTable);
      this.dataSource.sort = this.sort;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.subscription.push(this.Referentiel.getListProgrammeEntretiensPreventifs((paginConfig.currentPage - 1).toString(),paginConfig.itemsPerPage.toString(),this.marque, this.type).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<ProgrammeEntretiensPreventifs>(this.ListElementTable);
      this.dataSource.sort = this.sort;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));}
  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

  setDisplayedColumns() {
    this.VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS = this.Authentication.authoritiesUtilisateur.VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS;
    this.ADD_PROGRAMMES_ENTRETIENS_PREVENTIFS = this.Authentication.authoritiesUtilisateur.ADD_PROGRAMMES_ENTRETIENS_PREVENTIFS;
    this.DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS = this.Authentication.authoritiesUtilisateur.DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS;
    this.MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS = this.Authentication.authoritiesUtilisateur.MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS;
    if (this.DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS) {
      if (this.MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS) {
        this.displayedColumns = ['index', 'code', 'designation', 'marque', 'type', 'energie', 'cycle', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'marque', 'type', 'energie', 'cycle', 'supprimer'];
      }
    } else {
      if (this.MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS) {
        this.displayedColumns = ['index', 'code', 'designation', 'marque', 'type', 'energie', 'cycle', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'marque', 'type', 'energie', 'cycle'];
      }
    }
  }

}
