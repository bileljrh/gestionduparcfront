import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { PaginationConfiguration } from '../../pagination-configuration';
import { Structure } from '../../referentiel/specifique/structure-administrative/structure';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { DemandeMaintenance } from '../gestion-demande-intervention/demande-maintenance';
import { MaintenanceAndReparationServiceService } from '../maintenance-and-reparation-service.service';
import { DeletedemandemaintenancehistoriqueComponent } from './deletedemandemaintenancehistorique/deletedemandemaintenancehistorique.component';

@Component({
  selector: 'app-historique-maintenance',
  templateUrl: './historique-maintenance.component.html',
  styleUrls: ['./historique-maintenance.component.scss'],
  providers: [MatSnackBar]

})
export class HistoriqueMaintenanceComponent implements OnInit {

  DemandeMaintenances: DemandeMaintenance[] = [];
  displayedColumns: string[] = ['index','descriptionIntervention','demandeur','nomBeneficiaire','ugpReparation','ugp','supprimer'];
  
  
  dataSource = new MatTableDataSource<DemandeMaintenance>(this.DemandeMaintenances);
  @ViewChild(MatSort) sort: MatSort;
  
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  TypeCarburant = new FormControl(null);
  itemPerPage = new FormControl(null);
  selectedTypeCarburant: string;
  structureForm = new FormControl(null);
  ugpForm = new FormControl(null);
  listStructure: Structure[] = [];
  listUGP: UGP[] = [];
  listStatus :DemandeMaintenance[]=[];
  statusForm = new FormControl(null);
  status = '';
  structure = '';
  ugp = '';

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  customSearching = false;
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarSuccesDeleteMsg = 'la suppression de  historique de maintenance   sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = ' historique de maintenance sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';

  VIEW_HISTORIQUE_MAINTENANCE_VEHICULE: boolean;

  DELETE_HISTORIQUE_MAINTENANCE_VEHICULE: boolean;

  constructor(private Authentication: AuthenticationServiceService,
    private  DemandeMaintenanceService: MaintenanceAndReparationServiceService ,
    private router: Router, public dialog: MatDialog, 
    private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.getTotalItems();
    this.setDisplayedColumns();
    this.ngxLoader.stop();

    this.DemandeMaintenanceService.listStructure().subscribe(value => {
      this.listStructure = value
    })

    this.DemandeMaintenanceService.ugpList().subscribe(value => {
      this.listUGP = value
    })
  }
  
  setDisplayedColumns() {
    this.VIEW_HISTORIQUE_MAINTENANCE_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_MAINTENANCE_VEHICULE;

    this.DELETE_HISTORIQUE_MAINTENANCE_VEHICULE = this.Authentication.authoritiesUtilisateur.DELETE_HISTORIQUE_MAINTENANCE_VEHICULE;


  }
  ngOnInit(): void {

    this.itemPerPage.valueChanges.subscribe(value1 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value1;
      this.getTotalItems();
      this.ngxLoader.stop();
    });

    this.structureForm.valueChanges.subscribe(value2 => {
      console.log("la valuer de value 2 structure test");

      console.log(value2);

      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.structure = '';
      } else {
        this.structure = value2.designation;
      
        console.log(this.structure);


      }

      this.getTotalItems();
      this.ngxLoader.stop();
    });
    this.ugpForm.valueChanges.subscribe(value2 => {
      console.log("la valuer de value upg test");

      console.log(value2);

      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.ugp = '';
      } else {
        this.ugp = value2.designation;
      
        console.log(this.structure);


      }
      this.getTotalItems();
      this.ngxLoader.stop();
    });
    
  }
  handleCustomSearching() {
    this.customSearching = !this.customSearching;
  }
  getTotalItems() {
   
    this.DemandeMaintenanceService.getPaginationHistoriqueVehiculeList(this.ugp,this.structure,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.DemandeMaintenances = value;
      console.log(this.DemandeMaintenances);
      this.dataSource = new MatTableDataSource<DemandeMaintenance>(this.DemandeMaintenances);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }
  
  
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.DemandeMaintenanceService.getPaginationHistoriqueVehiculeList(this.ugp,this.structure,(paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.DemandeMaintenances = value;
      console.log("test de historique de maintenace et réparation");
      console.log(this.DemandeMaintenanceService);
      this.dataSource = new MatTableDataSource<DemandeMaintenance>(this.DemandeMaintenances);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }
  
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
 
  deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeletedemandemaintenancehistoriqueComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.DemandeMaintenanceService.deleteSelectedDemandeMaintenance(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }
 
    
    displayNotification(notification: string) {
      setTimeout(() => {
        this.snackBar.open(notification, 'X', {duration: 3000});
      }, 800);
    }
  
}
