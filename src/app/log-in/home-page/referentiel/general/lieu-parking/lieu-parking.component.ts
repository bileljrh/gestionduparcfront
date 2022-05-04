import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../referentiel-generale-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Gouvernorat} from '../decoupage-administratif/gouvernorat';
import {FormControl} from '@angular/forms';
import {LieuParking} from './lieu-parking';
import {ModifyLieuParkingComponent} from './modify-lieu-parking/modify-lieu-parking.component';
import {DeleteLieuParkingComponent} from './delete-lieu-parking/delete-lieu-parking.component';
import {NewLieuParkingComponent} from './new-lieu-parking/new-lieu-parking.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../authentication-service.service';

@Component({
  selector: 'app-lieu-parking',
  templateUrl: './lieu-parking.component.html',
  styleUrls: ['./lieu-parking.component.scss'],
  providers: [MatSnackBar]
})
export class LieuParkingComponent implements OnInit, OnDestroy {
  VIEW_LIEUX_PARKING: boolean;
  ADD_LIEUX_PARKING: boolean;
  MODIFY_LIEUX_PARKING: boolean;
  DELETE_LIEUX_PARKING: boolean;
  displayedColumns: string[] = [];
  ListElementTable: LieuParking[] = [];
  ListGouvernorat: Gouvernorat[] = [];
  dataSource = new MatTableDataSource<LieuParking>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  gouvernoratControl = new FormControl(null);
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le lieu de parking sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le lieu de parking sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau lieu de parking a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouveau lieu de parking ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'Le lieu de parking sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'Le lieu de parking sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  gouvernorat = 'tousGouvernorats';
  subscription: Subscription[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Referentiel: ReferentielGeneraleServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.subscription.push(this.Referentiel.getListGouvernorat().subscribe(value => {
      this.ListGouvernorat = value;
    }));
    this.getTotalItems();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.subscription.push(this.gouvernoratControl.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.gouvernorat = 'tousGouvernorats';
      } else {
        this.gouvernorat = value.designation;
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
    const dialogRef = this.dialog.open(DeleteLieuParkingComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Referentiel.deleteSelectedLieuParking(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        });
      }
    }));
  }

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModifyLieuParkingComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Referentiel.modifySelectedLieuParking(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        });
      }
    }));
  }

  ajouterNouveauLieu() {
    const dialogRef = this.dialog.open(NewLieuParkingComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Referentiel.addNewLieuParking(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingMsg);
        });
      }
    }));
  }

  getTotalItems() {
    this.subscription.push(this.Referentiel.getListLieuParkingByGouvernorat(this.gouvernorat).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<LieuParking>(this.ListElementTable);
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
    this.VIEW_LIEUX_PARKING = this.Authentication.authoritiesUtilisateur.VIEW_LIEUX_PARKING;
    this.ADD_LIEUX_PARKING = this.Authentication.authoritiesUtilisateur.ADD_LIEUX_PARKING;
    this.DELETE_LIEUX_PARKING = this.Authentication.authoritiesUtilisateur.DELETE_LIEUX_PARKING;
    this.MODIFY_LIEUX_PARKING = this.Authentication.authoritiesUtilisateur.MODIFY_LIEUX_PARKING;
    if (this.DELETE_LIEUX_PARKING) {
      if (this.MODIFY_LIEUX_PARKING) {
        this.displayedColumns = ['index', 'code', 'adresse', 'gouvernorat', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'adresse', 'gouvernorat', 'supprimer'];
      }
    } else {
      if (this.MODIFY_LIEUX_PARKING) {
        this.displayedColumns = ['index', 'code', 'adresse', 'gouvernorat', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'adresse', 'gouvernorat'];
      }
    }
  }

}
