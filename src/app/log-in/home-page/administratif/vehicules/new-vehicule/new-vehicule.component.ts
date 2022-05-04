import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MarqueVehicule} from '../../../referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import {GenreVehicule} from '../../../referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import {ReferentielGeneraleServiceService} from '../../../referentiel/general/referentiel-generale-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TypeVehicule} from '../../../referentiel/general/parametres-vehicules/type-vehicule/type-vehicule';
import {Subscription} from 'rxjs';
import {Structure} from '../../../referentiel/specifique/structure-administrative/structure';
import {Gouvernorat} from '../../../referentiel/general/decoupage-administratif/gouvernorat';
import {LieuParking} from '../../../referentiel/general/lieu-parking/lieu-parking';
import {Energie} from '../../../referentiel/general/parametres-generaux/energie/energie';
import {NewVehicule} from '../new-vehicule';
import {Beneficiaire} from '../beneficiaire';
import {Fournisseur} from '../../../referentiel/general/fournisseurs/fournisseur';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ReferentielSpecifiqueServiceService} from '../../../referentiel/specifique/referentiel-specifique-service.service';
import {AdministratifServiceService} from '../../administratif-service.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import moment from 'moment';
import {AuthenticationServiceService} from '../../../../authentication-service.service';
import {DocumentTableData} from '../document-table-data';
import { PaginationConfiguration } from '../../../pagination-configuration';

@Component({
  selector: 'app-new-vehicule',
  templateUrl: './new-vehicule.component.html',
  styleUrls: ['./new-vehicule.component.scss']
})
export class NewVehiculeComponent implements OnDestroy, OnInit {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  newVehicule: NewVehicule = {
    numeroPlaque: '',
    genre: '',
    marque: '',
    type: '',
    idBeneficiaires: null,
    idGouvernorat: null,
    idLieuParking: null,
    idStructure: null,
    idEnergie: null,
    idFournisseur: null,
    etat: '',
    natureAffectation: '',
    dateAffectation: null,
    referenceAffectation: '',
    numeroImmatriculation: '',
    numeroProprietaireEtat: '',
    numeroChassis: '',
    numeroCarteUtilisation: '',
    indexKm: 0,
    typeTaxe: '',
    exploitationUsage: '',
    typeAssurance: '',
    nomAssurance: '',
    referenceBC: '',
    dateReception: null,
    prixAchat: '',
    situationDouaniere: '',
    numeroImmatriculationTemporaire: '',
    compagnieLeasing: '',
    dateEcheance: null,
    numeroCarteGrise: '',
    typeCarteGrise: '',
    referenceType: '',
    nombreDePlaces: 0,
    carosserie: '',
    poidsTotalACharge: 0,
    consommationMoyenne: 0,
    chargeUtile: 0,
    poidsTotalSansCharge: 0,
    dimensionsPneuAvant: 0,
    dimensionsPneuArriere: 0,
    poidsAVide: 0,
    puissanceFixale: 0,
    puissanceMoteur: 0,
    nombreEssieux: 0,
    volumeCylindre: 0,
    datePremiereMiseEnCirculation: null
  };
  suscription: Subscription[] = [];
  get f() { return this.newVehiculeForm.controls; }

