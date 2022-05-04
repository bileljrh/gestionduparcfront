import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NewPersonnelComponent} from './new-personnel/new-personnel.component';
import {DeletePersonnelComponent} from './delete-personnel/delete-personnel.component';
import {ModifyPersonnelComponent} from './modify-personnel/modify-personnel.component';
import {ReferentielSpecifiqueServiceService} from '../referentiel-specifique-service.service';
import {Personnel} from './personnel';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../authentication-service.service';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-details-personnel',
  templateUrl: './details-personnel.component.html',
  styleUrls: ['./details-personnel.component.scss'],
  providers: [MatSnackBar]
})
export class DetailsPersonnelComponent implements OnInit, OnDestroy {
 
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  itemPerPage = new FormControl(null);
  
  VIEW_DETAILS_PERSONNELS: boolean;
  ADD_DETAILS_PERSONNELS: boolean;
  MODIFY_DETAILS_PERSONNELS: boolean;
  DELETE_DETAILS_PERSONNELS: boolean;
  subscription: Subscription[] = [];
  displayedColumns: string[] = [];
  ListElementTable: Personnel[] = [];
  dataSource = new MatTableDataSource<Personnel>(this.ListElementTable);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarFailureUploadingImageMsg = 'L\'image du personnel sélectionné ne pourra pas être chargée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le personnel sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'Le personnel sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau personnel a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouveau personnel ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'Le personnel sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'Le personnel sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';

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
    const dialogRef = this.dialog.open(DeletePersonnelComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedPersonnel(value3).subscribe(value2 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyPersonnelComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[i]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.modifySelectedPersonnel(value3.modifiedPersonnel).subscribe(value2 => {
          if (value3.imagePersonnel !== undefined) {
            this.Referentiel.uploadImagePersonnel(value2, value3.imagePersonnel).subscribe(value => {
            }, error => {
              this.displayNotification(this.snackBarFailureUploadingImageMsg);
            });
          }
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajouterNouveauPersonnel() {
    const dialogRef = this.dialog.open(NewPersonnelComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewPersonnel(value3.newPersonnel).subscribe(value2 => {
          if (value3.imagePersonnel !== undefined) {
            this.Referentiel.uploadImagePersonnel(value2, value3.imagePersonnel).subscribe(value => {
            }, error => {
              this.displayNotification(this.snackBarFailureUploadingImageMsg);
            });
          }
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
    this.subscription.push(this.Referentiel.getListPersonnel(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Personnel>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.subscription.push(this.Referentiel.getListPersonnel((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Personnel>(this.ListElementTable);
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
    this.VIEW_DETAILS_PERSONNELS = this.Authentication.authoritiesUtilisateur.VIEW_DETAILS_PERSONNELS;
    this.ADD_DETAILS_PERSONNELS = this.Authentication.authoritiesUtilisateur.ADD_DETAILS_PERSONNELS;
    this.DELETE_DETAILS_PERSONNELS = this.Authentication.authoritiesUtilisateur.DELETE_DETAILS_PERSONNELS;
    this.MODIFY_DETAILS_PERSONNELS = this.Authentication.authoritiesUtilisateur.MODIFY_DETAILS_PERSONNELS;
    if (this.DELETE_DETAILS_PERSONNELS) {
      if (this.MODIFY_DETAILS_PERSONNELS) {
        this.displayedColumns = ['index', 'immatriculationUnique', 'prenom', 'nom', 'structure', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'immatriculationUnique', 'prenom', 'nom', 'structure', 'supprimer'];
      }
    } else {
      if (this.MODIFY_DETAILS_PERSONNELS) {
        this.displayedColumns = ['index', 'immatriculationUnique', 'prenom', 'nom', 'structure', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'immatriculationUnique', 'prenom', 'nom', 'structure'];
      }
    }
  }

}
