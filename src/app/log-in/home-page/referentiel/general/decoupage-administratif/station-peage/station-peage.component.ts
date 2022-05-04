import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Gouvernorat} from '../gouvernorat';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DeleteStationPeageComponent} from './delete-station-peage/delete-station-peage.component';
import {ModifyStationPeageComponent} from './modify-station-peage/modify-station-peage.component';
import {NewStationPeageComponent} from './new-station-peage/new-station-peage.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';

@Component({
  selector: 'app-station-peage',
  templateUrl: './station-peage.component.html',
  styleUrls: ['./station-peage.component.scss'],
  providers: [MatSnackBar]
})
export class StationPeageComponent implements OnInit, OnDestroy {
  VIEW_STATIONS_PEAGE: boolean;
  ADD_STATIONS_PEAGE: boolean;
  MODIFY_STATIONS_PEAGE: boolean;
  DELETE_STATIONS_PEAGE: boolean;
  displayedColumns: string[] = [];
  ListElementTable: Gouvernorat[] = [];
  dataSource = new MatTableDataSource<Gouvernorat>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription[] = [];

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La station de péage a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La station de péage sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle station de péage a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle station de péage ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'La station de péage sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'La station de péage sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';

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
    const dialogRef = this.dialog.open(DeleteStationPeageComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedStationPeage(value3).subscribe(value2 => {
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
    const dialogRef = this.dialog.open(ModifyStationPeageComponent, {
      width: '900px',
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.modifySelectedStationPeage(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouveauStationPeage() {
    const dialogRef = this.dialog.open(NewStationPeageComponent, {
      width: '900px',
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewStationPeage(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingMsg);
        }));
      }
    }));
  }

  getTotalItems() {
    this.subscription.push(this.Referentiel.getListStationPeage().subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Gouvernorat>(this.ListElementTable);
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

  setDisplayedColumns() {
    this.VIEW_STATIONS_PEAGE = this.Authentication.authoritiesUtilisateur.VIEW_STATIONS_PEAGE;
    this.ADD_STATIONS_PEAGE = this.Authentication.authoritiesUtilisateur.ADD_STATIONS_PEAGE;
    this.DELETE_STATIONS_PEAGE = this.Authentication.authoritiesUtilisateur.DELETE_STATIONS_PEAGE;
    this.MODIFY_STATIONS_PEAGE = this.Authentication.authoritiesUtilisateur.MODIFY_STATIONS_PEAGE;
    if (this.DELETE_STATIONS_PEAGE) {
      if (this.MODIFY_STATIONS_PEAGE) {
        this.displayedColumns = ['index', 'designation', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'designation', 'supprimer'];
      }
    } else {
      if (this.MODIFY_STATIONS_PEAGE) {
        this.displayedColumns = ['index', 'designation', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'designation'];
      }
    }
  }

}
