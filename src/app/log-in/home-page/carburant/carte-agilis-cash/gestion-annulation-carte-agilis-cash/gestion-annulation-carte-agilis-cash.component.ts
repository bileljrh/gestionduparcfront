import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {CarteAgilisCashServiceService} from '../carte-agilis-cash-service.service';
import {HistoriqueDemandeAnnulationCarteAgilisCash} from './historique-demande-annulation-carte-agilis-cash';
import {DeleteAnnulationCarteAgilisCashComponent} from './delete-annulation-carte-agilis-cash/delete-annulation-carte-agilis-cash.component';
import {ModifyAnnulationCarteAgilisCashComponent} from './modify-annulation-carte-agilis-cash/modify-annulation-carte-agilis-cash.component';
import {ConfirmAnnulationCarteAgilisCashComponent} from './confirm-annulation-carte-agilis-cash/confirm-annulation-carte-agilis-cash.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { DemandeAnnulationCarteAgilisCashComponent } from '../demande-annulation-carte-agilis-cash/demande-annulation-carte-agilis-cash.component';
import { FormControl, FormGroup } from '@angular/forms';
import { DemandeAnnulationCarteAgilisCash } from '../demande-annulation-carte-agilis-cash/demande-annulation-carte-agilis-cash';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-gestion-annulation-carte-agilis-cash',
  templateUrl: './gestion-annulation-carte-agilis-cash.component.html',
  styleUrls: ['./gestion-annulation-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class GestionAnnulationCarteAgilisCashComponent implements OnInit {
/*
  Structure: string[] = ['Structure 1', 'Structure 2', 'Structure 3', 'Structure 4', 'Structure 5'];
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  displayedColumns: string[] = ['index', 'structure', 'numeroCarte', 'matriculeBeneficiaire', 'nomBeneficiaire', 'numero_plaque', 'typeCarburant', 'dateDemande', 'supprimer', 'confirm', 'vehicule'];
  historiqueDemandeAnnulation: HistoriqueDemandeAnnulationCarteAgilisCash[] = [];
  dataSource = new MatTableDataSource<HistoriqueDemandeAnnulationCarteAgilisCash>(this.historiqueDemandeAnnulation);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La demande d\'annulation sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La demande d\'annulation sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'La demande d\'annulation sélectionnée a été modifiée avec succès';
  snackBarFailureModificationMsg = 'La demande d\'annulation sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'La demande d\'annulation sélectionnée a été confirmée avec succès';
  snackBarFailureConfirmationMsg = 'La demande d\'annulation sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';
*/

displayedColumns: string[] = ['index', 'structure', 'numeroCarte', 'matriculeBeneficiaire', 'nomBeneficiaire', 'numero_plaque', 'typeCarburant', 'dateDemande','modifier', 'supprimer', 'confirm'];
demandeAnnulationDataTable: DemandeAnnulationCarteAgilisCash[] = [];
dataSource = new MatTableDataSource<DemandeAnnulationCarteAgilisCash>(this.demandeAnnulationDataTable);

VIEW_ANNULATION_AGILIS:boolean;
  MODIFY_ANNULATION_AGILIS:boolean;
  DELETE_ANNULATION_AGILIS:boolean;
  ADD_ANNULATION_AGILIS:boolean;
  CONFIRMER_ANNULATION_AGILIS:boolean;


  setDisplayedColumns() {
    this.MODIFY_ANNULATION_AGILIS= this.Authentication.authoritiesUtilisateur.MODIFY_ANNULATION_AGILIS;
    this.DELETE_ANNULATION_AGILIS = this.Authentication.authoritiesUtilisateur.DELETE_ANNULATION_AGILIS;
    this.VIEW_ANNULATION_AGILIS = this.Authentication.authoritiesUtilisateur.VIEW_ANNULATION_AGILIS;
    this.ADD_ANNULATION_AGILIS = this.Authentication.authoritiesUtilisateur.ADD_ANNULATION_AGILIS;
    this.CONFIRMER_ANNULATION_AGILIS = this.Authentication.authoritiesUtilisateur.CONFIRMER_ANNULATION_AGILIS;
  
  }
  
@ViewChild(MatSort) sort: MatSort;
Status: string[] = ['confirmé', 'non confirmé'];
paginConfig: PaginationConfiguration = {
  id: 'custom',
  itemsPerPage: 5,
  currentPage: 0,
  totalItems: 10
};
StatusForm = new FormControl(null);
/*
StatusForm = new FormGroup({
  status: new FormControl(null),
});
*/
itemPerPage = new FormControl(null);
ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
snackBarSuccesAddingMsg = 'La nouvelle carte vehicule a été ajoutée avec succès';
snackBarFailureAddingMsg = 'La nouvelle carte ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
snackBarSuccesDeleteMsg = 'La carte sélectionnée a été supprimée avec succès';
snackBarFailureDeleteMsg = 'La carte sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
snackBarSuccesModificationMsg = 'La carte sélectionnée a été modifiée avec succès';
snackBarFailureModificationMsg = 'La carte sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
snackBarSuccesConfirmationMsg = 'La demande d\'annulation sélectionnée a été confirmée avec succès';
snackBarFailureConfirmationMsg = 'La demande d\'annulation sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';

status='';
  constructor(private Authentication: AuthenticationServiceService,
    private CarteAgilisCash: CarteAgilisCashServiceService,
     public dialog: MatDialog, private snackBar: MatSnackBar,
      private ngxLoader: NgxUiLoaderService) {

        this.ngxLoader.start();
        this.getTotalItems();
        this.ngxLoader.stop();
        this.setDisplayedColumns();
        

  }

  getTotalItems() {
    this.CarteAgilisCash.getTotalNumberAnnulationCarteAgilisCash().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.CarteAgilisCash.getPaginationDemandesAffectationCarteJocker(this.etat, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.demandeAnnulationDataTable = value;
      this.dataSource = new MatTableDataSource<DemandeAnnulationCarteAgilisCash>(this.demandeAnnulationDataTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {   
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
/*
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.CartePlafond.getPaginationListCartePlafondByTypeCarburant(this.typeCarburant, (paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.cartePlafondTabData = value;
      this.dataSource = new MatTableDataSource<DemandeAnnulationCarteAgilisCashComponent>(this.cartePlafondTabData);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }
  */
etat='';
  ngOnInit(): void {
    this.StatusForm.valueChanges.subscribe(value => {
      console.log("conform");
      console.log(value);
      
      
      if (value === undefined) {
        this.etat =null;
      } else if (value =="confirmé") {
        this.etat = "true";
      }
      else if (value =="non confirmé") {
        this.etat = "false";
      }
      console.log(this.etat);
      
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.getTotalItems();
    });

    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalItems();
    });
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
   
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.CarteAgilisCash.getPaginationDemandesAffectationCarteJocker(this.etat, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.demandeAnnulationDataTable = value;
      this.dataSource = new MatTableDataSource<DemandeAnnulationCarteAgilisCash>(this.demandeAnnulationDataTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {   
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }

  deleteRow(i: any) {
    const dialogRef = this.dialog.open(DeleteAnnulationCarteAgilisCashComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.deleteDemandeAnnulationCarteAgilisCash(value3).subscribe(value2 => {
          this.CarteAgilisCash.getPaginationDemandesAffectationCarteJocker(this.etat, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
            this.demandeAnnulationDataTable = value;
            this.dataSource = new MatTableDataSource<DemandeAnnulationCarteAgilisCash>(this.demandeAnnulationDataTable);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
          }, error => {   
            this.ngxLoader.stop();
            setTimeout(() => {
              this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
            }, 800);
          });
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarSuccesDeleteMsg, 'X', {duration: 3000});
          }, 800);
        }, error => {
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureDeleteMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });
  }


  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyAnnulationCarteAgilisCashComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
     data: {element: this.demandeAnnulationDataTable[i]}
     
     
    });
    
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {   
        this.ngxLoader.start();

        this.CarteAgilisCash.modifyOneDemandeAnnulationCarteAgilis(value3).subscribe(value2 => {
          this.CarteAgilisCash.getPaginationDemandesAffectationCarteJocker(this.etat, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
            this.demandeAnnulationDataTable = value;
            this.dataSource = new MatTableDataSource<DemandeAnnulationCarteAgilisCash>(this.demandeAnnulationDataTable);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
          }, error => {   
            this.ngxLoader.stop();
            setTimeout(() => {
              this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
            }, 800);
          });
                this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarSuccesDeleteMsg, 'X', {duration: 3000});
          }, 800);
        }, error => {
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureDeleteMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });

  }
  

  confirmRow(i: number) {
    const dialogRef = this.dialog.open(ConfirmAnnulationCarteAgilisCashComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      console.log("test confirm");
      console.log(value3);
      
      
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.confirmDemandeAnnulationCarteAgilisCash(value3).subscribe(value2 => {
          this.CarteAgilisCash.getPaginationDemandesAffectationCarteJocker(this.etat, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
            this.demandeAnnulationDataTable = value;
            this.dataSource = new MatTableDataSource<DemandeAnnulationCarteAgilisCash>(this.demandeAnnulationDataTable);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
          }, error => {   
            this.ngxLoader.stop();
            setTimeout(() => {
              this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
            }, 800);
          });
                this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarSuccesConfirmationMsg, 'X', {duration: 3000});
          }, 800);
        }, error => {
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureConfirmationMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });
  }

  nouvelleDemandeAnnulation(){

    const dialogRef = this.dialog.open(DemandeAnnulationCarteAgilisCashComponent, {
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.createNewDemandeAnnulationCarteCarburant(value3).subscribe(value => {
         
            this.CarteAgilisCash.getPaginationDemandesAffectationCarteJocker(this.etat, this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
            this.demandeAnnulationDataTable = value;
            this.dataSource = new MatTableDataSource<DemandeAnnulationCarteAgilisCash>(this.demandeAnnulationDataTable);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
          }, error => {   
            this.ngxLoader.stop();
            setTimeout(() => {
              this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
            }, 800);
          });
                this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarSuccesConfirmationMsg, 'X', {duration: 3000});
          }, 800);
        }, error => {
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureConfirmationMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });
}


}
