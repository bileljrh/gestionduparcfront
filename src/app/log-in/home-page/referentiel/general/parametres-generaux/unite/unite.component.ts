import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Unite} from './unite';
import {DeleteUniteComponent} from './delete-unite/delete-unite.component';
import {NewUniteComponent} from './new-unite/new-unite.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';

@Component({
  selector: 'app-unite',
  templateUrl: './unite.component.html',
  styleUrls: ['./unite.component.scss']
})
export class UniteComponent implements OnInit, OnDestroy {
  VIEW_UNITES: boolean;
  ADD_UNITES: boolean;
  DELETE_UNITES: boolean;
  subscription: Subscription[] = [];
  displayedColumns: string[] = ['index', 'unite'];
  ListElementTable: Unite[] = [];
  dataSource = new MatTableDataSource<Unite>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'unité sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'L\'unité sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle unité a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle unité ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';


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
    const dialogRef = this.dialog.open(DeleteUniteComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedUnite(value3).subscribe(value2 => {
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


  ajouterNouvelleUnite() {
    const dialogRef = this.dialog.open(NewUniteComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewUnite(value3).subscribe(value2 => {
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
    this.subscription.push(this.Referentiel.getListUnite().subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Unite>(this.ListElementTable);
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
    this.VIEW_UNITES = this.Authentication.authoritiesUtilisateur.VIEW_UNITES;
    this.ADD_UNITES = this.Authentication.authoritiesUtilisateur.ADD_UNITES;
    this.DELETE_UNITES = this.Authentication.authoritiesUtilisateur.DELETE_UNITES;
    if (this.DELETE_UNITES) {
      this.displayedColumns = ['index', 'unite', 'supprimer'];
    } else {
      this.displayedColumns = ['index', 'unite'];
    }
  }

}
