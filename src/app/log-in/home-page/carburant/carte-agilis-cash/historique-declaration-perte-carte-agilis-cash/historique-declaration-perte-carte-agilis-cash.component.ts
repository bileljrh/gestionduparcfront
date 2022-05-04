import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {DeleteHistoriqueDeclarationPerteCarteAgilisCashComponent} from './delete-historique-declaration-perte-carte-agilis-cash/delete-historique-declaration-perte-carte-agilis-cash.component';
import {PlusInfoHistoriqueDeclarationPerteCarteAgilisCashComponent} from './plus-info-historique-declaration-perte-carte-agilis-cash/plus-info-historique-declaration-perte-carte-agilis-cash.component';
import {CarteAgilisCashServiceService} from '../carte-agilis-cash-service.service';
import {DeclarationPerteCarteAgilisCash} from '../gestion-declarations-perte-carte-agilis-cash/declaration-perte-carte-agilis-cash';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-historique-declaration-perte-carte-agilis-cash',
  templateUrl: './historique-declaration-perte-carte-agilis-cash.component.html',
  styleUrls: ['./historique-declaration-perte-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class HistoriqueDeclarationPerteCarteAgilisCashComponent implements OnInit {
  Structure: string[] = ['Structure 1', 'Structure 2', 'Structure 3', 'Structure 4', 'Structure 5', 'Structure 6', 'Structure 7'];
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  displayedColumns: string[] = ['index', 'structure', 'numeroCarte', 'nomBeneficiaire', 'numero_plaque', 'datePerte', 'lieuPerte', 'supprimer', 'plusInfo'];
  historiqueDeclarationPerte: DeclarationPerteCarteAgilisCash[] = [];
  dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.historiqueDeclarationPerte);
 
  VIEW_HISTORIQUE_PERTE:boolean;
   
   DELETE_HISTORIQUE_PERTE:boolean;

  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'historique de la déclaration de perte sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'L\'historique de la déclaration de perte sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';


  constructor(private Authentication: AuthenticationServiceService,public dialog: MatDialog, private CarteAgilisCash: CarteAgilisCashServiceService, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.CarteAgilisCash.getHistoriqueDeclarationPerteCarteAgilisCashByConfirmation('True').subscribe(value => {
      this.historiqueDeclarationPerte = value;
      console.log(this.historiqueDeclarationPerte);
      this.dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.historiqueDeclarationPerte);
      this.dataSource.sort = this.sort;
      this.setDisplayedColumns();
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
  }

  deleteRow(i: any) {
    const dialogRef = this.dialog.open(DeleteHistoriqueDeclarationPerteCarteAgilisCashComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.deleteOneDeclarationPerteCarteAgilisCash(value3).subscribe(value2 => {
          this.CarteAgilisCash.getHistoriqueDeclarationPerteCarteAgilisCashByConfirmation('True').subscribe(value => {
            this.historiqueDeclarationPerte = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCarteAgilisCash>(this.historiqueDeclarationPerte);
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

  plusInfoRow(i: any) {
    const dialogRef = this.dialog.open(PlusInfoHistoriqueDeclarationPerteCarteAgilisCashComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {historiqueDeclarationPerte: this.historiqueDeclarationPerte[i]}
    });
  }
  setDisplayedColumns() {
    
    this.DELETE_HISTORIQUE_PERTE = this.Authentication.authoritiesUtilisateur.DELETE_HISTORIQUE_PERTE_AGILIS;
    this.VIEW_HISTORIQUE_PERTE = this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_PERTE_AGILIS;

}
}
