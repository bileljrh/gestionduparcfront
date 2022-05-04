import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { AchatServiceService } from '../../achat/achat-service.service';
import { PaginationConfiguration } from '../../pagination-configuration';
import { Structure } from '../../referentiel/specifique/structure-administrative/structure';
import { Magasin } from '../../referentiel/specifique/unite-gestion-parc/magasin';
import { UGP } from '../../referentiel/specifique/unite-gestion-parc/ugp';
import { RetourStructure } from '../RetourStructure';
import { StockServiceService } from '../stock-service.service';
import { DeleteRetouStructureOperationComponent } from './delete-retou-structure-operation/delete-retou-structure-operation.component';
import { DetailsRetourStructureComponent } from './details-retour-structure/details-retour-structure.component';
import { NewBonRetourComponent } from './new-bon-retour/new-bon-retour.component';

@Component({
  selector: 'app-retour-structure',
  templateUrl: './retour-structure.component.html',
  styleUrls: ['./retour-structure.component.scss'],
  providers: [MatSnackBar]
})
export class RetourStructureComponent implements OnInit {
 retourList: RetourStructure[]=[];

 magasins :Magasin [] =[];
 ugps :UGP[]=[];

 magasin = '';
  ugp = '';

  UgpControl = new FormControl(null);
  MagasinControl = new FormControl(null);

  listUGP:string[]=['parc béja','parc zaghouene','parc Ariana','parc tataouine']
  listMagasin:string[]=['magasin 1','magasin 2','magasin 3','magasin 4']
  ListTest: string[] = ['vehicule test'];
  displayedColumns: string[] = ['index','structure','Date','details','supprimer'];
  dataSource = new MatTableDataSource<RetourStructure>(this.retourList);
  @ViewChild(MatSort) sort: MatSort;
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesModifiyingMsg = 'Le bon de commande sélectionné a été modifié avec succées';
  snackBarFailureModifiyingMsg = 'Le bon de commande sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La nouvelle regulation a été ajoutée avec succès';
  snackBarSuccesDeleteMsg = 'L\'article sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMsg = 'L\'article sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';
  VIEW_Retour_Structure : boolean;
  DETAILS_Retour_Structure : boolean;
  DELETE_Retour_Structure : boolean;
  ADD_Retour_Structure : boolean;
  

  statusParameter = new FormControl(null);
  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  private subscriptions: Subscription[] = [];
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];


  constructor(
    public dialog: MatDialog,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private Authentication: AuthenticationServiceService,
    private Achat: AchatServiceService,private   stockServiceService: StockServiceService
  ) {
    this.ngxLoader.start();
    this.itemPerPage.patchValue(this.paginConfig.itemsPerPage);
    this.ngxLoader.stop();
    this.setDisplayedColumns();
   this.getTotalItems();
   this.getItemsMagasin();
      this.getItemsUgp();

  }
  setDisplayedColumns() {
    this.VIEW_Retour_Structure = this.Authentication.authoritiesUtilisateur.VIEW_Retour_Structure;
    this.DETAILS_Retour_Structure = this.Authentication.authoritiesUtilisateur.DETAILS_Retour_Structure;
    this.DELETE_Retour_Structure = this.Authentication.authoritiesUtilisateur.DELETE_Retour_Structure;
    this.ADD_Retour_Structure = this.Authentication.authoritiesUtilisateur.DELETE_Retour_Structure;
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }
  displayPageContent(paginConfig: PaginationConfiguration){

  }

  modifyRow(i){
    const dialogRef = this.dialog.open(DetailsRetourStructureComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: this.ListTest[i]}
    });

  }

  deleteRow(i){
    const dialogRef = this.dialog.open(DeleteRetouStructureOperationComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });

        dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.stockServiceService.deleteRetour(i).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteMsg);
        });
      }
    });

  }

  ajouterBonRetour(){

    const dialogRef = this.dialog.open(NewBonRetourComponent, {
      disableClose: true,
      width: '900px',
      panelClass: 'mat-dialog-container-class',
    });
    
    /*dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
      //juste pour laffichage de message d'eerur (achat)
        this.Achat.addNewBonCommande(value3).subscribe(value2 => {
          this.ngxLoader.stop();
         // this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureLoadingMsg);
        });
      }
    });*/
    
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
     
      console.log(value3);
        this.stockServiceService.createRetourStructure(value3).subscribe(value2 => {
          this.ngxLoader.stop();
          this.getTotalItems();
          this.showNotification(this.snackBarSuccesAddingMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureLoadingMsg);
        });
      }
    });

  }

  getTotalItems() {
    this.stockServiceService.getTotalItemsRetour().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.stockServiceService.getAllRetourStructure(this.magasin,this.ugp,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(value);
      this.retourList = value;
      this.dataSource = new MatTableDataSource<RetourStructure>(this.retourList);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.snackBar.open(this.snackBarFailureLoadingMsg, 'X', {duration: 3000});
      }, 800);
    });
  }
  showNotification(displayText: string) {
    setTimeout(() => {
     this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

  
  
  ngOnInit(): void {
    this.getTotalItems();
    this.getItemsMagasin();
      this.getItemsUgp();

      this.subscriptions.push(this.itemPerPage.valueChanges.subscribe(value1 => {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.paginConfig.itemsPerPage = value1;
        this.getTotalItems();
        this.ngxLoader.stop();
      }));
      this.UgpControl.valueChanges.subscribe(value2 => {
        console.log("la valuer de value 2 ugp");
  
        console.log(value2);
  
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        console.log(value2);
        if (value2 === undefined) {
          this.ugp = '';
        } else {
          this.ugp = value2.designation;
          console.log("l'ugp'!!");
          console.log(this.ugp);
          
        }
        this.getTotalItems();
        this.ngxLoader.stop();
      });
  
  
      this.MagasinControl.valueChanges.subscribe(value2 => {
        console.log("la valuer de value 2 magasin");
  
        console.log(value2);
  
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        console.log(value2);
        if (value2 === undefined) {
          this.magasin = '';
        } else {
          this.magasin = value2.designation;
          console.log("la magasin'!!");
          console.log(this.magasin);
          
        }
        this.getTotalItems();
        this.ngxLoader.stop();
      });

  }


  getItemsMagasin() {
    this.stockServiceService.getAllMagasins().subscribe(value => {
     console.log(value);
     this.magasins=value;
     
    });
  }

  getItemsUgp() {
    
    this.stockServiceService.getAllUgps().subscribe(value => {
      console.log(value);
      this.ugps=value;
    
 
     });
  }


}
