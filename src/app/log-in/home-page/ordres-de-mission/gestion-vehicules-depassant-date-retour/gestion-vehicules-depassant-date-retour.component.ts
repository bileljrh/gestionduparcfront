import {Component, OnInit, ViewChild} from '@angular/core';
import {OrdreMissionTableData} from '../gestion-ordre-mission/ordre-mission-table-data';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PaginationConfiguration} from '../../pagination-configuration';
import {FormControl} from '@angular/forms';
import {OrdreMissionServiceService} from '../ordre-mission-service.service';
import {ExploitationServiceService} from '../../exploitation/exploitation-service.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DeleteOrdreMissionComponent} from '../gestion-ordre-mission/delete-ordre-mission/delete-ordre-mission.component';
import {FicheVehiculeComponent} from '../../administratif/vehicules/fiche-vehicule/fiche-vehicule.component';
import {ReadMoreVehiculeDepassantDateRetourComponent} from './read-more-vehicule-depassant-date-retour/read-more-vehicule-depassant-date-retour.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-gestion-vehicules-depassant-date-retour',
  templateUrl: './gestion-vehicules-depassant-date-retour.component.html',
  styleUrls: ['./gestion-vehicules-depassant-date-retour.component.scss'],
  providers: [MatSnackBar]
})
export class GestionVehiculesDepassantDateRetourComponent implements OnInit {
  // @ts-ignore
  displayedColumns: string[] = ['index', 'numeroOrdre', 'numeroPlaque', 'structure', 'dateOrdre', 'vehicule', 'details', 'supprimer'];
  listElements: OrdreMissionTableData[] = [];
  dataSource = new MatTableDataSource<OrdreMissionTableData>(this.listElements);
  VIEW_MISSION:boolean;
  VEHICULE_VEHICULE_DEPASSANT:boolean;
  DELETE_VEHICULE_DEPASSANT:boolean;     
  DETAILS_VEHICULE_DEPASSANT :boolean; 
  VIEW_VEHICULE_DEPASSANT :boolean; 
  @ViewChild(MatSort) sort: MatSort;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 10
  };
  itemPerPageForm = new FormControl(10);
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouvel ordre de mission a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouvel ordre de mission ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'ordre de mission a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'L\'ordre de mission sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'L\'ordre de mission sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'L\'ordre de mission ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'L\'ordre de mission sélectionné a été confirmé avec succès';
  snackBarFailureConfirmationMsg = 'L\'ordre de mission sélectionné ne pourra pas être confirmé, réessayez de nouveau s\'il vous plait';

  constructor(private Authentication: AuthenticationServiceService,private OrdreMission: OrdreMissionServiceService, private Exploitation: ExploitationServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.ngxLoader.stop();
    this.setDisplayedColumns();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  setDisplayedColumns() {
    this.DETAILS_VEHICULE_DEPASSANT = this.Authentication.authoritiesUtilisateur.DETAILS_VEHICULE_DEPASSANT;
    this.DELETE_VEHICULE_DEPASSANT = this.Authentication.authoritiesUtilisateur.DELETE_VEHICULE_DEPASSANT;
    this.VIEW_VEHICULE_DEPASSANT = this.Authentication.authoritiesUtilisateur.VIEW_VEHICULE_DEPASSANT;
    this.VEHICULE_VEHICULE_DEPASSANT = this.Authentication.authoritiesUtilisateur.VEHICULE_VEHICULE_DEPASSANT;

    console.log(this.Authentication.authoritiesUtilisateur.VIEW_VEHICULE_DEPASSANT);
}

  ngOnInit(): void {
    this.itemPerPageForm.valueChanges.subscribe(value => {
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
      this.setDisplayedColumns();
    });
  }


  deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeleteOrdreMissionComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.OrdreMission.deleteSelectedOrdreMission(value3).subscribe(value => {
          this.paginConfig.currentPage = 0;
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }

  viewMore(i: number) {
    const dialogRef = this.dialog.open(ReadMoreVehiculeDepassantDateRetourComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.listElements[i]}
    });
  }

  displayPageContent(paginConfig: any) {
    this.OrdreMission.getPaginationVehiculeListDepassantDateRetour((this.paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
      this.listElements = value1;
      this.dataSource = new MatTableDataSource<OrdreMissionTableData>(this.listElements);
      this.dataSource.sort = this.sort;
    }, error => {
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  redirect2Vehicule(idVehicule: any) {
    const dialogRef = this.dialog.open(FicheVehiculeComponent, {
      width: '1100px',
      panelClass: 'mat-dialog-container-class',
      data: {id: idVehicule}
    });
  }

  getTotalItems() {
    this.OrdreMission.getTotalItemsVehiculeListDepassantDateRetour().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.OrdreMission.getPaginationVehiculeListDepassantDateRetour(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.listElements = value;
      this.dataSource = new MatTableDataSource<OrdreMissionTableData>(this.listElements);
      this.dataSource.sort = this.sort;
    }, error => {
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
  }

  showNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }

}
