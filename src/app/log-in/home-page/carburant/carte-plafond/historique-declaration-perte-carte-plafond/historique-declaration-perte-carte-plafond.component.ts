import {Component, OnInit, ViewChild} from '@angular/core';
import {DeclarationPerteCartePlafond} from '../declaration-perte-carte-plafond/declaration-perte-carte-plafond';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {CarburantServiceService} from '../../carburant-service.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteHistoriqueDeclarationPerteCartePlafondComponent} from './delete-historique-declaration-perte-carte-plafond/delete-historique-declaration-perte-carte-plafond.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ReadMoreHistoriqueDeclarationPerteCartePlafondComponent} from './read-more-historique-declaration-perte-carte-plafond/read-more-historique-declaration-perte-carte-plafond.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

@Component({
  selector: 'app-historique-declaration-perte-carte-plafond',
  templateUrl: './historique-declaration-perte-carte-plafond.component.html',
  styleUrls: ['./historique-declaration-perte-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class HistoriqueDeclarationPerteCartePlafondComponent implements OnInit {
  Structure: string[] = ['Structure 1', 'Structure 2', 'Structure 3', 'Structure 4', 'Structure 5', 'Structure 6', 'Structure 7'];
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  displayedColumns: string[] = ['index', 'numeroCarte', 'datePerte', 'lieuPerte', 'plusInfo', 'supprimer'];
  declarationsPerteCartePlafond: DeclarationPerteCartePlafond[] = [];
  dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.declarationsPerteCartePlafond);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'historique de la déclaration de perte sélectionné a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'L\'historique de la declaration de perte sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';

  constructor(  private Authentication: AuthenticationServiceService, private Carburant: CarburantServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.Carburant.getListDeclarationPerteCartePlafondByConfirmation('True').subscribe(value => {
      this.declarationsPerteCartePlafond = value;
      console.log(this.declarationsPerteCartePlafond);
      this.dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.declarationsPerteCartePlafond);
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
  
  DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND:boolean;
  VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND:boolean;
  setDisplayedColumns() {
    this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND;

    this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND = this.Authentication.authoritiesUtilisateur.MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND;
  }  

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteRow(i: number) {
    const dialogRef = this.dialog.open(DeleteHistoriqueDeclarationPerteCartePlafondComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.Carburant.deleteOneDeclarationPerteCartePlafond(value3).subscribe(value2 => {
          this.Carburant.getListDeclarationPerteCartePlafondByConfirmation('True').subscribe(value => {
            this.declarationsPerteCartePlafond = value;
            this.dataSource = new MatTableDataSource<DeclarationPerteCartePlafond>(this.declarationsPerteCartePlafond);
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
    const dialogRef = this.dialog.open(ReadMoreHistoriqueDeclarationPerteCartePlafondComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {cartePlafond: this.declarationsPerteCartePlafond[i]}
    });
  }
}
