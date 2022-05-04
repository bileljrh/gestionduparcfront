import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BonTravail } from '../bon-travail';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { MaintenanceAndReparationServiceService } from '../../maintenance-and-reparation-service.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from '../../../referentiel/general/articles/article';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PieceStockComponent } from './details-pieces-stock-bon-travail/piece-stock/piece-stock.component';
import { OperationBonTravailComponent } from './details-pieces-stock-bon-travail/piece-stock/details-article/operation-bon-travail/operation-bon-travail.component';
import { ArticlesExternesBonTravailComponent } from './details-pieces-stock-bon-travail/piece-stock/details-article/articles-externes-bon-travail/articles-externes-bon-travail.component';
import { BonDeTravail } from '../../BonDeTravail';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemandeArticle } from '../../../achat/demande-article';
import { MatSort } from '@angular/material/sort';
import { formatDate } from '@angular/common';
import { InventaireStock } from '../../../stock/inventaire-stock/nouveau-inventaire-stock/InventaieStock';
import { ArticleForBonTravailComponent } from './details-pieces-stock-bon-travail/piece-stock/details-article/article-for-bon-travail/article-for-bon-travail.component';
import { BonTravailArticle } from '../../BonTravailArticle';
import { ArticleBon } from '../../ArticleBon';
import { BonTravailArticleExterne } from '../../BonTravailArticleExterne';
import { BonTravailOperation } from '../../BonTravailOperation';
import { Fournisseur } from '../../../referentiel/general/fournisseurs/fournisseur';
import { ReferentielGeneraleServiceService } from '../../../referentiel/general/referentiel-generale-service.service';
import { DemandeMaintenance } from '../../gestion-demande-intervention/demande-maintenance';
import { Magasin } from '../../../referentiel/specifique/unite-gestion-parc/magasin';
import { Atelier } from '../../../referentiel/specifique/unite-gestion-parc/atelier';
import { PaginationConfiguration } from '../../../pagination-configuration';

