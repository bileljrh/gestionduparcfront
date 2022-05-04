import {Component, OnInit, ViewChild} from '@angular/core';
import {DeclarationPerteCartejocker} from '../gestion-declaration-perte-carte-jocker/new-declaration-perte-carte/declaration-perte-carte-jocker';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {CarburantServiceService} from '../../carburant-service.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteHistoriquePerteCarteJockerComponent} from './delete-historique-perte-carte-jocker/delete-historique-perte-carte-jocker.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { ReadDetailsHistoriquePerteCarteJockerComponent } from './read-details-historique-perte-carte-jocker/read-details-historique-perte-carte-jocker.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
@Component({
  selector: 'app-historique-declaration-perte-carte-jocker',
  templateUrl: './historique-declaration-perte-carte-jocker.component.html',
  styleUrls: ['./historique-declaration-perte-carte-jocker.component.scss'],
  providers: [MatSnackBar]
})
export class HistoriqueDeclarationPerteCarteJockerComponent implements OnInit {
  Structure: string[] = ['Structure 1', 'Structure 2', 'Structure 3', 'Structure 4', 'Structure 5', 'Structure 6', 'Structure 7'];
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  displayedColumns: string[] = ['index', 'numeroCarte', 'datePerte', 'lieuPerte', 'plusInfo', 'supprimer'];
  declarationsPerteCarteJocker: DeclarationPerteCartejocker[] = [];
  dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.declarationsPerteCarteJocker);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'historique de la déclaration de perte sélectionné a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'L\'historique de la declaration de perte sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';

  VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER: boolean;
  DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER: boolean;
  

  constructor( private Authentication: AuthenticationServiceService,  private Carburant: CarburantServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.Carburant.getListDeclarationPerteCarteJockerByConfirmation('True').subscribe(value => {
      this.declarationsPerteCarteJocker = value;
      console.log(this.declarationsPerteCarteJocker);
      this.dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.declarationsPerteCarteJocker);
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
    this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER;
    this.DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER = this.Authentication.authoritiesUtilisateur.DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER;
    
  }
  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteRow(i: number) {
    const dialogRef = this.dialog.open(DeleteHistoriquePerteCarteJockerComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Carburant.deleteOneDeclarationPerteCarteJocker(value3).subscribe(value2 => {
          this.Carburant.getListDeclarationPerteCarteJockerByConfirmation('True').subscribe(value => {
            this.declarationsPerteCarteJocker = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCartejocker>(this.declarationsPerteCarteJocker);
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


  plusInfos(i: any) {
    const dialogRef = this.dialog.open(ReadDetailsHistoriquePerteCarteJockerComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {carteJocker: this.declarationsPerteCarteJocker[i]}
    });
  }
}
