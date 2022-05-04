import { formatDate } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'jquery';
import moment from 'moment';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { BonDeTravail } from '../../../maintenance-et-reparation/BonDeTravail';
import { BonTravailArticle } from '../../../maintenance-et-reparation/BonTravailArticle';
import { BonTravailArticleExterne } from '../../../maintenance-et-reparation/BonTravailArticleExterne';
import { BonTravailOperation } from '../../../maintenance-et-reparation/BonTravailOperation';
import { BonTravail } from '../../../maintenance-et-reparation/gestion-bon-travail/bon-travail';
import { DetailsBonTravailComponent } from '../../../maintenance-et-reparation/gestion-bon-travail/details-bon-travail/details-bon-travail.component';
import { ArticleForBonTravailComponent } from '../../../maintenance-et-reparation/gestion-bon-travail/details-bon-travail/details-pieces-stock-bon-travail/piece-stock/details-article/article-for-bon-travail/article-for-bon-travail.component';
import { ArticlesExternesBonTravailComponent } from '../../../maintenance-et-reparation/gestion-bon-travail/details-bon-travail/details-pieces-stock-bon-travail/piece-stock/details-article/articles-externes-bon-travail/articles-externes-bon-travail.component';
import { OperationBonTravailComponent } from '../../../maintenance-et-reparation/gestion-bon-travail/details-bon-travail/details-pieces-stock-bon-travail/piece-stock/details-article/operation-bon-travail/operation-bon-travail.component';
import { MaintenanceAndReparationServiceService } from '../../../maintenance-et-reparation/maintenance-and-reparation-service.service';
import { Article } from '../../../referentiel/general/articles/article';
import { Fournisseur } from '../../../referentiel/general/fournisseurs/fournisseur';
import { ReferentielGeneraleServiceService } from '../../../referentiel/general/referentiel-generale-service.service';
import { StockServiceService } from '../../stock-service.service';
import { MagasinArticle } from '../MagasinArticle';
import { ArticesForTransfertToVirtualMagasinComponent } from '../nouveau-transfert/artices-for-transfert-to-virtual-magasin/artices-for-transfert-to-virtual-magasin.component';
import { UpdateMagasinVirtuel } from '../UpdateMagasinVirtuel';
import { UpdateMagasinVirtuelArticle } from '../UpdateMagasinVirtuelArticle';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PaginationConfiguration } from '../../../pagination-configuration';

@Component({
  selector: 'app-modify-list-article-atransferer',
  templateUrl: './modify-list-article-atransferer.component.html',
  styleUrls: ['./modify-list-article-atransferer.component.scss']
})
export class ModifyListArticleATransfererComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModifyListArticleATransfererComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelDelete() {
    this.dialogRef.close();
  }

  onConfirmDelete() {
    alert ("hhhh")
    this.dialogRef.close(this.data.id);
  }
}
