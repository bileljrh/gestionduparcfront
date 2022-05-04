import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {CarburantServiceService} from '../../carburant-service.service';
import {MatDialog} from '@angular/material/dialog';
import {HistoriqueDemandeAnnulationCartePlafond} from './historique-demande-annulation-carte-plafond';
import {DeleteHistoriqueDemandeAnnulationCartePlafondComponent} from './delete-historique-demande-annulation-carte-plafond/delete-historique-demande-annulation-carte-plafond.component';
import {PlusInfoDemandeAnnulationCartePlafondComponent} from './plus-info-demande-annulation-carte-plafond/plus-info-demande-annulation-carte-plafond.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-historique-demande-annulation-carte-plafond',
  templateUrl: './historique-demande-annulation-carte-plafond.component.html',
  styleUrls: ['./historique-demande-annulation-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class HistoriqueDemandeAnnulationCartePlafondComponent implements OnInit {

  Structure: string[] = ['Structure 1', 'Structure 2', 'Structure 3', 'Structure 4', 'Structure 5'];
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  displayedColumns: string[] = ['index', 'numeroCarte', 'montant', 'typeCarburant', 'dateDemande', 'plus', 'supprimer'];
  historiqueDemandeAnnulation: HistoriqueDemandeAnnulationCartePlafond[] = [];
  dataSource = new MatTableDataSource<HistoriqueDemandeAnnulationCartePlafond>(this.historiqueDemandeAnnulation);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'historique d\'annulation sélectionné a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'L\'historique d\'annulation sélectionné ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND:boolean;
  DELETE_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND:boolean;




  constructor(private Authentication: AuthenticationServiceService, private Carburant: CarburantServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    Carburant.getHistoriqueDemandeAnnulationCartePlafondByConfirmation('True').subscribe(value => {
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
    this.VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND;

    this.DELETE_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.DELETE_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND;
  } 
  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRow(index: any) {
    const dialogRef = this.dialog.open(DeleteHistoriqueDemandeAnnulationCartePlafondComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: index}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Carburant.deleteOneDemandeAnnulationCartePlafond(value3).subscribe(value2 => {
          this.Carburant.getHistoriqueDemandeAnnulationCartePlafondByConfirmation('True').subscribe(value => {
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
          this.ngxLoader.stop();
          setTimeout(() => {
            this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
          }, 800);
        });
      }
    });
  }


  plusInfos(i: any) {
    const dialogRef = this.dialog.open(PlusInfoDemandeAnnulationCartePlafondComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {historiqueDemandeAnnulation: this.historiqueDemandeAnnulation[i]}
    });
  }
}
