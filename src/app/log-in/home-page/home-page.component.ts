import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageData} from './page-data';
import {AdministrationServiceService} from './administration/administration-service.service';
import {AuthenticationServiceService} from '../authentication-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { HomeServiceService } from './home-service.service';
import { CarburantServiceService } from './carburant/carburant-service.service';
import { Article } from './referentiel/general/articles/article';
import { StockServiceService } from './stock/stock-service.service';
import { VisiteTechnique } from './administratif/visite-technique/visite-technique';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  //ACHAT
  VIEW_BON_COMMANDE:boolean;
  nombreMessages: number;
  VIEW_ARTICLES_SUB_MODULE: boolean;
  VIEW_DECOUPAGE_ADMINISTRATIF_SUB_MODULE: boolean;
  VIEW_EXPERTS: boolean;
  VIEW_FOURNISSEURS: boolean;
  VIEW_LIEUX_PARKING: boolean;
  VIEW_FAMILLES_OPERATIONS_REPARATION: boolean;
  VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS: boolean;
  VIEW_OPERATIONS_REPARATION: boolean;
  VIEW_OPERATIONS_REPARATIONS_SUB_MODULE: boolean;
  VIEW_PARAMETRES_GENERAUX_SUB_MODULE: boolean;
  VIEW_PARAMETRES_VEHICULES_SUB_MODULE: boolean;
  VIEW_CAUSES_SINISTRES: boolean;
  VIEW_GENRES_VEHICULE: boolean;
  ADD_MARQUES_VEHICULE: boolean;
  VIEW_TYPES_VEHICULE: boolean;
  VIEW_USAGES_VEHICULES: boolean;
  VIEW_BENEFICIAIRES_EMPRUNTS: boolean;
  VIEW_DETAILS_PERSONNELS: boolean;
  VIEW_ETATS_STOCK: boolean;
  VIEW_STRUCTURE_ADMINISTRATIVE: boolean;
  VIEW_UNITE_GESTION_PARC: boolean;
  VIEW_ALERTES: boolean;
  VIEW_USERS: boolean;
  VIEW_MESSAGES_APPLICATIFS: boolean;
  VIEW_PARAMETRES_APPLICATION: boolean;
  VIEW_GROUPES_USERS: boolean;
  VIEW_GPS: boolean;
  VIEW_TRACABILITES: boolean;
  VIEW_VEHICULE: boolean;
  VIEW_TAXE_CIRCULATION: boolean;
  VIEW_ASSURANCE: boolean;
  VIEW_VISITE_TECHNIQUE: boolean;
  VIEW_REFORME: boolean;
  VIEW_ORDRE_MISSION  : boolean;

  //CARBURANT : CARTE PLAFOND
  VIEW_CARTE_PLAFOND:boolean;
  VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean;
  VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND:boolean;
  VIEW_DECLARATION_PERTE_CARTE_PLAFOND:boolean;
  VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND:boolean;
  ADD_DEMANDE_ANNULATION_CARTE_PLAFOND:boolean;
  VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND:boolean;
  VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND:boolean;  
  //CARBURANT : CARTE PLAFOND
  
//Ordre de mission
VIEW_VEHICULE_DEPASSANT :boolean;     
//Ordre de mission

VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE: boolean;


  VIEW_SOUS_FAMILLES_ARTICLES: boolean;
  VIEW_FAMILLES_ARTICLES: boolean;
  VIEW_BONCOMMANDE:boolean;
  VIEW_DEMANDE_AFFECTATION:boolean;
  VIEW_DEMANDE_DESAFECTAION:boolean;
  VIEW_DECLARATION_PERTE:boolean;
  VIEW_HISTORIQUE_DECLARATION_PERTE:boolean;
  VIEW_DEMANDE_QUOTA:boolean;
 
  //EXPLOITATION 
  VIEW_RESERVATION:boolean;
  VIEW_VEHICULE_RESERVATION:boolean;
  VIEW_LOCATION:boolean;
  VIEW_SINISTRE:boolean;
  VIEW_VEHICULE_SINISTRE:boolean;
  VIEW_EMPRUNT:boolean;
  VIEW_VEHICULE_EMPRUNT:boolean;
  //EXPLOITATION


