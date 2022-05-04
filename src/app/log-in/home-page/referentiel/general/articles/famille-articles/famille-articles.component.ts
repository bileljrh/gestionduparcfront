import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FamilleArticle} from '../famille-article';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {MatDialog} from '@angular/material/dialog';
import {NouvelleFamilleArticleComponent} from './nouvelle-famille-article/nouvelle-famille-article.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteFamilleArticleComponent} from './delete-famille-article/delete-famille-article.component';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../../authentication-service.service';
import {ModifyFamilleArticleComponent} from './modify-famille-article/modify-famille-article.component';
import { FormControl } from '@angular/forms';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-famille-articles',
  templateUrl: './famille-articles.component.html',
  styleUrls: ['./famille-articles.component.scss'],
  providers: [MatSnackBar]
})
export class FamilleArticlesComponent implements OnInit, OnDestroy {
  VIEW_FAMILLES_ARTICLES: boolean;
  ADD_FAMILLES_ARTICLES: boolean;
  MODIFY_FAMILLES_ARTICLES: boolean;
  DELETE_FAMILLES_ARTICLES: boolean;
  displayedColumns: string[] = [];
  ListElementTable: FamilleArticle[] = [];
  dataSource = new MatTableDataSource<any>(this.ListElementTable);
  itemPerPageForm = new FormControl(null);
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La famille sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La famille sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'La famille sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'La famille sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle famille a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La nouvelle famille ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  @ViewChild(MatSort) sort: MatSort;
  subscription: Subscription[] = [];
  
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  constructor(private ReferentielGenerale: ReferentielGeneraleServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private Authentication: AuthenticationServiceService,private ngxLoader: NgxUiLoaderService,) {
    this.setDisplayedColumns();
    this.getFamilleArticles();
  }


  ngOnInit(): void {
    this.subscription.push(this.itemPerPageForm.valueChanges.subscribe(value1 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value1;
      this.getFamilleArticles();
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

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.ReferentielGenerale.getPaginationListFamilleArticle((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<FamilleArticle>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }
  deleteFamille(i: any) {
    const dialogRef = this.dialog.open(DeleteFamilleArticleComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.ReferentielGenerale.deleteSelectedFamilleArticle(value3).subscribe(value2 => {
          this.getFamilleArticles();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureDeleteMsg);
        }));
      }
    }));
  }


  modifierFamille(i: any) {
    const dialogRef = this.dialog.open(ModifyFamilleArticleComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListElementTable[i]}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.ReferentielGenerale.modifySelectedFamille(value3).subscribe(value2 => {
          this.getFamilleArticles();
          this.displayNotification(this.snackBarSuccesModifyingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureModifyingMsg);
        }));
      }
    }));
  }

  ajoutetNouvelleFamille() {
    const dialogRef = this.dialog.open(NouvelleFamilleArticleComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.subscription.push(this.ReferentielGenerale.addNewFamilleArticle(value3).subscribe(value2 => {
          this.getFamilleArticles();
          this.displayNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.displayNotification(this.snackBarFailureAddingMsg);
        }));
      }
    }));
  }

  getFamilleArticles() {
    
    this.subscription.push(this.ReferentielGenerale.getPaginationListFamilleArticle(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<FamilleArticle>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => { 
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
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

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

  setDisplayedColumns() {
    this.ADD_FAMILLES_ARTICLES = this.Authentication.authoritiesUtilisateur.ADD_FAMILLES_ARTICLES;
    this.DELETE_FAMILLES_ARTICLES = this.Authentication.authoritiesUtilisateur.DELETE_FAMILLES_ARTICLES;
    this.MODIFY_FAMILLES_ARTICLES = this.Authentication.authoritiesUtilisateur.MODIFY_FAMILLES_ARTICLES;
    if (this.DELETE_FAMILLES_ARTICLES) {
      if (this.MODIFY_FAMILLES_ARTICLES) {
        this.displayedColumns = ['index', 'code', 'famille', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'code', 'famille', 'supprimer'];
      }
    } else {
      if (this.MODIFY_FAMILLES_ARTICLES) {
        this.displayedColumns = ['index', 'code', 'famille', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'code', 'famille'];
      }
    }
  }

}
