import {Component, OnDestroy, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdministrationServiceService} from '../administration-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Alerte} from './alerte';
import {DeleteAlerteComponent} from './delete-alerte/delete-alerte.component';
import {NewAlerteComponent} from './new-alerte/new-alerte.component';
import {ModifyAlerteComponent} from './modify-alerte/modify-alerte.component';
import {AuthenticationServiceService} from '../../../authentication-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alertes',
  templateUrl: './alertes.component.html',
  styleUrls: ['./alertes.component.scss'],
  providers: [MatSnackBar]
})
export class AlertesComponent implements OnDestroy {
  VIEW_ALERTES: boolean;
  ADD_ALERTES: boolean;
  MODIFY_ALERTES: boolean;
  DELETE_ALERTES: boolean;
  displayedColumns: string[] = [];
  ListElementTable: Alerte[] = [];
  dataSource = new MatTableDataSource<Alerte>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'alerte sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'L\'alerte sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle alerte a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle alerte ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'L\'alerte sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'L\'alerte sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  subscription: Subscription[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Administration: AdministrationServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.getTotalItems();
    this.ngxLoader.stop();
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
    const dialogRef = this.dialog.open(DeleteAlerteComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.deleteSelectedAlerte(value3).subscribe(value2 => {
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
    const dialogRef = this.dialog.open(ModifyAlerteComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.modifySelectedAlerte(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouvelleAlerte() {
    const dialogRef = this.dialog.open(NewAlerteComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.addNewAlerte(value3).subscribe(value2 => {
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
    this.subscription.push(this.Administration.getListAlerte().subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Alerte>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  setDisplayedColumns() {
    this.VIEW_ALERTES = this.Authentication.authoritiesUtilisateur.VIEW_ALERTES;
    this.ADD_ALERTES = this.Authentication.authoritiesUtilisateur.ADD_ALERTES;
    this.DELETE_ALERTES = this.Authentication.authoritiesUtilisateur.DELETE_ALERTES;
    this.MODIFY_ALERTES = this.Authentication.authoritiesUtilisateur.MODIFY_ALERTES;
    if (this.DELETE_ALERTES) {
      if (this.MODIFY_ALERTES) {
        this.displayedColumns = ['index', 'numero', 'code', 'message', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'numero', 'code', 'message', 'supprimer'];
      }
    } else {
      if (this.MODIFY_ALERTES) {
        this.displayedColumns = ['index', 'numero', 'code', 'message', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'numero', 'code', 'message'];
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}