//STOCK
VIEW_Bon_Travail_Sortie:boolean;

VIEW_TRANSFERT_PARC_VERS_MAGASIN:boolean;
/*VIEW_Bon_Transfert_vers_parc:boolean;*/
VIEW_Bon_Transfert_vers_magasin:boolean;
VIEW_Bon_Sortie_Structure :boolean;
VIEW_Reception_Fournisseur:boolean;
VIEW_Reception_Atelier:boolean;

VIEW_Retour_Structure:boolean;
VIEW_Inventaire_Stock:boolean;

VIEW_Regulation_Stock:boolean;
//STOCK


//CARBURANT : CARTE JOCKER

VIEW_CARTE_JOCKER:boolean;

VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER: boolean;

VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER: boolean;

VIEW_DECLARATION_PERTE_CARTE_JOCKER: boolean;

VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER: boolean;

VIEW_DEMANDE_QUOTA_CARTE_JOCKER: boolean;

VIEW_HISTORIQUE_MAINTENANCE: boolean;

//CARBURANT : CARTE JOCKER

// CARBURANT : Distribution de carburant
VIEW_DISTRIBUTION_CARBURANT_FONCTION: boolean;

VIEW_DISTRIBUTION_CARBURANT_VEHICULE: boolean;

VIEW_DESTRIBUTION_CARBURANT_SERVICE: boolean;

VIEW_DESTRIBUTION_CARBURANT_COMPENSATION: boolean;

VIEW_TRANSFERT_PARC: boolean;

VIEW_RETOUR_CARBURANT: boolean;

VIEW_ETAT_MENSUEL: boolean;

VIEW_BON_CARBURANT_BON: boolean;
VIEW_HISTORIQUE_REGULATION : boolean;
VIEW_SUIVI: boolean;
// CARBURANT : Distribution de carburant
 

//CARBURANT :Carte agilis Cash 

VIEW_AGILIS_CASH:boolean;

VIEW_RECHARGE_AGILIS:boolean;

VIEW_DECLARATION_PERTE_AGILIS:boolean;

VIEW_HISTORIQUE_PERTE_AGILIS:boolean;

VIEW_ANNULATION_AGILIS:boolean;
//CARBURANT :Carte agilis Cash 
VIEW_HISTORIQUE_MAINTENANCE_VEHICULE: boolean;

VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION: boolean;


VIEW_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE : boolean;
VIEW_DEMANDE_RECHARGE_SOUS_COMPTE : boolean;

