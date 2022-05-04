import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {CarteAgilisCashServiceService} from '../carte-agilis-cash-service.service';
import {MatDialog} from '@angular/material/dialog';
import {ReadMoreHistoriqueRechargeCarteAgilisCashComponent} from './read-more-historique-recharge-carte-agilis-cash/read-more-historique-recharge-carte-agilis-cash.component';
import {DeleteHistoriqueRechargeCarteAgilisCashComponent} from './delete-historique-recharge-carte-agilis-cash/delete-historique-recharge-carte-agilis-cash.component';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ListHistoriqueRechargeCarteAgilisCash} from './list-historique-recharge-carte-agilis-cash';

@Component({
  selector: 'app-historique-recharge-carte-agilis-cash',
  templateUrl: './historique-recharge-carte-agilis-cash.component.html',
  styleUrls: ['./historique-recharge-carte-agilis-cash.component.scss'],
  providers: [MatSnackBar]
})
export class HistoriqueRechargeCarteAgilisCashComponent implements OnInit {
  listHistoriqueRecharge: ListHistoriqueRechargeCarteAgilisCash [] = [];
  displayedColumns: string[] = ['index', 'numeroCarte', 'matricule', 'beneficiaire', 'numero_plaque', 'montantAccordee', 'moisMission', 'supprimer', 'vehicule', 'plus'];
  dataSource = new MatTableDataSource<ListHistoriqueRechargeCarteAgilisCash>(this.listHistoriqueRecharge);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'historique de la demande de recharge sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'L\'historique de la demande de recharge sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';


  constructor(private CarteAgilisCash: CarteAgilisCashServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.CarteAgilisCash.getListHistoriqueCarteAgilisCash().subscribe(value => {
      this.listHistoriqueRecharge = value;
      this.dataSource = new MatTableDataSource<ListHistoriqueRechargeCarteAgilisCash>(this.listHistoriqueRecharge);
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
  }


  deleteRow(id: any) {
    const dialogRef = this.dialog.open(DeleteHistoriqueRechargeCarteAgilisCashComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {idRecharge: id}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.CarteAgilisCash.deleteSelectedHistoriqueRechargeCarteAgilisCash(value).subscribe(value1 => {
          this.CarteAgilisCash.getListHistoriqueCarteAgilisCash().subscribe(value2 => {
            this.listHistoriqueRecharge = value2;
            this.dataSource = new MatTableDataSource<ListHistoriqueRechargeCarteAgilisCash>(this.listHistoriqueRecharge);
            this.dataSource.sort = this.sort;
            this.ngxLoader.stop();
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

  readMoreRow(i: any) {
    const dialogRef = this.dialog.open(ReadMoreHistoriqueRechargeCarteAgilisCashComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {rechargeCarteAgilisCash: this.listHistoriqueRecharge[i]}
    });
  }


}
