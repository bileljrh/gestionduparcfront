import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {PaginationConfiguration} from '../../pagination-configuration';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DeleteDemandeAffectationCartePlafondComponent} from '../../carburant/carte-plafond/demande-affectation-carte-plafond/delete-demande-affectation-carte-plafond/delete-demande-affectation-carte-plafond.component';
import {Fournisseur} from '../../referentiel/general/fournisseurs/fournisseur';
import {ReferentielGeneraleServiceService} from '../../referentiel/general/referentiel-generale-service.service';
import {NewBonCommandeComponent} from './new-bon-commande/new-bon-commande.component';
import {AchatServiceService} from '../achat-service.service';
import {BonCommande} from '../bon-commande';
import {ModifyBonCommandeComponent} from './modify-bon-commande/modify-bon-commande.component';
import { Subscription } from 'rxjs';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { BonCommandeList } from './BonCommandeList';
import { FournisseurList } from './FournisseurList';
import { DemandeArticle } from '../demande-article';
import { Article } from '../../referentiel/general/articles/article';
import moment from 'moment';


@Component({
  selector: 'app-gestion-bon-commande',
  templateUrl: './gestion-bon-commande.component.html',
  styleUrls: ['./gestion-bon-commande.component.scss'],
  providers: [MatSnackBar]
})
export class GestionBonCommandeComponent implements OnInit {

  MODIFY_BON_COMMANDE: boolean;
  DELETE_BON_COMMANDE: boolean;
  VIEW_BON_COMMANDE:boolean;
  ADD_BON_COMMANDE:boolean;
  ListBonCommande: BonCommandeList[] = [];
  displayedColumns: string[] =  ['index', 'dateDemande', 'fournisseur', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<BonCommandeList>(this.ListBonCommande);
  @ViewChild(MatSort) sort: MatSort;
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];
  UGP: string[] = ['UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5', 'UGP 6'];
  listFournisseur: Fournisseur[] = [];
  ListParc: BonCommandeList[] =[] ;
  ListStatus: BonCommandeList[] = [];
  listContenantArticle: Article[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Le bon de commande sélectionné a été supprimé avec succées';
  snackBarFailureDeleteMsg = 'Le bon de commande sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Le nouveau bon de commande a été ajouté avec succées';
  snackBarFailureAddingMsg = 'Le nouveau bon de commande ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifiyingMsg = 'Le nouveau bon de commande a été modifié avec succées';
  snackBarFailureModifiyingMsg = 'Le nouveau bon de commande ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5,  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  customSearching = false;

  private subscriptions: Subscription[] = [];

  statusForm = new FormControl(null);
  parcForm = new FormControl(null);
  fournisseurForm = new FormControl(null);
  articleForm = new FormControl(null);
  dateMinForm = new FormControl(null);
  dateMaxForm = new FormControl(null);
  min: string;
  max: string;
  parc = '';
  status = '';
  fournisseur ='';
  article ='';
  date_demande :string;
  date_facture :string;


  setDisplayedColumns() {
    this.MODIFY_BON_COMMANDE = this.Authentication.authoritiesUtilisateur.MODIFY_BON_COMMANDE;
    this.DELETE_BON_COMMANDE = this.Authentication.authoritiesUtilisateur.DELETE_BON_COMMANDE;
    this.VIEW_BON_COMMANDE = this.Authentication.authoritiesUtilisateur.VIEW_BON_COMMANDE;
    this.ADD_BON_COMMANDE = this.Authentication.authoritiesUtilisateur.ADD_BON_COMMANDE;
  }

  constructor(private ReferentielGenerale: ReferentielGeneraleServiceService, 
    private Achat: AchatServiceService,
     private router: Router, public dialog: MatDialog, 
     private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService,
     private Authentication: AuthenticationServiceService
     ) {
    this.ngxLoader.start();
    this.itemPerPage.patchValue(this.paginConfig.itemsPerPage);
    this.getTotalList();
    this.ngxLoader.stop();
    this.setDisplayedColumns();
    this.getItemsArticle();
    this.getItemsFournisseur();
    this.getItemsStatus();
    this.getItemsParc();
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getItemsArticle();
    this.getItemsFournisseur();
    this.getItemsStatus();
    this.getItemsParc();
    //this.ReferentielGenerale.getListFournisseurBonCommande().subscribe(value => {
     // this.listFournisseur = value;
     // console.log('hello');
      
    //});
   
    this.subscriptions.push(this.itemPerPage.valueChanges.subscribe(value1 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value1;
      this.getTotalList();
      this.ngxLoader.stop();
    }));


    this.statusForm.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.status = '';
      } else {
        this.status = value2.status;
        console.log("le status!!");
        console.log(this.status);


      }

