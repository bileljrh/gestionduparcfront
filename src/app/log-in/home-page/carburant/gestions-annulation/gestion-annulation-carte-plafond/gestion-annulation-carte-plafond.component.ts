import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {CarburantServiceService} from '../../carburant-service.service';
import {MatDialog} from '@angular/material/dialog';
import {HistoriqueDemandeAnnulationCartePlafond} from '../../carte-plafond/historique-demande-annulation-carte-plafond/historique-demande-annulation-carte-plafond';
import {ConfirmationAnnulationCartePlafondComponent} from './confirmation-annulation-carte-plafond/confirmation-annulation-carte-plafond.component';
import {ModifyAnnulationCartePlafondComponent} from './modify-annulation-carte-plafond/modify-annulation-carte-plafond.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DeleteAnnulationCartePlafondComponent} from './delete-annulation-carte-plafond/delete-annulation-carte-plafond.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-gestion-annulation-carte-plafond',
  templateUrl: './gestion-annulation-carte-plafond.component.html',
  styleUrls: ['./gestion-annulation-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class GestionAnnulationCartePlafondComponent implements OnInit {

  Structure: string[] = ['Structure 1', 'Structure 2', 'Structure 3', 'Structure 4', 'Structure 5'];
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  displayedColumns: string[] = ['index', 'numeroCarte', 'dateDemande', 'confirm', 'modifier', 'supprimer'];
  historiqueDemandeAnnulation: HistoriqueDemandeAnnulationCartePlafond[] = [];
  dataSource = new MatTableDataSource<HistoriqueDemandeAnnulationCartePlafond>(this.historiqueDemandeAnnulation);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La demande d\'annulation sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La demande d\'annulation sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'La demande d\'annulation sélectionnée a été modifiée avec succès';
  snackBarFailureModificationMsg = 'La demande d\'annulation sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesConfirmationMsg = 'La demande d\'annulation sélectionnée a été confirmée avec succès';
  snackBarFailureConfirmationMsg = 'La demande d\'annulation sélectionnée sélectionnée ne pourra pas être confirmée, réessayez de nouveau s\'il vous plait';
  VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND:boolean;
  MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND:boolean;
  DELETE_DEMANDE_ANNULATION_CARTE_PLAFOND:boolean;
  CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND:boolean;

  constructor( private Authentication: AuthenticationServiceService,private Carburant: CarburantServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    Carburant.getHistoriqueDemandeAnnulationCartePlafondByConfirmation('False').subscribe(value => {
      console.log(value);
      this.historiqueDemandeAnnulation = value;
      this.dataSource = new MatTableDataSource<HistoriqueDemandeAnnulationCartePlafond>(this.historiqueDemandeAnnulation);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
    this.setDisplayedColumns();

  }


  
  setDisplayedColumns() {
    this.VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND;

    this.MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND;
 
    this.DELETE_DEMANDE_ANNULATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.DELETE_DEMANDE_ANNULATION_CARTE_PLAFOND;

    this.CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND;

  } 


  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRow(i: any) {
    const dialogRef = this.dialog.open(DeleteAnnulationCartePlafondComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.Carburant.deleteOneDemandeAnnulationCartePlafond(value3).subscribe(value2 => {
          this.Carburant.getHistoriqueDemandeAnnulationCartePlafondByConfirmation('False').subscribe(value => {
            this.historiqueDemandeAnnulation = value;
            this.dataSource = new MatTableDataSource<HistoriqueDemandeAnnulationCartePlafond>(this.historiqueDemandeAnnulation);
            this.dataSource.sort = this.sort;
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
    const dialogRef = this.dialog.open(ModifyAnnulationCartePlafondComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.historiqueDemandeAnnulation[i]}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      console.log("test modification");
      console.log(value3);
      if (value3 !== undefined) {
        this.Carburant.modifyOneDemandeAnnulationCarteCarburant(value3).subscribe(value2 => {
       
          
          
          this.Carburant.getHistoriqueDemandeAnnulationCartePlafondByConfirmation('False').subscribe(value => {
            this.historiqueDemandeAnnulation = value;
            this.dataSource = new MatTableDataSource<HistoriqueDemandeAnnulationCartePlafond>(this.historiqueDemandeAnnulation);
            this.dataSource.sort = this.sort;
          }, error => {
            this.ngxLoader.stop();
            setTimeout(() => {
              this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
            }, 800);
          });
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarSuccesModificationMsg, 'X', {duration: 3000});
          }, 800);
        }, error => {
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureModificationMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });

  }

  confirmRow(id: number) {
    const dialogRef = this.dialog.open(ConfirmationAnnulationCartePlafondComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {idHistorique: id}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.Carburant.confirmSelectedDemandeAnnulationCarteCarburant(value3).subscribe(value2 => {
          this.Carburant.getHistoriqueDemandeAnnulationCartePlafondByConfirmation('False').subscribe(value => {
            this.historiqueDemandeAnnulation = value;
            this.dataSource = new MatTableDataSource<HistoriqueDemandeAnnulationCartePlafond>(this.historiqueDemandeAnnulation);
            this.dataSource.sort = this.sort;
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