  newVehiculeForm = new FormGroup({
    numeroPlaque: new FormControl(null, Validators.required),
    genre: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    marque: new FormControl(null, Validators.required),
    structure: new FormControl(null, Validators.required),
    gouvernorat: new FormControl(null),
    natureAffectation: new FormControl(null, Validators.required),
    numeroChassis: new FormControl(null, Validators.required),
    energie: new FormControl(null, Validators.required),
    _dateAffectation: new FormControl(),
    get dateAffectation() {
      return this._dateAffectation;
    },
    set dateAffectation(value) {
      this._dateAffectation = value;
    },
    dateAjout: new FormControl(new Date(), [Validators.required]),
    beneficiaire: new FormControl(),
    numeroImmatriculation: new FormControl(),
    numeroProprietaireEtat: new FormControl(),
    numeroCarteUtilisation: new FormControl(),
    indexKm: new FormControl(),
    lieuParking: new FormControl(),
    numeroCarteGrise: new FormControl(),
    typeCarteGrise: new FormControl(),
    referenceType: new FormControl(),
    nombreDePlaces: new FormControl(),
    carosserie: new FormControl(),
    poidsTotalACharge: new FormControl(),
    consommationMoyenne: new FormControl(),
    poidsTotalSansCharge: new FormControl(),
    datePremiereMiseEnCirculation: new FormControl(null, Validators.required),
    typeTaxe: new FormControl(null, Validators.required),
    etat: new FormControl(null, Validators.required),
    dimensionsPneuAvant: new FormControl(),
    dimensionsPneuArriere: new FormControl(),
    poidsAVide: new FormControl(),
    puissanceFixale: new FormControl(),
    puissanceMoteur: new FormControl(),
    nombreEssieux: new FormControl(),
    chargeUtile: new FormControl(),
    volumeCylindre: new FormControl(),
    referenceAffectation: new FormControl(),
    exploitationUsage: new FormControl(),
    typeAssurance: new FormControl(),
    nomAssurance: new FormControl(),
    fournisseur: new FormControl(),
    referenceBC: new FormControl(),
    dateReception: new FormControl(),
    prixAchat: new FormControl(),
    situationDouaniere: new FormControl(),
    numeroImmatriculationTemporaire: new FormControl(),
    compagnieLeasing: new FormControl(),
    dateEcheance: new FormControl()
  });
  ListMarqueVehicule: MarqueVehicule[] = [];
  ListGenreVehicule: GenreVehicule[] = [];
  ListTypeVehicule: TypeVehicule[] = [];
  ListEtatVehicule: string[] = ['En circulation', 'En panne', 'Sinistré'];
  ListStructure: Structure[] = [];
  ListGouvernorat: Gouvernorat[] = [];
  ListBeneficiaire: Beneficiaire[] = [];
  ListLieuParking: LieuParking[] = [];
  ListEnergie: Energie[] = [];
  ListTypeTaxe: string[] = ['Taxe de circulation', 'Taxe mensuelle', 'Taxe annuelle'];
  ListUsage: string[] = ['U1', 'U2', 'U3', 'U4', 'U5'];
  ListTypeAssurance: string[] = ['Auto', 'Incendie', 'Tout risque'];
  ListFournisseur: Fournisseur[] = [];
  ListCompagnieLeasing: string[] = ['Best Lease', 'Attijari Leasing', 'Tunisie Leasing & Factoring ', 'Arab Tunisian Lease', 'Hannibal Lease'];
  ListNatureAffectation: string[] = ['Service', 'En panne', 'Sinistré','Non actif'];
  selectedCarImage: File;
  formDataImage: FormData;
  imageUploaded = false;
  codeGenre = '';
  codeMarque = '';
  codeType = '';
  codeStructure = '';
  codeGouvernorat = '';
  codeBeneficiaire = '';
  codeLieuParking = '';
  codeEnergie = '';
  codeFournisseur = '';

  // document ===========================================================
  selectedNewFile: File;
  displayedText = '';
  ListDocuments: DocumentTableData[] = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['N°', 'documentName', 'delete'];
  dataSource = new MatTableDataSource<DocumentTableData>(this.ListDocuments);
  url: any;
  tempDocument: DocumentTableData = {name: '', adresse: ''};