@Component({
  selector: 'app-details-bon-travail',
  templateUrl: './details-bon-travail.component.html',
  styleUrls: ['./details-bon-travail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [MatSnackBar]
})
export class DetailsBonTravailComponent implements OnInit {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  bonDeTravail: BonDeTravail = {
    id: null,
    articles: [],  
    observatioMode: '',
    externes: [],
    operations: [],
    fournisseur: [],
    atelier:[],
    magasin:[],
    facturation: {
      dateCommande: '',
      dateFacturation: '',
      dateReglement: '',
      montantCommande: 0,
      montantFacturation: 0,
      montantReglement: 0,
      numeroCommande: 0,
      numeroFacturation: 0,
      numeroReglement: 0,
    }
  };
  modifiedBonTravail: BonTravail = {
    id: null,
    dateEntree: '',
    dateSortiePrevue: '',
    demandeMaintenance: {
      id: null,
      vehicule: null,
      numeroSerie: '',
      idBeneficiaire: null,
      nomBeneficiaire: '',
      matriculeBeneficiaire: '',
      structure: '',
      personnel: '',
      ugp: '',
      ugpReparation: '',
      demandeur: '',
      dateDemande: '',
      indexKm: null,
      descriptionIntervention: '',
      status: '',
      dateRDV: '',
      observation: '',
      numeroDemande: '',
    },
    indexKM: 0,
    mode: '',
    natureTravaux: '',
    observation: '',
    bonTravailArticle: [],
    bonTravailArticleExterne: [],
    bonTravailOperation: [],
    facturation: null
  };
  //new 
  ListFacturation: any = {};
  timbreFixCommande = new FormControl('600');
  vehiculeDemande: any = {};
  ugpDemande: '';
  numSerie: '';
  ListBonTravail: BonTravail[] = [];
  ListMagasin:Magasin[]=[];
  ListAtelier:Atelier[]=[];
  nouveauBon: BonTravailArticle = {

    articles: null,
    quantite: 0,
    quantiteLivree: 0,
  };
  today = new Date();
  jstoday = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  commandeCalculationForm = new FormGroup({
    ttcCommande: new FormControl(0),
  });
  prixOperationCalucalation = new FormGroup({
    prixOpsum: new FormControl(0),
  });
  modifiedBonTravailForm = new FormGroup({
    dateRDV: new FormControl(null),
    dateEntree: new FormControl(null, Validators.required),
    dateSortiePrevue: new FormControl(null),
    natureTravaux: new FormControl(null, Validators.required),
    mode: new FormControl(null, Validators.required),
    indexKM: new FormControl(null, Validators.required),
    observation: new FormControl(null, Validators.required),
    montantTotal: new FormControl(null, Validators.required),
    observationMode: new FormControl(null, Validators.required),
    fournisseur: new FormControl(null, Validators.required),
    dateCommande: new FormControl(null, Validators.required),
    dateFacturation: new FormControl(null, Validators.required),
    dateReglement: new FormControl(null, Validators.required),
    montantCommande: new FormControl(null, Validators.required),
    montantFacturation: new FormControl(null, Validators.required),
    montantReglement: new FormControl(null, Validators.required),
    numeroCommande: new FormControl(null, Validators.required),
    numeroFacturation: new FormControl(null, Validators.required),
    numeroReglement: new FormControl(null, Validators.required),
    magasin:new FormControl(null, Validators.required),
    atelier:new FormControl(null, Validators.required),
    
  });
  @ViewChild('picker1') picker1: any;
  @ViewChild('picker2') picker2: any;
  @ViewChild('picker3') picker3: any;
  public date: moment.Moment;
  public disabled = false;
  public total : number;
  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  ListNatureTravaux: string[] = ['Nature 1', 'Nature 2', 'Nature 3', 'Nature 4'];
  ListModes: string[] = ['interne', 'externe'];
  ListFournisseur: Fournisseur[] = [];
  typeModeDemandeInterention = false;
  listPiecesRechange: Article[] = [];
  displayedColumns: string[] = ['numero', 'Article', 'Quantité', 'Prix'];
  dataSource1 = new MatTableDataSource<Article>(this.listPiecesRechange);
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.timbreFixCommande.valueChanges.subscribe(value => {
      if ((value !== undefined) && (value !== null)) {
        this.commandeCalculation(value);
      }
    });
    this.getListOperation();
    this.getPrixOperationSum();
     
  }

  getPrixOperationSum(){

    for (var i = 0; i < this.operationTab.length; i++) {
        if (this.operationTab[i].prix) {
            this.total += this.operationTab[i].prix;
        }
    }
  }

  commandeCalculation(timbreFix: number) {
    if (this.articleTab.length > 0) {
      let htBrut = 0;
      let htNet = 0;
      let tva = 0;
      let ttc = 0;
      for (const i in this.articleTab) {
        if (i !== (this.articleTab.length).toString()) {
          const htBrutArticle = this.articleTab[i].articles.prix * this.articleTab[i].quantite;
          htBrut = this.roundNumber(Math.ceil, htBrut + htBrutArticle, 3);
          const htNetArticle = htBrutArticle * (100 - this.articleTab[i].articles.remise) / 100;
          htNet = this.roundNumber(Math.ceil, htNet + htNetArticle, 3);
          const tvaArticle = htNetArticle * (100 - this.articleTab[i].articles.remise) / 100;
          tva = this.roundNumber(Math.ceil, tva + tvaArticle, 3);
          if ((htBrut !== 0) && (htNet !== 0)) {
            const ttcArticle = htNetArticle + tvaArticle + Number(timbreFix);
            ttc = this.roundNumber(Math.ceil, ttc + ttcArticle, 3);
          } else {
            ttc = 0;
          }
        }
      }
      this.commandeCalculationForm.controls.ttcCommande.patchValue(ttc);

    }
  }
  roundNumber(func, nbr: number, prec) {
    let tempnumber = nbr * Math.pow(10, prec);
    tempnumber = func(tempnumber);
    return tempnumber / Math.pow(10, prec);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onConfirm2() {
    this.nouveauBon = {
      articles: this.nouveauBon.articles,
      quantite: 0,
      quantiteLivree: 0
    }
    this.dialogRef.close(this.nouveauBon);

  }

  codeFournisseur: '';
  prixDeLaMontantCommande: ';'
  constructor(private Maintenance: MaintenanceAndReparationServiceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DetailsBonTravailComponent>,
    private Referentiel: ReferentielGeneraleServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.prixDeLaMontantCommande = this.data.element.observatioMode;
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss a', 'en-US', '+0530').substring(0, 10);
    this.modifiedBonTravailForm.controls.dateRDV.setValue(data.element.dateRDV);
    this.modifiedBonTravailForm.controls.dateEntree.setValue(data.element.dateEntree);
    this.modifiedBonTravailForm.controls.dateSortiePrevue.setValue(data.element.dateSortiePrevue);
    this.modifiedBonTravailForm.controls.natureTravaux.setValue(data.element.natureTravaux);
    this.modifiedBonTravailForm.controls.mode.setValue(data.element.mode);
    this.modifiedBonTravailForm.controls.indexKM.setValue(data.element.indexKM);
    this.modifiedBonTravailForm.controls.observation.setValue(data.element.observation);
    this.modifiedBonTravailForm.controls.observationMode.setValue(data.element.observatioMode);
    Maintenance.showBontravailById(data.element.id).subscribe(value => {
      this.bonDeTravail = value;
    });
    this.Referentiel.getListFournisseur(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListFournisseur = value;
    });

    this.Referentiel.getAllBonArt(1).subscribe(value => {
      this.articleTab = value;
      this.dataSource = new MatTableDataSource<BonTravailArticle>(this.articleTab);
    });

    this.Referentiel.listMagasin().subscribe(value => {
      this.ListMagasin = value;
      this.ListMagasin.forEach(value1 => {
        if (value1.id === data.element.magasin.id) {
          this.modifiedBonTravailForm.controls.magasin.patchValue(value1);
        }
      });
    });

    this.Referentiel.listAtelier().subscribe(value => {
      this.ListAtelier = value;
      this.ListAtelier.forEach(value1 => {
        if (value1.id === data.element.atelier.id) {
          this.modifiedBonTravailForm.controls.atelier.patchValue(value1);
        }
      });
    });


    this.Maintenance.getOnDemandeMaintenance(data.element.demandeMaintenance.id).subscribe((value: any) => {
      this.numSerie = value.vehicule.numeroSerie;
      this.ugpDemande = value.ugp;
    })

    this.modifiedBonTravailForm.controls.fournisseur.valueChanges.subscribe(value => {
      this.codeFournisseur = value.code;
    });



    this.Referentiel.getAllBonArt(data.element.id).subscribe(value => {
      this.articleTab = value;
      this.dataSource = new MatTableDataSource<BonTravailArticle>(this.articleTab);
    });
    this.Referentiel.getAllOperations(data.element.id).subscribe(value => {
      this.operationTab = value;
      this.firstDataSource = new MatTableDataSource<BonTravailOperation>(this.operationTab);
    });

    this.Referentiel.getAllArticleExterne(data.element.id).subscribe(value => {
      this.articleExterneTab = value;
      this.secondDataSource = new MatTableDataSource<BonTravailArticleExterne>(this.articleExterneTab);

    });

    if (data.element.mode == "EXTERNE") {
      if (data.element.facturation != null) {


        this.Maintenance.getOnFacturation(data.element.facturation.id).subscribe((value: any) => {
          this.ListFacturation = value;
        });
      }
    }
    
    this.Referentiel.getListFournisseur(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListFournisseur = value;
      this.ListFournisseur.forEach(value1 => {
        if (this.ListFacturation != null && this.ListFacturation.fournisseur != null) {
          if (value1.id === this.ListFacturation.fournisseur.id) {
            this.modifiedBonTravailForm.controls.fournisseur.patchValue(value1);
            this.modifiedBonTravailForm.controls.dateCommande.patchValue(this.ListFacturation.dateCommande);
            this.modifiedBonTravailForm.controls.numeroFacturation.patchValue(this.ListFacturation.numeroFacturation);
            this.modifiedBonTravailForm.controls.dateFacturation.patchValue(this.ListFacturation.dateFacturation);
            this.modifiedBonTravailForm.controls.montantFacturation.patchValue(this.ListFacturation.montantFacturation);
            this.modifiedBonTravailForm.controls.numeroReglement.patchValue(this.ListFacturation.numeroReglement);
            this.modifiedBonTravailForm.controls.dateReglement.patchValue(this.ListFacturation.dateReglement);
            this.modifiedBonTravailForm.controls.montantReglement.patchValue(this.ListFacturation.montantReglement);
            this.modifiedBonTravailForm.controls.numeroCommande.patchValue(this.ListFacturation.numeroCommande);
            this.modifiedBonTravailForm.controls.montantCommande.patchValue(this.ListFacturation.montantCommande);
      
          }
        }
      });
    });

    if (data.element.mode == "EXTERNE") {
      this.modifiedBonTravailForm.controls.dateCommande.patchValue(this.ListFacturation.dateCommande);
      this.modifiedBonTravailForm.controls.numeroFacturation.patchValue(this.ListFacturation.numeroFacturation);
      this.modifiedBonTravailForm.controls.dateFacturation.patchValue(this.ListFacturation.dateFacturation);
      this.modifiedBonTravailForm.controls.montantFacturation.patchValue(this.ListFacturation.montantFacturation);
      this.modifiedBonTravailForm.controls.numeroReglement.patchValue(this.ListFacturation.numeroReglement);
      this.modifiedBonTravailForm.controls.dateReglement.patchValue(this.ListFacturation.dateReglement);
      this.modifiedBonTravailForm.controls.montantReglement.patchValue(this.ListFacturation.montantReglement);
      this.modifiedBonTravailForm.controls.numeroCommande.patchValue(this.ListFacturation.numeroCommande);
      this.modifiedBonTravailForm.controls.montantCommande.patchValue(this.ListFacturation.montantCommande);

    }
this.getTotal();
  }
  
  getTotal() {
  
    
}




  listMagasin: string[] = ['magasin 1', 'magasin 2'];
  listAtelier: string[] = ['atelier 1', 'atelier 2']
  displayedColumns2: string[] = ['index', 'codeArticle', 'designation', 'plus'];
  articleTab: BonTravailArticle[] = [];
  articleExterneTab: BonTravailArticleExterne[] = [];
  operationTab: BonTravailOperation[] = [];

  operationForm = new FormGroup({
    prix: new FormControl(null, Validators.required),
    
  });

  dataSource = new MatTableDataSource<BonTravailArticle>(this.articleTab);
  secondDataSource = new MatTableDataSource<BonTravailArticleExterne>(this.articleExterneTab);
  firstDataSource = new MatTableDataSource<BonTravailOperation>(this.operationTab)
  expandedElement: BonTravailArticle[] | null;
  secondExpandedElement: BonTravailArticleExterne[] | null;
  firstExpandedElement: BonTravailOperation[] | null;
  myControl = new FormControl();
  options: string[] = ['Centre Mecanique Auto', 'Parc Béja', 'Parc Al-Kef'];
  filteredOptions: Observable<string[]>;
  newBonCommandeForm = new FormGroup({
    observatioMode: new FormControl(null, Validators.required),
    parc: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    quantiteCommandee: new FormControl(null, Validators.required),
    quantiteLivree: new FormControl(null, Validators.required),
    prixUnitaire: new FormControl(null, Validators.required),
    TVA: new FormControl(null, Validators.required),
    remise: new FormControl(null, Validators.required),
  });

  getListOperation() {

  }
  onConfirm3() {
    console.log("valeur de operation Tab !");
    console.log(this.operationTab);
    
    let mode = this.data.element.mode == "INTERNE" ?
      this.bonDeTravail = {
        id: this.data.element.id,
        observatioMode: this.modifiedBonTravailForm.value.observationMode,
        articles: this.demandeArticlesToUpdateDemandeArticles(this.articleTab),
        externes: this.articleExterneToBonDeTravail(this.articleExterneTab),
        operations: this.operationToBonDeTravail(this.operationTab),
        fournisseur: this.modifiedBonTravailForm.value.fournisseur,
        magasin:this.modifiedBonTravailForm.value.magasin,
        atelier:this.modifiedBonTravailForm.value.atelier

      }
      :
      this.bonDeTravail = {
        id: this.data.element.id,
        observatioMode: this.modifiedBonTravailForm.value.observationMode,
        articles: this.demandeArticlesToUpdateDemandeArticles(this.articleTab),
        externes: this.articleExterneToBonDeTravail(this.articleExterneTab),
        operations: this.operationToBonDeTravail(this.operationTab),
        fournisseur: this.modifiedBonTravailForm.value.fournisseur,
        magasin:this.modifiedBonTravailForm.value.magasin,
        atelier:this.modifiedBonTravailForm.value.atelier,
        facturation: {
          dateCommande: moment(this.modifiedBonTravailForm.value.dateCommande as Date).format('YYYY-MM-DDTHH:mm:ss'),
          dateFacturation: this.modifiedBonTravailForm.value.dateFacturation,
          dateReglement: this.modifiedBonTravailForm.value.dateReglement,
          montantCommande: this.modifiedBonTravailForm.value.montantCommande,
          montantFacturation: this.modifiedBonTravailForm.value.montantFacturation,
          montantReglement: this.modifiedBonTravailForm.value.montantReglement,
          numeroCommande: this.modifiedBonTravailForm.value.numeroCommande,
          numeroFacturation: this.modifiedBonTravailForm.value.numeroFacturation,
          numeroReglement: this.modifiedBonTravailForm.value.numeroReglement,
          
        }
      }
    this.dialogRef.close(this.bonDeTravail);
  }
  onConfirm() {
    this.modifiedBonTravail = {
      id: this.data.element.id,
      dateEntree: moment(this.modifiedBonTravailForm.value.dateEntree as Date).format('YYYY-MM-DDTHH:mm:ss'),
      dateSortiePrevue: moment(this.modifiedBonTravailForm.value.dateSortiePrevue as Date).format('YYYY-MM-DDTHH:mm:ss'),
      demandeMaintenance: this.data.element.demandeMaintenance,
      indexKM: this.modifiedBonTravailForm.value.indexKM,
      mode: this.modifiedBonTravailForm.value.mode,
      natureTravaux: this.modifiedBonTravailForm.value.natureTravaux,
      observation: this.modifiedBonTravailForm.value.observation,
      bonTravailArticle: null,
      bonTravailArticleExterne: null,
      bonTravailOperation: null,
      facturation: null,
    };
    this.dialogRef.close(this.modifiedBonTravail);
  }
  onCancel() {
    this.dialogRef.close();
  }
  checkBonTravailMode() {
    return (this.data.element.mode == ("INTERNE"));
  }



  checkBonTravailMixteMode() {
    return (this.data.element.mode == ("MIXTE"));

  }


  operation() {
    const dialogRef = this.dialog.open(OperationBonTravailComponent, {
      width: '650px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      console.log("test operation ");
      console.log(value3);
      if (value3 !== undefined) {
        this.operationTab.push(value3);
        this.firstDataSource = new MatTableDataSource<BonTravailOperation>(this.operationTab);
        this.firstDataSource.sort = this.sort;
      }
    });
  }
  deleteRowOperation(i: any) {
    this.operationTab.splice(i, 1);
    this.firstDataSource = new MatTableDataSource<BonTravailOperation>(this.operationTab);
  }
  deleteRowArticle(i: any) {
    this.articleTab.splice(i, 1);
    this.dataSource = new MatTableDataSource<BonTravailArticle>(this.articleTab);
  }
  deleteRowArticleExterne(i: any) {
    this.articleExterneTab.splice(i, 1);
    this.secondDataSource = new MatTableDataSource<BonTravailArticleExterne>(this.articleExterneTab);
  }
  ajouterArticlesExternes() {
    const dialogRef = this.dialog.open(ArticlesExternesBonTravailComponent, {
      width:'800px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.articleExterneTab.push(value3);
        this.secondDataSource = new MatTableDataSource<BonTravailArticleExterne>(this.articleExterneTab);
        this.secondDataSource.sort = this.sort;
        this.commandeCalculation(this.timbreFixCommande.value);
      }
    });
  }
  nvpiece() {
    const dialogRef = this.dialog.open(ArticleForBonTravailComponent, {
      width:'800px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.articleTab.push(value3);
        this.dataSource = new MatTableDataSource<BonTravailArticle>(this.articleTab);
        this.dataSource.sort = this.sort;
        this.commandeCalculation(this.timbreFixCommande.value);
      }
    });
  }

  demandeArticlesToUpdateDemandeArticles(demandeArticles: BonTravailArticle[]): BonTravailArticle[] {
    const updateDemandeArticles: BonTravailArticle[] = [];
    if (demandeArticles.length > 0) {
      demandeArticles.forEach(demandeArticle => {
        const updateDemandeArticle: BonTravailArticle = {
          quantite: demandeArticle.quantite,
          quantiteLivree: demandeArticle.quantiteLivree,
          articles: {
            id: demandeArticle.articles.id,
            codeArticle: demandeArticle.articles.codeArticle,
            dateAjout: demandeArticle.articles.dateAjout,
            designation: demandeArticle.articles.designation,
            prix: demandeArticle.articles.prix,
            quantiteLivree: demandeArticle.articles.quantiteLivree,
            quantiteStock: demandeArticle.articles.quantiteStock,
            remise: demandeArticle.articles.remise,
            tv: demandeArticle.articles.tv,
            tva: demandeArticle.articles.tva,
          }
        }
        updateDemandeArticles.push(updateDemandeArticle);
      });
    }
    return updateDemandeArticles;
  }
  articleExterneToBonDeTravail(demandeArticles: BonTravailArticleExterne[]): BonTravailArticleExterne[] {
    const updateDemandeArticles: BonTravailArticleExterne[] = [];
    if (demandeArticles.length > 0) {
      demandeArticles.forEach(demandeArticle => {
        const updateDemandeArticle: BonTravailArticleExterne = {
          quantite: demandeArticle.quantite,
          quantiteLivree: demandeArticle.quantiteLivree,
          externes: {
            id: demandeArticle.externes.id,
            codeArticle: demandeArticle.externes.codeArticle,
            dateAjout: demandeArticle.externes.dateAjout,
            designation: demandeArticle.externes.designation,
            prix: demandeArticle.externes.prix,
            quantiteLivree: demandeArticle.externes.quantiteLivree,
            quantiteStock: demandeArticle.externes.quantiteStock,
            remise: demandeArticle.externes.remise,
            tv: demandeArticle.externes.tv,
            tva: demandeArticle.externes.tva,
          }
        }
        updateDemandeArticles.push(updateDemandeArticle);
      });
    }
    return updateDemandeArticles;
  }

  operationToBonDeTravail(demandeArticles: BonTravailOperation[]): BonTravailOperation[] {
    const updateDemandeArticles: BonTravailOperation[] = [];
    let nbr :number;
    if (demandeArticles.length > 0) {
      demandeArticles.forEach(demandeArticle => {
        const updateDemandeArticle: BonTravailOperation = {
          prix: demandeArticle.prix,
          dateDebut:demandeArticle.dateDebut,
          operations: {
            id: demandeArticle.operations.id,
            code: demandeArticle.operations.code,
            designation: demandeArticle.operations.designation

          }         
        }

        updateDemandeArticles.push(updateDemandeArticle);
      });
    }
    return updateDemandeArticles;
  }
  closeDialog() {
    this.dialogRef.close();
  }

  closePicker() {
    this.picker1.cancel();
    this.picker2.cancel();
  }
  onSearchChange(event): void {
    console.log('Focus Is gained for this Element');
    console.log(event);
    
}

}
