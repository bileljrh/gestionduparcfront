import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReferentielGeneraleServiceService} from '../referentiel-generale-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NewExpertComponent} from './new-expert/new-expert.component';
import {ModifyExpertComponent} from './modify-expert/modify-expert.component';
import {DeleteExpertComponent} from './delete-expert/delete-expert.component';
import {Expert} from './expert';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../authentication-service.service';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss'],
  providers: [MatSnackBar]
})
export class ExpertsComponent implements OnDestroy {
  VIEW_EXPERTS: boolean;
  ADD_EXPERTS: boolean;
  MODIFY_EXPERTS: boolean;
  DELETE_EXPERTS: boolean;
  displayedColumns: string[] = [];
  ListElementTable: Expert[] = [];
  dataSource = new MatTableDataSource<Expert>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription[] = [];

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'expert sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'L\'expert sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau expert a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouveau expert ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'L\'expert sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'L\'expert sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Referentiel: ReferentielGeneraleServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
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
    const dialogRef = this.dialog.open(DeleteExpertComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedExpert(value3).subscribe(value2 => {
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

  modifyRow(id: any) {
    const dialogRef = this.dialog.open(ModifyExpertComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.modifySelectedExpert(value3).subscribe(value2 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouvelExpert() {
    const dialogRef = this.dialog.open(NewExpertComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewExpert(value3).subscribe(value2 => {
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
    this.subscription.push(this.Referentiel.getListExpert().subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Expert>(this.ListElementTable);
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
    this.VIEW_EXPERTS = this.Authentication.authoritiesUtilisateur.VIEW_EXPERTS;
    this.DELETE_EXPERTS = this.Authentication.authoritiesUtilisateur.DELETE_EXPERTS;
    this.ADD_EXPERTS = this.Authentication.authoritiesUtilisateur.ADD_EXPERTS;
    this.MODIFY_EXPERTS = this.Authentication.authoritiesUtilisateur.MODIFY_EXPERTS;
    if (this.DELETE_EXPERTS) {
      if (this.MODIFY_EXPERTS) {
        this.displayedColumns = ['index', 'code', 'designation', 'tel', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'tel', 'supprimer'];
      }
    } else {
      if (this.MODIFY_EXPERTS) {
        this.displayedColumns = ['index', 'code', 'designation', 'tel', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'tel'];
      }
    }
  }


}