      this.getTotalList();
      this.ngxLoader.stop();
    });


    this.parcForm.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.parc = '';
      } else {
        this.parc = value2.parc;
        console.log("le status!!");
        console.log(this.parc);


      }

      this.getTotalList();
      this.ngxLoader.stop();
    });


    this.fournisseurForm.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.fournisseur = '';
      } else {
        this.fournisseur = value2.designation;
        console.log("le status!!");
        console.log(this.fournisseur);


      }

      this.getTotalList();
      this.ngxLoader.stop();
    });


    this.articleForm.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.article = '';
      } else {
        this.article = value2.designation;
        console.log("le status!!");
        console.log(this.article);


      }

      this.getTotalList();
      this.ngxLoader.stop();
    });


    this.dateMinForm.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.date_demande = moment(value2 as Date).format('YYYY-MM-DD');
      this.min = this.date_demande;
      this.paginConfig.currentPage = 0;
      this.getTotalList();
      this.ngxLoader.stop();
    });
    this.dateMaxForm.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.date_facture = moment(value2 as Date).format('YYYY-MM-DD');
      this.max = this.date_facture;
      this.paginConfig.currentPage = 0;
      this.getTotalList();
      this.ngxLoader.stop();
    });


  }

  ajouterNouveauBonCommande() {
    const dialogRef = this.dialog.open(NewBonCommandeComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      console.log("new bn commande value 3");
      console.log(value3);
      
      
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
     
        
        this.Achat.addNewBonCommande(value3).subscribe(value2 => {
          console.log();
          
          this.getTotalList();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  }


  deleteRow(i: number) {
    const dialogRef = this.dialog.open(DeleteDemandeAffectationCartePlafondComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Achat.deleteSelectedBonCommande(value3).subscribe(value1 => {
          this.getTotalList();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.subscriptions.push(this.Achat.getPaginationBonCommandeList(this.status,this.parc,this.fournisseur,this.article,this.date_demande,this.date_facture,(paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListBonCommande = value;
      this.dataSource = new MatTableDataSource<BonCommandeList>(this.ListBonCommande);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    }));
  }
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }


  handleCustomSearching() {
    this.customSearching = !this.customSearching;
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

  //this.parc,this.status,this.fournisseur,this.article,this.dateMin,this.dateMax,
  getTotalList() {
    this.subscriptions.push(this.Achat.getTotalItemBonCommandeList().subscribe(value => {
      this.paginConfig.totalItems = value;
    }));
    this.Achat.getPaginationBonCommandeList(this.status,this.parc,this.fournisseur,this.article,this.date_demande,this.date_facture,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
     console.log(this.paginConfig.currentPage.toString());
     
      this.ListBonCommande = value;
      console.log(this.ListBonCommande);
      this.dataSource = new MatTableDataSource<BonCommandeList>(this.ListBonCommande);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });

    
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyBonCommandeComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListBonCommande[i]}
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Achat.modifySelectedBonCommande(value3).subscribe(value1 => {
          this.getTotalList();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesModifiyingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureModifiyingMsg);
        });
      }
    });
  }

 






//list parcs
getItemsParc() {
    
  this.Achat.getAllParc().subscribe(value => {
    console.log(value);
    this.ListParc=value;
  });

}


//list status
getItemsStatus() {
    
  this.Achat.getAllStatus().subscribe(value => {
    console.log(value);
    this.ListStatus=value;
  });

}


//list fournisseur
getItemsFournisseur() {
    
  this.Achat.getAllFournisseur().subscribe(value => {
    console.log(value);
    this.listFournisseur=value;
  });

}


//list contenant article
getItemsArticle() {
    
  this.Achat.getAllArticle().subscribe(value => {
    console.log(value);
    this.listContenantArticle=value;
  });

}



}
