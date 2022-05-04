import {Component, OnInit, ViewChild} from '@angular/core';
import {Marche} from '../../marche';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NouveauArticleBonCommandeComponent} from './nouveau-article-bon-commande/nouveau-article-bon-commande.component';
import {DemandeArticle} from '../../demande-article';
import {ReferentielGeneraleServiceService} from '../../../referentiel/general/referentiel-generale-service.service';
import {Fournisseur} from '../../../referentiel/general/fournisseurs/fournisseur';
import {MatSort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import moment from 'moment';
import {UpdateBonCommande} from '../../update-bon-commande';
import {UpdateDemandeArticle} from '../../update-demande-article';
import { DatePipe } from '@angular/common';
import { AchatServiceService } from '../../achat-service.service';
import { UGP } from '../../../referentiel/specifique/unite-gestion-parc/ugp';
import { PaginationConfiguration } from '../../../pagination-configuration';

@Component({
  selector: 'app-new-bon-commande',
  templateUrl: './new-bon-commande.component.html',
  styleUrls: ['./new-bon-commande.component.scss'],
  providers: [DatePipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NewBonCommandeComponent implements OnInit {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  isDisabled1=false;
  isDisabled2=false;
  isDisabled3=false;
  isDisabled4=false;



  nouveauBon: UpdateBonCommande = {
    
    //achat: '',
    numePiece:'',
    commandeHTBrut: 0,
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
    parc: null,
    referenceFacture: null,
    referenceReglement: null,
    status: '',
    fournisseur: null
  };
  
  Achat: string[] = ['Achat 1', 'Achat 2', 'Achat 3', 'Achat 4', 'Achat 5', 'Achat 6'];
  ListFournisseur: Fournisseur[] = [];
  ListMarche: Marche[] = [];
  upg: UGP[] = [];
  referenceMarche: string;
 
  budget: number;
  displayedColumns: string[] = ['index', 'codeArticle', 'designation', 'plus'];
  articleTab: DemandeArticle[] = [];
  dataSource = new MatTableDataSource<DemandeArticle>(this.articleTab);
  expandedElement: DemandeArticle[] | null;

  newBonCommandeForm = new FormGroup({
    parc: new FormControl(null, Validators.required),
    montantLivre: new FormControl(null, Validators.required),
    NumePiece:new FormControl(null,Validators.required),
    fournisseur: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    quantiteCommandee: new FormControl(null, Validators.required),
    quantiteLivree: new FormControl(null, Validators.required),
    prixUnitaire: new FormControl(null, Validators.required),
    TVA: new FormControl(null, Validators.required),
    remise: new FormControl(null, Validators.required),
  });
  get f() { return this.newBonCommandeForm.controls; }
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
  numpiec:any;
  start = new Date(Date.now());
  numepiece:string;
  date:string;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
   
   myDate = new Date();
    constructor(public dialogRef: MatDialogRef<NewBonCommandeComponent>, 
    private datePipe: DatePipe,
    public dialog: MatDialog, private Referentiel: ReferentielGeneraleServiceService,
    private achatService:AchatServiceService
   ) {
  //console.log(this.start);
  
   // this.myDate= this.datePipe.transform(this.myDate,'yyyy-MM-dd');
    
    this.achatService.getNumPiece().subscribe(
      (value: any) => {
         console.log(value);
         this.numpiec=value;
          this.numpiec=value+(this.start.getDate()+this.start.getMonth()+this.start.getFullYear());     
          this.numepiece=value+"-"+this.start.getDate()+(this.start.getMonth()+1)+this.start.getFullYear();
      });
      this.date=this.start.getFullYear().toString()+"-"+(this.start.getMonth()+1)+"-"+this.start.getDay();
      this.Referentiel.getListMarche().subscribe(value => {
      this.ListMarche = value;
    });

    this.Referentiel.getListFournisseur(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListFournisseur = value;
    });
    this.newBonCommandeForm.controls.fournisseur.valueChanges.subscribe(value => {
      this.codeFournisseur = value.code;
    });
    
  }
  myFunction(){
    this.myDate=new Date();
    let latest_date =this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(latest_date);
    
  }
  ngOnInit(): void {
    this.getItemsParc();
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

  getItemsParc() {
    this.achatService.getAllUgps().subscribe(value => {

      console.log(value);
      this.upg=value;

    /*this.dataSource = new MatTableDataSource<UGP>(this.ListElementTable);

       this.dataSource.sort = this.sort;*/

 

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
        console.log(this.articleTab);
        
        if (i !== (this.articleTab.length).toString()) {
          console.log((this.articleTab.length).toString());
          
          const htBrutArticle = this.articleTab[i].article.prix * this.articleTab[i].quantiteLivree;
          //const htBrutArticle = this.articleTab[i].article.prix * this.articleTab[i].quantiteCommandee;
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
      console.log(this.articleTab.length);
      
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

  validateNextTab(){
   
   console.log(this.newBonCommandeForm.value.achat);

  }

  onConfirm() {
    
    this.nouveauBon = {
     
      //achat: this.newBonCommandeForm.value.achat,
      commandeHTBrut: this.commandeCalculationForm.value.htBrutCommande,
      commandeHTNet: this.commandeCalculationForm.value.htNetCommande,
      commandeTTC: this.commandeCalculationForm.value.ttcCommande,
      commandeTVA: this.commandeCalculationForm.value.tvaCommande,
      commandeTimbreFix: this.timbreFixCommande.value,
      dateDemande: moment(this.newBonCommandeForm.value.dateDemandemomentmoment as Date).format('YYYY-MM-DD'),
      dateFacture: moment(this.newBonCommandeForm.value.dateDemandemomentmoment as Date).format('YYYY-MM-DD'),
      //dateReglement: moment(this.newBonCommandeForm.value.dateReglement as Date).format('YYYY-MM-DD'),
      dateReglement: moment(this.newBonCommandeForm.value.dateReglement as Date).format('YYYY-MM-DD'),
      updateDemandesArticle: this.demandeArticlesToUpdateDemandeArticles(this.articleTab),
      livraisonHTBrut: this.livraisonCalculationForm.value.htBrutLivraison,
      livraisonHTNet: this.livraisonCalculationForm.value.htNetLivraison,
      livraisonTTC: this.livraisonCalculationForm.value.ttcLivraison,
      livraisonTVA: this.livraisonCalculationForm.value.tvaLivraison,
      livraisonTimbreFix: this.timbreFixLivraison.value,
      marche: this.newBonCommandeForm.value.marche,
      montantFacture: this.newBonCommandeForm.value.montantFacture,
      montantLivre: this.newBonCommandeForm.value.montantLivre,
      montantReglement: this.newBonCommandeForm.value.montantReglement,
      numePiece:this.newBonCommandeForm.value.numePiece,
      parc: this.newBonCommandeForm.value.parc,
      referenceFacture: this.newBonCommandeForm.value.referenceFacture,
      referenceReglement: this.newBonCommandeForm.value.referenceReglement,
      status: 'Non confirmé',
      fournisseur: this.newBonCommandeForm.value.fournisseur
    };
    
    this.dialogRef.close(this.nouveauBon);
    console.log(this.nouveauBon.dateReglement);
    console.log(this.nouveauBon.dateFacture);
    console.log(this.nouveauBon.dateDemande);
    console.log("test Magasin virtuel");
    console.log(this.nouveauBon);
    console.log("articole tabe test new bon commande :"+this.articleTab);
    
    
    
    //invalid date
  }


  ajouterNouvelArticle() {
    const dialogRef = this.dialog.open(NouveauArticleBonCommandeComponent, {
      width: '800px',
      panelClass: 'mat-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.articleTab.push(value3);
        console.log(value3);
        console.log("nvnew bon-commande articleTab :"+this.articleTab);
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

