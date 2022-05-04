import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MarqueVehicule} from '../../../referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import {GenreVehicule} from '../../../referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import {TypeVehicule} from '../../../referentiel/general/parametres-vehicules/type-vehicule/type-vehicule';
import {Structure} from '../../../referentiel/specifique/structure-administrative/structure';
import {Gouvernorat} from '../../../referentiel/general/decoupage-administratif/gouvernorat';
import {Beneficiaire} from '../beneficiaire';
import {LieuParking} from '../../../referentiel/general/lieu-parking/lieu-parking';
import {Energie} from '../../../referentiel/general/parametres-generaux/energie/energie';
import {Fournisseur} from '../../../referentiel/general/fournisseurs/fournisseur';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ReferentielGeneraleServiceService} from '../../../referentiel/general/referentiel-generale-service.service';
import {ReferentielSpecifiqueServiceService} from '../../../referentiel/specifique/referentiel-specifique-service.service';
import {AdministratifServiceService} from '../../administratif-service.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import moment from 'moment';
import {OneVehicule} from '../one-vehicule';
import {NewVehicule} from '../new-vehicule';
import {PdfViewerComponent} from 'ng2-pdf-viewer';
import {ReadVehiculeDocumentComponent} from '../read-vehicule-document/read-vehicule-document.component';
import {DocumentTableData} from '../document-table-data';
import {AuthenticationServiceService} from '../../../../authentication-service.service';
import { PaginationConfiguration } from '../../../pagination-configuration';


