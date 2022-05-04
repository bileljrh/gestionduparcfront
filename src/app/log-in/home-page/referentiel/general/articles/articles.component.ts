import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ReferentielGeneraleServiceService} from '../referentiel-generale-service.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NouveauArticleComponent} from './nouveau-article/nouveau-article.component';
import {Article} from './article';
import {ModifyArticleComponent} from './modify-article/modify-article.component';
import {PaginationConfiguration} from '../../../pagination-configuration';
import {FormControl} from '@angular/forms';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DeleteArticleComponent} from './delete-article/delete-article.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../authentication-service.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [MatSnackBar]
})
export class ArticlesComponent implements OnInit, OnDestroy {
  VIEW_ARTICLES: boolean;
  ADD_ARTICLES: boolean;
  MODIFY_ARTICLES: boolean;
  DELETE_ARTICLES: boolean;
  VIEW_FAMILLES_ARTICLES: boolean;
  VIEW_SOUS_FAMILLES_ARTICLES: boolean;
  displayedColumns: string[] = [];
  ListElementTable: Article[] = [];
  dataSource = new MatTableDataSource<Article>(this.ListElementTable);
  itemPerPageForm = new FormControl(null);
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'L\'article sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'L\'article sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouvel article a été ajouté avec succès';
  snackBarFailureAddingMsg = 'Le nouvel article ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'L\'article sélectionné a été modifié avec succès';
  snackBarFailureModifyingMsg = 'L\'article sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  private subscriptions: Subscription[] = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private ReferentielGenerale: ReferentielGeneraleServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.getListArticles();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.itemPerPageForm.valueChanges.subscribe(value1 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value1;
      this.getListArticles();
      this.ngxLoader.stop();
    }));
  }

  deleteArticle(i: any) {
    const dialogRef = this.dialog.open(DeleteArticleComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscriptions.push(this.ReferentielGenerale.deleteSelectedArticle(value3).subscribe(value2 => {
          this.getListArticles();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }

  getListArticles() {
    this.subscriptions.push(this.ReferentielGenerale.getTotalItemArticleByCustomSelection().subscribe(value => {
      this.paginConfig.totalItems = value;
    }));
    this.subscriptions.push(this.ReferentielGenerale.getPaginationListArticle(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Article>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => { 
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));

  }
 

  ajoutetNouvelArticle() {
    const dialogRef = this.dialog.open(NouveauArticleComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.subscriptions.push(this.ReferentielGenerale.createNewArticle(value3).subscribe(value2 => {
          this.getListArticles();
          this.displayNotification(this.snackBarSuccesAddingMsg);
          this.ngxLoader.stop();
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingMsg);
        }));
      }
    }));
  }

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modifierArticle(id: any) {
    const dialogRef = this.dialog.open(ModifyArticleComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[id]}
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.subscriptions.push(this.ReferentielGenerale.modifySelectedArticle(value3).subscribe(value2 => {
          this.getListArticles();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
/*
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.subscriptions.push(this.ReferentielGenerale.getPaginationListArticle((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Article>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));
  }
  */
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.ReferentielGenerale.getPaginationListArticle((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<Article>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(value => {
      value.unsubscribe();
    });
  }

  setDisplayedColumns() {
    this.VIEW_ARTICLES = this.Authentication.authoritiesUtilisateur.VIEW_ARTICLES;
    this.ADD_ARTICLES = this.Authentication.authoritiesUtilisateur.ADD_ARTICLES;
    this.DELETE_ARTICLES = this.Authentication.authoritiesUtilisateur.DELETE_ARTICLES;
    this.MODIFY_ARTICLES = this.Authentication.authoritiesUtilisateur.MODIFY_ARTICLES;
    this.VIEW_FAMILLES_ARTICLES = this.Authentication.authoritiesUtilisateur.VIEW_FAMILLES_ARTICLES;
    this.VIEW_SOUS_FAMILLES_ARTICLES = this.Authentication.authoritiesUtilisateur.VIEW_SOUS_FAMILLES_ARTICLES;

    if (this.DELETE_ARTICLES) {
      if (this.MODIFY_ARTICLES) {
        this.displayedColumns = ['index', 'codeArticle', 'designation', 'genre', 'marque', 'typeArticle', 'quantiteStock',  'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'codeArticle', 'designation', 'genre', 'marque', 'typeArticle', 'quantiteStock', 'prix', 'supprimer'];
      }
    } else {
      if (this.MODIFY_ARTICLES) {
        this.displayedColumns = ['index', 'codeArticle', 'designation', 'genre', 'marque', 'typeArticle', 'quantiteStock', 'prix', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'codeArticle', 'designation', 'genre', 'marque', 'typeArticle', 'quantiteStock', 'prix'];
      }
    }
  }

}