VIEW_ALERT_VEHICULE : boolean;
VIEW_ALERT_STOCK : boolean;

  entete: string;
  path: string;
  wHeight: number;
  wWidth: number;
  isFullScreen: any;
  @Input() test: boolean;
  ListElementTable: Article[] = [];
  opened = true;
  openedMessage = false;
  panelOpenState = false;
  ListPageData: PageData[] = [
    {numberPage: 1, namePage: 'Administratif >> Gestion des véhicules'},
    {numberPage: 2, namePage: 'Administratif >> Gestion des taxes de circulation'},
    {numberPage: 3, namePage: 'Administratif >> Gestion des assurances'},
    {numberPage: 4, namePage: 'Administratif >> Gestion des visites techniques'},
    {numberPage: 5, namePage: 'Administratif >> Gestion des réformes'},
    {numberPage: 6, namePage: 'Exploitation >> Gestion des réservations'},
    {numberPage: 7, namePage: 'Exploitation >> Gestion des locations'},
    {numberPage: 8, namePage: 'Exploitation >> Gestion des sinistres'},
    {numberPage: 9, namePage: 'Exploitation >> Gestion des Emprunts'},
    {numberPage: 10, namePage: 'Ordres de mission >> Gestion des ordres de mission'},
    {numberPage: 11, namePage: 'Ordres de mission >> Véhicules dépassant date de retour'},
    {numberPage: 12, namePage: 'Carburant >> Distribution de carburant >> Distribution de carburant de fonction'},
    {numberPage: 13, namePage: 'Carburant >> Distribution de carburant >> Distribution de carburant de fonction (Véhicule personelle)'},
    {numberPage: 14, namePage: 'Carburant >> Distribution de carburant >> Distribution de carburant de fonction (Compensation)'},
    {numberPage: 15, namePage: 'Carburant >> Distribution de carburant >> Distribution de carburant de service'},
    {numberPage: 16, namePage: 'Carburant >> Distribution de carburant >> Distribution de carburant de service (Structure administrative)'},
    {numberPage: 17, namePage: 'Carburant >> Distribution de carburant >> Distribution de carburant de service (Quota complémentaire)'},
    {numberPage: 18, namePage: 'Carburant >> Distribution de carburant >> Transfert de parc à parc'},
    {numberPage: 19, namePage: 'Carburant >> Distribution de carburant >> Réception des bons de carburant'},
    {numberPage: 20, namePage: 'Carburant >> Distribution de carburant >> Transfert vers Structure'},
    {numberPage: 21, namePage: 'Carburant >> Distribution de carburant >> Consommation du carburant'},
    {numberPage: 22, namePage: 'Carburant >> Distribution de carburant >> Retour de carburant'},
    {numberPage: 23, namePage: 'Carburant >> Distribution de carburant >> Etat mensuel'},
    {numberPage: 24, namePage: 'Carburant >> Distribution de carburant >> Bon de commande des bons'},
    {numberPage: 25, namePage: 'Carburant >> Distribution de carburant >> Recherche affectation des bons'},
    {numberPage: 26, namePage: 'Carburant >> Distribution de carburant >> Inventaire'},
    {numberPage: 27, namePage: 'Carburant >> Distribution de carburant >> Suivi'},
    {numberPage: 28, namePage: 'Carburant >> Carte plafond >> Nouvelle demande affectation'},
    {numberPage: 29, namePage: 'Carburant >> Carte plafond >>  Gestion des demandes d\'affectations'},
    {numberPage: 30, namePage: 'Carburant >> Carte plafond >> Historique des affectations'},
    {numberPage: 31, namePage: 'Carburant >> Carte plafond >> Nouvelle déclaration de perte'},
    {numberPage: 32, namePage: 'Carburant >> Carte plafond >> Gestion des déclarations de perte'},
    {numberPage: 33, namePage: 'Carburant >> Carte plafond >> Historique des déclarations de perte'},
    {numberPage: 34, namePage: 'Carburant >> Carte plafond >> Nouvelle demande d\'annulation'},
    {numberPage: 35, namePage: 'Carburant >> Carte plafond >> Gestion des demandes d\'annulations'},
    {numberPage: 36, namePage: 'Carburant >> Carte plafond >> Historique des demandes d\'annulation'},
    {numberPage: 37, namePage: 'Carburant >> Carte plafond >> Gestion des cartes Plafond'},
    {numberPage: 38, namePage: 'Carburant >> Carte agilis cash >> Demande de recharge'},
    {numberPage: 39, namePage: 'Carburant >> Carte agilis cash >> Gestion des demandes de recharge'},
    {numberPage: 40, namePage: 'Carburant >> Carte agilis cash >> Historique des recharges'},
    {numberPage: 41, namePage: 'Carburant >> Carte agilis cash >> Nouvelle déclaration de perte'},
    {numberPage: 42, namePage: 'Carburant >> Carte agilis cash >> Gestion des déclarations'},
    {numberPage: 43, namePage: 'Carburant >> Carte agilis cash >> Historique des déclarations'},
    {numberPage: 44, namePage: 'Carburant >> Carte agilis cash >> Nouvelle demande d\'annulation'},
    {numberPage: 45, namePage: 'Carburant >> Carte agilis cash >> Gestion des demandes d\'annulation'},
    {numberPage: 46, namePage: 'Carburant >> Carte agilis cash >> Historique des demandes d\'annulation'},
    {numberPage: 47, namePage: 'Carburant >> Carte agilis cash >> Gestion des cartes Agilis Cash'},
    {numberPage: 48, namePage: 'Carburant >> Carte jocker >> Nouvelle demande d\'affectation'},
    {numberPage: 49, namePage: 'Carburant >> Carte jocker >> Gestion des demandes d\'affectation'},
    {numberPage: 50, namePage: 'Carburant >> Carte jocker >> Historique des affectations'},
    {numberPage: 51, namePage: 'Carburant >> Carte jocker >> Nouvelle demande désaffectation'},
    {numberPage: 52, namePage: 'Carburant >> Carte jocker >> Gestion des demandes de désaffectation'},
    {numberPage: 53, namePage: 'Carburant >> Carte jocker >> Historique des désaffectations'},
    {numberPage: 54, namePage: 'Carburant >> Carte jocker >> Gestion des cartes Jocker'},
    {numberPage: 55, namePage: 'Achat >> Gestion bons de commande'},
    {numberPage: 56, namePage: 'Achat >> Marchés'},
    {numberPage: 57, namePage: 'Achat >> Budget'},
    {numberPage: 58, namePage: 'Stock >> Bon de sortie pour bon de travail'},
    {numberPage: 59, namePage: 'Stock >> Transfert vers magasin'},
    {numberPage: 60, namePage: 'Stock >> Bon de sortie pour structure'},
    {numberPage: 61, namePage: 'Stock >> Réception des fournisseurs'},
    {numberPage: 62, namePage: 'Stock >> Réception d\'un atelier'},
    {numberPage: 63, namePage: 'Stock >> Transfert du magasin'},
    {numberPage: 64, namePage: 'Stock >> Retour d\'une structure'},
    {numberPage: 65, namePage: 'Stock >> Régulation du stock'},
    {numberPage: 66, namePage: 'Stock >> Inventaire du stock'},
    {numberPage: 67, namePage: 'Maintenance et réparation >> Gestion des demandes d\'intervention'},
    {numberPage: 68, namePage: 'Maintenance et réparation >> Gestion des bons de travail'},
    {numberPage: 69, namePage: 'Maintenance et réparation >> Sorties des véhicules'},
    {numberPage: 70, namePage: 'Reférentiel >> Général >> Articles'},
    {numberPage: 71, namePage: 'Reférentiel >> Général >> Découpage administratif'},
    {numberPage: 72, namePage: 'Reférentiel >> Général >> Experts'},
    {numberPage: 73, namePage: 'Reférentiel >> Général >> Fournisseurs'},
    {numberPage: 74, namePage: 'Reférentiel >> Général >> Lieu de parking'},
    {numberPage: 75, namePage: 'Reférentiel >> Général >> Opérations de réparation'},
    {numberPage: 76, namePage: 'Reférentiel >> Général >> Paramètres généraux'},
    {numberPage: 77, namePage: 'Reférentiel >> Général >> Paramètres véhicules'},
    {numberPage: 78, namePage: 'Reférentiel >> Spécifique >> Structure administrative'},
    {numberPage: 79, namePage: 'Reférentiel >> Spécifique >> Unité de gestion du parc'},
    {numberPage: 80, namePage: 'Reférentiel >> Spécifique >> Détails des personnels'},
    {numberPage: 81, namePage: 'Reférentiel >> Spécifique >> Etat de stock'},
    {numberPage: 82, namePage: 'Reférentiel >> Spécifique >> Bénéficiaire des emprunts'},
    {numberPage: 83, namePage: 'Administration >> Création des utilisateurs'},
    {numberPage: 84, namePage: 'Administration >> Groupes des utilisateurs'},
    {numberPage: 85, namePage: 'Administration >> Messages applicatifs'},
    {numberPage: 86, namePage: 'Administration >> Alertes'},
    {numberPage: 87, namePage: 'Administration >> Traçabilité'},
    {numberPage: 88, namePage: 'Administration >> paramètres d\'application'},
    {numberPage: 89, namePage: 'Administration >> GPS'},
    {numberPage: 90, namePage: 'Administration >> messages'},
  ];
  forTest = true;
  nomPrenom = '';
  t :number;
  nbM :number ;
  nbV :number ;
  rc :number;
  rcc:number;
 compensation: boolean;
 souscompte: boolean;
 complementaire: boolean;
 quotamensuel: boolean;
 maintenance: boolean;

  alertArticleList: VisiteTechnique[] = [];
  isAdministrator: boolean;
  notification = false;
  structure = 'tousStrucutures';
  VIEW_RECHARGE_QUOTA_MENSUEL: boolean;
  VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL: boolean;

  constructor(private Administration: AdministrationServiceService,
     private Authentication: AuthenticationServiceService, private ngxLoader: NgxUiLoaderService, 
     private router: Router ,private carburant :CarburantServiceService
     ,private stock :StockServiceService
     ) {
    this.ngxLoader.start();
    this.setModuleAndSubModuleDisplay();
    this.nomPrenom = Authentication.getNomPrenom();
     this.getListArticles();
     this.getListFinVisite();
   
    this.isAdministrator = Authentication.isAdministrator();

    carburant.getNombreNotif().subscribe(value => {
      console.log(value);
      this.t = value;
      });


      carburant.getNbNotif().subscribe(value => {
        console.log(value);
        this.t = value;
        });
        
        carburant.getNombreNotifComplementaire().subscribe(value => {
        console.log(value);
        this.t = value;
        });

        carburant.getNombreNotifCompensation().subscribe(value => {
          console.log(value);
          this.t = value;
          });
          stock.AlertNombre().subscribe(value => {
            console.log(value);
            this.nbM  = value;
            });
          
            stock.AlertNombreVehicule().subscribe(value => {
              console.log(value);
              this.nbV  = value;
              });
    if (!this.Authentication.isSuperAdmin()) { 
      this.structure = this.Authentication.getUserStrucutures()[0].designation;
      Administration.getNombreMessages(this.structure).subscribe(value => {
        this.nombreMessages = value;
      });
    }
    this.path = 'Home page';
    this.Administration.getParametreApplication().subscribe(value => {
      this.entete = value.entete;
    });
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.wHeight = window.innerHeight;
    this.wWidth = window.innerWidth;
    
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

  toggleFullscreen() {
    const doc = document.documentElement;
    if (doc.requestFullscreen()) {
      doc.requestFullscreen();
      this.isFullScreen = true;
    }
    if (document.exitFullscreen()) {
      document.exitFullscreen();
      this.isFullScreen = false;
    }
  }

  SideNavtoggle() {
    this.opened = !this.opened;
  }

  getActualPath(numberPage?: number) {
    this.ListPageData.forEach(value => {
      if (value.numberPage === numberPage) {
        this.path = value.namePage;
      }
    });
  }

  logOut() {
    this.Authentication.logOut();
  }

  setModuleAndSubModuleDisplay() {

    
//RECHARGE DE CARBURANT DE COMPENSATION 
this.VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE = this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE;
//RECHARGE DE CARBURANT DE COMPENSATION 
this.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION = this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION;

//RECHARGE DE CARBURANT DE COMPENSATION 
this.VIEW_RECHARGE_QUOTA_MENSUEL = this.Authentication.authoritiesUtilisateur.VIEW_RECHARGE_QUOTA_MENSUEL;
//RECHARGE DE CARBURANT DE COMPENSATION 
this.VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL = this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL;

this.VIEW_ALERT_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_ALERT_VEHICULE;
this.VIEW_ALERT_STOCK = this.Authentication.authoritiesUtilisateur.VIEW_ALERT_STOCK;


//CARBURANT :Carte agilis Cash 
this.VIEW_AGILIS_CASH = this.Authentication.authoritiesUtilisateur.VIEW_AGILIS_CASH;
this.VIEW_RECHARGE_AGILIS = this.Authentication.authoritiesUtilisateur.VIEW_RECHARGE_AGILIS;
this.VIEW_DECLARATION_PERTE_AGILIS = this.Authentication.authoritiesUtilisateur.VIEW_DECLARATION_PERTE_AGILIS;
this.VIEW_HISTORIQUE_PERTE_AGILIS = this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_PERTE_AGILIS;
this.VIEW_ANNULATION_AGILIS = this.Authentication.authoritiesUtilisateur.VIEW_ANNULATION_AGILIS;
this.VIEW_HISTORIQUE_MAINTENANCE_VEHICULE=this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_MAINTENANCE_VEHICULE;
 
this.VIEW_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE=this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE;
this.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE=this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE;

//CARBURANT :Carte agilis Cash 
  //EXPLOITATION 
  this.VIEW_VEHICULE_EMPRUNT = this.Authentication.authoritiesUtilisateur.VIEW_VEHICULE_EMPRUNT;
  this.VIEW_EMPRUNT = this.Authentication.authoritiesUtilisateur.VIEW_EMPRUNT;
  this.VIEW_RESERVATION = this.Authentication.authoritiesUtilisateur.VIEW_RESERVATION;
  this.VIEW_VEHICULE_SINISTRE = this.Authentication.authoritiesUtilisateur.VIEW_VEHICULE_SINISTRE;
  this.VIEW_SINISTRE = this.Authentication.authoritiesUtilisateur.VIEW_SINISTRE;
  this.VIEW_LOCATION = this.Authentication.authoritiesUtilisateur.VIEW_LOCATION;
  this.VIEW_VEHICULE_RESERVATION = this.Authentication.authoritiesUtilisateur.VIEW_VEHICULE_RESERVATION;

  //EXPLOITATION

//STOCK
this.VIEW_TRANSFERT_PARC_VERS_MAGASIN = this.Authentication.authoritiesUtilisateur.VIEW_TRANSFERT_PARC_VERS_MAGASIN;
this.VIEW_Regulation_Stock = this.Authentication.authoritiesUtilisateur.VIEW_Regulation_Stock;
this.VIEW_Inventaire_Stock = this.Authentication.authoritiesUtilisateur.VIEW_Inventaire_Stock;
this.VIEW_Retour_Structure = this.Authentication.authoritiesUtilisateur.VIEW_Retour_Structure;
this.VIEW_Reception_Atelier = this.Authentication.authoritiesUtilisateur.VIEW_Reception_Atelier;
this.VIEW_Reception_Fournisseur = this.Authentication.authoritiesUtilisateur.VIEW_Reception_Fournisseur;
this.VIEW_Bon_Sortie_Structure = this.Authentication.authoritiesUtilisateur.VIEW_Bon_Sortie_Structure;
this.VIEW_Bon_Transfert_vers_magasin = this.Authentication.authoritiesUtilisateur.VIEW_Bon_Transfert_vers_magasin;
//this.VIEW_Bon_Transfert_vers_parc = this.Authentication.authoritiesUtilisateur.VIEW_Bon_Transfert_vers_parc;
this.VIEW_Bon_Travail_Sortie = this.Authentication.authoritiesUtilisateur.VIEW_Bon_Travail_Sortie;

//STOCK

    this.VIEW_ARTICLES_SUB_MODULE = ((this.Authentication.getAuthoritiesUtilisateur().VIEW_ARTICLES) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_SOUS_FAMILLES_ARTICLES) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_FAMILLES_ARTICLES));
    this.VIEW_OPERATIONS_REPARATIONS_SUB_MODULE = ((this.Authentication.getAuthoritiesUtilisateur().VIEW_FAMILLES_OPERATIONS_REPARATION) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_OPERATIONS_REPARATION) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS));
    this.VIEW_DECOUPAGE_ADMINISTRATIF_SUB_MODULE = ((this.Authentication.getAuthoritiesUtilisateur().VIEW_GOUVERNORATS) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_STATIONS_PEAGE));
    this.VIEW_PARAMETRES_GENERAUX_SUB_MODULE = ((this.Authentication.getAuthoritiesUtilisateur().VIEW_ANNEES) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_ENERGIES) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_TVA) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_UNITES));
    this.VIEW_PARAMETRES_VEHICULES_SUB_MODULE = ((this.Authentication.getAuthoritiesUtilisateur().VIEW_CAUSES_SINISTRES) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_GENRES_VEHICULE) || (this.Authentication.getAuthoritiesUtilisateur().ADD_MARQUES_VEHICULE) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_TYPES_VEHICULE) || (this.Authentication.getAuthoritiesUtilisateur().VIEW_USAGES_VEHICULES));
    this.VIEW_EXPERTS = this.Authentication.getAuthoritiesUtilisateur().VIEW_EXPERTS;
    this.VIEW_FOURNISSEURS = this.Authentication.getAuthoritiesUtilisateur().VIEW_FOURNISSEURS;
    this.VIEW_LIEUX_PARKING = this.Authentication.getAuthoritiesUtilisateur().VIEW_LIEUX_PARKING;
    this.VIEW_BENEFICIAIRES_EMPRUNTS = this.Authentication.authoritiesUtilisateur.VIEW_BENEFICIAIRES_EMPRUNTS;
    this.VIEW_DETAILS_PERSONNELS = this.Authentication.authoritiesUtilisateur.VIEW_DETAILS_PERSONNELS;
    this.VIEW_ETATS_STOCK = this.Authentication.authoritiesUtilisateur.VIEW_ETATS_STOCK;
    this.VIEW_STRUCTURE_ADMINISTRATIVE = this.Authentication.authoritiesUtilisateur.VIEW_STRUCTURE_ADMINISTRATIVE;
    this.VIEW_UNITE_GESTION_PARC = this.Authentication.authoritiesUtilisateur.VIEW_UNITE_GESTION_PARC;
    this.VIEW_ALERTES = this.Authentication.authoritiesUtilisateur.VIEW_ALERTES;
    this.VIEW_USERS = this.Authentication.authoritiesUtilisateur.VIEW_USERS;
    this.VIEW_MESSAGES_APPLICATIFS = this.Authentication.authoritiesUtilisateur.VIEW_MESSAGES_APPLICATIFS;
    this.VIEW_USERS = this.Authentication.authoritiesUtilisateur.VIEW_USERS;
    this.VIEW_GROUPES_USERS = this.Authentication.authoritiesUtilisateur.VIEW_GROUPES_USERS;
    this.VIEW_GPS = this.Authentication.authoritiesUtilisateur.VIEW_GPS;
    this.VIEW_TRACABILITES = this.Authentication.authoritiesUtilisateur.VIEW_TRACABILITES;
    this.VIEW_PARAMETRES_APPLICATION = this.Authentication.authoritiesUtilisateur.VIEW_PARAMETRES_APPLICATION;
    this.VIEW_VEHICULE = this.Authentication.authoritiesUtilisateur.VIEW_VEHICULE;
    this.VIEW_TAXE_CIRCULATION = this.Authentication.authoritiesUtilisateur.VIEW_TAXE_CIRCULATION;
    this.VIEW_ASSURANCE = this.Authentication.authoritiesUtilisateur.VIEW_ASSURANCE;
    this.VIEW_VISITE_TECHNIQUE = this.Authentication.authoritiesUtilisateur.VIEW_VISITE_TECHNIQUE;
    this.VIEW_REFORME = this.Authentication.authoritiesUtilisateur.VIEW_REFORME;
    this.VIEW_ORDRE_MISSION=this.Authentication.authoritiesUtilisateur.VIEW_ORDRE_MISSION;
    this.VIEW_HISTORIQUE_REGULATION = this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_REGULATION;

   //ACHAT
    this.VIEW_BON_COMMANDE=this.Authentication.authoritiesUtilisateur.VIEW_BON_COMMANDE;

    //Carburant : Carte Plafond
    this.VIEW_CARTE_PLAFOND=this.Authentication.authoritiesUtilisateur.VIEW_CARTE_PLAFOND;
    this.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND=this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND;
    this.VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND=this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND;
    this.VIEW_DECLARATION_PERTE_CARTE_PLAFOND=this.Authentication.authoritiesUtilisateur.VIEW_DECLARATION_PERTE_CARTE_PLAFOND;
    this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND=this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND;
    this.ADD_DEMANDE_ANNULATION_CARTE_PLAFOND=this.Authentication.authoritiesUtilisateur.ADD_DEMANDE_ANNULATION_CARTE_PLAFOND;
    this.VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND=this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND;
    this.VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND=this.Authentication.authoritiesUtilisateur.VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND;