@Component({
  selector: 'app-modify-vehicule',
  templateUrl: './modify-vehicule.component.html',
  styleUrls: ['./modify-vehicule.component.scss'],
  providers: [PdfViewerComponent]
})
export class ModifyVehiculeComponent implements OnInit, OnDestroy {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };
  selectedCarImage: File;
  formDataImage: FormData;
  selectedVehicule: OneVehicule = {
    id: null,
    numeroPlaque: '',
    genre: '',
    marque: '',
    type: '',
    idStructure: null,
    idGouvernorat: null,
    idBeneficiaire: null,
    idFournisseur: null,
    idLieuParking: null,
    idEnergie: null,
    etat: '',
    natureAffectation: '',
    dateAffectation: '',
    referenceAffectation: '',
    numeroImmatriculation: '',
    numeroProprietaireEtat: '',
    numeroChassis: '',
    numeroCarteUtilisation: '',
    urlImageVehicule: '',
    nameImageVehicule: '',
    indexKm: 0,
    typeTaxe: '',
    exploitationUsage: '',
    typeAssurance: '',
    nomAssurance: '',
    referenceBC: '',
    dateReception: '',
    prixAchat: '',
    situationDouaniere: '',
    numeroImmatriculationTemporaire: 0,
    compagnieLeasing: '',
    dateEcheance: '',
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
    datePremiereMiseEnCirculation: '',
  };
  modifiedVehicule: NewVehicule = {
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
  modifiedVehiculeForm = new FormGroup({
    numeroPlaque: new FormControl(null, Validators.required),
    genre: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    marque: new FormControl(null, Validators.required),
    structure: new FormControl(null, Validators.required),
    gouvernorat: new FormControl(null, Validators.required),
    natureAffectation: new FormControl(null, Validators.required),
    energie: new FormControl(null, Validators.required),
    datePremiereMiseEnCirculation: new FormControl(null, Validators.required),
    typeTaxe: new FormControl(null, Validators.required),
    etat: new FormControl(),
    dateAffectation: new FormControl(),
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
  ListNatureAffectation: string[] = ['Service', 'En panne', 'Sinistré'];
  formData: FormData;
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
  displayedColumns: string[] = ['N°', 'documentName', 'delete', 'apercue'];
  dataSource = new MatTableDataSource<DocumentTableData>(this.ListDocuments);
  url: any;
  tempDocument: DocumentTableData = {name: '', adresse: ''};

  constructor(private ReferentielGeneral: ReferentielGeneraleServiceService, private ReferentielSpecifique: ReferentielSpecifiqueServiceService, private Administratif: AdministratifServiceService, public dialogRef: MatDialogRef<ModifyVehiculeComponent>, private administratif: AdministratifServiceService, private ngxLoader: NgxUiLoaderService, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.Administratif.documents2BeUploaded = [];
    this.Administratif.documents2BeDeleted = [];
    this.displayedText = 'Insérer un nouveau document';
    this.Administratif.getSelectedVehicule(data.id).subscribe(value => {
      this.selectedVehicule = value;
      this.ReferentielGeneral.getListMarqueVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
        this.ListMarqueVehicule = value1;
        this.ListMarqueVehicule.forEach(value2 => {
          if (value2.designation === this.selectedVehicule.marque) {
            this.modifiedVehiculeForm.controls.marque.patchValue(value2);
            if ((value2.types !== null) || (value2.types !== undefined)) {
              this.ListTypeVehicule = value2.types;
              value2.types.forEach(value3 => {
                if (value3.designation === this.selectedVehicule.type) {
                  this.modifiedVehiculeForm.controls.type.patchValue(value3);
                }
              });
            }
          }
        });
      });
      this.ReferentielGeneral.getListGenreVehicule(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
        this.ListGenreVehicule = value1;
        this.ListGenreVehicule.forEach(value2 => {
          if (value2.designation === this.selectedVehicule.genre) {
            this.modifiedVehiculeForm.controls.genre.patchValue(value2);
          }
        });
      });
      this.ReferentielGeneral.getListGouvernorat().subscribe(value1 => {
        this.ListGouvernorat = value1;
        this.ListGouvernorat.forEach(value2 => {
          if (value2.id === this.selectedVehicule.idGouvernorat) {
            this.modifiedVehiculeForm.controls.gouvernorat.patchValue(value2);
          }
        });
      });
      this.ReferentielGeneral.getListEnergie().subscribe(value1 => {
        this.ListEnergie = value1;
        this.ListEnergie.forEach(value2 => {
          if (value2.id === this.selectedVehicule.idEnergie) {
            this.modifiedVehiculeForm.controls.energie.patchValue(value2);
          }
        });
      });
      this.ReferentielGeneral.getListLieuParkingByGouvernorat('tousGouvernorats').subscribe(value1 => {
        this.ListLieuParking = value1;
        this.ListLieuParking.forEach(value2 => {
          if (value2.id === this.selectedVehicule.idLieuParking) {
            this.modifiedVehiculeForm.controls.lieuParking.patchValue(value2);
          }
        });
      });
      this.ReferentielGeneral.getListFournisseur(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value1 => {
        this.ListFournisseur = value1;
        this.ListFournisseur.forEach(value2 => {
          if (value2.id === this.selectedVehicule.idFournisseur) {
            this.modifiedVehiculeForm.controls.fournisseur.patchValue(value2);
          }
        });
      });
      this.ListStructure = this.Authentication.getUserStrucutures();
      this.ListStructure.forEach(value2 => {
        if (value2.id === this.selectedVehicule.idStructure) {
          this.modifiedVehiculeForm.controls.structure.patchValue(value2);
        }
      });

      // this.ReferentielSpecifique.getListStructure().subscribe(value1 => {
      //   this.ListStructure = value1;
      //   this.ListStructure.forEach(value2 => {
      //     if (value2.id === this.selectedVehicule.idStructure) {
      //       this.modifiedVehiculeForm.controls.structure.patchValue(value2);
      //     }
      //   });
      // });
      this.Administratif.getListBeneficiaires().subscribe(value1 => {
        this.ListBeneficiaire = value1;
        this.ListBeneficiaire.forEach(value2 => {
          if (value2.id === this.selectedVehicule.idBeneficiaire) {
            this.modifiedVehiculeForm.controls.beneficiaire.patchValue(value2);
          }
        });

      });
      this.patchInitialValues();
    });
    this.Administratif.getListDocumentByVehicule(data.id).subscribe(value => {
      this.ListDocuments = value;
      this.dataSource = new MatTableDataSource<DocumentTableData>(this.ListDocuments);
    });
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.modifiedVehiculeForm.controls.genre.valueChanges.subscribe(value => {
      this.codeGenre = value.code;
    });
    this.modifiedVehiculeForm.controls.marque.valueChanges.subscribe(value => {
      this.codeMarque = value.code;
      this.codeType = '';
      this.modifiedVehiculeForm.controls.type.reset(null);
      if (value.types !== null) {
        this.ListTypeVehicule = value.types;
      } else {
        this.ListTypeVehicule = [];
      }
    });
    this.modifiedVehiculeForm.controls.type.valueChanges.subscribe(value => {
      if (value === null) {
        this.codeType = '';
      } else {
        this.codeType = value.code;
      }
    });
    this.modifiedVehiculeForm.controls.structure.valueChanges.subscribe(value => {
      this.codeStructure = value.code;
      this.modifiedVehicule.idStructure = value.id;
    });
    this.modifiedVehiculeForm.controls.gouvernorat.valueChanges.subscribe(value => {
      this.codeGouvernorat = value.code;
      this.modifiedVehicule.idGouvernorat = value.id;
    });
    this.modifiedVehiculeForm.controls.energie.valueChanges.subscribe(value => {
      this.codeEnergie = value.code;
    });
    // Not required ============================================================
    this.modifiedVehiculeForm.controls.beneficiaire.valueChanges.subscribe(value => {
      this.modifiedVehicule.idBeneficiaires = value.id;
    });
    this.modifiedVehiculeForm.controls.lieuParking.valueChanges.subscribe(value => {
      this.modifiedVehicule.idLieuParking = value.id;
    });
    this.modifiedVehiculeForm.controls.fournisseur.valueChanges.subscribe(value => {
      this.modifiedVehicule.idFournisseur = value.id;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedVehiculeForm.valid) {
      this.patchFinalValues();
      this.dialogRef.close({
        modifiedVehicule: this.modifiedVehicule,
        documents: this.Administratif.documents2BeUploaded,
        image2BeUploaded: this.formDataImage,
        idDocument2BeDeleted: this.Administratif.idDocument2BeDeleted
      });
    }
  }

  ngOnDestroy(): void {
    this.suscription.forEach(value => {
      value.unsubscribe();
    });
  }

  // onUploadNewDocument(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.imageUploaded = true;
  //     const reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     // tslint:disable-next-line:no-shadowed-variable
  //     reader.onload = (event) => {
  //       this.url = event.target.result;
  //     };
  //   }
  //   this.selectedNewFile = (event.target.files[0] as File);
  //   if (this.selectedNewFile !== null) {
  //     this.formData = new FormData();
  //     this.formData.append('file', this.selectedNewFile, this.selectedNewFile.name);
  //   }
  // }

  // documents ===================================================================

  deleteDocumentRow(i: number) {
    const index = this.administratif.documentsName.indexOf(this.ListDocuments[i].name);
    if (this.ListDocuments[i].id === null) {
      this.administratif.deleteDocument2BeUploaded(index);
    } else {
      this.administratif.addIdsDocument2BeDeleted(this.ListDocuments[i].id);
    }
    this.ListDocuments.splice(i, 1);
    this.dataSource = new MatTableDataSource<DocumentTableData>(this.ListDocuments);
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


  onUploadNewDocument(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.displayedText = event.target.files[0].name;
      this.selectedNewFile = (event.target.files[0] as File);
      const reader = new FileReader();
      this.url = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.administratif.addDocument2BeUploaded(this.selectedNewFile);
      this.tempDocument = {name: event.target.files[0].name, adresse: this.url};
      this.ListDocuments.push(this.tempDocument);
      this.dataSource = new MatTableDataSource<DocumentTableData>(this.ListDocuments);
      this.selectedNewFile = null;
    }
  }

  viewDocument(documentAdress: any) {
    console.log(documentAdress);
    const dialogRef = this.dialog.open(ReadVehiculeDocumentComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-container-class',
      width: '900px',
      data: {src: documentAdress}
    });
  }

  patchInitialValues() {
    this.modifiedVehiculeForm.controls.numeroPlaque.patchValue(this.selectedVehicule.numeroPlaque);
    this.modifiedVehiculeForm.controls.etat.patchValue(this.selectedVehicule.etat);
    this.modifiedVehiculeForm.controls.natureAffectation.patchValue(this.selectedVehicule.natureAffectation);
    this.modifiedVehiculeForm.controls.dateAffectation.patchValue(this.selectedVehicule.dateAffectation);
    this.modifiedVehiculeForm.controls.referenceAffectation.patchValue(this.selectedVehicule.referenceAffectation);
    this.modifiedVehiculeForm.controls.numeroImmatriculation.patchValue(this.selectedVehicule.numeroImmatriculation);
    this.modifiedVehiculeForm.controls.numeroProprietaireEtat.patchValue(this.selectedVehicule.numeroProprietaireEtat);
    this.modifiedVehiculeForm.controls.numeroCarteUtilisation.patchValue(this.selectedVehicule.numeroCarteUtilisation);
    this.modifiedVehiculeForm.controls.indexKm.patchValue(this.selectedVehicule.indexKm);
    this.modifiedVehiculeForm.controls.numeroCarteGrise.patchValue(this.selectedVehicule.numeroCarteGrise);
    this.modifiedVehiculeForm.controls.typeCarteGrise.patchValue(this.selectedVehicule.typeCarteGrise);
    this.modifiedVehiculeForm.controls.referenceType.patchValue(this.selectedVehicule.referenceType);
    this.modifiedVehiculeForm.controls.nombreDePlaces.patchValue(this.selectedVehicule.nombreDePlaces);
    this.modifiedVehiculeForm.controls.carosserie.patchValue(this.selectedVehicule.carosserie);
    this.modifiedVehiculeForm.controls.poidsTotalACharge.patchValue(this.selectedVehicule.poidsTotalACharge);
    this.modifiedVehiculeForm.controls.consommationMoyenne.patchValue(this.selectedVehicule.consommationMoyenne);
    this.modifiedVehiculeForm.controls.chargeUtile.patchValue(this.selectedVehicule.chargeUtile);
    this.modifiedVehiculeForm.controls.poidsTotalSansCharge.patchValue(this.selectedVehicule.poidsTotalSansCharge);
    this.modifiedVehiculeForm.controls.dimensionsPneuAvant.patchValue(this.selectedVehicule.dimensionsPneuAvant);
    this.modifiedVehiculeForm.controls.dimensionsPneuArriere.patchValue(this.selectedVehicule.dimensionsPneuArriere);
    this.modifiedVehiculeForm.controls.poidsAVide.patchValue(this.selectedVehicule.poidsAVide);
    this.modifiedVehiculeForm.controls.puissanceFixale.patchValue(this.selectedVehicule.puissanceFixale);
    this.modifiedVehiculeForm.controls.puissanceMoteur.patchValue(this.selectedVehicule.puissanceMoteur);
    this.modifiedVehiculeForm.controls.nombreEssieux.patchValue(this.selectedVehicule.nombreEssieux);
    this.modifiedVehiculeForm.controls.volumeCylindre.patchValue(this.selectedVehicule.volumeCylindre);
    this.modifiedVehiculeForm.controls.datePremiereMiseEnCirculation.patchValue(this.selectedVehicule.datePremiereMiseEnCirculation);
    this.modifiedVehiculeForm.controls.typeTaxe.patchValue(this.selectedVehicule.typeTaxe);
    this.modifiedVehiculeForm.controls.exploitationUsage.patchValue(this.selectedVehicule.exploitationUsage);
    this.modifiedVehiculeForm.controls.typeAssurance.patchValue(this.selectedVehicule.typeAssurance);
    this.modifiedVehiculeForm.controls.nomAssurance.patchValue(this.selectedVehicule.nomAssurance);
    this.modifiedVehiculeForm.controls.referenceBC.patchValue(this.selectedVehicule.referenceBC);
    this.modifiedVehiculeForm.controls.dateReception.patchValue(this.selectedVehicule.dateReception);
    this.modifiedVehiculeForm.controls.prixAchat.patchValue(this.selectedVehicule.prixAchat);
    this.modifiedVehiculeForm.controls.situationDouaniere.patchValue(this.selectedVehicule.situationDouaniere);
    this.modifiedVehiculeForm.controls.numeroImmatriculationTemporaire.patchValue(this.selectedVehicule.numeroImmatriculationTemporaire);
    this.modifiedVehiculeForm.controls.compagnieLeasing.patchValue(this.selectedVehicule.compagnieLeasing);
    this.modifiedVehiculeForm.controls.dateEcheance.patchValue(this.selectedVehicule.dateEcheance);
  }

  patchFinalValues() {
    // Date ============================================
    if (this.modifiedVehiculeForm.value.dateAffectation !== null) {
      this.modifiedVehicule.dateAffectation = moment(this.modifiedVehiculeForm.value.dateAffectation as Date).format('YYYY-MM-DD');
    }
    if (this.modifiedVehiculeForm.value.datePremiereMiseEnCirculation !== null) {
      this.modifiedVehicule.datePremiereMiseEnCirculation = moment(this.modifiedVehiculeForm.value.datePremiereMiseEnCirculation as Date).format('YYYY-MM-DD');
    }
    if (this.modifiedVehiculeForm.value.dateReception !== null) {
      this.modifiedVehicule.dateReception = moment(this.modifiedVehiculeForm.value.dateReception as Date).format('YYYY-MM-DD');
    }
    if (this.modifiedVehiculeForm.value.dateEcheance !== null) {
      this.modifiedVehicule.dateEcheance = moment(this.modifiedVehiculeForm.value.dateEcheance as Date).format('YYYY-MM-DD');
    }
    // Required =====================================
    this.modifiedVehicule.id = this.selectedVehicule.id;
    this.modifiedVehicule.genre = this.modifiedVehiculeForm.value.genre.designation;
    this.modifiedVehicule.marque = this.modifiedVehiculeForm.value.marque.designation;
    this.modifiedVehicule.type = this.modifiedVehiculeForm.value.type.designation;
    this.modifiedVehicule.natureAffectation = this.modifiedVehiculeForm.value.natureAffectation;
    // if (this.modifiedVehiculeForm.value.gouvernorat !== null) {
    //   this.modifiedVehicule.idGouvernorat = this.modifiedVehiculeForm.value.gouvernorat.id;
    // }
    // if (this.modifiedVehiculeForm.value.structure !== null) {
    //   this.modifiedVehicule.idStructure = this.modifiedVehiculeForm.value.structure.id;
    // }
    // if (this.modifiedVehiculeForm.value.beneficiaire !== null) {
    //   this.modifiedVehicule.idBeneficiaires = this.modifiedVehiculeForm.value.beneficiaire.id;
    // }
    // if (this.modifiedVehiculeForm.value.fournisseur !== null) {
    //   this.modifiedVehicule.idFournisseur = this.modifiedVehiculeForm.value.fournisseur.id;
    // }
    // if (this.modifiedVehiculeForm.value.lieuParking !== null) {
    //   this.modifiedVehicule.idLieuParking = this.modifiedVehiculeForm.value.lieuParking.id;
    // }
    this.modifiedVehicule.numeroPlaque = this.modifiedVehiculeForm.value.numeroPlaque;
    this.modifiedVehicule.idEnergie = this.modifiedVehiculeForm.value.energie.id;
    this.modifiedVehicule.typeTaxe = this.modifiedVehiculeForm.value.typeTaxe;
    // Not trequired ===================================
    this.modifiedVehicule.etat = this.modifiedVehiculeForm.value.etat;
    this.modifiedVehicule.referenceAffectation = this.modifiedVehiculeForm.value.referenceAffectation;
    this.modifiedVehicule.numeroImmatriculation = this.modifiedVehiculeForm.value.numeroImmatriculation;
    this.modifiedVehicule.numeroProprietaireEtat = this.modifiedVehiculeForm.value.numeroProprietaireEtat;
    this.modifiedVehicule.numeroCarteUtilisation = this.modifiedVehiculeForm.value.numeroCarteUtilisation;
    this.modifiedVehicule.indexKm = this.modifiedVehiculeForm.value.indexKm;
    this.modifiedVehicule.numeroCarteGrise = this.modifiedVehiculeForm.value.numeroCarteGrise;
    this.modifiedVehicule.typeCarteGrise = this.modifiedVehiculeForm.value.typeCarteGrise;
    this.modifiedVehicule.referenceType = this.modifiedVehiculeForm.value.referenceType;
    this.modifiedVehicule.nombreDePlaces = this.modifiedVehiculeForm.value.nombreDePlaces;
    this.modifiedVehicule.carosserie = this.modifiedVehiculeForm.value.carosserie;
    this.modifiedVehicule.poidsTotalACharge = this.modifiedVehiculeForm.value.poidsTotalACharge;
    this.modifiedVehicule.consommationMoyenne = this.modifiedVehiculeForm.value.consommationMoyenne;
    this.modifiedVehicule.chargeUtile = this.modifiedVehiculeForm.value.chargeUtile;
    this.modifiedVehicule.poidsTotalSansCharge = this.modifiedVehiculeForm.value.poidsTotalSansCharge;
    this.modifiedVehicule.dimensionsPneuAvant = this.modifiedVehiculeForm.value.dimensionsPneuAvant;
    this.modifiedVehicule.dimensionsPneuArriere = this.modifiedVehiculeForm.value.dimensionsPneuArriere;
    this.modifiedVehicule.poidsAVide = this.modifiedVehiculeForm.value.poidsAVide;
    this.modifiedVehicule.puissanceFixale = this.modifiedVehiculeForm.value.puissanceFixale;
    this.modifiedVehicule.puissanceMoteur = this.modifiedVehiculeForm.value.puissanceMoteur;
    this.modifiedVehicule.nombreEssieux = this.modifiedVehiculeForm.value.nombreEssieux;
    this.modifiedVehicule.volumeCylindre = this.modifiedVehiculeForm.value.volumeCylindre;
    this.modifiedVehicule.exploitationUsage = this.modifiedVehiculeForm.value.exploitationUsage;
    this.modifiedVehicule.typeAssurance = this.modifiedVehiculeForm.value.typeAssurance;
    this.modifiedVehicule.nomAssurance = this.modifiedVehiculeForm.value.nomAssurance;
    this.modifiedVehicule.referenceBC = this.modifiedVehiculeForm.value.referenceBC;
    this.modifiedVehicule.prixAchat = this.modifiedVehiculeForm.value.prixAchat;
    this.modifiedVehicule.situationDouaniere = this.modifiedVehiculeForm.value.situationDouaniere;
    this.modifiedVehicule.numeroImmatriculationTemporaire = this.modifiedVehiculeForm.value.numeroImmatriculationTemporaire;
    this.modifiedVehicule.compagnieLeasing = this.modifiedVehiculeForm.value.compagnieLeasing;
  }

}
