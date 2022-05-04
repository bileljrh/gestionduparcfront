import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BonTravailArticle } from '../../../maintenance-et-reparation/BonTravailArticle';
import { StockServiceService } from '../../stock-service.service';
import { ModificationQuantiteBonTravailComponent } from './modification-quantite-bon-travail/modification-quantite-bon-travail.component';

@Component({
  selector: 'app-details-bon-sortie-bon-travail',
  templateUrl: './details-bon-sortie-bon-travail.component.html',
  styleUrls: ['./details-bon-sortie-bon-travail.component.scss']
})
export class DetailsBonSortieBonTravailComponent implements OnInit {

  demandeArticleBonTravail: BonTravailArticle[] = [];
  displayedColumns: string[] = ['index', 'desingation', 'qteenstock', 'qteDemandé', 'livré', 'quantiteacommander', 'modifier'];
  dataSource = new MatTableDataSource<BonTravailArticle>(this.demandeArticleBonTravail);
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<DetailsBonSortieBonTravailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    public stockService: StockServiceService) {
    this.stockService.getArticleForMaintenanceVehicule(this.data.element.id).subscribe((data1) => {
      this.demandeArticleBonTravail = data1;
      console.log(this.demandeArticleBonTravail);
      this.dataSource = new MatTableDataSource<BonTravailArticle>(this.demandeArticleBonTravail);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

  modifyRow(i) {
    const dialogRef = this.dialog.open(ModificationQuantiteBonTravailComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: { element: this.demandeArticleBonTravail[i] }
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        console.log("La valeur 3 ! ");
        console.log(value3);


        this.demandeArticleBonTravail[i].quantite = value3.quantiteCommande;
        this.demandeArticleBonTravail[i].quantiteLivree = value3.quantiteRecue;
        this.dataSource = new MatTableDataSource<BonTravailArticle>(this.demandeArticleBonTravail);
        this.dataSource.sort = this.sort;
      }
    });
    console.log("id demandeArticleBonTravail");
    console.log(this.demandeArticleBonTravail[i].id);
  }

  onConfirm() {
    this.dialogRef.close(this.demandeArticleBonTravail);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
