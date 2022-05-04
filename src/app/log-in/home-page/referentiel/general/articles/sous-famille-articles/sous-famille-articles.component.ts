import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SousFamilleArticle} from '../sous-famille-article';
import {MatSort} from '@angular/material/sort';
import {NouvelleSousFamilleArticleComponent} from './nouvelle-sous-famille-article/nouvelle-sous-famille-article.component';
import {DeleteSousFamilleArticleComponent} from './delete-sous-famille-article/delete-sous-famille-article.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';
import { ModifySousFamilleArticleComponent } from './modify-sous-famille-article/modify-sous-famille-article.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sous-famille-articles',
  templateUrl: './sous-famille-articles.component.html',
  styleUrls: ['./sous-famille-articles.component.scss'],
  providers: [MatSnackBar]
})
export class SousFamilleArticlesComponent implements OnInit, OnDestroy {
  VIEW_SOUS_FAMILLES_ARTICLES: boolean;
  ADD_SOUS_FAMILLES_ARTICLES: boolean;
  MODIFY_SOUS_FAMILLES_ARTICLES: boolean;
  DELETE_SOUS_FAMILLES_ARTICLES: boolean;
  displayedColumns: string[] = [];
  ListElementTable: SousFamilleArticle[] = [];
  itemPerPageForm = new FormControl(null);
  dataSource = new MatTableDataSource<any>(this.ListElementTable);
  snackBarSuccesModifyingMsg = 'La sous famille sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'La sous famille sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La sous famille sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La sous famille sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle sous famille a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle sous famille ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  
  @ViewChild(MatSort) sort: MatSort;
  subscription: Subscription[] = [];
  

  constructor(private ReferentielGenerale: ReferentielGeneraleServiceService, private ngxLoader: NgxUiLoaderService,public dialog: MatDialog, private snackBar: MatSnackBar, private Authentication: AuthenticationServiceService) {
    this.setDisplayedColumns();
    this.getSousFamilleArticles();
  }

  ngOnInit(): void {
    this.subscription.push(this.itemPerPageForm.valueChanges.subscribe(value1 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value1;
      this.getSousFamilleArticles();
      this.ngxLoader.stop();
    }));
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
  deleteSousFamille(i : any) {
    const dialogRef = this.dialog.open(DeleteSousFamilleArticleComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
console.log(i);
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.ReferentielGenerale.deleteSelectedSousFamilleArticle(value3).subscribe(value2 => {
          this.getSousFamilleArticles();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    });
    
 
  }

  ajoutetNouvelleSousFamille() {
    const dialogRef = this.dialog.open(NouvelleSousFamilleArticleComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.ReferentielGenerale.addNewSousFamilleArticle(value3.sousFamille).subscribe(value2 => {
          this.getSousFamilleArticles();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureAddingMsg);
        }));
      }
    });
  }


  getListArticles() {
    /*this.subscription.push(this.ReferentielGenerale.getListSousFamilleArticle().subscribe(value => {
      this.paginConfig.totalItems = value;
    }));*/+
    this.subscription.push(this.ReferentielGenerale.getPaginationListSousFamilleArticle(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<SousFamilleArticle>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => { 
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));

  }
 
  getSousFamilleArticles() {
/*
    this.subscription.push(this.ReferentielGenerale.getListSousFamilleArticle().subscribe(value => {
      this.paginConfig.totalItems = value;
    }));
*/
    this.subscription.push(this.ReferentielGenerale.getPaginationListSousFamilleArticle(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<SousFamilleArticle>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => { 
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    }));

   
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.ReferentielGenerale.getPaginationListSousFamilleArticle((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<SousFamilleArticle>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
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

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

  setDisplayedColumns() {
    this.ADD_SOUS_FAMILLES_ARTICLES = this.Authentication.authoritiesUtilisateur.ADD_SOUS_FAMILLES_ARTICLES;
    this.DELETE_SOUS_FAMILLES_ARTICLES = this.Authentication.authoritiesUtilisateur.DELETE_SOUS_FAMILLES_ARTICLES;
    this.MODIFY_SOUS_FAMILLES_ARTICLES = this.Authentication.authoritiesUtilisateur.MODIFY_SOUS_FAMILLES_ARTICLES;
    if (this.Authentication.getAuthoritiesUtilisateur().DELETE_SOUS_FAMILLES_ARTICLES) {
      if (this.Authentication.getAuthoritiesUtilisateur().MODIFY_SOUS_FAMILLES_ARTICLES) {
        this.displayedColumns = ['index', 'code', 'designation', 'famille', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'famille', 'supprimer'];
      }
    } else {
      if (this.Authentication.getAuthoritiesUtilisateur().MODIFY_SOUS_FAMILLES_ARTICLES) {
        this.displayedColumns = ['index', 'code', 'designation', 'famille', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'designation', 'famille'];
      }
    }
  }

  modifierSousFamille(i: any) {
    const dialogRef = this.dialog.open(ModifySousFamilleArticleComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[i]}
    });
    console.log(this.ListElementTable[i]);
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.ReferentielGenerale.modifySelectedSousFamilleArticle(value3).subscribe(value2 => {
          this.getSousFamilleArticles();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }
}
