import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AdministratifServiceService} from '../administratif-service.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {PaginationConfiguration} from '../../pagination-configuration';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {SearchTaxeCirculationComponent} from '../taxe-de-circulation/search-taxe-circulation/search-taxe-circulation.component';
import {NouvelleVisiteTechniqueComponent} from './nouvelle-visite-technique/nouvelle-visite-technique.component';
import {VisiteTechniqueTableData} from './visite-technique-table-data';
import {DeleteVisiteTechniqueComponent} from './delete-visite-technique/delete-visite-technique.component';
import {ModifyVisiteTechniqueComponent} from './modify-visite-technique/modify-visite-technique.component';
import {ModifyVehiculeComponent} from '../vehicules/modify-vehicule/modify-vehicule.component';
import {AuthenticationServiceService} from '../../../authentication-service.service';
import { Structure } from '../../referentiel/specifique/structure-administrative/structure';


@Component({
  selector: 'app-visite-technique',
  templateUrl: './visite-technique.component.html',
  styleUrls: ['./visite-technique.component.scss'],
  providers: [MatSnackBar]
})
export class VisiteTechniqueComponent implements OnInit {


  listStructure: Structure[] = [];
  structureForm = new FormControl(null);
  structure = '';






  VIEW_VISITE_TECHNIQUE: boolean;
  ADD_VISITE_TECHNIQUE: boolean;
  MODIFY_VISITE_TECHNIQUE: boolean;
  DELETE_VISITE_TECHNIQUE: boolean;
  displayedColumns: string[] = [];
  ListElementTable: VisiteTechniqueTableData[] = [];
  dataSource = new MatTableDataSource<VisiteTechniqueTableData>(this.ListElementTable);
  @ViewChild(MatSort) sort: MatSort;
  itemPerPageControl = new FormControl(10);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La visite technique sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La visite technique sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModificationMsg = 'La visite technique sélectionnée a été modifiée avec succès';
  snackBarFailureModificationMsg = 'La visite technique sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'L\'ajout d\'une visite technique a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle visite technique ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  itemPerPage = new FormControl(10);

  constructor(private Administratif: AdministratifServiceService, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    
    
this.Administratif.listStructure().subscribe(value => {
  this.listStructure = value
})

    
    this.ngxLoader.start();
    this.setDisplayedColumns();
    this.getTotalItems();
    this.ngxLoader.stop();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRow(i: number) {
    const dialogRef = this.dialog.open(DeleteVisiteTechniqueComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '540px',
      data: {id: i}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.deleteSelectedVisiteTechnique(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesDeleteMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureDeleteMsg);
        });
        this.ngxLoader.stop();
      }
    });
  }

  modifyRow(i: any) {
    const dialogRef = this.dialog.open(ModifyVisiteTechniqueComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {element: this.ListElementTable[i]}
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.Administratif.modifySelectedVisiteTechnique(value).subscribe(value1 => {
          this.getTotalItems();
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarSuccesModificationMsg);
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureModificationMsg);
        });
        this.ngxLoader.stop();
      }
    });
  }

  nouvelleVisiteTechnique() {
    const dialogRef = this.dialog.open(NouvelleVisiteTechniqueComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
        this.Administratif.addNewVisiteTechnique(value).subscribe(value1 => {
          this.getTotalItems();
          this.displayNotification(this.snackBarSuccesAddingMsg);
          this.ngxLoader.stop();
        }, error => {
          this.ngxLoader.stop();
          this.displayNotification(this.snackBarFailureAddingMsg);
        });
      }
    });
  }

  searchTaxeCirculation() {
    const dialogRef = this.dialog.open(SearchTaxeCirculationComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.ngxLoader.start();
      }
    });
  }

  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.Administratif.getPaginationVisiteTechniqueList(this.structure,(this.paginConfig.currentPage - 1).toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<VisiteTechniqueTableData>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }

  redirectToVehicule(i: number) {
    const dialogRef = this.dialog.open(ModifyVehiculeComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '1100px',
      data: {id: i}
    });
  }

  getTotalItems() {
    this.Administratif.getTotalItemVisiteTechniqueList().subscribe(value => {
      this.paginConfig.totalItems = value;
    });
    this.Administratif.getPaginationVisiteTechniqueList(this.structure,this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListElementTable = value;
      this.dataSource = new MatTableDataSource<VisiteTechniqueTableData>(this.ListElementTable);
      this.dataSource.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      this.displayNotification(this.snackBarFailureLoadingMsg);
    });
  }

  ngOnInit(): void {
    this.itemPerPageControl.valueChanges.subscribe(value1 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value1;
      this.getTotalItems();
      this.ngxLoader.stop();
    });

    this.structureForm.valueChanges.subscribe(value2 => {
      console.log("la valuer de value 2 structure test");

      console.log(value2);

      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.structure = '';
      } else {
        this.structure = value2.designation;
      
        console.log(this.structure);


      }



      this.getTotalItems();
      this.ngxLoader.stop();
    });


  }

  setDisplayedColumns() {
    this.VIEW_VISITE_TECHNIQUE = this.Authentication.authoritiesUtilisateur.VIEW_VISITE_TECHNIQUE;
    this.DELETE_VISITE_TECHNIQUE = this.Authentication.authoritiesUtilisateur.DELETE_VISITE_TECHNIQUE;
    this.ADD_VISITE_TECHNIQUE = this.Authentication.authoritiesUtilisateur.ADD_VISITE_TECHNIQUE;
    this.MODIFY_VISITE_TECHNIQUE = this.Authentication.authoritiesUtilisateur.MODIFY_VISITE_TECHNIQUE;
    if (this.DELETE_VISITE_TECHNIQUE) {
      if (this.MODIFY_VISITE_TECHNIQUE) {
        this.displayedColumns = ['index', 'numeroPlaque', 'Structure', 'nombrePlaces', 'puissanceFiscale', 'prixAchat', 'datePMC', 'dateDebutValidite', 'dateFinValidite', 'montantVisiteTechnique', 'vehicule', 'modifier', 'supprimer'];
      } else {
        this.displayedColumns = ['index', 'numeroPlaque', 'Structure', 'nombrePlaces', 'puissanceFiscale', 'prixAchat', 'datePMC', 'dateDebutValidite', 'dateFinValidite', 'montantVisiteTechnique', 'vehicule', 'supprimer'];
      }
    } else {
      if (this.MODIFY_VISITE_TECHNIQUE) {
        this.displayedColumns = ['index', 'numeroPlaque', 'Structure', 'nombrePlaces', 'puissanceFiscale', 'prixAchat', 'datePMC', 'dateDebutValidite', 'dateFinValidite', 'montantVisiteTechnique', 'vehicule', 'modifier'];
      } else {
        this.displayedColumns = ['index', 'numeroPlaque', 'Structure', 'nombrePlaces', 'puissanceFiscale', 'prixAchat', 'datePMC', 'dateDebutValidite', 'dateFinValidite', 'montantVisiteTechnique', 'vehicule'];
      }
    }
  }
}
