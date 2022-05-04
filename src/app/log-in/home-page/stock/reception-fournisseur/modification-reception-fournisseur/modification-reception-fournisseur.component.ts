import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DemandeArticle } from '../../../achat/demande-article';
import { MatSort } from '@angular/material/sort';
import { ModificationQuantieArticleBonCommandeComponent } from './modification-quantie-article-bon-commande/modification-quantie-article-bon-commande.component';


@Component({
  selector: 'app-modification-reception-fournisseur',
  templateUrl: './modification-reception-fournisseur.component.html',
  styleUrls: ['./modification-reception-fournisseur.component.scss']
})
export class ModificationReceptionFournisseurComponent implements OnInit {
  ListDemandeArticle: DemandeArticle[] = [];
  displayedColumns: string[] = ['index', 'codeArticle', 'designation', 'quantiteCommandee', 'quantiteRecue', 'quantiteRestante', 'modifier'];
  dataSource = new MatTableDataSource<DemandeArticle>(this.ListDemandeArticle);
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialogRef: MatDialogRef<ModificationReceptionFournisseurComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.ListDemandeArticle = this.data.element.demandesArticle;
    this.dataSource = new MatTableDataSource<DemandeArticle>(this.ListDemandeArticle);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close(this.ListDemandeArticle);
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModificationQuantieArticleBonCommandeComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: { element: this.ListDemandeArticle[i] }
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ListDemandeArticle[i].quantiteCommandee = value3.quantiteCommande;
        this.ListDemandeArticle[i].quantiteLivree = value3.quantiteRecue;
        this.ListDemandeArticle[i].prix = value3.prix;
        this.dataSource = new MatTableDataSource<DemandeArticle>(this.ListDemandeArticle);
        this.dataSource.sort = this.sort;
      }
    });
  }
}
