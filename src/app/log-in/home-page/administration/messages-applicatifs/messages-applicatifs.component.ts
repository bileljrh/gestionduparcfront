import {Component, OnDestroy, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MessageApplicatif} from './message-applicatif';
import {DeleteMessageApplicationComponent} from './delete-message-application/delete-message-application.component';
import {AdministrationServiceService} from '../administration-service.service';
import {ModifyMessageApplicationComponent} from './modify-message-application/modify-message-application.component';
import {NewMessageApplicationComponent} from './new-message-application/new-message-application.component';
import {AuthenticationServiceService} from '../../../authentication-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-messages-applicatifs',
  templateUrl: './messages-applicatifs.component.html',
  styleUrls: ['./messages-applicatifs.component.scss'],
  providers: [MatSnackBar]
})
export class MessagesApplicatifsComponent implements OnDestroy {
  VIEW_MESSAGES_APPLICATIFS: boolean;
  ADD_MESSAGES_APPLICATIFS: boolean;
  MODIFY_MESSAGES_APPLICATIFS: boolean;
  DELETE_MESSAGES_APPLICATIFS: boolean;
  displayedColumns: string[] = [];
  ListElementTable: MessageApplicatif[] = [];
  dataSource = new MatTableDataSource<MessageApplicatif>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription[] = [];

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le message sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le message sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau message a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouveau message ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'Le message sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'Le message sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';

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
    const dialogRef = this.dialog.open(DeleteMessageApplicationComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.deleteSelectedMessageApplicatif(value3).subscribe(value2 => {
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
    const dialogRef = this.dialog.open(ModifyMessageApplicationComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.modifySelectedMessageApplicatif(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouveauMessage() {
    const dialogRef = this.dialog.open(NewMessageApplicationComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.addNewMessageApplicatif(value3).subscribe(value2 => {
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
    this.subscription.push(this.Administration.getListMessageApplicatif().subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<MessageApplicatif>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  setDisplayedColumns() {
    this.VIEW_MESSAGES_APPLICATIFS = this.Authentication.authoritiesUtilisateur.VIEW_MESSAGES_APPLICATIFS;
    this.ADD_MESSAGES_APPLICATIFS = this.Authentication.authoritiesUtilisateur.ADD_MESSAGES_APPLICATIFS;
    this.DELETE_MESSAGES_APPLICATIFS = this.Authentication.authoritiesUtilisateur.DELETE_MESSAGES_APPLICATIFS;
    this.MODIFY_MESSAGES_APPLICATIFS = this.Authentication.authoritiesUtilisateur.MODIFY_MESSAGES_APPLICATIFS;
    if (this.DELETE_MESSAGES_APPLICATIFS) {
      if (this.MODIFY_MESSAGES_APPLICATIFS) {
        this.displayedColumns = ['index', 'numero', 'code', 'message', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'numero', 'code', 'message', 'supprimer'];
      }
    } else {
      if (this.MODIFY_MESSAGES_APPLICATIFS) {
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