  constructor(private ReferentielGeneral: ReferentielGeneraleServiceService, private ReferentielSpecifique: ReferentielSpecifiqueServiceService, private Administratif: AdministratifServiceService, public dialogRef: MatDialogRef<NewVehiculeComponent>, private administratif: AdministratifServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService, public dialog: MatDialog) {
    this.ngxLoader.start();
    this.displayedText = 'Insérer un nouveau document';
    this.ReferentielGeneral.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListMarqueVehicule = value;
    });
    this.ReferentielGeneral.getListGenreVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListGenreVehicule = value;
    });
    this.ReferentielGeneral.getListGouvernorat().subscribe(value => {
      this.ListGouvernorat = value;
    });
    this.ReferentielGeneral.getListEnergie().subscribe(value => {
      this.ListEnergie = value;
    });
    this.ReferentielGeneral.getListLieuParkingByGouvernorat('tousGouvernorats').subscribe(value => {
      this.ListLieuParking = value;
    });
    this.ReferentielGeneral.getListFournisseur(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListFournisseur = value;
    });
    this.Administratif.getListBeneficiaires().subscribe(value => {
      this.ListBeneficiaire = value;
    });
    this.ListStructure = this.Authentication.getUserStrucutures();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.newVehiculeForm.controls.genre.valueChanges.subscribe(value => {
      this.codeGenre = value.code;
    });
    this.newVehiculeForm.controls.marque.valueChanges.subscribe(value => {
      this.codeMarque = value.code;
      this.codeType = '';
      this.newVehiculeForm.controls.type.reset(null);
      if (value.types !== null) {
        this.ListTypeVehicule = value.types;
      } else {
        this.ListTypeVehicule = [];
      }
    });
    this.newVehiculeForm.controls.type.valueChanges.subscribe(value => {
      if (value === null) {
        this.codeType = '';
      } else {
        this.codeType = value.code;
      }
    });
    this.newVehiculeForm.controls.structure.valueChanges.subscribe(value => {
      this.codeStructure = value.code;
    });
    this.newVehiculeForm.controls.gouvernorat.valueChanges.subscribe(value => {
      this.codeGouvernorat = value.code;
    });
    this.newVehiculeForm.controls.beneficiaire.valueChanges.subscribe(value => {
      this.codeBeneficiaire = value.matricule;
    });
    this.newVehiculeForm.controls.lieuParking.valueChanges.subscribe(value => {
      this.codeLieuParking = value.code;
    });
    this.newVehiculeForm.controls.energie.valueChanges.subscribe(value => {
      this.codeEnergie = value.code;
    });
    this.newVehiculeForm.controls.fournisseur.valueChanges.subscribe(value => {
      this.codeFournisseur = value.code;
    });
    //Not required ============================================================
    this.newVehiculeForm.controls.beneficiaire.valueChanges.subscribe(value => {
      this.newVehicule.idBeneficiaires = value.id;
    });
    this.newVehiculeForm.controls.lieuParking.valueChanges.subscribe(value => {
      this.newVehicule.idLieuParking = value.id;
    });
    this.newVehiculeForm.controls.fournisseur.valueChanges.subscribe(value => {
      this.newVehicule.idFournisseur = value.id;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newVehiculeForm.valid) {
      this.patchFinalValues();
      this.dialogRef.close({
        newVehicule: this.newVehicule,
        documents: this.Administratif.documents2BeUploaded,
        image2BeUploaded: this.formDataImage
      });
    }
  }

  ngOnDestroy(): void {
    this.suscription.forEach(value => {
      value.unsubscribe();
    });
  }

  // documents ===================================================================

  deleteDocumentRow(i: number) {
    const index = this.administratif.documentsName.indexOf(this.ListDocuments[i].name);
    this.administratif.deleteDocument2BeUploaded(index);
    this.ListDocuments.splice(i, 1);
    this.dataSource = new MatTableDataSource<DocumentTableData>(this.ListDocuments);
  }

  onUploadNewDocument(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.displayedText = event.target.files[0].name;
      this.selectedNewFile = (event.target.files[0] as File);
      const date = new Date();
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.url = event.target.files[0];
      // reader.onload = (event) => { // called once readAsDataURL is completed
      //   this.url = event.target.result;
      // };
      this.administratif.addDocument2BeUploaded(this.selectedNewFile);
      this.tempDocument = {name: event.target.files[0].name, adresse: this.url};
      this.ListDocuments.push(this.tempDocument);
      this.dataSource = new MatTableDataSource<DocumentTableData>(this.ListDocuments);
      this.selectedNewFile = null;
    }
  }

  onUploadNewImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.imageUploaded = true;
      };
    }
    this.selectedCarImage = (event.target.files[0] as File);
    if (this.selectedCarImage !== null) {
      const formData = new FormData(); // this variable is going to be uploaded
      formData.append('file', this.selectedCarImage, event.target.files[0].name);
      this.formDataImage = formData;
    }
  }

  patchFinalValues() {
    // Date ============================================
    if (this.newVehiculeForm.value.dateAffectation !== null) {
      this.newVehicule.dateAffectation = moment(this.newVehiculeForm.value.dateAffectation as Date).format('YYYY-MM-DD');
    }
    if (this.newVehiculeForm.value.datePremiereMiseEnCirculation !== null) {
      this.newVehicule.datePremiereMiseEnCirculation = moment(this.newVehiculeForm.value.datePremiereMiseEnCirculation as Date).format('YYYY-MM-DD');
    }
    if (this.newVehiculeForm.value.dateReception !== null) {
      this.newVehicule.dateReception = moment(this.newVehiculeForm.value.dateReception as Date).format('YYYY-MM-DD');
    }
    if (this.newVehiculeForm.value.dateEcheance !== null) {
      this.newVehicule.dateEcheance = moment(this.newVehiculeForm.value.dateEcheance as Date).format('YYYY-MM-DD');
    }
    // Required =====================================
    this.newVehicule.genre = this.newVehiculeForm.value.genre.designation;
    this.newVehicule.marque = this.newVehiculeForm.value.marque.designation;
    this.newVehicule.type = this.newVehiculeForm.value.type.designation;
    this.newVehicule.natureAffectation = this.newVehiculeForm.value.natureAffectation;
    this.newVehicule.idGouvernorat = this.newVehiculeForm.value.gouvernorat.id;
    this.newVehicule.idStructure = this.newVehiculeForm.value.structure.id;
    this.newVehicule.numeroPlaque = this.newVehiculeForm.value.numeroPlaque;
    this.newVehicule.numeroChassis = this.newVehiculeForm.value.numeroChassis;
    this.newVehicule.idEnergie = this.newVehiculeForm.value.energie.id;
    this.newVehicule.typeTaxe = this.newVehiculeForm.value.typeTaxe;
    //Notrequired ===================================
    this.newVehicule.etat = this.newVehiculeForm.value.etat;
    this.newVehicule.referenceAffectation = this.newVehiculeForm.value.referenceAffectation;
    this.newVehicule.numeroImmatriculation = this.newVehiculeForm.value.numeroImmatriculation;
    this.newVehicule.numeroProprietaireEtat = this.newVehiculeForm.value.numeroProprietaireEtat;
    this.newVehicule.numeroCarteUtilisation = this.newVehiculeForm.value.numeroCarteUtilisation;
    this.newVehicule.indexKm = this.newVehiculeForm.value.indexKm;
    this.newVehicule.numeroCarteGrise = this.newVehiculeForm.value.numeroCarteGrise;
    this.newVehicule.typeCarteGrise = this.newVehiculeForm.value.typeCarteGrise;
    this.newVehicule.referenceType = this.newVehiculeForm.value.referenceType;
    this.newVehicule.nombreDePlaces = this.newVehiculeForm.value.nombreDePlaces;
    this.newVehicule.carosserie = this.newVehiculeForm.value.carosserie;
    this.newVehicule.poidsTotalACharge = this.newVehiculeForm.value.poidsTotalACharge;
    this.newVehicule.consommationMoyenne = this.newVehiculeForm.value.consommationMoyenne;
    this.newVehicule.chargeUtile = this.newVehiculeForm.value.chargeUtile;
    this.newVehicule.poidsTotalSansCharge = this.newVehiculeForm.value.poidsTotalSansCharge;
    this.newVehicule.dimensionsPneuAvant = this.newVehiculeForm.value.dimensionsPneuAvant;
    this.newVehicule.dimensionsPneuArriere = this.newVehiculeForm.value.dimensionsPneuArriere;
    this.newVehicule.poidsAVide = this.newVehiculeForm.value.poidsAVide;
    this.newVehicule.puissanceFixale = this.newVehiculeForm.value.puissanceFixale;
    this.newVehicule.puissanceMoteur = this.newVehiculeForm.value.puissanceMoteur;
    this.newVehicule.nombreEssieux = this.newVehiculeForm.value.nombreEssieux;
    this.newVehicule.volumeCylindre = this.newVehiculeForm.value.volumeCylindre;
    this.newVehicule.exploitationUsage = this.newVehiculeForm.value.exploitationUsage;
    this.newVehicule.typeAssurance = this.newVehiculeForm.value.typeAssurance;
    this.newVehicule.nomAssurance = this.newVehiculeForm.value.nomAssurance;
    this.newVehicule.referenceBC = this.newVehiculeForm.value.referenceBC;
    this.newVehicule.prixAchat = this.newVehiculeForm.value.prixAchat;
    this.newVehicule.situationDouaniere = this.newVehiculeForm.value.situationDouaniere;
    this.newVehicule.numeroImmatriculationTemporaire = this.newVehiculeForm.value.numeroImmatriculationTemporaire;
    this.newVehicule.compagnieLeasing = this.newVehiculeForm.value.compagnieLeasing;
  }

}
