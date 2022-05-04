import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationConfiguration } from '../../pagination-configuration';
import {MatIconModule} from '@angular/material/icon'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MaintenanceAndReparationServiceService } from '../maintenance-and-reparation-service.service';
import { DemandeMaintenance } from './demande-maintenance';
import { DeleteDemandeInterventionComponent } from './delete-demande-intervention/delete-demande-intervention.component';
import { ModifyDemandeInterventionComponent } from './modify-demande-intervention/modify-demande-intervention.component';
import { NewDemandeInterventionComponent } from './new-demande-intervention/new-demande-intervention.component';
import { element } from 'protractor';
import { Structure } from '../../referentiel/specifique/structure-administrative/structure';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { AnnulerDemandeMaintenanceComponent } from './annuler-demande-maintenance/annuler-demande-maintenance.component';
import { FicheVehiculeComponent } from '../../administratif/vehicules/fiche-vehicule/fiche-vehicule.component';
import { RecuDemandeComponent } from './recu-demande/recu-demande.component';
import { HomePageComponent } from '../../home-page.component';
import { NotificationElementComponent } from '../../notification-element/notification-element.component';

@Component({
  selector: 'app-gestion-demande-intervention',
  templateUrl: './gestion-demande-intervention.component.html',
  styleUrls: ['./gestion-demande-intervention.component.scss'],
  providers: [MatSnackBar]
})
export class GestionDemandeInterventionComponent implements OnInit {

 
  Status: string[] = ['en cours', 'Accord', 'finis'];
  listStructure: Structure[] = [];
  listUGP: UGP[] = [];
  listStatus :DemandeMaintenance[]=[];
  statusForm = new FormControl(null);
  structureForm = new FormControl(null);
  ugpForm = new FormControl(null);
  status = '';
  structureTets = '';
  ugp = '';
  nomPrenom = '';

  MODIFY_DEMANDE_INTERVENTION: boolean;
  DELETE_DEMANDE_INTERVENTION: boolean;
  VIEW_DEMANDE_INTERVENTION:boolean;
  ADD_DEMANDE_INTERVENTION:boolean;
  
  RECU_DEMANDE_INTERVENTION:boolean;
  VEHICULE_DEMANDE_INTERVENTION:boolean;
  ANNULATION_DEMANDE_INTERVENTION:boolean;
  ListDemandeIntervention: DemandeMaintenance[] = [];
  displayedColumns: string[] = ['index', 'dateDemande', 'numeroSerie', 'structure', 'demandeur','recu','vehicule','annuler','modifier', 'supprimer'];
  dataSource = new MatTableDataSource<DemandeMaintenance>(this.ListDemandeIntervention);
  @ViewChild(MatSort) sort: MatSort;
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La demande d\'intervention sélectionnée a été supprimée avec succées';
  snackBarFailureDeleteMsg = 'La demande d\'intervention sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvele demande d\'intervention a été ajoutée avec succées';
  snackBarFailureAddingMsg = 'demande d\'intervention ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifiyingMsg = 'La demande d\'intervention sélectionnée a été modifiée avec succées';
  snackBarFailureModifiyingMsg = 'La demande d\'intervention sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesCanselMsg = 'La demande d\'intervention sélectionnée a été annulée avec succées';
  snackBarFailureCanselMsg = 'La demande d\'intervention sélectionnée ne pourra pas être annulée, réessayez de nouveau s\'il vous plait';
  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  customSearching = false;
  ListUGP: string[] = [];
  // ListStructure: string[] = [];
  ListNumeroSerie: string[] = [];
  ListStatus: string[] = [];
 
  constructor(    private home :HomePageComponent,
    private Maintnenace: MaintenanceAndReparationServiceService, private router: Router, 
    private Authentication: AuthenticationServiceService, 
    
    public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.itemPerPage.patchValue(this.paginConfig.itemsPerPage);
    this.getTotalList();
    this.nomPrenom = Authentication.getNomPrenom();
    this.getItemsStatus();
    this.ngxLoader.stop();
    this.setDisplayedColumns();
    console.log("liste de demande d'intervention  test test :");

    console.log(this.ListDemandeIntervention);
    this.Maintnenace.listStructure().subscribe(value => {
      this.listStructure = value
    })

    this.Maintnenace.ugpList().subscribe(value => {
      this.listUGP = value
    })
  }
  
