import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {PaginationConfiguration} from '../../pagination-configuration';
import {MaintenanceAndReparationServiceService} from '../maintenance-and-reparation-service.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NewBonTravailComponent} from './new-bon-travail/new-bon-travail.component';
import {BonTravail} from './bon-travail';
import {DeleteBonTravailComponent} from './delete-bon-travail/delete-bon-travail.component';
import {DetailsBonTravailComponent} from './details-bon-travail/details-bon-travail.component';
import { ModifyBonTravailComponent } from './modify-bon-travail/modify-bon-travail.component';
import { Structure } from '../../referentiel/specifique/structure-administrative/structure';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { Vehicule } from '../../administratif/vehicules/vehicule';
import moment from 'moment';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-gestion-bon-travail',
  templateUrl: './gestion-bon-travail.component.html',
  styleUrls: ['./gestion-bon-travail.component.scss'],
  providers: [MatSnackBar]
})
export class GestionBonTravailComponent implements OnInit {

  
  ListBonTravail: BonTravail[] = [];
  displayedColumns: string[] = ['index', 'numeroSerie', 'structure', 'beneficiaire', 'natureMode', 'dateEntree','dateSortiePrevue', 'dateSortie','details', 'supprimer'];
  dataSource = new MatTableDataSource<BonTravail>(this.ListBonTravail);
  @ViewChild(MatSort) sort: MatSort;
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  UGP: string[] = ['UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5', 'UGP 6'];
  Mode : string[] = ['EXTERNE','INTERNE'];
  Nature : string[] = ['Reparation','Service','Nature 3'];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le bon de travail sélectionné a été supprimé avec succées';
  snackBarFailureDeleteMsg = 'Le bon de travail sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau bon de travail a été ajouté avec succées';
  snackBarFailureAddingMsg = 'Le nouveau bon de travail ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifiyingMsg = 'Le bon de travail sélectionné a été modifié avec succées';
  snackBarFailureModifiyingMsg = 'Le bon de travail sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  customSearching = false;
  
  listStructure: Structure[] = [];
  listUGP: UGP[] = [];
  Status: string[] = ['en cours', 'Accord', 'finis'];
  ListnumeroSérie : Vehicule [] = [];
  statusForm = new FormControl(null);
  structureForm = new FormControl(null);
  natureForm = new FormControl(null);
  modeForm = new FormControl(null);
  natureTravaux : '';
  mode : '';
  DETAILS_BON_TRAVAIL : boolean;
  DELETE_BON_TRAVAIL: boolean;
  VIEW_BON_TRAVAIL: boolean;
  ADD_BON_TRAVAIL: boolean;
   constructor(private Maintnenace: MaintenanceAndReparationServiceService, private router: Router,
    private Authentication: AuthenticationServiceService,
     public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.mode = '';
    this.setDisplayedColumns();
    this.natureTravaux='';
    this.itemPerPage.patchValue(this.paginConfig.itemsPerPage);
    this.getTotalList();
    this.ngxLoader.stop();
    this.Maintnenace.listStructure().subscribe(value => {
      this.listStructure = value
    })

    this.Maintnenace.ugpList().subscribe(value => {
      this.listUGP = value
    })    
  this.Maintnenace.vehiculeList().subscribe(value =>{
   this.ListnumeroSérie = value;
   console.log(this.ListnumeroSérie);
  })
  }
  setDisplayedColumns() {
    this.DETAILS_BON_TRAVAIL= this.Authentication.authoritiesUtilisateur.DETAILS_BON_TRAVAIL;
    this.DELETE_BON_TRAVAIL = this.Authentication.authoritiesUtilisateur.DELETE_BON_TRAVAIL;
    this.VIEW_BON_TRAVAIL = this.Authentication.authoritiesUtilisateur.VIEW_BON_TRAVAIL;
    this.ADD_BON_TRAVAIL = this.Authentication.authoritiesUtilisateur.ADD_BON_TRAVAIL;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalList();
      this.ngxLoader.stop();
    });
     this.natureForm.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.natureTravaux = '';
      } else {
        this.natureTravaux = value2;


      }

      this.getTotalList();
      this.ngxLoader.stop();
    });
 

    this.modeForm.valueChanges.subscribe(value2 => {
      console.log(value2);

      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      if (value2 === undefined) {
        this.mode = '';
      } else {
        this.mode = value2;
      }
      this.getTotalList();
      this.ngxLoader.stop();
    });


    
  }

  ajouterNouveauBonTravail() {
    const dialogRef = this.dialog.open(NewBonTravailComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Maintnenace.createNewBonTravail(value3).subscribe(value => {
          this.getTotalList();
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
    const dialogRef = this.dialog.open(DeleteBonTravailComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Maintnenace.deleteSelectedBonTravail(value3).subscribe(value => {
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
  modifier(i:any){

    const dialogRef = this.dialog.open(ModifyBonTravailComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListBonTravail[i]}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      console.log();
      
       console.log(value3);
       
       
       if (value3 !== undefined) {
         this.ngxLoader.start();
         this.paginConfig.currentPage = 0;
         console.log("new bn commande value 3");
        //console.log(value3.articles.id);
         this.Maintnenace.commandeArticleForBonTravail(value3).subscribe(value2 => {
           console.log(value2);
           
           //this.getTotalList();
           this.ngxLoader.stop();
           this.showNotification(this.snackBarSuccesAddingMsg);
         }, error => {
           this.ngxLoader.stop();
           this.showNotification(this.snackBarFailureAddingMsg);
         });
       }
     });
   
    
  }

  detailsRow(i: any) {
    const dialogRef = this.dialog.open(DetailsBonTravailComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListBonTravail[i]}
      
    });
    dialogRef.afterClosed().subscribe(value3 => {
     console.log();
     
      console.log(value3);
      
      
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        console.log("new bn commande value 3");
        this.Maintnenace.commandeArticleForBonTravail(value3).subscribe(value2 => {
          console.log(value2);
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Maintnenace.getPaginationBonTravailListfilter((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString(),this.mode,this.natureTravaux,).subscribe(value => {
      this.ListBonTravail = value;
      this.dataSource = new MatTableDataSource<BonTravail>(this.ListBonTravail);
      console.log("list bon de travail");     
      console.log(this.ListBonTravail);
      this.dataSource.sort = this.sort;
      console.log("data source !!!");
      console.log(this.dataSource.data);
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
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }
 
  getTotalList() {
    this.Maintnenace.getTotalItemBonTravailList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.Maintnenace.getPaginationBonTravailListfilter(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(),this.mode,this.natureTravaux).subscribe(value => {
      this.ListBonTravail = value;
      this.dataSource = new MatTableDataSource<BonTravail>(this.ListBonTravail);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
    console.log(this.ListBonTravail);

  }

 
}
