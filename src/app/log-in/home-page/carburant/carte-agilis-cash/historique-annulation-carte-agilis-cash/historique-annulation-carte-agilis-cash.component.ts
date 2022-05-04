import {Component, OnInit, ViewChild} from '@angular/core';
import {HistoriqueDemandeAnnulationCarteAgilisCash} from '../gestion-annulation-carte-agilis-cash/historique-demande-annulation-carte-agilis-cash';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CarteAgilisCashServiceService} from '../carte-agilis-cash-service.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ReadMoreHistoriqueAnnulationCarteAgilisCashComponent} from './read-more-historique-annulation-carte-agilis-cash/read-more-historique-annulation-carte-agilis-cash.component';
import {DeleteHistoriqueAnnulationCarteAgilisCashComponent} from './delete-historique-annulation-carte-agilis-cash/delete-historique-annulation-carte-agilis-cash.component';

@Component({
  selector: 'app-historique-annulation-carte-agilis-cash',
  templateUrl: './historique-annulation-carte-agilis-cash.component.html',
  styleUrls: ['./historique-annulation-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class HistoriqueAnnulationCarteAgilisCashComponent implements OnInit {


  Structure: string[] = ['Structure 1', 'Structure 2', 'Structure 3', 'Structure 4', 'Structure 5'];
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  displayedColumns: string[] = ['index', 'structure', 'numeroCarte', 'matriculeBeneficiaire', 'nomBeneficiaire', 'numero_plaque', 'typeCarburant', 'dateDemande', 'supprimer', 'vehicule', 'plus',];
  historiqueDemandeAnnulation: HistoriqueDemandeAnnulationCarteAgilisCash[] = [];
  dataSource = new MatTableDataSource<HistoriqueDemandeAnnulationCarteAgilisCash>(this.historiqueDemandeAnnulation);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La demande d\'annulation sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La demande d\'annulation sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';


  constructor(private CarteAgilisCash: CarteAgilisCashServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    CarteAgilisCash.getHistoriqueDemandeAnnulationCarteAgilisCashByConfirmation('true').subscribe(value => {
      this.historiqueDemandeAnnulation = value;
      this.dataSource = new MatTableDataSource<HistoriqueDemandeAnnulationCarteAgilisCash>(this.historiqueDemandeAnnulation);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
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
    const dialogRef = this.dialog.open(DeleteHistoriqueAnnulationCarteAgilisCashComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.deleteDemandeAnnulationCarteAgilisCash(value3).subscribe(value2 => {
          this.CarteAgilisCash.getHistoriqueDemandeAnnulationCarteAgilisCashByConfirmation('true').subscribe(value => {
            this.historiqueDemandeAnnulation = value;
            this.dataSource = new MatTableDataSource<HistoriqueDemandeAnnulationCarteAgilisCash>(this.historiqueDemandeAnnulation);
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


  readMore(i: number) {
    const dialogRef = this.dialog.open(ReadMoreHistoriqueAnnulationCarteAgilisCashComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {historique: this.historiqueDemandeAnnulation[i]}
    });

  }
}
