import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NewBeneficiaireEmpruntComponent} from './new-beneficiaire-emprunt/new-beneficiaire-emprunt.component';
import {ModifyBeneficiaireEmpruntComponent} from './modify-beneficiaire-emprunt/modify-beneficiaire-emprunt.component';
import {DeleteBeneficiaireEmpruntComponent} from './delete-beneficiaire-emprunt/delete-beneficiaire-emprunt.component';
import {ReferentielSpecifiqueServiceService} from '../referentiel-specifique-service.service';
import {BeneficiaireEmprunt} from './beneficiaire-emprunt';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../authentication-service.service';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-beneficiaire-emprunts',
  templateUrl: './beneficiaire-emprunts.component.html',
  styleUrls: ['./beneficiaire-emprunts.component.scss'],
  providers: [MatSnackBar]
})
export class BeneficiaireEmpruntsComponent implements OnInit, OnDestroy {

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  itemPerPage = new FormControl(null);

  VIEW_BENEFICIAIRES_EMPRUNTS: boolean;
  ADD_BENEFICIAIRES_EMPRUNTS: boolean;
  MODIFY_BENEFICIAIRES_EMPRUNTS: boolean;
  DELETE_BENEFICIAIRES_EMPRUNTS: boolean;
  subscription: Subscription[] = [];
  displayedColumns: string[] = [];
  ListElementTable: BeneficiaireEmprunt[] = [];
  dataSource = new MatTableDataSource<BeneficiaireEmprunt>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le bénéficiaire sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le bénéficiaire ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau bénéficiaire a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouveau bénéficiaire ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'Le bénéficiaire sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'Le bénéficiaire sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Referentiel: ReferentielSpecifiqueServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.getTotalItems();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      this.ngxLoader.stop();
    });
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
    const dialogRef = this.dialog.open(DeleteBeneficiaireEmpruntComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedBeneficiaireEmprunt(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModifyBeneficiaireEmpruntComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.modifySelectedBeneficiaireEmprunt(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouveauBeneficiaire() {
    const dialogRef = this.dialog.open(NewBeneficiaireEmpruntComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewBeneficiaireEmprunt(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
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
    this.subscription.push(this.Referentiel.getListBeneficiaireEmprunt(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<BeneficiaireEmprunt>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.subscription.push(this.Referentiel.getListBeneficiaireEmprunt((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<BeneficiaireEmprunt>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));

  }

  setDisplayedColumns() {
    this.VIEW_BENEFICIAIRES_EMPRUNTS = this.Authentication.authoritiesUtilisateur.VIEW_BENEFICIAIRES_EMPRUNTS;
    this.ADD_BENEFICIAIRES_EMPRUNTS = this.Authentication.authoritiesUtilisateur.ADD_BENEFICIAIRES_EMPRUNTS;
    this.DELETE_BENEFICIAIRES_EMPRUNTS = this.Authentication.authoritiesUtilisateur.DELETE_BENEFICIAIRES_EMPRUNTS;
    this.MODIFY_BENEFICIAIRES_EMPRUNTS = this.Authentication.authoritiesUtilisateur.MODIFY_BENEFICIAIRES_EMPRUNTS;
    if (this.DELETE_BENEFICIAIRES_EMPRUNTS) {
      if (this.MODIFY_BENEFICIAIRES_EMPRUNTS) {
        this.displayedColumns = ['index', 'code', 'nomBeneficiaire', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'nomBeneficiaire', 'supprimer'];
      }
    } else {
      if (this.MODIFY_BENEFICIAIRES_EMPRUNTS) {
        this.displayedColumns = ['index', 'code', 'nomBeneficiaire', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'nomBeneficiaire'];
      }
    }
  }


}
