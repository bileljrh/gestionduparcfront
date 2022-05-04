import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DeleteFamilleArticleComponent} from '../referentiel/general/articles/famille-articles/delete-famille-article/delete-famille-article.component';
import {AdministrationServiceService} from '../administration/administration-service.service';
import {Message} from './message';
import {AuthenticationServiceService} from '../../authentication-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [MatSnackBar]
})
export class MessageComponent implements OnInit, OnDestroy {
  isAdministrator: boolean;
  displayedColumns: string[] = ['index', 'nom', 'prenom', 'matricule', 'dateDemande', 'supprimer'];
  ListElementTable: Message[] = [];
  dataSource = new MatTableDataSource<any>(this.ListElementTable);
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le message sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le message sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  @ViewChild(MatSort) sort: MatSort;
  subscription: Subscription[] = [];
  structure = 'tousStrucutures';

  constructor(private Administration: AdministrationServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private Authentication: AuthenticationServiceService, private ngxLoader: NgxUiLoaderService) {
    ngxLoader.start();
    this.isAdministrator = Authentication.isAdministrator();
    if (!this.Authentication.isSuperAdmin()) {
      this.structure = this.Authentication.getUserStrucutures()[0].designation;
    }
    this.getMessages();
    ngxLoader.stop();
  }


  ngOnInit(): void {
  }

  deleteRow(i: any) {
    const dialogRef = this.dialog.open(DeleteFamilleArticleComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Administration.deleteSelectedMessage(i).subscribe(value => {
          this.getMessages();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }


  getMessages() {
    this.subscription.push(this.Administration.getListMessage(this.structure).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<any>(this.ListElementTable);
      this.dataSource.sort = this.sort;
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

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}
