import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HistoriqueAffectationCartePlafond} from './historique-affectation-carte-plafond';
import {MatDialog} from '@angular/material/dialog';
import {DeleteHistoriqueAffectationCartePlafondComponent} from './delete-historique-affectation-carte-plafond/delete-historique-affectation-carte-plafond.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {FormControl} from '@angular/forms';
import {PaginationConfiguration} from '../../../pagination-configuration';
import {CartePlafondServiceService} from '../carte-plafond-service.service';
import {FicheVehiculeComponent} from '../../../administratif/vehicules/fiche-vehicule/fiche-vehicule.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-historique-affectation-carte-plafond',
  templateUrl: './historique-affectation-carte-plafond.component.html',
  styleUrls: ['./historique-affectation-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class HistoriqueAffectationCartePlafondComponent implements OnInit {
  Structure: string[] = ['Structure 1', 'Structure 2', 'Structure 3', 'Structure 4', 'Structure 5'];
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  displayedColumns: string[] = ['index', 'structure', 'numeroCarte', 'montant', 'nomBeneficiaire', 'matriculeBeneficiaire', 'numeroPlaque', 'typeCarburant', 'dateAffectation', 'vehicule', 'supprimer'];
  historiqueAffectation: HistoriqueAffectationCartePlafond[] = [];
  dataSource = new MatTableDataSource<HistoriqueAffectationCartePlafond>(this.historiqueAffectation);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La suppression d\'historique d\'affectation sélectionné a été effectuée avec succées';
  snackBarFailureDeleteMsg = 'L\'historique d\'affectation sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  typeCarburant = new FormControl(null);
  itemPerPage = new FormControl(null);
  selectedTypeCarburant: string;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  constructor( private Authentication: AuthenticationServiceService, private CartePlafond: CartePlafondServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.selectedTypeCarburant = 'tousTypes';
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();
  }
  VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean;
  DELETE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean; 
  VEHICULE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean; 
  setDisplayedColumns() {
    this.VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND;

    this.DELETE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.DELETE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND;
    this.VEHICULE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.VEHICULE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND;

  }  


  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.itemsPerPage = value;
      this.paginConfig.currentPage = 0;
      this.getTotalItems();
      this.ngxLoader.stop();
    });
    this.typeCarburant.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      if (value === undefined) {
        this.selectedTypeCarburant = 'tousTypes';
      } else {
        this.selectedTypeCarburant = value;
      }
      this.paginConfig.currentPage = 0;
      this.getTotalItems();
      this.ngxLoader.stop();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  deleteRow(i: number) {
    const dialogRef = this.dialog.open(DeleteHistoriqueAffectationCartePlafondComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.CartePlafond.deleteSelectedHistoriqueAffectationCartePlafond(value).subscribe(value1 => {
          this.paginConfig.currentPage = 0;
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.CartePlafond.getPaginationHistoriqueAffectationCartePlafond((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString(), this.selectedTypeCarburant).subscribe(value => {
      this.historiqueAffectation = value;
      this.dataSource = new MatTableDataSource<HistoriqueAffectationCartePlafond>(this.historiqueAffectation);
      this.dataSource.sort = this.sort;
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  getTotalItems() {
    this.CartePlafond.getTotalItemsHistoriqueAffectationCartesPlafondBySelection(this.selectedTypeCarburant).subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CartePlafond.getPaginationHistoriqueAffectationCartePlafond(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(), this.selectedTypeCarburant).subscribe(value => {
      this.historiqueAffectation = value;
      this.dataSource = new MatTableDataSource<HistoriqueAffectationCartePlafond>(this.historiqueAffectation);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
      this.ngxLoader.stop();
    });
  }

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  redirectToVehicule(i: number) {
    const dialogRef = this.dialog.open(FicheVehiculeComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1100px',
      data: {id: i}
    });
  }


}
