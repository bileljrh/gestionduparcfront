import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Annee} from './annee';
import {DeleteAnneeComponent} from './delete-annee/delete-annee.component';
import {NewAnneeComponent} from './new-annee/new-annee.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';

@Component({
  selector: 'app-annee',
  templateUrl: './annee.component.html',
  styleUrls: ['./annee.component.scss']
})
export class AnneeComponent implements OnInit, OnDestroy {
  VIEW_ANNEES: boolean;
  ADD_ANNEES: boolean;
  DELETE_ANNEES: boolean;
  displayedColumns: string[] = ['index', 'annee', 'supprimer'];
  ListElementTable: Annee[] = [];
  dataSource = new MatTableDataSource<Annee>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'année sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'L\'année sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle année a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle année ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'L\'année sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'L\'année sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  subscription: Subscription[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Referentiel: ReferentielGeneraleServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.getTotalItems();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
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
    const dialogRef = this.dialog.open(DeleteAnneeComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedAnnee(value3).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }


  ajouterNouvelleAnnee() {
    const dialogRef = this.dialog.open(NewAnneeComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewAnnee(value3).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingMsg);
        }));
      }
    }));
  }

  getTotalItems() {
    this.subscription.push(this.Referentiel.getListAnnee().subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Annee>(this.ListElementTable);
      this.dataSource.sort = this.sort;
    }, error => {
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

  setDisplayedColumns() {
    this.VIEW_ANNEES = this.Authentication.authoritiesUtilisateur.VIEW_ANNEES;
    this.ADD_ANNEES = this.Authentication.authoritiesUtilisateur.ADD_ANNEES;
    this.DELETE_ANNEES = this.Authentication.authoritiesUtilisateur.DELETE_ANNEES;
    if (this.DELETE_ANNEES) {
      this.displayedColumns = ['index', 'annee', 'supprimer'];
    } else {
      this.displayedColumns = ['index', 'annee'];
    }
  }
}