  redirect2Vehicule(id: any) {
    const dialogRef = this.dialog.open(FicheVehiculeComponent, {
      width: '1100px',
      panelClass: 'mat-dialog-container-class',
      data: {id: id}
    });
  }

   
  recu(i: any) {
    const dialogRef = this.dialog.open(RecuDemandeComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: { element: this.ListDemandeIntervention[i] }
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setDisplayedColumns() {
    this.MODIFY_DEMANDE_INTERVENTION = this.Authentication.authoritiesUtilisateur.MODIFY_DEMANDE_INTERVENTION;
    this.DELETE_DEMANDE_INTERVENTION = this.Authentication.authoritiesUtilisateur.DELETE_DEMANDE_INTERVENTION;
    this.VIEW_DEMANDE_INTERVENTION = this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_INTERVENTION;
    this.ADD_DEMANDE_INTERVENTION = this.Authentication.authoritiesUtilisateur.ADD_DEMANDE_INTERVENTION;
    this.RECU_DEMANDE_INTERVENTION = this.Authentication.authoritiesUtilisateur.RECU_DEMANDE_INTERVENTION;
    this.VEHICULE_DEMANDE_INTERVENTION = this.Authentication.authoritiesUtilisateur.VEHICULE_DEMANDE_INTERVENTION;
    this.ANNULATION_DEMANDE_INTERVENTION = this.Authentication.authoritiesUtilisateur.ANNULATION_DEMANDE_INTERVENTION;

  }
  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalList();
      this.getItemsStatus();
      this.ngxLoader.stop();
    });
    //console.log(this.ListDemandeIntervention.);
    this.statusForm.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.status = '';
      } else {
        this.status = value2.status;
        console.log("le status!!");
        console.log(this.status);


      }

      this.getTotalList();
      this.ngxLoader.stop();
    });


    this.structureForm.valueChanges.subscribe(value2 => {
      console.log("la valuer de value 2 structure test");

      console.log(value2);

      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.structureTets = '';
      } else {
        this.structureTets = value2.designation;
        console.log("le status!!");
        console.log(this.structureTets);


      }



      this.getTotalList();
      this.ngxLoader.stop();
    });


    this.ugpForm.valueChanges.subscribe(value2 => {
      console.log("la valuer de value 2 ugp");

      console.log(value2);

      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.ugp = '';
      } else {
        this.ugp = value2.designation;
        console.log("le status!!");
        console.log(this.ugp);

      }
      this.getTotalList();
      this.ngxLoader.stop();
    });

  }

  ajouterNouvelleDemande() {
    const dialogRef = this.dialog.open(NewDemandeInterventionComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Maintnenace.createNewDemandeMaintenance(value3).subscribe(value => {
          this.getTotalList();
          this.home.t=this.home.t+1;
          this.home.maintenance=true;
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  }

  deleteRow(i: number) {
    const dialogRef = this.dialog.open(DeleteDemandeInterventionComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: { id: i }
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Maintnenace.deleteSelectedDemandeMaintenance(value3).subscribe(value => {
          this.getTotalList();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }

    annulerSelectedDemandeMaintenance(i: any) {
      const dialogRef = this.dialog.open(AnnulerDemandeMaintenanceComponent, {
        width: '540px',
        panelClass: 'mat-dialog-container-class',
        data: { id: i }
      });
      dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.paginConfig.currentPage = 0;
          this.Maintnenace.annulerSelectedDemandeMaintenance(value3).subscribe(value => {
            this.getTotalList();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesCanselMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureCanselMsg);
          });
        }
      });
    }


  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyDemandeInterventionComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: { element: this.ListDemandeIntervention[i] }
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Maintnenace.modifySelectedDemandeMaintenance(value3).subscribe(value => {
          this.Maintnenace.getPaginationDemandeMaintenanceList(this.status, this.ugp, this.structureTets, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
            this.ListDemandeIntervention = value;
            this.dataSource = new MatTableDataSource<DemandeMaintenance>(this.ListDemandeIntervention);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureLoadingMsg);
          });
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesModifiyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureModifiyingMsg);
        });
      }
    });
    this.home.t=this.home.t+1;
    // console.log("list demande d'intervention "+this.ListDemandeIntervention.idVehicule);

  }
  x: number;
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Maintnenace.getPaginationDemandeMaintenanceList(this.status, this.ugp, this.structureTets, (paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListDemandeIntervention = value;
      // this.x=value.vehicule.id;
      this.dataSource = new MatTableDataSource<DemandeMaintenance>(this.ListDemandeIntervention);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });

  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  handleCustomSearching() {
    this.customSearching = !this.customSearching;
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', { duration: 800 });
    });
  }

  getTotalList() {
    this.Maintnenace.getTotalItemsDemandeMaintenanceList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.Maintnenace.getPaginationDemandeMaintenanceList(this.status,this.ugp,this.structureTets,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {

      console.log(value);

      this.ListDemandeIntervention = value;

      this.dataSource = new MatTableDataSource<DemandeMaintenance>(this.ListDemandeIntervention);

      this.dataSource.sort = this.sort;

      this.ngxLoader.stop();

    }, error => {

      this.ngxLoader.stop();

      setTimeout(() => {

        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});

      }, 800);

    });
  }





  getItemsStatus() {
    
    this.Maintnenace.getAllStatus().subscribe(value => {
      console.log(value);
      this.listStatus=value;
    
 
     });
  }

}
