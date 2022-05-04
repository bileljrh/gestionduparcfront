import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { FamilleArticle } from '../../../referentiel/general/articles/famille-article';
import { SousFamilleArticle } from '../../../referentiel/general/articles/sous-famille-article';
import { GenreVehicule } from '../../../referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import { MarqueVehicule } from '../../../referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import { TypeVehicule } from '../../../referentiel/general/parametres-vehicules/type-vehicule/type-vehicule';
import { ReferentielGeneraleServiceService } from '../../../referentiel/general/referentiel-generale-service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemandeArticle } from '../../../achat/demande-article';
import { MatSort } from '@angular/material/sort';
import { RetourStock } from '../../retour-structure/RetourStock';
import { MatTableDataSource } from '@angular/material/table';
import { ArticesForTransfertToVirtualMagasinComponent } from './artices-for-transfert-to-virtual-magasin/artices-for-transfert-to-virtual-magasin.component';
import { UpdateMagasinVirtuel } from '../UpdateMagasinVirtuel';
import { MagasinArticle } from '../MagasinArticle';
import { StockServiceService } from '../../stock-service.service';
import { UpdateMagasinVirtuelArticle } from '../UpdateMagasinVirtuelArticle';
import { MagasinRotationNull } from '../MagasinRotationNull';

@Component({
  selector: 'app-nouveau-transfert',
  templateUrl: './nouveau-transfert.component.html',
  styleUrls: ['./nouveau-transfert.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [MatSnackBar]
})
export class NouveauTransfertComponent implements OnInit {

  nouveauBon:UpdateMagasinVirtuel   = {
    status:'',
    updateMagasinVirtuelArticle : []  
  }
  articleTab: MagasinArticle[] = [];

  dataSource = new MatTableDataSource<MagasinArticle>(this.articleTab);
  expandedElement: MagasinArticle[] | null;
  newArticleVersMagasinForm = new FormGroup({
    status: new FormControl(null, Validators.required),
    qteTransferer: new FormControl(null, Validators.required),
  });
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    public dialogRef: MatDialogRef<NouveauTransfertComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Referentiel:ReferentielGeneraleServiceService,
    private Stock:StockServiceService,
    public dialog: MatDialog 
  
  ) {
    
   }

  options: string[] = ['Centre Mecanique Auto', 'Parc Béja', 'Parc Al-Kef'];

  displayedColumns: string[] = ['index', 'codeArticle', 'designation', 'plus'];
//  articleTab: RetourStock[] = [];
  //dataSource = new MatTableDataSource<RetourStock>(this.articleTab);
  //expandedElement: RetourStock[] | null;
  
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  closeDialog(): void {
    this.dialogRef.close();
  }


  onCancel() {
    this.dialogRef.close();
  }
  

  deleteRow(i: any) {
    this.articleTab.splice(i, 1);
    this.dataSource = new MatTableDataSource<MagasinArticle>(this.articleTab);
  }
  

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

    //fake confirm
    onConfirm() {
      this.nouveauBon = {
        status: this.newArticleVersMagasinForm.value.status,
        updateMagasinVirtuelArticle : this.demandeArticlesToUpdateDemandeArticles(this.articleTab),

      }
      console.log("nouv transfert vers mv");
      
      console.log(this.nouveauBon);
      this.dialogRef.close(this.nouveauBon);
   }
   demandeArticlesToUpdateDemandeArticles(magasinArticles: MagasinArticle []): UpdateMagasinVirtuelArticle[] {
          const updateMagasinVirtuelArticles: UpdateMagasinVirtuelArticle[] = [];
          if (magasinArticles.length > 0) {
            magasinArticles.forEach(magasinArticle => {
               const updateMagasinVirtuelArticle: UpdateMagasinVirtuelArticle = {
                qteTransferer:magasinArticle.qteTransferer,
                updateArticle: {
                  codeArticle: magasinArticle.article.codeArticle,
                  dateAjout: magasinArticle.article.dateAjout,
                  designation: magasinArticle.article.designation,
                  idGenreVehicule: magasinArticle.article.genreVehicule.id,
                  idMarqueVehicule: magasinArticle.article.marqueVehicule.id,
                  idSousFamille: magasinArticle.article.sousFamille.id,
                  idTypeVehicule: magasinArticle.article.typeVehicule.id,
                  prix: magasinArticle.article.prix,
                  quantiteLivree: magasinArticle.article.quantiteLivree,
                  quantiteStock: magasinArticle.article.quantiteStock,
                  remise: magasinArticle.article.remise,
                  tva: magasinArticle.article.tva,
                  idUgp: magasinArticle.article.ugp.id,
                  alertStock :magasinArticle.article.alertStock
                }
              
                
              };
              //console.log(updateMagasinArticle.updateArticle.codeArticle);
              updateMagasinVirtuelArticles.push(updateMagasinVirtuelArticle);
              //console.log(updateMagasinArticles);
              
            });
          }
          console.log(this.demandeArticlesToUpdateDemandeArticles);
          
          return updateMagasinVirtuelArticles;
        }
    selectArticles(){ 
      const dialogRef = this.dialog.open(ArticesForTransfertToVirtualMagasinComponent, {
        width: '800px',
        panelClass: 'mat-dialog-container-class',
      });
      dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.articleTab.push(value3);
         // console.log(value3);
          console.log(this.articleTab);
          
          this.dataSource = new MatTableDataSource<MagasinArticle>(this.articleTab);
          this.dataSource.sort = this.sort;
        }
      });
    }
 
    
}
