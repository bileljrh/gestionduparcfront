import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UpdateBonCommande} from '../../update-bon-commande';
import {Fournisseur} from '../../../referentiel/general/fournisseurs/fournisseur';
import {Marche} from '../../marche';
import {DemandeArticle} from '../../demande-article';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ReferentielGeneraleServiceService} from '../../../referentiel/general/referentiel-generale-service.service';
import moment from 'moment';
import {NouveauArticleBonCommandeComponent} from '../new-bon-commande/nouveau-article-bon-commande/nouveau-article-bon-commande.component';
import {UpdateDemandeArticle} from '../../update-demande-article';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { PaginationConfiguration } from '../../../pagination-configuration';

@Component({
  selector: 'app-modify-bon-commande',
  templateUrl: './modify-bon-commande.component.html',
  styleUrls: ['./modify-bon-commande.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ModifyBonCommandeComponent implements OnInit {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  modifierBon:UpdateBonCommande = {
    id:null,
    //achat: '',
    commandeHTBrut: 0,
    numePiece:'',
    commandeHTNet: 0,
    commandeTTC: 0,
    commandeTVA: 0,
    commandeTimbreFix: 0,
    dateDemande: null,
    dateFacture: null,
    dateReglement:null,
    updateDemandesArticle: [],
    livraisonHTBrut: 0,
    livraisonHTNet: 0,
    livraisonTTC: 0,
    livraisonTVA: 0,
    livraisonTimbreFix: 0,
    marche: null,
    montantFacture: null,
    montantLivre: null,
    montantReglement: null,
    parc: '',
    referenceFacture: null,
    referenceReglement: null,
    status: '',
    fournisseur: null
  };
  Parc: string[] = ['Parc 1', 'Parc 2', 'Parc 3', 'Parc 4', 'Parc 5', 'Parc 6'];
  Achat: string[] = ['Achat 1', 'Achat 2', 'Achat 3', 'Achat 4', 'Achat 5', 'Achat 6'];
  ListFournisseur: Fournisseur[] = [];
  ListMarche: Marche[] = [];
  referenceMarche: string;
  budget: number;
  displayedColumns: string[] = ['index', 'codeArticle', 'designation', 'plus'];
  articleTab: DemandeArticle[] = [];
  dataSource = new MatTableDataSource<DemandeArticle>(this.articleTab);
  expandedElement: DemandeArticle[] | null;

  modifyBonCommandeForm = new FormGroup({
    parc: new FormControl(null, Validators.required),
    achat: new FormControl(null, Validators.required),
    numePiece: new FormControl(null, Validators.required),
    dateDemande: new FormControl(null, Validators.required),
    montantLivre: new FormControl(null, Validators.required),
    montantFacture: new FormControl(null, Validators.required),
    dateFacture: new FormControl(null, Validators.required),
    referenceFacture: new FormControl(null, Validators.required),
    montantReglement: new FormControl(null, Validators.required),
    dateReglement: new FormControl(null, Validators.required),
    referenceReglement: new FormControl(null, Validators.required),
    fournisseur: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    quantiteCommandee: new FormControl(null, Validators.required),
    quantiteLivree: new FormControl(null, Validators.required),
    prixUnitaire: new FormControl(null, Validators.required),
    TVA: new FormControl(null, Validators.required),
    remise: new FormControl(null, Validators.required),
    marche: new FormControl(null, Validators.required),
    ttcCommande: new FormControl(null, Validators.required)
  });
  livraisonCalculationForm = new FormGroup({
    htBrutLivraison: new FormControl(0),
    htNetLivraison: new FormControl(0),
    tvaLivraison: new FormControl(0),
    ttcLivraison: new FormControl(0),
  });
  timbreFixCommande = new FormControl('600');
  timbreFixLivraison = new FormControl('600');
  commandeCalculationForm = new FormGroup({
    htBrutCommande: new FormControl(0),
    htNetCommande: new FormControl(0),
    tvaCommande: new FormControl(0),
    ttcCommande: new FormControl(0),
  });
  codeFournisseur: '';
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public dialogRef: MatDialogRef<ModifyBonCommandeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private Referentiel: ReferentielGeneraleServiceService) {
  
  /*  this.Referentiel.getListMarche().subscribe(value => {
      this.ListMarche = value;

      this.ListMarche.forEach(value1 => {
        if (value1.id === data.element.marche.id) {
          this.modifyBonCommandeForm.controls.marche.patchValue(value1);
        }
      });
      
    });
    */
    this.Referentiel.getListFournisseur(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListFournisseur = value;
      this.ListFournisseur.forEach(value1 => {
        if (value1.id === data.element.fournisseur.id) {
          this.modifyBonCommandeForm.controls.fournisseur.patchValue(value1);
        }
      });
    });
    /*
    this.modifyBonCommandeForm.controls.marche.valueChanges.subscribe(value => {
      this.referenceMarche = value.referenceMarche;
      this.budget = value.budget;
    });
    */
    this.modifyBonCommandeForm.controls.fournisseur.valueChanges.subscribe(value => {
      this.codeFournisseur = value.code;
    });
    this.modifyBonCommandeForm.controls.parc.patchValue(data.element.parc);
    this.modifyBonCommandeForm.controls.achat.patchValue(data.element.achat);
    this.modifyBonCommandeForm.controls.fournisseur.patchValue(data.element.fournisseur);
    this.modifyBonCommandeForm.controls.dateDemande.patchValue(data.element.dateDemande);
    this.modifyBonCommandeForm.controls.ttcCommande.patchValue(data.element.commandeTTC);
    this.modifyBonCommandeForm.controls.montantLivre.patchValue(data.element.montantLivre);
    this.modifyBonCommandeForm.controls.montantFacture.patchValue(data.element.montantFacture);
    this.modifyBonCommandeForm.controls.dateFacture.patchValue(data.element.dateFacture);
    this.modifyBonCommandeForm.controls.referenceFacture.patchValue(data.element.referenceFacture);
    this.modifyBonCommandeForm.controls.dateReglement.patchValue(data.element.dateReglement);
    this.modifyBonCommandeForm.controls.referenceReglement.patchValue(data.element.referenceReglement);
    this.modifyBonCommandeForm.controls.montantReglement.patchValue(data.element.montantReglement);
    this.articleTab = data.element.demandesArticle;
    console.log("articles tab modify bon commande");
    console.log(this.articleTab);
    
    
    this.dataSource = new MatTableDataSource<DemandeArticle>(this.articleTab);
    this.commandeCalculation(this.timbreFixCommande.value);
    this.livraisonCalculation(this.timbreFixLivraison.value);
  }

  ngOnInit(): void {
    this.timbreFixCommande.valueChanges.subscribe(value => {
      if ((value !== undefined) && (value !== null)) {
        this.commandeCalculation(value);
      }
    });

    this.timbreFixLivraison.valueChanges.subscribe(value => {
      if ((value !== undefined) && (value !== null)) {
        this.livraisonCalculation(value);
      }
    });
  }


  deleteRow(i: any) {
    this.articleTab.splice(i, 1);
    this.dataSource = new MatTableDataSource<DemandeArticle>(this.articleTab);
    this.commandeCalculation(this.timbreFixCommande.value);
    this.livraisonCalculation(this.timbreFixLivraison.value);
  }


  livraisonCalculation(timbreFix: number) {
    if (this.articleTab.length > 0) {
      let htBrut = 0;
      let htNet = 0;
      let tva = 0;
      let ttc = 0;
      for (const i in this.articleTab) {
        if (i !== (this.articleTab.length).toString()) {
          const htBrutArticle = this.articleTab[i].article.prix * this.articleTab[i].quantiteCommandee;
          htBrut = this.roundNumber(Math.ceil, htBrut + htBrutArticle, 3);
          const htNetArticle = htBrutArticle * (100 - this.articleTab[i].article.remise) / 100;
          htNet = this.roundNumber(Math.ceil, htNet + htNetArticle, 3);
          const tvaArticle = htNetArticle * (100 - this.articleTab[i].article.remise) / 100;
          tva = this.roundNumber(Math.ceil, tva + tvaArticle, 3);
          if ((htBrut !== 0) && (htNet !== 0)) {
            const ttcArticle = htNetArticle + tvaArticle + Number(timbreFix);
            ttc = this.roundNumber(Math.ceil, ttc + ttcArticle, 3);
          } else {
            ttc = 0;
          }
        }
      }
      this.livraisonCalculationForm.controls.htBrutLivraison.patchValue(htBrut);
      this.livraisonCalculationForm.controls.htNetLivraison.patchValue(htNet);
      this.livraisonCalculationForm.controls.tvaLivraison.patchValue(tva);
      this.livraisonCalculationForm.controls.ttcLivraison.patchValue(ttc);
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
          const htBrutArticle = this.articleTab[i].article.prix * this.articleTab[i].quantiteCommandee;
          htBrut = this.roundNumber(Math.ceil, htBrut + htBrutArticle, 3);
          const htNetArticle = htBrutArticle * (100 - this.articleTab[i].article.remise) / 100;
          htNet = this.roundNumber(Math.ceil, htNet + htNetArticle, 3);
          const tvaArticle = htNetArticle * (100 - this.articleTab[i].article.remise) / 100;
          tva = this.roundNumber(Math.ceil, tva + tvaArticle, 3);
          if ((htBrut !== 0) && (htNet !== 0)) {
            const ttcArticle = htNetArticle + tvaArticle + Number(timbreFix);
            ttc = this.roundNumber(Math.ceil, ttc + ttcArticle, 3);
          } else {
            ttc = 0;
          }
        }
      }
      this.commandeCalculationForm.controls.htBrutCommande.patchValue(htBrut);
      this.commandeCalculationForm.controls.htNetCommande.patchValue(htNet);
      this.commandeCalculationForm.controls.tvaCommande.patchValue(tva);
      this.commandeCalculationForm.controls.ttcCommande.patchValue(ttc);
    }
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.modifierBon = {
      id: this.data.element.id,
      //achat: this.modifyBonCommandeForm.value.achat,
      commandeHTBrut: this.commandeCalculationForm.value.htBrutCommande,
      commandeHTNet: this.commandeCalculationForm.value.htNetCommande,
      commandeTTC: this.commandeCalculationForm.value.ttcCommande,
      commandeTVA: this.commandeCalculationForm.value.tvaCommande,
      commandeTimbreFix: this.timbreFixCommande.value,
    //  dateDemande: moment(this.modifyBonCommandeForm.value.dateDemande as Date).format('YYYY-MM-DD'),
     // dateFacture: moment(this.modifyBonCommandeForm.value.dateFacture as Date).format('YYYY-MM-DD'),
      //dateReglement: moment(this.modifyBonCommandeForm.value.dateReglement as Date).format('YYYY-MM-DD'),
      updateDemandesArticle: this.demandeArticlesToUpdateDemandeArticles(this.articleTab),
      livraisonHTBrut: this.livraisonCalculationForm.value.htBrutLivraison,
      livraisonHTNet: this.livraisonCalculationForm.value.htNetLivraison,
      livraisonTTC: this.livraisonCalculationForm.value.ttcLivraison,
      livraisonTVA: this.livraisonCalculationForm.value.tvaLivraison,
      livraisonTimbreFix: this.timbreFixLivraison.value,
      marche: this.modifyBonCommandeForm.value.marche,
      montantFacture: this.modifyBonCommandeForm.value.montantFacture,
      montantLivre: this.modifyBonCommandeForm.value.montantLivre,
      montantReglement: this.modifyBonCommandeForm.value.montantReglement,
      parc: this.modifyBonCommandeForm.value.parc,
      referenceFacture: this.modifyBonCommandeForm.value.referenceFacture,
      numePiece:this.modifyBonCommandeForm.value.numePiece,
      referenceReglement: this.modifyBonCommandeForm.value.referenceReglement,
      status: 'Non confirmé',
      fournisseur: this.modifyBonCommandeForm.value.fournisseur
    };
    this.dialogRef.close(this.modifierBon);
    console.log(this.modifierBon.dateReglement);
    
  }


  ajouterNouvelArticle() {
    const dialogRef = this.dialog.open(NouveauArticleBonCommandeComponent, {
      width: '800px',
      panelClass: 'mat-dialog-container-class'
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.articleTab.push(value3);
        this.dataSource = new MatTableDataSource<DemandeArticle>(this.articleTab);
        this.dataSource.sort = this.sort;
        this.commandeCalculation(this.timbreFixCommande.value);
        this.livraisonCalculation(this.timbreFixLivraison.value);
      }
    });
  }

  roundNumber(func, nbr: number, prec) {
    let tempnumber = nbr * Math.pow(10, prec);
    tempnumber = func(tempnumber);
    return tempnumber / Math.pow(10, prec);
  }

  demandeArticlesToUpdateDemandeArticles(demandeArticles: DemandeArticle[]): UpdateDemandeArticle[] {
    const updateDemandeArticles: UpdateDemandeArticle[] = [];
    if (demandeArticles.length > 0) {
      demandeArticles.forEach(demandeArticle => {
        const updateDemandeArticle: UpdateDemandeArticle = {
          quantiteCommandee: demandeArticle.quantiteCommandee,
          quantiteLivree: demandeArticle.quantiteLivree,
          updateArticle: {
            codeArticle: demandeArticle.article.codeArticle,
            dateAjout: demandeArticle.article.dateAjout,
            designation: demandeArticle.article.designation,
            idGenreVehicule: demandeArticle.article.genreVehicule.id,
            idMarqueVehicule: demandeArticle.article.marqueVehicule.id,
            idSousFamille: demandeArticle.article.sousFamille.id,
            idTypeVehicule: demandeArticle.article.typeVehicule.id,
            prix: demandeArticle.article.prix,
            quantiteLivree: demandeArticle.article.quantiteLivree,
            quantiteStock: demandeArticle.article.quantiteStock,
            remise: demandeArticle.article.remise,
            tva: demandeArticle.article.tva,
            idUgp: demandeArticle.article.ugp.id,
            alertStock :demandeArticle.article.alertStock
          }
        };
        updateDemandeArticles.push(updateDemandeArticle);
      });
    }
    return updateDemandeArticles;
  }


}