//Carburant : Carte Plafond


//CARBURANT : CARTE JOCKER
this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER=this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_QUOTA_CARTE_JOCKER;
this.VIEW_DECLARATION_PERTE_CARTE_JOCKER=this.Authentication.authoritiesUtilisateur.VIEW_DECLARATION_PERTE_CARTE_JOCKER;
this.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER=this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER;
this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER=this.Authentication.authoritiesUtilisateur.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER;
this.VIEW_CARTE_JOCKER=this.Authentication.authoritiesUtilisateur.VIEW_CARTE_JOCKER;
//CARBURANT : CARTE JOCKER

// CARBURANT : Distribution de carburant
this.VIEW_SUIVI=this.Authentication.authoritiesUtilisateur.VIEW_SUIVI;
this.VIEW_BON_CARBURANT_BON=this.Authentication.authoritiesUtilisateur.VIEW_BON_CARBURANT_BON;
this.VIEW_ETAT_MENSUEL=this.Authentication.authoritiesUtilisateur.VIEW_ETAT_MENSUEL;
this.VIEW_RETOUR_CARBURANT=this.Authentication.authoritiesUtilisateur.VIEW_RETOUR_CARBURANT;
this.VIEW_TRANSFERT_PARC=this.Authentication.authoritiesUtilisateur.VIEW_TRANSFERT_PARC;
this.VIEW_DESTRIBUTION_CARBURANT_COMPENSATION=this.Authentication.authoritiesUtilisateur.VIEW_DESTRIBUTION_CARBURANT_COMPENSATION;
this.VIEW_DESTRIBUTION_CARBURANT_SERVICE=this.Authentication.authoritiesUtilisateur.VIEW_DESTRIBUTION_CARBURANT_SERVICE;
this.VIEW_DISTRIBUTION_CARBURANT_VEHICULE=this.Authentication.authoritiesUtilisateur.VIEW_DISTRIBUTION_CARBURANT_VEHICULE;
this.VIEW_DISTRIBUTION_CARBURANT_FONCTION=this.Authentication.authoritiesUtilisateur.VIEW_DISTRIBUTION_CARBURANT_FONCTION;

// CARBURANT : Distribution de carburant


  }

  SideNavMessagetoggle() {
    this.opened = !this.opened;
    this.openedMessage = !this.openedMessage;
  }

  handleNotification() {
      if (this.t==0)
      {
        this.notification = !this.notification;
      }
      else{
        this.t=this.t-1;
        this.notification = !this.notification;

      }
  }

  getMessages() {
    this.getActualPath(90);
    this.router.navigate(['/messages']);
  }
  getListArticles() {

  }
 
  getListFinVisite()
  {
    this.stock.findVisiteForAlerting().subscribe(value => {
      console.log(value);
      this.alertArticleList = value;
  });
}
}
