import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PaginationConfiguration} from '../../pagination-configuration';
import {FormControl} from '@angular/forms';
import {ExploitationServiceService} from '../../exploitation/exploitation-service.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {FicheVehiculeComponent} from '../../administratif/vehicules/fiche-vehicule/fiche-vehicule.component';
import {OrdreMissionServiceService} from '../ordre-mission-service.service';
import {NouveauOrdreMissionComponent} from './nouveau-ordre-mission/nouveau-ordre-mission.component';
import {DeleteOrdreMissionComponent} from './delete-ordre-mission/delete-ordre-mission.component';
import {ModifyOrdreMissionComponent} from './modify-ordre-mission/modify-ordre-mission.component';
import {ConfirmOrdreMissionComponent} from './confirm-ordre-mission/confirm-ordre-mission.component';
import {OrdreMissionTableData} from './ordre-mission-table-data';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-gestion-ordre-mission',
  templateUrl: './gestion-ordre-mission.component.html',
  styleUrls: ['./gestion-ordre-mission.component.scss'],
  providers: [MatSnackBar]
})
export class GestionOrdreMissionComponent implements OnInit {
  Status: string[] = ['En cours', 'Confirmée'];
  // @ts-ignore
  displayedColumns: string[] = ['index', 'numeroOrdre', 'numeroPlaque', 'structure', 'dateOrdre', 'vehicule', 'confirmer', 'modifier', 'supprimer'];
  listElements: OrdreMissionTableData[] = [];
  dataSource = new MatTableDataSource<OrdreMissionTableData>(this.listElements);
  VIEW_ORDRE_MISSION:boolean;
  ADD_ORDRE_MISSION:boolean;
  MODIFY_ORDRE_MISSION:boolean;
  DELETE_ORDRE_MISSION:boolean;
  VEHICULE_ORDRE_MISSION:boolean;
  CONFIRMER_ORDRE_MISSION:boolean;
  @ViewChild(MatSort) sort: MatSort;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 10
  };
  itemPerPageForm = new FormControl(10);
  statusForm = new FormControl(null);
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
  status = 'allStatus';

  setDisplayedColumns() {
    this.ADD_ORDRE_MISSION = this.Authentication.authoritiesUtilisateur.ADD_ORDRE_MISSION;
    this.MODIFY_ORDRE_MISSION = this.Authentication.authoritiesUtilisateur.MODIFY_ORDRE_MISSION;
    this.DELETE_ORDRE_MISSION = this.Authentication.authoritiesUtilisateur.DELETE_ORDRE_MISSION;
    this.VIEW_ORDRE_MISSION = this.Authentication.authoritiesUtilisateur.VIEW_ORDRE_MISSION;
    this.VEHICULE_ORDRE_MISSION = this.Authentication.authoritiesUtilisateur.VEHICULE_ORDRE_MISSION;
    this.CONFIRMER_ORDRE_MISSION = this.Authentication.authoritiesUtilisateur.CONFIRMER_ORDRE_MISSION;
}
  constructor( private Authentication: AuthenticationServiceService,private OrdreMission: OrdreMissionServiceService, private Exploitation: ExploitationServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.ngxLoader.stop();
    this.setDisplayedColumns();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.itemPerPageForm.valueChanges.subscribe(value => {
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
    });
    this.statusForm.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.status = 'allStatus';
      } else {
        this.status = value2;
      }
      this.getTotalItems();
      this.ngxLoader.stop();
    });
  }

  ajouterNouvelOrdreMission() {
    const dialogRef = this.dialog.open(NouveauOrdreMissionComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.OrdreMission.addNewOrdreMission(value3).subscribe(value => {
          this.paginConfig.currentPage = 0;
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
          this.getTotalItems();
        });
      }
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

  modifyRow(i: number) {
    const dialogRef = this.dialog.open(ModifyOrdreMissionComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.listElements[i]}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.OrdreMission.modifySelectedOrdreMission(value3).subscribe(value => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesModifyingMsg);
          this.getTotalItems();
        });
        this.ngxLoader.stop();
      }
    });
  }

  displayPageContent(paginConfig: any) {
    this.OrdreMission.getPaginationOrdreMissionListBySelectedEtat(this.status, (this.paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
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

  confirmRow(index: any) {
    const dialogRef = this.dialog.open(ConfirmOrdreMissionComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.OrdreMission.confirmSelectedOrdreMission(value3).subscribe(value => {
          this.paginConfig.currentPage = 0;
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesConfirmationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureConfirmationMsg);
        });
      }
    });
  }

  getTotalItems() {
    this.OrdreMission.getTotalItemsOrdreMissionListBySelectedEtat(this.status).subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.OrdreMission.getPaginationOrdreMissionListBySelectedEtat(this.status, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
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
