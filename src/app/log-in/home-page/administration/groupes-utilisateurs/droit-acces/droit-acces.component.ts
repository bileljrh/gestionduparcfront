import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdministrationServiceService} from '../../administration-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ReferentielSpecifiqueServiceService} from '../../../referentiel/specifique/referentiel-specifique-service.service';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-droit-acces',
  templateUrl: './droit-acces.component.html',
  styleUrls: ['./droit-acces.component.scss']
})
export class DroitAccesComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  codeAuthorities: number;
  ListAuthorities: string[] = [];
 
  //CARBURANT : CARTE AGILIS CASH 
  VIEW_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL = new FormControl(null);
  ADD_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL = new FormControl(null);
  VALID_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL = new FormControl(null);
  CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL = new FormControl(null);
  DELETE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL = new FormControl(null);

  VIEW_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL = new FormControl(null);
  DELETE_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL = new FormControl(null);

  VIEW_AGILIS_CASH_CRT = new FormControl(null);
  ADD_AGILIS_CASH_CRT = new FormControl(null);
  MODIFY_AGILIS_CASH_CRT = new FormControl(null);
  DELETE_AGILIS_CASH_CRT = new FormControl(null);
  VEHICULE_AGILIS_CASH_CRT = new FormControl(null);

  VIEW_RECHARGE_AGILIS_CRT = new FormControl(null);
  ADD_RECHARGE_AGILIS_CRT = new FormControl(null);
  MODIFY_RECHARGE_AGILIS_CRT = new FormControl(null);
  DELETE_RECHARGE_AGILIS_CRT = new FormControl(null);
  VEHICULE_RECHARGE_AGILIS_CRT = new FormControl(null);
  CONFIRMER_RECHARGE_AGILIS_CRT = new FormControl(null);
  VALIDER_RECHARGE_AGILIS_CRT = new FormControl(null);

  VIEW_DECLARATION_PERTE_AGILIS_CRT = new FormControl(null);
  DELETE_DECLARATION_PERTE_AGILIS_CRT = new FormControl(null);
  MODIFY_DECLARATION_PERTE_AGILIS_CRT = new FormControl(null);
  ADD_DECLARATION_PERTE_AGILIS_CRT = new FormControl(null);
  CONFIRMER_DECLARATION_PERTE_AGILIS_CRT = new FormControl(null);

  VIEW_HISTORIQUE_PERTE_AGILIS_CRT = new FormControl(null);
  DELETE_HISTORIQUE_PERTE_AGILIS_CRT = new FormControl(null);

  VIEW_ANNULATION_AGILIS_CRT = new FormControl(null);
  ADD_ANNULATION_AGILIS_CRT = new FormControl(null);
  MODIFY_ANNULATION_AGILIS_CRT = new FormControl(null);
  DELETE_ANNULATION_AGILIS_CRT = new FormControl(null);
  CONFIRMER_ANNULATION_AGILIS_CRT = new FormControl(null);

  VIEW_HISTORIQUE_MAINTENANCE_VEHICULE_CTRL= new FormControl(null);
  DELETE_HISTORIQUE_MAINTENANCE_VEHICULE_CTRL= new FormControl(null);

  //CARBURANT : CARTE AGILIS CASH 



  VIEW_SOUS_FAMILLES_ARTICLES_CTRL = new FormControl(null);
  ADD_SOUS_FAMILLES_ARTICLES_CTRL = new FormControl(null);
  MODIFY_SOUS_FAMILLES_ARTICLES_CTRL = new FormControl(null);
  DELETE_SOUS_FAMILLES_ARTICLES_CTRL = new FormControl(null);
  VIEW_FAMILLES_ARTICLES_CTRL = new FormControl(null);
  ADD_FAMILLES_ARTICLES_CTRL = new FormControl(null);
  MODIFY_FAMILLES_ARTICLES_CTRL = new FormControl(null);
  DELETE_FAMILLES_ARTICLES_CTRL = new FormControl(null);
  VIEW_ARTICLES_CTRL = new FormControl(null);
  ADD_ARTICLES_CTRL = new FormControl(null);
  MODIFY_ARTICLES_CTRL = new FormControl(null);
  DELETE_ARTICLES_CTRL = new FormControl(null);
  VIEW_GOUVERNORATS_CTRL = new FormControl(null);
  ADD_GOUVERNORATS_CTRL = new FormControl(null);
  MODIFY_GOUVERNORATS_CTRL = new FormControl(null);
  DELETE_GOUVERNORATS_CTRL = new FormControl(null);
  VIEW_STATIONS_PEAGE_CTRL = new FormControl(null);
  ADD_STATIONS_PEAGE_CTRL = new FormControl(null);
  MODIFY_STATIONS_PEAGE_CTRL = new FormControl(null);
  DELETE_STATIONS_PEAGE_CTRL = new FormControl(null);
  VIEW_EXPERTS_CTRL = new FormControl(null);
  ADD_EXPERTS_CTRL = new FormControl(null);
  MODIFY_EXPERTS_CTRL = new FormControl(null);
  DELETE_EXPERTS_CTRL = new FormControl(null);
  VIEW_FOURNISSEURS_CTRL = new FormControl(null);
  ADD_FOURNISSEURS_CTRL = new FormControl(null);
  MODIFY_FOURNISSEURS_CTRL = new FormControl(null);
  DELETE_FOURNISSEURS_CTRL = new FormControl(null);
  VIEW_LIEUX_PARKING_CTRL = new FormControl(null);
  ADD_LIEUX_PARKING_CTRL = new FormControl(null);
  MODIFY_LIEUX_PARKING_CTRL = new FormControl(null);
  DELETE_LIEUX_PARKING_CTRL = new FormControl(null);
  VIEW_FAMILLES_OPERATIONS_REPARATION_CTRL = new FormControl(null);
  ADD_FAMILLES_OPERATIONS_REPARATION_CTRL = new FormControl(null);
  MODIFY_FAMILLES_OPERATIONS_REPARATION_CTRL = new FormControl(null);
  DELETE_FAMILLES_OPERATIONS_REPARATION_CTRL = new FormControl(null);
  VIEW_OPERATIONS_REPARATION_CTRL = new FormControl(null);
  ADD_OPERATIONS_REPARATION_CTRL = new FormControl(null);
  MODIFY_OPERATIONS_REPARATION_CTRL = new FormControl(null);
  DELETE_OPERATIONS_REPARATION_CTRL = new FormControl(null);
  VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL = new FormControl(null);
  ADD_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL = new FormControl(null);
  MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL = new FormControl(null);
  DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL = new FormControl(null);
  VIEW_ANNEES_CTRL = new FormControl(null);
  ADD_ANNEES_CTRL = new FormControl(null);
  DELETE_ANNEES_CTRL = new FormControl(null);
  VIEW_ENERGIES_CTRL = new FormControl(null);
  ADD_ENERGIES_CTRL = new FormControl(null);
  MODIFY_ENERGIES_CTRL = new FormControl(null);
  DELETE_ENERGIES_CTRL = new FormControl(null);
  VIEW_TVA_CTRL = new FormControl(null);
  ADD_TVA_CTRL = new FormControl(null);
  MODIFY_TVA_CTRL = new FormControl(null);
  DELETE_TVA_CTRL = new FormControl(null);
  VIEW_UNITES_CTRL = new FormControl(null);
  ADD_UNITES_CTRL = new FormControl(null);
  DELETE_UNITES_CTRL = new FormControl(null);
  VIEW_EXPLOITATIONS_VEHICULES_CTRL = new FormControl(null);
  ADD_EXPLOITATIONS_VEHICULES_CTRL = new FormControl(null);
  MODIFY_EXPLOITATIONS_VEHICULES_CTRL = new FormControl(null);
  DELETE_EXPLOITATIONS_VEHICULES_CTRL = new FormControl(null);
  VIEW_GENRES_VEHICULE_CTRL = new FormControl(null);
  ADD_GENRES_VEHICULE_CTRL = new FormControl(null);
  MODIFY_GENRES_VEHICULE_CTRL = new FormControl(null);
  DELETE_GENRES_VEHICULE_CTRL = new FormControl(null);
  VIEW_MARQUES_VEHICULE_CTRL = new FormControl(null);
  ADD_MARQUES_VEHICULE_CTRL = new FormControl(null);
  MODIFY_MARQUES_VEHICULE_CTRL = new FormControl(null);
  DELETE_MARQUES_VEHICULE_CTRL = new FormControl(null);
  VIEW_TYPES_VEHICULE_CTRL = new FormControl(null);
  ADD_TYPES_VEHICULE_CTRL = new FormControl(null);
  MODIFY_TYPES_VEHICULE_CTRL = new FormControl(null);
  DELETE_TYPES_VEHICULE_CTRL = new FormControl(null);
  VIEW_STRUCTURE_ADMINISTRATIVE_CTRL = new FormControl(null);
  ADD_STRUCTURE_ADMINISTRATIVE_CTRL = new FormControl(null);
  MODIFY_STRUCTURE_ADMINISTRATIVE_CTRL = new FormControl(null);
  DELETE_STRUCTURE_ADMINISTRATIVE_CTRL = new FormControl(null);
  VIEW_UNITE_GESTION_PARC_CTRL = new FormControl(null);
  ADD_UNITE_GESTION_PARC_CTRL = new FormControl(null);
  MODIFY_UNITE_GESTION_PARC_CTRL = new FormControl(null);
  DELETE_UNITE_GESTION_PARC_CTRL = new FormControl(null);
  VIEW_DETAILS_PERSONNELS_CTRL = new FormControl(null);
  ADD_DETAILS_PERSONNELS_CTRL = new FormControl(null);
  MODIFY_DETAILS_PERSONNELS_CTRL = new FormControl(null);
  DELETE_DETAILS_PERSONNELS_CTRL = new FormControl(null);
  VIEW_ETATS_STOCK_CTRL = new FormControl(null);
  ADD_ETATS_STOCK_CTRL = new FormControl(null);
  MODIFY_ETATS_STOCK_CTRL = new FormControl(null);
  DELETE_ETATS_STOCK_CTRL = new FormControl(null);
  VIEW_BENEFICIAIRES_EMPRUNTS_CTRL = new FormControl(null);
  ADD_BENEFICIAIRES_EMPRUNTS_CTRL = new FormControl(null);
  MODIFY_BENEFICIAIRES_EMPRUNTS_CTRL = new FormControl(null);
  DELETE_BENEFICIAIRES_EMPRUNTS_CTRL = new FormControl(null);
  VIEW_ALERTES_CTRL = new FormControl(null);
  ADD_ALERTES_CTRL = new FormControl(null);
  MODIFY_ALERTES_CTRL = new FormControl(null);
  DELETE_ALERTES_CTRL = new FormControl(null);
  VIEW_USERS_CTRL = new FormControl(null);
  ADD_USERS_CTRL = new FormControl(null);
  MODIFY_USERS_CTRL = new FormControl(null);
  DELETE_USERS_CTRL = new FormControl(null);
  ACTIVATE_USERS_CTRL = new FormControl(null);
  LOCK_USERS_CTRL = new FormControl(null);
  MODIFY_PASSWORD_USERS_CTRL = new FormControl(null);
  RESET_PASSWORD_USERS_CTRL = new FormControl(null);
  VIEW_GROUPES_USERS_CTRL = new FormControl(null);
  ADD_GROUPES_USERS_CTRL = new FormControl(null);
  MODIFY_GROUPES_USERS_CTRL = new FormControl(null);
  DELETE_GROUPES_USERS_CTRL = new FormControl(null);
  VIEW_MESSAGES_APPLICATIFS_CTRL = new FormControl(null);
  ADD_MESSAGES_APPLICATIFS_CTRL = new FormControl(null);
  MODIFY_MESSAGES_APPLICATIFS_CTRL = new FormControl(null);
  DELETE_MESSAGES_APPLICATIFS_CTRL = new FormControl(null);
  VIEW_PARAMETRES_APPLICATION_CTRL = new FormControl(null);
  ADD_PARAMETRES_APPLICATION_CTRL = new FormControl(null);
  MODIFY_PARAMETRES_APPLICATION_CTRL = new FormControl(null);
  VIEW_TRACABILITES_CTRL = new FormControl(null);
  DELETE_TRACABILITES_CTRL = new FormControl(null);
  VIEW_USAGES_VEHICULES_CTRL = new FormControl(null);
  ADD_USAGES_VEHICULES_CTRL = new FormControl(null);
  MODIFY_USAGES_VEHICULES_CTRL = new FormControl(null);
  DELETE_USAGES_VEHICULES_CTRL = new FormControl(null);
  VIEW_CAUSES_SINISTRES_CTRL = new FormControl(null);
  ADD_CAUSES_SINISTRES_CTRL = new FormControl(null);
  MODIFY_CAUSES_SINISTRES_CTRL = new FormControl(null);
  DELETE_CAUSES_SINISTRES_CTRL = new FormControl(null);
  VIEW_GPS_CTRL = new FormControl(null);
  ADD_GPS_CTRL = new FormControl(null);
  MODIFY_GPS_CTRL = new FormControl(null);
  DELETE_GPS_CTRL = new FormControl(null);
  // Administratif=================================================
  VIEW_VEHICULE_CTRL = new FormControl(null);
  ADD_VEHICULE_CTRL = new FormControl(null);
  MODIFY_VEHICULE_CTRL = new FormControl(null);
  DELETE_VEHICULE_CTRL = new FormControl(null);
  VIEW_TAXE_CIRCULATION_CTRL = new FormControl(null);
  ADD_TAXE_CIRCULATION_CTRL = new FormControl(null);
  MODIFY_TAXE_CIRCULATION_CTRL = new FormControl(null);
  DELETE_TAXE_CIRCULATION_CTRL = new FormControl(null);
  VIEW_ASSURANCE_CTRL = new FormControl(null);
  ADD_ASSURANCE_CTRL = new FormControl(null);
  MODIFY_ASSURANCE_CTRL = new FormControl(null);
  DELETE_ASSURANCE_CTRL = new FormControl(null);
  VIEW_VISITE_TECHNIQUE_CTRL = new FormControl(null);
  ADD_VISITE_TECHNIQUE_CTRL = new FormControl(null);
  MODIFY_VISITE_TECHNIQUE_CTRL = new FormControl(null);
  DELETE_VISITE_TECHNIQUE_CTRL = new FormControl(null);
  VIEW_REFORME_CTRL = new FormControl(null);
  ADD_REFORME_CTRL = new FormControl(null);
  MODIFY_REFORME_CTRL = new FormControl(null);
  DELETE_REFORME_CTRL = new FormControl(null);


//Ordre de mission
ADD_ORDRE_MISSION_CTRL  = new FormControl(null);
VIEW_ORDRE_MISSION_CTRL = new FormControl(null);
MODIFY_ORDRE_MISSION_CTRL = new FormControl(null);
DELETE_ORDRE_MISSION_CTRL = new FormControl(null);
VEHICULE_ORDRE_MISSION_CTRL  = new FormControl(null);
CONFIRMER_ORDRE_MISSION_CTRL  = new FormControl(null);
VEHICULE_VEHICULE_DEPASSANT_CTRL  = new FormControl(null);
VIEW_VEHICULE_DEPASSANT_CTRL  = new FormControl(null);
DETAILS_VEHICULE_DEPASSANT_CTRL = new FormControl(null);
DELETE_VEHICULE_DEPASSANT_CTRL = new FormControl(null);
//Ordre de mission

//ACHAT
VIEW_BON_COMMANDE_CTRL = new FormControl(null);
ADD_BON_COMMANDE_CTRL = new FormControl(null);
MODIFY_BON_COMMANDE_CTRL = new FormControl(null);
DELETE_BON_COMMANDE_CTRL = new FormControl(null);
//ACHAT



//CARBURANT : CARTE PLAFOND
VIEW_CARTE_PLAFOND_CTRL = new FormControl(null);
MODIFY_CARTE_PLAFOND_CTRL = new FormControl(null);
DELETE_CARTE_PLAFOND_CTRL = new FormControl(null);
ADD_CARTE_PLAFOND_CTRL = new FormControl(null);

VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL = new FormControl(null);
DELETE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL = new FormControl(null);
ADD_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL = new FormControl(null);
CONFIRM_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL = new FormControl(null);
VALIDATION_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL = new FormControl(null);
VEHICULE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL = new FormControl(null);

VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL = new FormControl(null);
DELETE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL = new FormControl(null);
VEHICULE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL = new FormControl(null);

VIEW_DECLARATION_PERTE_CARTE_PLAFOND_CTRL = new FormControl(null);
MODIFY_DECLARATION_PERTE_CARTE_PLAFOND_CTRL = new FormControl(null);
DELETE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL = new FormControl(null);
ADD_DECLARATION_PERTE_CARTE_PLAFOND_CTRL = new FormControl(null);
CONFIRMATION_DECLARATION_PERTE_CARTE_PLAFOND_CTRL = new FormControl(null);

VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL = new FormControl(null);
DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL = new FormControl(null);

ADD_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL = new FormControl(null);

VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL = new FormControl(null);
MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL = new FormControl(null);
DELETE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL = new FormControl(null);
CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL = new FormControl(null);

VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL = new FormControl(null);
DELETE_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL = new FormControl(null);

//CARBURANT : CARTE PLAFOND

//Stock

VIEW_Bon_Travail_Sortie_CTRL = new FormControl(null);
DETAILS_Bon_Travail_Sortie_CTRL = new FormControl(null);
/*VIEW_Bon_Transfert_vers_parc_CTRL = new FormControl(null);
CONFIRM_Bon_Transfert_vers_parc_CTRL = new FormControl(null);
VALIDER_Bon_Transfert_vers_parc_CTRL = new FormControl(null);
MODIFY_Bon_Transfert_vers_parc_CTRL = new FormControl(null);
DELETE_Bon_Transfert_vers_parc_CTRL = new FormControl(null);
ADD_Bon_Transfert_vers_parc_CTRL = new FormControl(null);*/
VIEW_Bon_Transfert_vers_magasin_CTRL = new FormControl(null);
CONFIRM_Bon_Transfert_vers_magasin_CTRL = new FormControl(null);
VALIDER_Bon_Transfert_vers_magasin_CTRL = new FormControl(null);
MODIFY_Bon_Transfert_vers_magasin_CTRL = new FormControl(null);
DELETE_Bon_Transfert_vers_magasin_CTRL = new FormControl(null);
ADD_Bon_Transfert_vers_magasin_CTRL = new FormControl(null);
VIEW_Bon_Sortie_Structure_CTRL = new FormControl(null);
VIEW_Reception_Fournisseur_CTRL = new FormControl(null);
DELETE_Reception_Fournisseur_CTRL = new FormControl(null);
DETAILS_Reception_Fournisseur_CTRL = new FormControl(null);
VIEW_Reception_Atelier_CTRL = new FormControl(null);
VIEW_Transfert_magasin_CTRL = new FormControl(null);
VIEW_Retour_Structure_CTRL = new FormControl(null);
DETAILS_Retour_Structure_CTRL = new FormControl(null);
ADD_Retour_Structure_CTRL = new FormControl(null);
DELETE_Retour_Structure_CTRL = new FormControl(null);
VIEW_Inventaire_Stock_CTRL = new FormControl(null);
ADD_Inventaire_Stock_CTRL = new FormControl(null);
DETAILS_Inventaire_Stock_CTRL = new FormControl(null);
DELETE_Inventaire_Stock_CTRL = new FormControl(null);
VIEW_Regulation_Stock_CTRL = new FormControl(null);
DETAILS_Regulation_Stock_CTRL = new FormControl(null);
DELETE_Regulation_Stock_CTRL = new FormControl(null);
ADD_Regulation_Stock_CTRL = new FormControl(null);

VIEW_HISTORIQUE_REGULATION_CTRL = new FormControl(null);
DELETE_HISTORIQUE_REGULATION_CTRL = new FormControl(null);


CONFIRM_TRANSFERT_PARC_VERS_MAGASIN_CTRL= new FormControl(null);
VALID_TRANSFERT_PARC_VERS_MAGASIN_CTRL= new FormControl(null);
ADD_TRANSFERT_PARC_VERS_MAGASIN_CTRL= new FormControl(null);
VIEW_TRANSFERT_PARC_VERS_MAGASIN_CTRL= new FormControl(null);
MODIFY_TRANSFERT_PARC_VERS_MAGASIN_CTRL= new FormControl(null);
DELETE_TRANSFERT_PARC_VERS_MAGASIN_CTRL= new FormControl(null);



//STOCK


//Exploitation
VIEW_RESERVATION_CTRL  = new FormControl(null);
ADD_RESERVATION_CTRL = new FormControl(null);
MODIFY_RESERVATION_CTRL = new FormControl(null);
DELETE_RESERVATION_CTRL = new FormControl(null);
VIEW_VEHICULE_RESERVATION_CTRL = new FormControl(null);
CONFIRMER_RESERVATION_CTRL = new FormControl(null);
VIEW_LOCATION_CTRL = new FormControl(null);
ADD_LOCATION_CTRL = new FormControl(null);
MODIFY_LOCATION_CTRL = new FormControl(null);
DELETE_LOCATION_CTRL = new FormControl(null);
VIEW_SINISTRE_CTRL = new FormControl(null);
ADD_SINISTRE_CTRL = new FormControl(null);
MODIFY_SINISTRE_CTRL = new FormControl(null);
DELETE_SINISTRE_CTRL = new FormControl(null);
VIEW_VEHICULE_SINISTRE_CTRL = new FormControl(null);
VIEW_EMPRUNT_CTRL = new FormControl(null);
ADD_EMPRUNT_CTRL = new FormControl(null);
MODIFY_EMPRUNT_CTRL = new FormControl(null);
DELETE_EMPRUNT_CTRL = new FormControl(null);
VIEW_VEHICULE_EMPRUNT_CTRL = new FormControl(null);
CONFIRMER_EMPRUNT_CTRL = new FormControl(null);
//EXPLOITATION


//CARBURANT : RECHARGE DE CARBURANT DE COMPENSATION 
CONFIRMATION_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL= new FormControl(null);
VALIDATION_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL= new FormControl(null);
ADD_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL= new FormControl(null);
MODIFY_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL= new FormControl(null);
DELETE_RECHARGE_COMPLEMENTAIRE_CTRL= new FormControl(null);
VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL= new FormControl(null);
//CARBURANT : RECHARGE DE CARBURANT DE COMPENSATION 

//CARBURANT : RECHARGE_QUOTA_MENSUEL
CONFIRM_RECHARGE_QUOTA_MENSUEL_CTRL= new FormControl(null);
VALID_RECHARGE_QUOTA_MENSUEL_CTRL= new FormControl(null);
ADD_RECHARGE_QUOTA_MENSUEL_CTRL= new FormControl(null);
VIEW_RECHARGE_QUOTA_MENSUEL_CTRL= new FormControl(null);
VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL_CTRL= new FormControl(null);
//CARBURANT : RECHARGE_QUOTA_MENSUEL

//CARBURANT : CARTE JOCKER

VIEW_CARTE_JOCKER_CTRL= new FormControl(null);
MODIFY_CARTE_JOCKER_CTRL= new FormControl(null);
DELETE_CARTE_JOCKER_CTRL= new FormControl(null);
ADD_CARTE_JOCKER_CTRL= new FormControl(null);


CONFIRMATION_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);
VALIDATION_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);
VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);
MODIFY_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);
ADD_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);
VEHICULE_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);
DELETE_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);


CONFIRMATION_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);
VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);
MODIFY_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);
DELETE_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);
ADD_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL= new FormControl(null);

ADD_DECLARATION_PERTE_CARTE_JOCKER_CTRL= new FormControl(null);
DELETE_DECLARATION_PERTE_CARTE_JOCKER_CTRL= new FormControl(null);
MODIFY_DECLARATION_PERTE_CARTE_JOCKER_CTRL= new FormControl(null);
CONFIRMATION_DECLARATION_PERTE_CARTE_JOCKER_CTRL= new FormControl(null);
VIEW_DECLARATION_PERTE_CARTE_JOCKER_CTRL= new FormControl(null);

VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER_CTRL= new FormControl(null);
DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER_CTRL= new FormControl(null);



CONFIRMATION_DEMANDE_QUOTA_CARTE_JOCKER_CTRL= new FormControl(null);
VALIDATION_DEMANDE_QUOTA_CARTE_JOCKER_CTRL= new FormControl(null);
ADD_DEMANDE_QUOTA_CARTE_JOCKER_CTRL= new FormControl(null);
MODIFY_DEMANDE_QUOTA_CARTE_JOCKER_CTRL= new FormControl(null);
DELETE_DEMANDE_QUOTA_CARTE_JOCKER_CTRL= new FormControl(null);
VIEW_DEMANDE_QUOTA_CARTE_JOCKER_CTRL= new FormControl(null);

//CARBURANT : CARTE JOCKER
//mAINTENACE/
MODIFY_DEMANDE_INTERVENTION_CTRL= new FormControl(null);
 DELETE_DEMANDE_INTERVENTION_CTRL= new FormControl(null);
 VIEW_DEMANDE_INTERVENTION_CTRL= new FormControl(null);
 ADD_DEMANDE_INTERVENTION_CTRL= new FormControl(null);
 
 DETAILS_BON_TRAVAIL_CTRL= new FormControl(null);
 DELETE_BON_TRAVAIL_CTRL= new FormControl(null);
 VIEW_BON_TRAVAIL_CTRL= new FormControl(null);
 ADD_BON_TRAVAIL_CTRL= new FormControl(null);
 MODIFY_SORTIE_VEHICULE_CTRL= new FormControl(null);
 VIEW_SORTIE_VEHICULE_CTRL= new FormControl(null);

 VIEW_HISTORIQUE_MAINTENANCE_CTRL= new FormControl(null);
 DELETE_HISTORIQUE_MAINTENANCE_CTRL= new FormControl(null);
//MAINTENCE

// CARBURANT : Distribution de carburant
ADD_DISTRIBUTION_CARBURANT_FONCTION_CTRL= new FormControl(null);
MODIFY_DISTRIBUTION_CARBURANT_FONCTION_CTRL= new FormControl(null);
DELETE_DISTRIBUTION_CARBURANT_FONCTION_CTRL= new FormControl(null);
VIEW_DISTRIBUTION_CARBURANT_FONCTION_CTRL= new FormControl(null);
VEHICULE_DISTRIBUTION_CARBURANT_FONCTION_CTRL= new FormControl(null);

ADD_DISTRIBUTION_CARBURANT_VEHICULE_CTRL= new FormControl(null);
MODIFY_DISTRIBUTION_CARBURANT_VEHICULE_CTRL= new FormControl(null);
DELETE_DISTRIBUTION_CARBURANT_VEHICULE_CTRL= new FormControl(null);
VIEW_DISTRIBUTION_CARBURANT_VEHICULE_CTRL= new FormControl(null);

ADD_DESTRIBUTION_CARBURANT_SERVICE_CTRL= new FormControl(null);
MODIFY_DESTRIBUTION_CARBURANT_SERVICE_CTRL= new FormControl(null);
DELETE_DESTRIBUTION_CARBURANT_SERVICE_CTRL= new FormControl(null);
VIEW_DESTRIBUTION_CARBURANT_SERVICE_CTRL= new FormControl(null);
VEHICULE_DESTRIBUTION_CARBURANT_SERVICE_CTRL= new FormControl(null);

ADD_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL= new FormControl(null);
MODIFY_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL= new FormControl(null);
DELETE_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL= new FormControl(null);
VIEW_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL= new FormControl(null);
VEHICULE_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL= new FormControl(null);

ADD_TRANSFERT_PARC_CTRL= new FormControl(null);
VIEW_TRANSFERT_PARC_CTRL= new FormControl(null);
DETAIL_TRANSFERT_PARC_CTRL= new FormControl(null);

ADD_RETOUR_CARBURANT_CTRL= new FormControl(null);
VIEW_RETOUR_CARBURANT_CTRL= new FormControl(null);

ADD_ETAT_MENSUEL_CTRL= new FormControl(null);
MODIFY_ETAT_MENSUEL_CTRL= new FormControl(null);
DELETE_ETAT_MENSUEL_CTRL= new FormControl(null);
VIEW_ETAT_MENSUEL_CTRL= new FormControl(null);
VEHICULE_ETAT_MENSUEL_CTRL= new FormControl(null);
VALIDER_ETAT_MENSUEL_CTRL= new FormControl(null);
CONFIRMER_ETAT_MENSUEL_CTRL= new FormControl(null);

ADD_BON_CARBURANT_BON_CTRL= new FormControl(null);
VIEW_BON_CARBURANT_BON_CTRL= new FormControl(null);

ADD_SUIVI_CTRL= new FormControl(null);
VIEW_SUIVI_CTRL= new FormControl(null);
// CARBURANT : Distribution de carburant


//CARBURANT : RECHARGE DE CARBURANT DE COMPENSATION 
CONFIRMATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL= new FormControl(null);
VALIDATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL= new FormControl(null);
ADD_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL= new FormControl(null);
MODIFY_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL= new FormControl(null);
DELETE_RECHARGE_CARBURANT_COMPENSATION_CTRL= new FormControl(null);
VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL= new FormControl(null);
//CARBURANT : RECHARGE DE CARBURANT DE COMPENSATION 


VIEW_ALERT_VEHICULE_CTRL = new FormControl(null);
VIEW_ALERT_STOCK_CTRL = new FormControl(null);

RECU_DEMANDE_INTERVENTION_CTRL= new FormControl(null);
VEHICULE_DEMANDE_INTERVENTION_CTRL= new FormControl(null);
ANNULATION_DEMANDE_INTERVENTION_CTRL= new FormControl(null);
REOUVRIR_SORTIE_VEHICULE_CTRL= new FormControl(null);

  constructor(public dialogRef: MatDialogRef<DroitAccesComponent>, private Administration: AdministrationServiceService, private ngxLoader: NgxUiLoaderService, private Referentiel: ReferentielSpecifiqueServiceService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngxLoader.start();
    if (this.data.element.authorities !== null) {
      this.ListAuthorities = this.data.element.authorities.split(',');
      this.patchInitialValues();
    }
    this.codeAuthorities = 8;
    this.ngxLoader.stop();
  }

  ngOnInit(): void {

    this.subscription.push(this.VIEW_ALERT_STOCK_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ALERT_STOCK_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_ALERT_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ALERT_VEHICULE_CTRL.patchValue(true);
      }
    }));


    this.subscription.push(this.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.DELETE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(false);
        this.MODIFY_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(false);
        this.ADD_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(false);
        this.VALIDATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(false);
        this.CONFIRMATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(false);

      }
    }));
    this.subscription.push(this.DELETE_RECHARGE_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.ADD_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VALIDATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.CONFIRMATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL .valueChanges.subscribe(value => {
      if (!value) {
        this.DELETE_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL .patchValue(false);
       
      }
    }));
    this.subscription.push(this.DELETE_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL .valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(true);
      }
    }));


    this.subscription.push(this.VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.DELETE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(false);
        this.MODIFY_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(false);
        this.ADD_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(false);
        this.VALIDATION_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(false);
        this.CONFIRMATION_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(false);

      }
    }));
    this.subscription.push(this.DELETE_RECHARGE_COMPLEMENTAIRE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.ADD_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VALIDATION_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.CONFIRMATION_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
      }
    }));

    this.subscription.push(this.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(false);
        this.VALID_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(false);
        this.CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(false);
        this.DELETE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(false);

      }
    }));
    this.subscription.push(this.ADD_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VALID_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(true);
      }
    }));


    //recharge quota mensuel


    this.subscription.push(this.VIEW_RECHARGE_QUOTA_MENSUEL_CTRL.valueChanges.subscribe(value => {
      if (!value) {
       this.ADD_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(false);
        this.VALID_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(false);
        this.CONFIRM_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(false);

      }
    }));
   
    this.subscription.push(this.ADD_RECHARGE_QUOTA_MENSUEL_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VALID_RECHARGE_QUOTA_MENSUEL_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.CONFIRM_RECHARGE_QUOTA_MENSUEL_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(true);
      }
    }));

    this.subscription.push(this.VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL_CTRL.valueChanges.subscribe(value => {
    }));
    // recharge quota mensuel


//Mainteance
this.subscription.push(this.VIEW_DEMANDE_INTERVENTION_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.MODIFY_DEMANDE_INTERVENTION_CTRL.patchValue(false);
    this.DELETE_DEMANDE_INTERVENTION_CTRL.patchValue(false);
    this.ADD_DEMANDE_INTERVENTION_CTRL.patchValue(false);
    this.RECU_DEMANDE_INTERVENTION_CTRL.patchValue(false);
    this.VEHICULE_DEMANDE_INTERVENTION_CTRL.patchValue(false);
    this.ANNULATION_DEMANDE_INTERVENTION_CTRL.patchValue(false);

  }
}));
this.subscription.push(this.ANNULATION_DEMANDE_INTERVENTION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_INTERVENTION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VEHICULE_DEMANDE_INTERVENTION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_INTERVENTION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.RECU_DEMANDE_INTERVENTION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_INTERVENTION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DEMANDE_INTERVENTION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_INTERVENTION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DEMANDE_INTERVENTION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_INTERVENTION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DEMANDE_INTERVENTION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_INTERVENTION_CTRL.patchValue(true);
  }
}));


this.subscription.push(this.VIEW_BON_TRAVAIL_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.DETAILS_BON_TRAVAIL_CTRL.patchValue(false);
    this.DELETE_BON_TRAVAIL_CTRL.patchValue(false);
    this.ADD_BON_TRAVAIL_CTRL.patchValue(false);
  }
}));
this.subscription.push(this.DETAILS_BON_TRAVAIL_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_BON_TRAVAIL_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_BON_TRAVAIL_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_BON_TRAVAIL_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_BON_TRAVAIL_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_BON_TRAVAIL_CTRL.patchValue(true);
  }
}));


this.subscription.push(this.VIEW_SORTIE_VEHICULE_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.MODIFY_SORTIE_VEHICULE_CTRL.patchValue(false);
    this.REOUVRIR_SORTIE_VEHICULE_CTRL.patchValue(false);

  }
}));
this.subscription.push(this.REOUVRIR_SORTIE_VEHICULE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_SORTIE_VEHICULE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_SORTIE_VEHICULE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_SORTIE_VEHICULE_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_HISTORIQUE_MAINTENANCE_VEHICULE_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.DELETE_HISTORIQUE_MAINTENANCE_VEHICULE_CTRL.patchValue(false);
   
  }
}));
this.subscription.push(this.DELETE_HISTORIQUE_MAINTENANCE_VEHICULE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_HISTORIQUE_MAINTENANCE_VEHICULE_CTRL.patchValue(true);
  }
}));
//End Maintenace

    this.subscription.push(this.VIEW_SOUS_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_SOUS_FAMILLES_ARTICLES_CTRL.patchValue(false);
        this.MODIFY_SOUS_FAMILLES_ARTICLES_CTRL.patchValue(false);
        this.DELETE_SOUS_FAMILLES_ARTICLES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_SOUS_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_SOUS_FAMILLES_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_SOUS_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_SOUS_FAMILLES_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_SOUS_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_SOUS_FAMILLES_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_FAMILLES_ARTICLES_CTRL.patchValue(false);
        this.MODIFY_FAMILLES_ARTICLES_CTRL.patchValue(false);
        this.DELETE_FAMILLES_ARTICLES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FAMILLES_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FAMILLES_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FAMILLES_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_ARTICLES_CTRL.patchValue(false);
        this.MODIFY_ARTICLES_CTRL.patchValue(false);
        this.DELETE_ARTICLES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_GOUVERNORATS_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_GOUVERNORATS_CTRL.patchValue(false);
        this.MODIFY_GOUVERNORATS_CTRL.patchValue(false);
        this.DELETE_GOUVERNORATS_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_GOUVERNORATS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GOUVERNORATS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_GOUVERNORATS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GOUVERNORATS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_GOUVERNORATS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GOUVERNORATS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_STATIONS_PEAGE_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_STATIONS_PEAGE_CTRL.patchValue(false);
        this.MODIFY_STATIONS_PEAGE_CTRL.patchValue(false);
        this.DELETE_STATIONS_PEAGE_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_STATIONS_PEAGE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_STATIONS_PEAGE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_STATIONS_PEAGE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_STATIONS_PEAGE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_STATIONS_PEAGE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_STATIONS_PEAGE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_DETAILS_PERSONNELS_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_DETAILS_PERSONNELS_CTRL.patchValue(false);
        this.MODIFY_DETAILS_PERSONNELS_CTRL.patchValue(false);
        this.DELETE_DETAILS_PERSONNELS_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_DETAILS_PERSONNELS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DETAILS_PERSONNELS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_DETAILS_PERSONNELS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DETAILS_PERSONNELS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_DETAILS_PERSONNELS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_DETAILS_PERSONNELS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_ETATS_STOCK_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_ETATS_STOCK_CTRL.patchValue(false);
        this.MODIFY_ETATS_STOCK_CTRL.patchValue(false);
        this.DELETE_ETATS_STOCK_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_ETATS_STOCK_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ETATS_STOCK_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_ETATS_STOCK_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ETATS_STOCK_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_ETATS_STOCK_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ETATS_STOCK_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_EXPERTS_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_EXPERTS_CTRL.patchValue(false);
        this.MODIFY_EXPERTS_CTRL.patchValue(false);
        this.DELETE_EXPERTS_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_EXPERTS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_EXPERTS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_EXPERTS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_EXPERTS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_EXPERTS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_EXPERTS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_FOURNISSEURS_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_FOURNISSEURS_CTRL.patchValue(false);
        this.MODIFY_FOURNISSEURS_CTRL.patchValue(false);
        this.DELETE_FOURNISSEURS_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_FOURNISSEURS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FOURNISSEURS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_FOURNISSEURS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FOURNISSEURS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_FOURNISSEURS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FOURNISSEURS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_LIEUX_PARKING_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_LIEUX_PARKING_CTRL.patchValue(false);
        this.MODIFY_LIEUX_PARKING_CTRL.patchValue(false);
        this.DELETE_LIEUX_PARKING_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_LIEUX_PARKING_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_LIEUX_PARKING_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_LIEUX_PARKING_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_LIEUX_PARKING_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_LIEUX_PARKING_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_LIEUX_PARKING_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_FAMILLES_OPERATIONS_REPARATION_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_FAMILLES_OPERATIONS_REPARATION_CTRL.patchValue(false);
        this.MODIFY_FAMILLES_OPERATIONS_REPARATION_CTRL.patchValue(false);
        this.DELETE_FAMILLES_OPERATIONS_REPARATION_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_FAMILLES_OPERATIONS_REPARATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FAMILLES_OPERATIONS_REPARATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_FAMILLES_OPERATIONS_REPARATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FAMILLES_OPERATIONS_REPARATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_FAMILLES_OPERATIONS_REPARATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FAMILLES_OPERATIONS_REPARATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_OPERATIONS_REPARATION_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_OPERATIONS_REPARATION_CTRL.patchValue(false);
        this.MODIFY_OPERATIONS_REPARATION_CTRL.patchValue(false);
        this.DELETE_OPERATIONS_REPARATION_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_OPERATIONS_REPARATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_OPERATIONS_REPARATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_OPERATIONS_REPARATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_OPERATIONS_REPARATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_OPERATIONS_REPARATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_OPERATIONS_REPARATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.patchValue(false);
        this.MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.patchValue(false);
        this.DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_ANNEES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_ANNEES_CTRL.patchValue(false);
        this.DELETE_ANNEES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_ANNEES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ANNEES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_ANNEES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ANNEES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_ENERGIES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_ENERGIES_CTRL.patchValue(false);
        this.MODIFY_ENERGIES_CTRL.patchValue(false);
        this.DELETE_ENERGIES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_ENERGIES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ENERGIES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_ENERGIES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ENERGIES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_ENERGIES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ENERGIES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_TVA_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_TVA_CTRL.patchValue(false);
        this.MODIFY_TVA_CTRL.patchValue(false);
        this.DELETE_TVA_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_TVA_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_TVA_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_TVA_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_TVA_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_UNITES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_UNITES_CTRL.patchValue(false);
        this.DELETE_UNITES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_USAGES_VEHICULES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USAGES_VEHICULES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_USAGES_VEHICULES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USAGES_VEHICULES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_USAGES_VEHICULES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USAGES_VEHICULES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.ADD_CAUSES_SINISTRES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_CAUSES_SINISTRES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_CAUSES_SINISTRES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_CAUSES_SINISTRES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_CAUSES_SINISTRES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_CAUSES_SINISTRES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.ADD_UNITES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_UNITES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_UNITES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_UNITES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_FAMILLES_ARTICLES_CTRL.patchValue(false);
        this.MODIFY_FAMILLES_ARTICLES_CTRL.patchValue(false);
        this.DELETE_FAMILLES_ARTICLES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FAMILLES_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FAMILLES_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_FAMILLES_ARTICLES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_FAMILLES_ARTICLES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_ENERGIES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_ENERGIES_CTRL.patchValue(false);
        this.MODIFY_ENERGIES_CTRL.patchValue(false);
        this.DELETE_ENERGIES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_ENERGIES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ENERGIES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_ENERGIES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ENERGIES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_ENERGIES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ENERGIES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_GENRES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_GENRES_VEHICULE_CTRL.patchValue(false);
        this.MODIFY_GENRES_VEHICULE_CTRL.patchValue(false);
        this.DELETE_GENRES_VEHICULE_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.VIEW_USAGES_VEHICULES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_USAGES_VEHICULES_CTRL.patchValue(false);
        this.MODIFY_USAGES_VEHICULES_CTRL.patchValue(false);
        this.DELETE_USAGES_VEHICULES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.VIEW_CAUSES_SINISTRES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_CAUSES_SINISTRES_CTRL.patchValue(false);
        this.MODIFY_CAUSES_SINISTRES_CTRL.patchValue(false);
        this.DELETE_CAUSES_SINISTRES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_GENRES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GENRES_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_GENRES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GENRES_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_GENRES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GENRES_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_MARQUES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_MARQUES_VEHICULE_CTRL.patchValue(false);
        this.MODIFY_MARQUES_VEHICULE_CTRL.patchValue(false);
        this.DELETE_MARQUES_VEHICULE_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_MARQUES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_MARQUES_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_MARQUES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_MARQUES_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_MARQUES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_MARQUES_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_TYPES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_TYPES_VEHICULE_CTRL.patchValue(false);
        this.MODIFY_TYPES_VEHICULE_CTRL.patchValue(false);
        this.DELETE_TYPES_VEHICULE_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_TYPES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_TYPES_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_TYPES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_TYPES_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_TYPES_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_TYPES_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_STRUCTURE_ADMINISTRATIVE_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_STRUCTURE_ADMINISTRATIVE_CTRL.patchValue(false);
        this.MODIFY_STRUCTURE_ADMINISTRATIVE_CTRL.patchValue(false);
        this.DELETE_STRUCTURE_ADMINISTRATIVE_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_STRUCTURE_ADMINISTRATIVE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_STRUCTURE_ADMINISTRATIVE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_STRUCTURE_ADMINISTRATIVE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_STRUCTURE_ADMINISTRATIVE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_STRUCTURE_ADMINISTRATIVE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_STRUCTURE_ADMINISTRATIVE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_UNITE_GESTION_PARC_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_UNITE_GESTION_PARC_CTRL.patchValue(false);
        this.MODIFY_UNITE_GESTION_PARC_CTRL.patchValue(false);
        this.DELETE_UNITE_GESTION_PARC_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_UNITE_GESTION_PARC_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_UNITE_GESTION_PARC_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_UNITE_GESTION_PARC_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_UNITE_GESTION_PARC_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_UNITE_GESTION_PARC_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_UNITE_GESTION_PARC_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_BENEFICIAIRES_EMPRUNTS_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_BENEFICIAIRES_EMPRUNTS_CTRL.patchValue(false);
        this.MODIFY_BENEFICIAIRES_EMPRUNTS_CTRL.patchValue(false);
        this.DELETE_BENEFICIAIRES_EMPRUNTS_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_BENEFICIAIRES_EMPRUNTS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_BENEFICIAIRES_EMPRUNTS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_BENEFICIAIRES_EMPRUNTS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_BENEFICIAIRES_EMPRUNTS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_BENEFICIAIRES_EMPRUNTS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_BENEFICIAIRES_EMPRUNTS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_ALERTES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_ALERTES_CTRL.patchValue(false);
        this.MODIFY_ALERTES_CTRL.patchValue(false);
        this.DELETE_ALERTES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_ALERTES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ALERTES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_ALERTES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ALERTES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_ALERTES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ALERTES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_USERS_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_USERS_CTRL.patchValue(false);
        this.MODIFY_USERS_CTRL.patchValue(false);
        this.DELETE_USERS_CTRL.patchValue(false);
        this.ACTIVATE_USERS_CTRL.patchValue(false);
        this.LOCK_USERS_CTRL.patchValue(false);
        this.MODIFY_PASSWORD_USERS_CTRL.patchValue(false);
        this.RESET_PASSWORD_USERS_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.ACTIVATE_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.LOCK_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_PASSWORD_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.RESET_PASSWORD_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_GROUPES_USERS_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_GROUPES_USERS_CTRL.patchValue(false);
        this.MODIFY_GROUPES_USERS_CTRL.patchValue(false);
        this.DELETE_GROUPES_USERS_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.LOCK_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_PASSWORD_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.ADD_GROUPES_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GROUPES_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_GROUPES_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GROUPES_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_GROUPES_USERS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GROUPES_USERS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_MESSAGES_APPLICATIFS_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_MESSAGES_APPLICATIFS_CTRL.patchValue(false);
        this.MODIFY_MESSAGES_APPLICATIFS_CTRL.patchValue(false);
        this.DELETE_MESSAGES_APPLICATIFS_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_MESSAGES_APPLICATIFS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_MESSAGES_APPLICATIFS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_MESSAGES_APPLICATIFS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_MESSAGES_APPLICATIFS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_MESSAGES_APPLICATIFS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_MESSAGES_APPLICATIFS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_PARAMETRES_APPLICATION_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_PARAMETRES_APPLICATION_CTRL.patchValue(false);
        this.MODIFY_PARAMETRES_APPLICATION_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_PARAMETRES_APPLICATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_PARAMETRES_APPLICATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_PARAMETRES_APPLICATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_PARAMETRES_APPLICATION_CTRL.patchValue(true);
        this.ADD_PARAMETRES_APPLICATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_TRACABILITES_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.DELETE_TRACABILITES_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.DELETE_TRACABILITES_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_TRACABILITES_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.VIEW_GPS_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_GPS_CTRL.patchValue(false);
        this.MODIFY_GPS_CTRL.patchValue(false);
        this.DELETE_GPS_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_GPS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GPS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_GPS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GPS_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_GPS_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_GPS_CTRL.patchValue(true);
      }
    }));

    this.subscription.push(this.VIEW_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_VEHICULE_CTRL.patchValue(false);
        this.MODIFY_VEHICULE_CTRL.patchValue(false);
        this.DELETE_VEHICULE_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_VEHICULE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_VEHICULE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_VEHICULE_CTRL.patchValue(true);
      }
    }));

    this.subscription.push(this.VIEW_TAXE_CIRCULATION_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_TAXE_CIRCULATION_CTRL.patchValue(false);
        this.MODIFY_TAXE_CIRCULATION_CTRL.patchValue(false);
        this.DELETE_TAXE_CIRCULATION_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_TAXE_CIRCULATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_TAXE_CIRCULATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_TAXE_CIRCULATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_TAXE_CIRCULATION_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_TAXE_CIRCULATION_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_TAXE_CIRCULATION_CTRL.patchValue(true);
      }
    }));

    this.subscription.push(this.VIEW_ASSURANCE_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_ASSURANCE_CTRL.patchValue(false);
        this.MODIFY_ASSURANCE_CTRL.patchValue(false);
        this.DELETE_ASSURANCE_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_ASSURANCE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ASSURANCE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_ASSURANCE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ASSURANCE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_ASSURANCE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_ASSURANCE_CTRL.patchValue(true);
      }
    }));

    this.subscription.push(this.VIEW_VISITE_TECHNIQUE_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_VISITE_TECHNIQUE_CTRL.patchValue(false);
        this.MODIFY_VISITE_TECHNIQUE_CTRL.patchValue(false);
        this.DELETE_VISITE_TECHNIQUE_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_VISITE_TECHNIQUE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_VISITE_TECHNIQUE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_VISITE_TECHNIQUE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_VISITE_TECHNIQUE_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_VISITE_TECHNIQUE_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_VISITE_TECHNIQUE_CTRL.patchValue(true);
      }
    }));

    this.subscription.push(this.VIEW_REFORME_CTRL.valueChanges.subscribe(value => {
      if (!value) {
        this.ADD_REFORME_CTRL.patchValue(false);
        this.MODIFY_REFORME_CTRL.patchValue(false);
        this.DELETE_REFORME_CTRL.patchValue(false);
      }
    }));
    this.subscription.push(this.ADD_REFORME_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_REFORME_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.MODIFY_REFORME_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_REFORME_CTRL.patchValue(true);
      }
    }));
    this.subscription.push(this.DELETE_REFORME_CTRL.valueChanges.subscribe(value => {
      if (value) {
        this.VIEW_REFORME_CTRL.patchValue(true);
      }
    }));
    
 /* AGILIS*/
 this.subscription.push(this.VIEW_AGILIS_CASH_CRT.valueChanges.subscribe(value => {
  if (!value) {
    
    this.MODIFY_AGILIS_CASH_CRT.patchValue(false);
    this.DELETE_AGILIS_CASH_CRT.patchValue(false);
    this.VEHICULE_AGILIS_CASH_CRT.patchValue(false);
    this.DELETE_AGILIS_CASH_CRT.patchValue(false);
    this.ADD_AGILIS_CASH_CRT.patchValue(false);

  }
}));
this.subscription.push(this.MODIFY_AGILIS_CASH_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_AGILIS_CASH_CRT.patchValue(true);
  }
}));

this.subscription.push(this.DELETE_AGILIS_CASH_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_AGILIS_CASH_CRT.patchValue(true);
  }
}));

this.subscription.push(this.VEHICULE_AGILIS_CASH_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_AGILIS_CASH_CRT.patchValue(true);
  }
}));
this.subscription.push(this.ADD_AGILIS_CASH_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_AGILIS_CASH_CRT.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_RECHARGE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (!value) {
    
    this.MODIFY_RECHARGE_AGILIS_CRT.patchValue(false);
    this.DELETE_RECHARGE_AGILIS_CRT.patchValue(false);
    this.VEHICULE_RECHARGE_AGILIS_CRT.patchValue(false);
    this.ADD_RECHARGE_AGILIS_CRT.patchValue(false);
    this.CONFIRMER_RECHARGE_AGILIS_CRT.patchValue(false);
    this.VALIDER_RECHARGE_AGILIS_CRT.patchValue(false);

  }
}));
this.subscription.push(this.CONFIRMER_RECHARGE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RECHARGE_AGILIS_CRT.patchValue(true);
  }
}));
this.subscription.push(this.VALIDER_RECHARGE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RECHARGE_AGILIS_CRT.patchValue(true);
  }
}));
this.subscription.push(this.ADD_RECHARGE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RECHARGE_AGILIS_CRT.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_RECHARGE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RECHARGE_AGILIS_CRT.patchValue(true);
  }
}));

this.subscription.push(this.DELETE_RECHARGE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RECHARGE_AGILIS_CRT.patchValue(true);
  }
}));

this.subscription.push(this.VEHICULE_RECHARGE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RECHARGE_AGILIS_CRT.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_DECLARATION_PERTE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (!value) {
    
    this.MODIFY_DECLARATION_PERTE_AGILIS_CRT.patchValue(false);
    this.ADD_DECLARATION_PERTE_AGILIS_CRT.patchValue(false);
    this.CONFIRMER_DECLARATION_PERTE_AGILIS_CRT.patchValue(false);
    this.DELETE_DECLARATION_PERTE_AGILIS_CRT.patchValue(false);

  }
}));
this.subscription.push(this.DELETE_DECLARATION_PERTE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_AGILIS_CRT.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DECLARATION_PERTE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_AGILIS_CRT.patchValue(true);
  }
}));
this.subscription.push(this.ADD_DECLARATION_PERTE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_AGILIS_CRT.patchValue(true);
  }
}));

this.subscription.push(this.CONFIRMER_DECLARATION_PERTE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_AGILIS_CRT.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_HISTORIQUE_PERTE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (!value) {
    
    this.DELETE_HISTORIQUE_PERTE_AGILIS_CRT.patchValue(false);
    
  }
}));
this.subscription.push(this.DELETE_HISTORIQUE_PERTE_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_HISTORIQUE_PERTE_AGILIS_CRT.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_ANNULATION_AGILIS_CRT.valueChanges.subscribe(value => {
  if (!value) {
    
    this.ADD_ANNULATION_AGILIS_CRT.patchValue(false);
    this.MODIFY_ANNULATION_AGILIS_CRT.patchValue(false);
    this.DELETE_ANNULATION_AGILIS_CRT.patchValue(false);
    this.CONFIRMER_ANNULATION_AGILIS_CRT.patchValue(false);

  }
}));

this.subscription.push(this.ADD_ANNULATION_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ANNULATION_AGILIS_CRT.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_ANNULATION_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ANNULATION_AGILIS_CRT.patchValue(true);
  }
}));


this.subscription.push(this.DELETE_ANNULATION_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ANNULATION_AGILIS_CRT.patchValue(true);
  }
}));
this.subscription.push(this.CONFIRMER_ANNULATION_AGILIS_CRT.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ANNULATION_AGILIS_CRT.patchValue(true);
  }
}));

 /*END AGILIS*/

 //Ordre de mission

this.subscription.push(this.VIEW_ORDRE_MISSION_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.ADD_ORDRE_MISSION_CTRL.patchValue(false);
    this.MODIFY_ORDRE_MISSION_CTRL.patchValue(false);
    this.DELETE_ORDRE_MISSION_CTRL.patchValue(false);
    this.VEHICULE_ORDRE_MISSION_CTRL.patchValue(false);
    this.CONFIRMER_ORDRE_MISSION_CTRL.patchValue(false);

  }
}));
this.subscription.push(this.VEHICULE_ORDRE_MISSION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VEHICULE_ORDRE_MISSION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.CONFIRMER_ORDRE_MISSION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.CONFIRMER_ORDRE_MISSION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_ORDRE_MISSION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ORDRE_MISSION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_ORDRE_MISSION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ORDRE_MISSION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_ORDRE_MISSION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ORDRE_MISSION_CTRL.patchValue(true);
  }
}));


this.subscription.push(this.VIEW_VEHICULE_DEPASSANT_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.DETAILS_VEHICULE_DEPASSANT_CTRL.patchValue(false);
    this.DELETE_VEHICULE_DEPASSANT_CTRL.patchValue(false);
    this.VEHICULE_VEHICULE_DEPASSANT_CTRL.patchValue(false);
  }
}));
this.subscription.push(this.VEHICULE_VEHICULE_DEPASSANT_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VEHICULE_VEHICULE_DEPASSANT_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_VEHICULE_DEPASSANT_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_VEHICULE_DEPASSANT_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DETAILS_VEHICULE_DEPASSANT_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_VEHICULE_DEPASSANT_CTRL.patchValue(true);
  }
}));

 //Ordre de mission


 

 //Stock
 this.subscription.push(this.VIEW_Bon_Travail_Sortie_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    
    this.DETAILS_Bon_Travail_Sortie_CTRL .patchValue(false);  
  }
}));
this.subscription.push(this.DETAILS_Bon_Travail_Sortie_CTRL .valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Bon_Travail_Sortie_CTRL .patchValue(true);
  }
}));
this.subscription.push(this.VIEW_Bon_Transfert_vers_magasin_CTRL .valueChanges.subscribe(value => {
  if (!value) {
    
    this.CONFIRM_Bon_Transfert_vers_magasin_CTRL .patchValue(false);
    this.VALIDER_Bon_Transfert_vers_magasin_CTRL .patchValue(false);
    this.MODIFY_Bon_Transfert_vers_magasin_CTRL .patchValue(false);
    this.DELETE_Bon_Transfert_vers_magasin_CTRL  .patchValue(false);
    this.ADD_Bon_Transfert_vers_magasin_CTRL  .patchValue(false);
  }
}));
this.subscription.push(this.ADD_Bon_Transfert_vers_magasin_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Bon_Travail_Sortie_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.DELETE_Bon_Transfert_vers_magasin_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Bon_Travail_Sortie_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VALIDER_Bon_Transfert_vers_magasin_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Bon_Travail_Sortie_CTRL.patchValue(true);
  }
}

));
this.subscription.push(this.CONFIRM_Bon_Transfert_vers_magasin_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Bon_Travail_Sortie_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_Reception_Fournisseur_CTRL .valueChanges.subscribe(value => {
  if (!value) {
    
    this.DELETE_Reception_Fournisseur_CTRL .patchValue(false);
    this.DETAILS_Reception_Fournisseur_CTRL .patchValue(false);
    
  }
}));
this.subscription.push(this.DELETE_Reception_Fournisseur_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Reception_Fournisseur_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DETAILS_Reception_Fournisseur_CTRL .valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Reception_Fournisseur_CTRL .patchValue(true);
  }
}));
this.subscription.push(this.VIEW_Retour_Structure_CTRL .valueChanges.subscribe(value => {
  if (!value) {
    
    this.DETAILS_Retour_Structure_CTRL .patchValue(false);
    this.DELETE_Retour_Structure_CTRL .patchValue(false);
    this.ADD_Retour_Structure_CTRL .patchValue(false);
    
  }
}));

this.subscription.push(this.ADD_Retour_Structure_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Retour_Structure_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DETAILS_Retour_Structure_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Retour_Structure_CTRL.patchValue(true);
  }
}));


this.subscription.push(this.DELETE_Retour_Structure_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Retour_Structure_CTRL.patchValue(true);
  }
}));



this.subscription.push(this.VIEW_Inventaire_Stock_CTRL  .valueChanges.subscribe(value => {
  if (!value) {
    
    this.DETAILS_Inventaire_Stock_CTRL  .patchValue(false);
    this.DELETE_Inventaire_Stock_CTRL  .patchValue(false);
    this.ADD_Inventaire_Stock_CTRL  .patchValue(false);
    
  }
}));

this.subscription.push(this.ADD_Inventaire_Stock_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Inventaire_Stock_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_Inventaire_Stock_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Inventaire_Stock_CTRL.patchValue(true);
  }
}));


this.subscription.push(this.DETAILS_Inventaire_Stock_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Inventaire_Stock_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_Regulation_Stock_CTRL   .valueChanges.subscribe(value => {
  if (!value) {
    
    this.DETAILS_Regulation_Stock_CTRL   .patchValue(false);
    this.DELETE_Regulation_Stock_CTRL   .patchValue(false);
    this.ADD_Regulation_Stock_CTRL   .patchValue(false);
    
  }
}));

this.subscription.push(this.ADD_Regulation_Stock_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Regulation_Stock_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_Regulation_Stock_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Regulation_Stock_CTRL.patchValue(true);
  }
}));


this.subscription.push(this.DETAILS_Regulation_Stock_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_Regulation_Stock_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_HISTORIQUE_REGULATION_CTRL   .valueChanges.subscribe(value => {
  if (!value) {
    
    this.DELETE_HISTORIQUE_REGULATION_CTRL   .patchValue(false);

  }
}));

this.subscription.push(this.DELETE_HISTORIQUE_REGULATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_HISTORIQUE_REGULATION_CTRL.patchValue(true);
  }
}));

 /*END stock*/
 //ACHAT
 
 this.subscription.push(this.VIEW_BON_COMMANDE_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.ADD_BON_COMMANDE_CTRL.patchValue(false);
    this.MODIFY_BON_COMMANDE_CTRL.patchValue(false);
    this.DELETE_BON_COMMANDE_CTRL.patchValue(false);

  }
}));

this.subscription.push(this.ADD_BON_COMMANDE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_BON_COMMANDE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_BON_COMMANDE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_BON_COMMANDE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_BON_COMMANDE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_BON_COMMANDE_CTRL.patchValue(true);
  }
}));

 //ACHAT

 //EXPLOITATION
  
 this.subscription.push(this.VIEW_RESERVATION_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.ADD_RESERVATION_CTRL.patchValue(false);
    this.MODIFY_RESERVATION_CTRL.patchValue(false);
    this.DELETE_RESERVATION_CTRL.patchValue(false);
    this.VIEW_VEHICULE_RESERVATION_CTRL.patchValue(false);
    this.CONFIRMER_RESERVATION_CTRL.patchValue(false);

  }
}));
this.subscription.push(this.CONFIRMER_RESERVATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RESERVATION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VIEW_VEHICULE_RESERVATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RESERVATION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_RESERVATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RESERVATION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_RESERVATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RESERVATION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_RESERVATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RESERVATION_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_LOCATION_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.ADD_LOCATION_CTRL.patchValue(false);
    this.DELETE_LOCATION_CTRL.patchValue(false);
    this.MODIFY_LOCATION_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.MODIFY_LOCATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_LOCATION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_LOCATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_LOCATION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_LOCATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_LOCATION_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_SINISTRE_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.ADD_SINISTRE_CTRL.patchValue(false);
    this.MODIFY_SINISTRE_CTRL.patchValue(false);
    this.DELETE_SINISTRE_CTRL.patchValue(false);
    this.VIEW_VEHICULE_SINISTRE_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.VIEW_VEHICULE_SINISTRE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_SINISTRE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_SINISTRE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_SINISTRE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_SINISTRE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_SINISTRE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_SINISTRE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_SINISTRE_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_EMPRUNT_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.ADD_EMPRUNT_CTRL.patchValue(false);
    this.MODIFY_EMPRUNT_CTRL.patchValue(false);
    this.DELETE_EMPRUNT_CTRL.patchValue(false);
    this.VIEW_VEHICULE_EMPRUNT_CTRL.patchValue(false);
    this.CONFIRMER_EMPRUNT_CTRL.patchValue(false);
  }
}));
this.subscription.push(this.VIEW_VEHICULE_EMPRUNT_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.CONFIRMER_EMPRUNT_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VIEW_VEHICULE_EMPRUNT_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_EMPRUNT_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_EMPRUNT_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_EMPRUNT_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_EMPRUNT_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_EMPRUNT_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_EMPRUNT_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_EMPRUNT_CTRL.patchValue(true);
  }
}));
 //EXPLOITATION


 

//CARBURANT : CARTE PLAFOND

 this.subscription.push(this.VIEW_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.MODIFY_CARTE_PLAFOND_CTRL.patchValue(false);
    this.DELETE_CARTE_PLAFOND_CTRL.patchValue(false);
    this.ADD_CARTE_PLAFOND_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.MODIFY_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.DELETE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(false);
    this.ADD_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(false);
    this.CONFIRM_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(false);
    this.VALIDATION_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(false);
    this.VEHICULE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(false);

  }
}));
this.subscription.push(this.VEHICULE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.CONFIRM_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VALIDATION_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.DELETE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(false);
    this.VEHICULE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.DELETE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VEHICULE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.MODIFY_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(false);
    this.DELETE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(false);
    this.ADD_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(false);
    this.CONFIRMATION_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(false);

  }
}));

this.subscription.push(this.MODIFY_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.CONFIRMATION_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.ADD_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.ADD_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(false);
    this.DELETE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(false);
    this.CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(false);

  }
}));


this.subscription.push(this.MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));


this.subscription.push(this.VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.DELETE_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.DELETE_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true);
  }
}));

 //CARBURANT : CARTE PLAFOND

//CARBURANT : CARTE JOCKER

this.subscription.push(this.VIEW_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.MODIFY_CARTE_JOCKER_CTRL.patchValue(false);
    this.DELETE_CARTE_JOCKER_CTRL.patchValue(false);
    this.ADD_CARTE_JOCKER_CTRL.patchValue(false);

  }
}));

this.subscription.push(this.MODIFY_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.CONFIRMATION_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(false);
    this.VALIDATION_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(false);
    this.MODIFY_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(false);
    this.ADD_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(false);
    this.VEHICULE_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(false);
    this.DELETE_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(false);

  }
}));


this.subscription.push(this.CONFIRMATION_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VALIDATION_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VEHICULE_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.CONFIRMATION_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(false);
    this.MODIFY_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(false);
    this.DELETE_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(false);
    this.ADD_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(false);

  }
}));

this.subscription.push(this.ADD_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.CONFIRMATION_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_DECLARATION_PERTE_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.CONFIRMATION_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(false);
    this.MODIFY_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(false);
    this.DELETE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(false);
    this.ADD_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(false);

  }
}));

this.subscription.push(this.CONFIRMATION_DECLARATION_PERTE_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DECLARATION_PERTE_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_DECLARATION_PERTE_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(false);
  }
}));


this.subscription.push(this.DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.CONFIRMATION_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(false);
    this.VALIDATION_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(false);
    this.ADD_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(false);
    this.MODIFY_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(false);
    this.DELETE_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(false);

  }
}));


this.subscription.push(this.CONFIRMATION_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VALIDATION_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true);
  }
}));
//CARBURANT : CARTE JOCKER

// CARBURANT : Distribution de carburant

this.subscription.push(this.VIEW_DISTRIBUTION_CARBURANT_FONCTION_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.VEHICULE_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(false);
    this.DELETE_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(false);
    this.MODIFY_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(false);
    this.ADD_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.VEHICULE_DISTRIBUTION_CARBURANT_FONCTION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DISTRIBUTION_CARBURANT_FONCTION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DISTRIBUTION_CARBURANT_FONCTION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_DISTRIBUTION_CARBURANT_FONCTION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.DELETE_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.patchValue(false);
    this.MODIFY_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.patchValue(false);
    this.ADD_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.DELETE_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_DESTRIBUTION_CARBURANT_SERVICE_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.VEHICULE_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(false);
    this.DELETE_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(false);
    this.MODIFY_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(false);
    this.ADD_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.VEHICULE_DESTRIBUTION_CARBURANT_SERVICE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DESTRIBUTION_CARBURANT_SERVICE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DESTRIBUTION_CARBURANT_SERVICE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_DESTRIBUTION_CARBURANT_SERVICE_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.VEHICULE_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(false);
    this.DELETE_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(false);
    this.MODIFY_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(false);
    this.ADD_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.VEHICULE_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_TRANSFERT_PARC_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.DETAIL_TRANSFERT_PARC_CTRL.patchValue(false);
    this.ADD_TRANSFERT_PARC_CTRL.patchValue(false);
  }
}));

this.subscription.push(this.DETAIL_TRANSFERT_PARC_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_TRANSFERT_PARC_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_TRANSFERT_PARC_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_TRANSFERT_PARC_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_RETOUR_CARBURANT_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.ADD_RETOUR_CARBURANT_CTRL.patchValue(false);

  }
}));

this.subscription.push(this.ADD_RETOUR_CARBURANT_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_RETOUR_CARBURANT_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_ETAT_MENSUEL_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.CONFIRMER_ETAT_MENSUEL_CTRL.patchValue(false);
    this.VEHICULE_ETAT_MENSUEL_CTRL.patchValue(false);
    this.VALIDER_ETAT_MENSUEL_CTRL.patchValue(false);
    this.MODIFY_ETAT_MENSUEL_CTRL.patchValue(false);
    this.ADD_ETAT_MENSUEL_CTRL.patchValue(false);

  }
}));

this.subscription.push(this.CONFIRMER_ETAT_MENSUEL_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ETAT_MENSUEL_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VEHICULE_ETAT_MENSUEL_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ETAT_MENSUEL_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.VALIDER_ETAT_MENSUEL_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ETAT_MENSUEL_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.DELETE_ETAT_MENSUEL_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ETAT_MENSUEL_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.MODIFY_ETAT_MENSUEL_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ETAT_MENSUEL_CTRL.patchValue(true);
  }
}));
this.subscription.push(this.ADD_ETAT_MENSUEL_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_ETAT_MENSUEL_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_BON_CARBURANT_BON_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.ADD_BON_CARBURANT_BON_CTRL.patchValue(false);
  }
}));


this.subscription.push(this.ADD_BON_CARBURANT_BON_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_BON_CARBURANT_BON_CTRL.patchValue(true);
  }
}));

this.subscription.push(this.VIEW_SUIVI_CTRL.valueChanges.subscribe(value => {
  if (!value) {
    this.ADD_SUIVI_CTRL.patchValue(false);
  }
}));


this.subscription.push(this.ADD_SUIVI_CTRL.valueChanges.subscribe(value => {
  if (value) {
    this.VIEW_SUIVI_CTRL.patchValue(true);
  }
}));


// CARBURANT : Distribution de carburant
      }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.patchFinalValues();
    this.dialogRef.close(this.ListAuthorities);
  }

  displayModuleAuthorities(i: number) {
    this.codeAuthorities = i;
  }

  addSelectedAuthorityToList(authority: string) {
    if (!this.ListAuthorities.includes(authority)) {
      this.ListAuthorities.push(authority);
    }
  }

  deleteSelectedAuthorityToList(authority: string) {
    if (this.ListAuthorities.includes(authority)) {
      this.ListAuthorities.splice(this.ListAuthorities.indexOf(authority), 1);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

  patchInitialValues() {

    if (this.ListAuthorities.includes('VIEW_ALERT_VEHICULE')) {
      this.VIEW_ALERT_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_ALERT_STOCK')) {
      this.VIEW_ALERT_STOCK_CTRL.patchValue(true);
    }
    
   
if (this.ListAuthorities.includes('REOUVRIR_SORTIE_VEHICULE')) {
      this.REOUVRIR_SORTIE_VEHICULE_CTRL.patchValue(true);
    }
if (this.ListAuthorities.includes('ANNULATION_DEMANDE_INTERVENTION')) {
      this.ANNULATION_DEMANDE_INTERVENTION_CTRL.patchValue(true);
    }
if (this.ListAuthorities.includes('VEHICULE_DEMANDE_INTERVENTION')) {
      this.VEHICULE_DEMANDE_INTERVENTION_CTRL.patchValue(true);
    }
if (this.ListAuthorities.includes('RECU_DEMANDE_INTERVENTION')) {
      this.RECU_DEMANDE_INTERVENTION_CTRL.patchValue(true);
    }    
    if (this.ListAuthorities.includes('VIEW_TRANSFERT_PARC_VERS_MAGASIN')) {
      this.ADD_TRANSFERT_PARC_VERS_MAGASIN_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_TRANSFERT_PARC_VERS_MAGASIN')) {
      this.CONFIRM_TRANSFERT_PARC_VERS_MAGASIN_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_TRANSFERT_PARC_VERS_MAGASIN')) {
      this.VALID_TRANSFERT_PARC_VERS_MAGASIN_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_TRANSFERT_PARC_VERS_MAGASIN')) {
      this.VIEW_TRANSFERT_PARC_VERS_MAGASIN_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_TRANSFERT_PARC_VERS_MAGASIN')) {
      this.MODIFY_TRANSFERT_PARC_VERS_MAGASIN_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_TRANSFERT_PARC_VERS_MAGASIN')) {
      this.DELETE_TRANSFERT_PARC_VERS_MAGASIN_CTRL.patchValue(true);
    }
   


    if (this.ListAuthorities.includes('VIEW_RECHARGE_QUOTA_MENSUEL')) {
      this.ADD_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_RECHARGE_QUOTA_MENSUEL')) {
      this.CONFIRM_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_RECHARGE_QUOTA_MENSUEL')) {
      this.VALID_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_RECHARGE_QUOTA_MENSUEL')) {
      this.VIEW_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL')) {
      this.VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL_CTRL.patchValue(true);
    }

if (this.ListAuthorities.includes('VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE')) {
  this.VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('DELETE_RECHARGE_COMPLEMENTAIRE')) {
  this.DELETE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('MODIFY_DEMANDE_RECHARGE_COMPLEMENTAIRE')) {
  this.MODIFY_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('ADD_DEMANDE_RECHARGE_COMPLEMENTAIRE')) {
  this.ADD_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('VALIDATION_DEMANDE_RECHARGE_COMPLEMENTAIRE')) {
  this.VALIDATION_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('CONFIRMATION_DEMANDE_RECHARGE_COMPLEMENTAIRE')) {
  this.CONFIRMATION_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.patchValue(true);
}

if (this.ListAuthorities.includes('VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION')) {
  this.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('DELETE_RECHARGE_CARBURANT_COMPENSATION')) {
  this.DELETE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('MODIFY_DEMANDE_RECHARGE_CARBURANT_COMPENSATION')) {
  this.MODIFY_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('ADD_DEMANDE_RECHARGE_CARBURANT_COMPENSATION')) {
  this.ADD_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('VALIDATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION')) {
  this.VALIDATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('CONFIRMATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION')) {
  this.CONFIRMATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.patchValue(true);
}
    if (this.ListAuthorities.includes('VIEW_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE')) {
      this.VIEW_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL .patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE')) {
      this.DELETE_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL .patchValue(true);
    }

    if (this.ListAuthorities.includes('VIEW_SOUS_FAMILLES_ARTICLES')) {
      this.VIEW_SOUS_FAMILLES_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_SOUS_FAMILLES_ARTICLES')) {
      this.ADD_SOUS_FAMILLES_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_SOUS_FAMILLES_ARTICLES')) {
      this.MODIFY_SOUS_FAMILLES_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_SOUS_FAMILLES_ARTICLES')) {
      this.DELETE_SOUS_FAMILLES_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_FAMILLES_ARTICLES')) {
      this.VIEW_FAMILLES_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_FAMILLES_ARTICLES')) {
      this.ADD_FAMILLES_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_FAMILLES_ARTICLES')) {
      this.MODIFY_FAMILLES_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_FAMILLES_ARTICLES')) {
      this.DELETE_FAMILLES_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_ARTICLES')) {
      this.VIEW_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_ARTICLES')) {
      this.ADD_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_ARTICLES')) {
      this.MODIFY_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_ARTICLES')) {
      this.DELETE_ARTICLES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_GOUVERNORATS')) {
      this.VIEW_GOUVERNORATS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_GOUVERNORATS')) {
      this.ADD_GOUVERNORATS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_GOUVERNORATS')) {
      this.MODIFY_GOUVERNORATS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_GOUVERNORATS')) {
      this.DELETE_GOUVERNORATS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_STATIONS_PEAGE')) {
      this.VIEW_STATIONS_PEAGE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_STATIONS_PEAGE')) {
      this.ADD_STATIONS_PEAGE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_STATIONS_PEAGE')) {
      this.MODIFY_STATIONS_PEAGE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_STATIONS_PEAGE')) {
      this.DELETE_STATIONS_PEAGE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_EXPERTS')) {
      this.VIEW_EXPERTS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_EXPERTS')) {
      this.ADD_EXPERTS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_EXPERTS')) {
      this.MODIFY_EXPERTS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_EXPERTS')) {
      this.DELETE_EXPERTS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_FOURNISSEURS')) {
      this.VIEW_FOURNISSEURS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_FOURNISSEURS')) {
      this.ADD_FOURNISSEURS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_FOURNISSEURS')) {
      this.MODIFY_FOURNISSEURS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_FOURNISSEURS')) {
      this.DELETE_FOURNISSEURS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_LIEUX_PARKING')) {
      this.VIEW_LIEUX_PARKING_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_LIEUX_PARKING')) {
      this.ADD_LIEUX_PARKING_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_LIEUX_PARKING')) {
      this.MODIFY_LIEUX_PARKING_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_LIEUX_PARKING')) {
      this.DELETE_LIEUX_PARKING_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_FAMILLES_OPERATIONS_REPARATION')) {
      this.VIEW_FAMILLES_OPERATIONS_REPARATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_FAMILLES_OPERATIONS_REPARATION')) {
      this.ADD_FAMILLES_OPERATIONS_REPARATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_FAMILLES_OPERATIONS_REPARATION')) {
      this.MODIFY_FAMILLES_OPERATIONS_REPARATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_FAMILLES_OPERATIONS_REPARATION')) {
      this.DELETE_FAMILLES_OPERATIONS_REPARATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_OPERATIONS_REPARATION')) {
      this.VIEW_OPERATIONS_REPARATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_OPERATIONS_REPARATION')) {
      this.ADD_OPERATIONS_REPARATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_OPERATIONS_REPARATION')) {
      this.MODIFY_OPERATIONS_REPARATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_OPERATIONS_REPARATION')) {
      this.DELETE_OPERATIONS_REPARATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS')) {
      this.VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_PROGRAMMES_ENTRETIENS_PREVENTIFS')) {
      this.ADD_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS')) {
      this.MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS')) {
      this.DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_ANNEES')) {
      this.VIEW_ANNEES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_ANNEES')) {
      this.ADD_ANNEES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_ANNEES')) {
      this.DELETE_ANNEES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_ENERGIES')) {
      this.VIEW_ENERGIES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_ENERGIES')) {
      this.ADD_ENERGIES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_ENERGIES')) {
      this.MODIFY_ENERGIES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_ENERGIES')) {
      this.DELETE_ENERGIES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_TVA')) {
      this.VIEW_TVA_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_TVA')) {
      this.ADD_TVA_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_TVA')) {
      this.MODIFY_TVA_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_TVA')) {
      this.DELETE_TVA_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_UNITES')) {
      this.VIEW_UNITES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_UNITES')) {
      this.ADD_UNITES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_UNITES')) {
      this.DELETE_UNITES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_EXPLOITATIONS_VEHICULES')) {
      this.VIEW_EXPLOITATIONS_VEHICULES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_EXPLOITATIONS_VEHICULES')) {
      this.ADD_EXPLOITATIONS_VEHICULES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_EXPLOITATIONS_VEHICULES')) {
      this.MODIFY_EXPLOITATIONS_VEHICULES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_EXPLOITATIONS_VEHICULES')) {
      this.DELETE_EXPLOITATIONS_VEHICULES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_GENRES_VEHICULE')) {
      this.VIEW_GENRES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_GENRES_VEHICULE')) {
      this.ADD_GENRES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_GENRES_VEHICULE')) {
      this.MODIFY_GENRES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_GENRES_VEHICULE')) {
      this.DELETE_GENRES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_MARQUES_VEHICULE')) {
      this.VIEW_MARQUES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_MARQUES_VEHICULE')) {
      this.ADD_MARQUES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_MARQUES_VEHICULE')) {
      this.MODIFY_MARQUES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_MARQUES_VEHICULE')) {
      this.DELETE_MARQUES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_TYPES_VEHICULE')) {
      this.VIEW_TYPES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_TYPES_VEHICULE')) {
      this.ADD_TYPES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_TYPES_VEHICULE')) {
      this.MODIFY_TYPES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_TYPES_VEHICULE')) {
      this.DELETE_TYPES_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_STRUCTURE_ADMINISTRATIVE')) {
      this.VIEW_STRUCTURE_ADMINISTRATIVE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_STRUCTURE_ADMINISTRATIVE')) {
      this.ADD_STRUCTURE_ADMINISTRATIVE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_STRUCTURE_ADMINISTRATIVE')) {
      this.MODIFY_STRUCTURE_ADMINISTRATIVE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_STRUCTURE_ADMINISTRATIVE')) {
      this.DELETE_STRUCTURE_ADMINISTRATIVE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_UNITE_GESTION_PARC')) {
      this.VIEW_UNITE_GESTION_PARC_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_UNITE_GESTION_PARC')) {
      this.ADD_UNITE_GESTION_PARC_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_UNITE_GESTION_PARC')) {
      this.MODIFY_UNITE_GESTION_PARC_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_UNITE_GESTION_PARC')) {
      this.DELETE_UNITE_GESTION_PARC_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_DETAILS_PERSONNELS')) {
      this.VIEW_DETAILS_PERSONNELS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_DETAILS_PERSONNELS')) {
      this.ADD_DETAILS_PERSONNELS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_DETAILS_PERSONNELS')) {
      this.MODIFY_DETAILS_PERSONNELS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_DETAILS_PERSONNELS')) {
      this.DELETE_DETAILS_PERSONNELS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_ETATS_STOCK')) {
      this.VIEW_ETATS_STOCK_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_ETATS_STOCK')) {
      this.ADD_ETATS_STOCK_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_ETATS_STOCK')) {
      this.MODIFY_ETATS_STOCK_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_ETATS_STOCK')) {
      this.DELETE_ETATS_STOCK_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_BENEFICIAIRES_EMPRUNTS')) {
      this.VIEW_BENEFICIAIRES_EMPRUNTS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_BENEFICIAIRES_EMPRUNTS')) {
      this.ADD_BENEFICIAIRES_EMPRUNTS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_BENEFICIAIRES_EMPRUNTS')) {
      this.MODIFY_BENEFICIAIRES_EMPRUNTS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_BENEFICIAIRES_EMPRUNTS')) {
      this.DELETE_BENEFICIAIRES_EMPRUNTS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_ALERTES')) {
      this.VIEW_ALERTES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_ALERTES')) {
      this.ADD_ALERTES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_ALERTES')) {
      this.MODIFY_ALERTES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_ALERTES')) {
      this.DELETE_ALERTES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_USERS')) {
      this.VIEW_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_USERS')) {
      this.ADD_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_USERS')) {
      this.MODIFY_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_USERS')) {
      this.DELETE_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ACTIVATE_USERS')) {
      this.ACTIVATE_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('LOCK_USERS')) {
      this.LOCK_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_PASSWORD_USERS')) {
      this.MODIFY_PASSWORD_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('RESET_PASSWORD_USERS')) {
      this.RESET_PASSWORD_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_GROUPES_USERS')) {
      this.VIEW_GROUPES_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_GROUPES_USERS')) {
      this.ADD_GROUPES_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_GROUPES_USERS')) {
      this.MODIFY_GROUPES_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_GROUPES_USERS')) {
      this.DELETE_GROUPES_USERS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_MESSAGES_APPLICATIFS')) {
      this.VIEW_MESSAGES_APPLICATIFS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_MESSAGES_APPLICATIFS')) {
      this.ADD_MESSAGES_APPLICATIFS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_MESSAGES_APPLICATIFS')) {
      this.MODIFY_MESSAGES_APPLICATIFS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_MESSAGES_APPLICATIFS')) {
      this.DELETE_MESSAGES_APPLICATIFS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_PARAMETRES_APPLICATION')) {
      this.VIEW_PARAMETRES_APPLICATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_PARAMETRES_APPLICATION')) {
      this.ADD_PARAMETRES_APPLICATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_PARAMETRES_APPLICATION')) {
      this.MODIFY_PARAMETRES_APPLICATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_TRACABILITES')) {
      this.VIEW_TRACABILITES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_TRACABILITES')) {
      this.DELETE_TRACABILITES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_USAGES_VEHICULES')) {
      this.VIEW_USAGES_VEHICULES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_USAGES_VEHICULES')) {
      this.ADD_USAGES_VEHICULES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_USAGES_VEHICULES')) {
      this.MODIFY_USAGES_VEHICULES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_USAGES_VEHICULES')) {
      this.DELETE_USAGES_VEHICULES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_CAUSES_SINISTRES')) {
      this.VIEW_CAUSES_SINISTRES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_CAUSES_SINISTRES')) {
      this.ADD_CAUSES_SINISTRES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_CAUSES_SINISTRES')) {
      this.MODIFY_CAUSES_SINISTRES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_CAUSES_SINISTRES')) {
      this.DELETE_CAUSES_SINISTRES_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_GPS')) {
      this.VIEW_GPS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_GPS')) {
      this.ADD_GPS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_GPS')) {
      this.MODIFY_GPS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_GPS')) {
      this.DELETE_GPS_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_VEHICULE')) {
      this.VIEW_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_VEHICULE')) {
      this.ADD_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_VEHICULE')) {
      this.MODIFY_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_VEHICULE')) {
      this.DELETE_VEHICULE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_TAXE_CIRCULATION')) {
      this.VIEW_TAXE_CIRCULATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_TAXE_CIRCULATION')) {
      this.ADD_TAXE_CIRCULATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_TAXE_CIRCULATION')) {
      this.MODIFY_TAXE_CIRCULATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_TAXE_CIRCULATION')) {
      this.DELETE_TAXE_CIRCULATION_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_ASSURANCE')) {
      this.VIEW_ASSURANCE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_ASSURANCE')) {
      this.ADD_ASSURANCE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_ASSURANCE')) {
      this.MODIFY_ASSURANCE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_ASSURANCE')) {
      this.DELETE_ASSURANCE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_VISITE_TECHNIQUE')) {
      this.VIEW_VISITE_TECHNIQUE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_VISITE_TECHNIQUE')) {
      this.ADD_VISITE_TECHNIQUE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_VISITE_TECHNIQUE')) {
      this.MODIFY_VISITE_TECHNIQUE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_VISITE_TECHNIQUE')) {
      this.DELETE_VISITE_TECHNIQUE_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_REFORME')) {
      this.VIEW_REFORME_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_REFORME')) {
      this.ADD_REFORME_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_REFORME')) {
      this.MODIFY_REFORME_CTRL.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_REFORME')) {
      this.DELETE_REFORME_CTRL.patchValue(true);
    }

  
    /*AGILIS*/
    if (this.ListAuthorities.includes('VIEW_AGILIS_CASH')) {
      this.VIEW_AGILIS_CASH_CRT.patchValue(true);
    }

    if (this.ListAuthorities.includes('ADD_AGILIS_CASH')) {
      this.ADD_AGILIS_CASH_CRT.patchValue(true);
    }

    if (this.ListAuthorities.includes('MODIFY_AGILIS_CASH')) {
      this.MODIFY_AGILIS_CASH_CRT.patchValue(true);
    }

    if (this.ListAuthorities.includes('DELETE_AGILIS_CASH')) {
      this.DELETE_AGILIS_CASH_CRT.patchValue(true);
    }

    if (this.ListAuthorities.includes('CONFIRMER_RECHARGE_AGILIS')) {
      this.CONFIRMER_RECHARGE_AGILIS_CRT.patchValue(true);
    }

    if (this.ListAuthorities.includes('VALIDER_RECHARGE_AGILIS')) {
      this.VALIDER_RECHARGE_AGILIS_CRT.patchValue(true);
    }


    if (this.ListAuthorities.includes('VEHICULE_AGILIS_CASH')) {
      this.VEHICULE_AGILIS_CASH_CRT.patchValue(true);
    }

    if (this.ListAuthorities.includes('VIEW_RECHARGE_AGILIS')) {
      this.VIEW_RECHARGE_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_RECHARGE_AGILIS')) {
      this.ADD_RECHARGE_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_RECHARGE_AGILIS')) {
      this.MODIFY_RECHARGE_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_RECHARGE_AGILIS')) {
      this.DELETE_RECHARGE_AGILIS_CRT.patchValue(true);
    }

    if (this.ListAuthorities.includes('VEHICULE_RECHARGE_AGILIS')) {
      this.VEHICULE_RECHARGE_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_DECLARATION_PERTE_AGILIS')) {
      this.VIEW_DECLARATION_PERTE_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_DECLARATION_PERTE_AGILIS')) {
      this.DELETE_DECLARATION_PERTE_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_DECLARATION_PERTE_AGILIS')) {
      this.MODIFY_DECLARATION_PERTE_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_DECLARATION_PERTE_AGILIS')) {
      this.ADD_DECLARATION_PERTE_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('CONFIRMER_DECLARATION_PERTE_AGILIS')) {
      this.CONFIRMER_DECLARATION_PERTE_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('VIEW_HISTORIQUE_PERTE_AGILIS')) {
      this.VIEW_HISTORIQUE_PERTE_AGILIS_CRT.patchValue(true);
    }

    if (this.ListAuthorities.includes('DELETE_HISTORIQUE_PERTE_AGILIS')) {
      this.DELETE_HISTORIQUE_PERTE_AGILIS_CRT.patchValue(true);
    }

    if (this.ListAuthorities.includes('VIEW_ANNULATION_AGILIS')) {
      this.VIEW_ANNULATION_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('ADD_ANNULATION_AGILIS')) {
      this.ADD_ANNULATION_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('MODIFY_ANNULATION_AGILIS')) {
      this.MODIFY_ANNULATION_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('DELETE_ANNULATION_AGILIS')) {
      this.DELETE_ANNULATION_AGILIS_CRT.patchValue(true);
    }
    if (this.ListAuthorities.includes('CONFIRMER_ANNULATION_AGILIS')) {
      this.CONFIRMER_ANNULATION_AGILIS_CRT.patchValue(true);
    }
    /*END AGILIS*/

   

//Ordre de mission
if (this.ListAuthorities.includes('ADD_ORDRE_MISSION')) {
  this.ADD_ORDRE_MISSION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('VIEW_ORDRE_MISSION')) {
  this.VIEW_ORDRE_MISSION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('MODIFY_ORDRE_MISSION')) {
  this.MODIFY_ORDRE_MISSION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('DELETE_ORDRE_MISSION')) {
  this.DELETE_ORDRE_MISSION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('VIEW_VEHICULE_DEPASSANT')) {
  this.VIEW_VEHICULE_DEPASSANT_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('DETAILS_VEHICULE_DEPASSANT')) {
  this.DETAILS_VEHICULE_DEPASSANT_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('DELETE_VEHICULE_DEPASSANT')) {
  this.DELETE_VEHICULE_DEPASSANT_CTRL.patchValue(true);
}

if (this.ListAuthorities.includes('VEHICULE_ORDRE_MISSION')) {
  this.VEHICULE_ORDRE_MISSION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('CONFIRMER_ORDRE_MISSION')) {
  this.CONFIRMER_ORDRE_MISSION_CTRL.patchValue(true);
}
if (this.ListAuthorities.includes('VEHICULE_VEHICULE_DEPASSANT')) {
  this.VEHICULE_VEHICULE_DEPASSANT_CTRL.patchValue(true);
}

//Ordre de mission
//ACHAT
if ( this.ListAuthorities.includes('VIEW_BON_COMMANDE')) {
  this.VIEW_BON_COMMANDE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_BON_COMMANDE')) {
  this.ADD_BON_COMMANDE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_BON_COMMANDE')) {
  this.MODIFY_BON_COMMANDE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_BON_COMMANDE')) {
  this.DELETE_BON_COMMANDE_CTRL.patchValue(true) ;
}
//ACHAT

//EXPLOITATION

if ( this.ListAuthorities.includes('VIEW_RESERVATION')) {
  this.VIEW_RESERVATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_RESERVATION')) {
  this.ADD_RESERVATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_RESERVATION')) {
  this.MODIFY_RESERVATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_RESERVATION')) {
  this.DELETE_RESERVATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('CONFIRMER_RESERVATION')) {
  this.CONFIRMER_RESERVATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_RESERVATION')) {
  this.MODIFY_RESERVATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_VEHICULE_RESERVATION')) {
  this.VIEW_VEHICULE_RESERVATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_LOCATION')) {
  this.DELETE_LOCATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_LOCATION')) {
  this.ADD_LOCATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_LOCATION')) {
  this.MODIFY_LOCATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_LOCATION')) {
  this.VIEW_LOCATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_SINISTRE')) {
  this.VIEW_SINISTRE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_SINISTRE')) {
  this.ADD_SINISTRE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_SINISTRE')) {
  this.MODIFY_SINISTRE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_SINISTRE')) {
  this.DELETE_SINISTRE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_VEHICULE_SINISTRE')) {
  this.VIEW_VEHICULE_SINISTRE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_EMPRUNT')) {
  this.VIEW_EMPRUNT_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_EMPRUNT')) {
  this.MODIFY_EMPRUNT_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_EMPRUNT')) {
  this.DELETE_EMPRUNT_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_VEHICULE_EMPRUNT')) {
  this.VIEW_VEHICULE_EMPRUNT_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_EMPRUNT')) {
  this.ADD_EMPRUNT_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('CONFIRMER_EMPRUNT')) {
  this.CONFIRMER_EMPRUNT_CTRL.patchValue(true) ;
}

//EXPLOITATION
    //CARBURANT : CARTE PLAFOND

    if ( this.ListAuthorities.includes('DELETE_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND')) {
      this.DELETE_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND')) {
      this.VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND')) {
      this.CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('DELETE_DEMANDE_ANNULATION_CARTE_PLAFOND')) {
      this.DELETE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND')) {
      this.MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND')) {
      this.VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('ADD_DEMANDE_ANNULATION_CARTE_PLAFOND')) {
      this.ADD_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND')) {
      this.DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND')) {
      this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('CONFIRMATION_DECLARATION_PERTE_CARTE_PLAFOND')) {
      this.CONFIRMATION_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('ADD_DECLARATION_PERTE_CARTE_PLAFOND')) {
      this.ADD_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('DELETE_DECLARATION_PERTE_CARTE_PLAFOND')) {
      this.DELETE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('MODIFY_DECLARATION_PERTE_CARTE_PLAFOND')) {
      this.MODIFY_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('VIEW_DECLARATION_PERTE_CARTE_PLAFOND')) {
      this.VIEW_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('VEHICULE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND')) {
      this.VEHICULE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('DELETE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND')) {
      this.DELETE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND')) {
      this.VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('VALIDATION_DEMANDE_AFFECTATION_CARTE_PLAFOND')) {
      this.VALIDATION_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('CONFIRM_DEMANDE_AFFECTATION_CARTE_PLAFOND')) {
      this.CONFIRM_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('ADD_DEMANDE_AFFECTATION_CARTE_PLAFOND')) {
      this.ADD_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('DELETE_DEMANDE_AFFECTATION_CARTE_PLAFOND')) {
      this.DELETE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND')) {
      this.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('VEHICULE_DEMANDE_AFFECTATION_CARTE_PLAFOND')) {
      this.VEHICULE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('ADD_CARTE_PLAFOND')) {
      this.ADD_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('DELETE_CARTE_PLAFOND')) {
      this.DELETE_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('MODIFY_CARTE_PLAFOND')) {
      this.MODIFY_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    if ( this.ListAuthorities.includes('VIEW_CARTE_PLAFOND')) {
      this.VIEW_CARTE_PLAFOND_CTRL.patchValue(true) ;
    }
    
    //CARBURANT : CARTE PLAFOND
//stock:
if ( this.ListAuthorities.includes('VIEW_Bon_Travail_Sortie')) {
  this.VIEW_Bon_Travail_Sortie_CTRL .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DETAILS_Bon_Travail_Sortie')) {
  this.DETAILS_Bon_Travail_Sortie_CTRL .patchValue(true) ;
}
/*
if ( this.ListAuthorities.includes('VIEW_Bon_Transfert_vers_parc')) {
  this.VIEW_Bon_Transfert_vers_parc_CTRL .patchValue(true) ;
}
if ( this.ListAuthorities.includes('CONFIRM_Bon_Transfert_vers_parc')) {
  this.CONFIRM_Bon_Transfert_vers_parc_CTRL .patchValue(true) ;
}
if ( this.ListAuthorities.includes('VALIDER_Bon_Transfert_vers_parc')) {
  this.VALIDER_Bon_Transfert_vers_parc_CTRL .patchValue(true) ;
}

if ( this.ListAuthorities.includes('ADD_Bon_Transfert_vers_parc')) {
  this.ADD_Bon_Transfert_vers_parc_CTRL  .patchValue(true) ;
}

if ( this.ListAuthorities.includes('MODIFY_Bon_Transfert_vers_parc')) {
  this.MODIFY_Bon_Transfert_vers_parc_CTRL  .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_Bon_Transfert_vers_parc')) {
  this.DELETE_Bon_Transfert_vers_parc_CTRL  .patchValue(true) ;
}*/

if ( this.ListAuthorities.includes('ADD_Bon_Transfert_vers_magasin')) {
  this.ADD_Bon_Transfert_vers_magasin_CTRL  .patchValue(true) ;
}

if ( this.ListAuthorities.includes('MODIFY_Bon_Transfert_vers_magasin')) {
  this.MODIFY_Bon_Transfert_vers_magasin_CTRL  .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_Bon_Transfert_vers_magasin')) {
  this.DELETE_Bon_Transfert_vers_magasin_CTRL  .patchValue(true) ;
}

if ( this.ListAuthorities.includes('VIEW_Bon_Transfert_vers_magasin')) {
  this.VIEW_Bon_Transfert_vers_magasin_CTRL .patchValue(true) ;
}
if ( this.ListAuthorities.includes('CONFIRM_Bon_Transfert_vers_magasin')) {
  this.CONFIRM_Bon_Transfert_vers_magasin_CTRL .patchValue(true) ;
}
if ( this.ListAuthorities.includes('VALIDER_Bon_Transfert_vers_magasin')) {
  this.VALIDER_Bon_Transfert_vers_magasin_CTRL .patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_Inventaire_Stock')) {
  this.ADD_Inventaire_Stock_CTRL .patchValue(true) ;
}

if ( this.ListAuthorities.includes('ADD_Bon_Transfert_vers_magasin')) {
  this.ADD_Bon_Transfert_vers_magasin_CTRL  .patchValue(true) ;
}

if ( this.ListAuthorities.includes('MODIFY_Bon_Transfert_vers_magasin')) {
  this.MODIFY_Bon_Transfert_vers_magasin_CTRL  .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_Bon_Transfert_vers_magasin')) {
  this.DELETE_Bon_Transfert_vers_magasin_CTRL  .patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_Reception_Fournisseur')) {
  this.VIEW_Reception_Fournisseur_CTRL  .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_Reception_Fournisseur')) {
  this.DELETE_Reception_Fournisseur_CTRL  .patchValue(true) ;
}

if ( this.ListAuthorities.includes('DETAILS_Reception_Fournisseur')) {
  this.DETAILS_Reception_Fournisseur_CTRL   .patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_Retour_Structure')) {
  this.VIEW_Retour_Structure_CTRL   .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DETAILS_Retour_Structure')) {
  this.DETAILS_Retour_Structure_CTRL   .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_Retour_Structure')) {
  this.DELETE_Retour_Structure_CTRL   .patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_Retour_Structure')) {
  this.ADD_Retour_Structure_CTRL    .patchValue(true) ;
}



if ( this.ListAuthorities.includes('VIEW_Inventaire_Stock')) {
  this.VIEW_Inventaire_Stock_CTRL  .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DETAILS_Inventaire_Stock')) {
  this.DETAILS_Inventaire_Stock_CTRL  .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_Inventaire_Stock')) {
  this.DELETE_Inventaire_Stock_CTRL  .patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_Inventaire_Stock')) {
  this.VALIDER_Bon_Transfert_vers_magasin_CTRL .patchValue(true) ;
}


if ( this.ListAuthorities.includes('VIEW_Regulation_Stock')) {
  this.VIEW_Regulation_Stock_CTRL   .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DETAILS_Regulation_Stock')) {
  this.DETAILS_Regulation_Stock_CTRL   .patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_Regulation_Stock')) {
  this.DELETE_Regulation_Stock_CTRL   .patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_Regulation_Stock')) {
  this.ADD_Regulation_Stock_CTRL  .patchValue(true) ;
}

//CARBURANT : CARTE JOCKER

if ( this.ListAuthorities.includes('VIEW_CARTE_JOCKER')) {
  this.VIEW_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_CARTE_JOCKER')) {
  this.MODIFY_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_CARTE_JOCKER')) {
  this.DELETE_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_CARTE_JOCKER')) {
  this.ADD_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('CONFIRMATION_DEMANDE_AFFECTATION_CARTE_JOCKER')) {
  this.CONFIRMATION_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VALIDATION_DEMANDE_AFFECTATION_CARTE_JOCKER')) {
  this.VALIDATION_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER')) {
  this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_DEMANDE_AFFECTATION_CARTE_JOCKER')) {
  this.MODIFY_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_DEMANDE_AFFECTATION_CARTE_JOCKER')) {
  this.ADD_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VEHICULE_DEMANDE_AFFECTATION_CARTE_JOCKER')) {
  this.VEHICULE_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_DEMANDE_AFFECTATION_CARTE_JOCKER')) {
  this.DELETE_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('CONFIRMATION_DEMANDE_DESAFFECTATION_CARTE_JOCKER')) {
  this.CONFIRMATION_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER')) {
  this.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_DEMANDE_DESAFFECTATION_CARTE_JOCKER')) {
  this.MODIFY_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_DEMANDE_DESAFFECTATION_CARTE_JOCKER')) {
  this.ADD_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_DEMANDE_DESAFFECTATION_CARTE_JOCKER')) {
  this.DELETE_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_DECLARATION_PERTE_CARTE_JOCKER')) {
  this.ADD_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_DECLARATION_PERTE_CARTE_JOCKER')) {
  this.DELETE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_DECLARATION_PERTE_CARTE_JOCKER')) {
  this.MODIFY_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('CONFIRMATION_DECLARATION_PERTE_CARTE_JOCKER')) {
  this.CONFIRMATION_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_DECLARATION_PERTE_CARTE_JOCKER')) {
  this.VIEW_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER')) {
  this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER')) {
  this.DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('CONFIRMATION_DEMANDE_QUOTA_CARTE_JOCKER')) {
  this.CONFIRMATION_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VALIDATION_DEMANDE_QUOTA_CARTE_JOCKER')) {
  this.VALIDATION_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_DEMANDE_QUOTA_CARTE_JOCKER')) {
  this.ADD_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_DEMANDE_QUOTA_CARTE_JOCKER')) {
  this.MODIFY_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_DEMANDE_QUOTA_CARTE_JOCKER')) {
  this.DELETE_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_DEMANDE_QUOTA_CARTE_JOCKER')) {
  this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true) ;
}
//CARBURANT : CARTE JOCKER



//Maintenace:
if ( this.ListAuthorities.includes('MODIFY_DEMANDE_INTERVENTION')) {
  this.MODIFY_DEMANDE_INTERVENTION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_DEMANDE_INTERVENTION')) {
  this.DELETE_DEMANDE_INTERVENTION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_DEMANDE_INTERVENTION')) {
  this.VIEW_DEMANDE_INTERVENTION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_DEMANDE_INTERVENTION')) {
  this.ADD_DEMANDE_INTERVENTION_CTRL.patchValue(true) ;
}


if ( this.ListAuthorities.includes('DETAILS_BON_TRAVAIL')) {
  this.DETAILS_BON_TRAVAIL_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_BON_TRAVAIL')) {
  this.DELETE_BON_TRAVAIL_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_BON_TRAVAIL')) {
  this.VIEW_BON_TRAVAIL_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_BON_TRAVAIL')) {
  this.ADD_BON_TRAVAIL_CTRL.patchValue(true) ;
}


if ( this.ListAuthorities.includes('MODIFY_SORTIE_VEHICULE')) {
  this.MODIFY_SORTIE_VEHICULE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_SORTIE_VEHICULE')) {
  this.VIEW_SORTIE_VEHICULE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_HISTORIQUE_MAINTENANCE_VEHICULE')) {
  this.DELETE_HISTORIQUE_MAINTENANCE_VEHICULE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_HISTORIQUE_MAINTENANCE_VEHICULE')) {
  this.VIEW_HISTORIQUE_MAINTENANCE_VEHICULE_CTRL.patchValue(true) ;
}

//End Maintenance












// CARBURANT : Distribution de carburant
if ( this.ListAuthorities.includes('ADD_DISTRIBUTION_CARBURANT_FONCTION')) {
  this.ADD_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_DISTRIBUTION_CARBURANT_FONCTION')) {
  this.MODIFY_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_DISTRIBUTION_CARBURANT_FONCTION')) {
  this.DELETE_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_DISTRIBUTION_CARBURANT_FONCTION')) {
  this.VIEW_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VEHICULE_DISTRIBUTION_CARBURANT_FONCTION')) {
  this.VEHICULE_DISTRIBUTION_CARBURANT_FONCTION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_DEMANDE_QUOTA_CARTE_JOCKER')) {
  this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_DISTRIBUTION_CARBURANT_VEHICULE')) {
  this.ADD_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_DISTRIBUTION_CARBURANT_VEHICULE')) {
  this.MODIFY_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_DISTRIBUTION_CARBURANT_VEHICULE')) {
  this.DELETE_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_DISTRIBUTION_CARBURANT_VEHICULE')) {
  this.VIEW_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_DESTRIBUTION_CARBURANT_SERVICE')) {
  this.ADD_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_DESTRIBUTION_CARBURANT_SERVICE')) {
  this.MODIFY_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_DESTRIBUTION_CARBURANT_SERVICE')) {
  this.DELETE_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_DESTRIBUTION_CARBURANT_SERVICE')) {
  this.VIEW_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VEHICULE_DESTRIBUTION_CARBURANT_SERVICE')) {
  this.VEHICULE_DESTRIBUTION_CARBURANT_SERVICE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_DESTRIBUTION_CARBURANT_COMPENSATION')) {
  this.ADD_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_DESTRIBUTION_CARBURANT_COMPENSATION')) {
  this.MODIFY_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_DESTRIBUTION_CARBURANT_COMPENSATION')) {
  this.DELETE_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_DESTRIBUTION_CARBURANT_COMPENSATION')) {
  this.VIEW_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VEHICULE_DESTRIBUTION_CARBURANT_COMPENSATION')) {
  this.VEHICULE_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_TRANSFERT_PARC')) {
  this.ADD_TRANSFERT_PARC_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_TRANSFERT_PARC')) {
  this.VIEW_TRANSFERT_PARC_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DETAIL_TRANSFERT_PARC')) {
  this.DETAIL_TRANSFERT_PARC_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_RETOUR_CARBURANT')) {
  this.ADD_RETOUR_CARBURANT_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_RETOUR_CARBURANT')) {
  this.VIEW_RETOUR_CARBURANT_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_ETAT_MENSUEL')) {
  this.ADD_ETAT_MENSUEL_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('MODIFY_ETAT_MENSUEL')) {
  this.MODIFY_ETAT_MENSUEL_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_ETAT_MENSUEL')) {
  this.DELETE_ETAT_MENSUEL_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_ETAT_MENSUEL')) {
  this.VIEW_ETAT_MENSUEL_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VEHICULE_ETAT_MENSUEL')) {
  this.VEHICULE_ETAT_MENSUEL_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VALIDER_ETAT_MENSUEL')) {
  this.VALIDER_ETAT_MENSUEL_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('CONFIRMER_ETAT_MENSUEL')) {
  this.CONFIRMER_ETAT_MENSUEL_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_BON_CARBURANT_BON')) {
  this.ADD_BON_CARBURANT_BON_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_BON_CARBURANT_BON')) {
  this.VIEW_BON_CARBURANT_BON_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_SUIVI')) {
  this.ADD_SUIVI_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VIEW_SUIVI')) {
  this.VIEW_SUIVI_CTRL.patchValue(true) ;
}
// CARBURANT : Distribution de carburant


if ( this.ListAuthorities.includes('VIEW_DEMANDE_RECHARGE_SOUS_COMPTE')) {
  this.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('ADD_DEMANDE_RECHARGE_SOUS_COMPTE')) {
  this.ADD_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('VALID_DEMANDE_RECHARGE_SOUS_COMPTE')) {
  this.VALID_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE')) {
  this.CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_DEMANDE_RECHARGE_SOUS_COMPTE')) {
  this.DELETE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.patchValue(true) ;
}


if ( this.ListAuthorities.includes('VIEW_HISTORIQUE_REGULATION')) {
  this.VIEW_HISTORIQUE_REGULATION_CTRL.patchValue(true) ;
}
if ( this.ListAuthorities.includes('DELETE_HISTORIQUE_REGULATION')) {
  this.DELETE_HISTORIQUE_REGULATION_CTRL.patchValue(true) ;
}
  }




  patchFinalValues() {
    this.ListAuthorities = [];
  
    if (this.VIEW_ALERT_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"VIEW_ALERT_VEHICULE"');
    }
    if (this.VIEW_ALERT_STOCK_CTRL.value) {
      this.ListAuthorities.push('"VIEW_ALERT_STOCK"');
    }

if (this.RECU_DEMANDE_INTERVENTION_CTRL.value) {
      this.ListAuthorities.push('"RECU_DEMANDE_INTERVENTION"');
}
if (this.VEHICULE_DEMANDE_INTERVENTION_CTRL.value) {
      this.ListAuthorities.push('"VEHICULE_DEMANDE_INTERVENTION"');
}
if (this.ANNULATION_DEMANDE_INTERVENTION_CTRL.value) {
      this.ListAuthorities.push('"ANNULATION_DEMANDE_INTERVENTION"');
}
if (this.REOUVRIR_SORTIE_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"REOUVRIR_SORTIE_VEHICULE"');
}    
if (this.CONFIRMATION_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMATION_DEMANDE_RECHARGE_COMPLEMENTAIRE"');
}
if (this.VALIDATION_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.value) {
  this.ListAuthorities.push('"VALIDATION_DEMANDE_RECHARGE_COMPLEMENTAIRE"');
}
if (this.ADD_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.value) {
  this.ListAuthorities.push('"ADD_DEMANDE_RECHARGE_COMPLEMENTAIRE"');
}
if (this.MODIFY_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DEMANDE_RECHARGE_COMPLEMENTAIRE"');
}
if (this.DELETE_RECHARGE_COMPLEMENTAIRE_CTRL.value) {
  this.ListAuthorities.push('"DELETE_RECHARGE_COMPLEMENTAIRE"');
}
if (this.VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DEMANDE_RECHARGE_COMPLEMENTAIRE"');
}
if (this.CONFIRMATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION"');
}
if (this.VALIDATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"VALIDATION_DEMANDE_RECHARGE_CARBURANT_COMPENSATION"');
}
if (this.ADD_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"ADD_DEMANDE_RECHARGE_CARBURANT_COMPENSATION"');
}
if (this.MODIFY_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DEMANDE_RECHARGE_CARBURANT_COMPENSATION"');
}
if (this.DELETE_RECHARGE_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"DELETE_RECHARGE_CARBURANT_COMPENSATION"');
}
if (this.VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DEMANDE_RECHARGE_CARBURANT_COMPENSATION"');
}

if (this.CONFIRM_RECHARGE_QUOTA_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"CONFIRM_RECHARGE_QUOTA_MENSUEL"');
}
if (this.VALID_RECHARGE_QUOTA_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"VALID_RECHARGE_QUOTA_MENSUEL"');
}
if (this.ADD_RECHARGE_QUOTA_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"ADD_RECHARGE_QUOTA_MENSUEL"');
}
if (this.VIEW_RECHARGE_QUOTA_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"VIEW_RECHARGE_QUOTA_MENSUEL"');
}

if (this.VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL"');
}

    if (this.VIEW_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL .value) {
      this.ListAuthorities.push('"VIEW_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE"');
    }
    if (this.DELETE_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL .value) {
      this.ListAuthorities.push('"DELETE_HISTORIQUE_DEMANDE_RECHARGE_SOUS_COMPTE"');
    }


    if (this.VIEW_SOUS_FAMILLES_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"VIEW_SOUS_FAMILLES_ARTICLES"');
    }
    if (this.ADD_SOUS_FAMILLES_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"ADD_SOUS_FAMILLES_ARTICLES"');
    }
    if (this.MODIFY_SOUS_FAMILLES_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_SOUS_FAMILLES_ARTICLES"');
    }
    if (this.DELETE_SOUS_FAMILLES_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"DELETE_SOUS_FAMILLES_ARTICLES"');
    }
    if (this.VIEW_FAMILLES_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"VIEW_FAMILLES_ARTICLES"');
    }
    if (this.ADD_FAMILLES_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"ADD_FAMILLES_ARTICLES"');
    }
    if (this.MODIFY_FAMILLES_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_FAMILLES_ARTICLES"');
    }
    if (this.DELETE_FAMILLES_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"DELETE_FAMILLES_ARTICLES"');
    }
    if (this.VIEW_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"VIEW_ARTICLES"');
    }
    if (this.ADD_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"ADD_ARTICLES"');
    }
    if (this.MODIFY_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_ARTICLES"');
    }
    if (this.DELETE_ARTICLES_CTRL.value) {
      this.ListAuthorities.push('"DELETE_ARTICLES"');
    }
    if (this.VIEW_GOUVERNORATS_CTRL.value) {
      this.ListAuthorities.push('"VIEW_GOUVERNORATS"');
    }
    if (this.ADD_GOUVERNORATS_CTRL.value) {
      this.ListAuthorities.push('"ADD_GOUVERNORATS"');
    }
    if (this.MODIFY_GOUVERNORATS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_GOUVERNORATS"');
    }
    if (this.DELETE_GOUVERNORATS_CTRL.value) {
      this.ListAuthorities.push('"DELETE_GOUVERNORATS"');
    }
    if (this.VIEW_STATIONS_PEAGE_CTRL.value) {
      this.ListAuthorities.push('"VIEW_STATIONS_PEAGE"');
    }
    if (this.ADD_STATIONS_PEAGE_CTRL.value) {
      this.ListAuthorities.push('"ADD_STATIONS_PEAGE"');
    }
    if (this.MODIFY_STATIONS_PEAGE_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_STATIONS_PEAGE"');
    }
    if (this.DELETE_STATIONS_PEAGE_CTRL.value) {
      this.ListAuthorities.push('"DELETE_STATIONS_PEAGE"');
    }
    if (this.VIEW_EXPERTS_CTRL.value) {
      this.ListAuthorities.push('"VIEW_EXPERTS"');
    }
    if (this.ADD_EXPERTS_CTRL.value) {
      this.ListAuthorities.push('"ADD_EXPERTS"');
    }
    if (this.MODIFY_EXPERTS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_EXPERTS"');
    }
    if (this.DELETE_EXPERTS_CTRL.value) {
      this.ListAuthorities.push('"DELETE_EXPERTS"');
    }
    if (this.VIEW_FOURNISSEURS_CTRL.value) {
      this.ListAuthorities.push('"VIEW_FOURNISSEURS"');
    }
    if (this.ADD_FOURNISSEURS_CTRL.value) {
      this.ListAuthorities.push('"ADD_FOURNISSEURS"');
    }
    if (this.MODIFY_FOURNISSEURS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_FOURNISSEURS"');
    }
    if (this.DELETE_FOURNISSEURS_CTRL.value) {
      this.ListAuthorities.push('"DELETE_FOURNISSEURS"');
    }
    if (this.VIEW_LIEUX_PARKING_CTRL.value) {
      this.ListAuthorities.push('"VIEW_LIEUX_PARKING"');
    }
    if (this.ADD_LIEUX_PARKING_CTRL.value) {
      this.ListAuthorities.push('"ADD_LIEUX_PARKING"');
    }
    if (this.MODIFY_LIEUX_PARKING_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_LIEUX_PARKING"');
    }
    if (this.DELETE_LIEUX_PARKING_CTRL.value) {
      this.ListAuthorities.push('"DELETE_LIEUX_PARKING"');
    }
    if (this.VIEW_FAMILLES_OPERATIONS_REPARATION_CTRL.value) {
      this.ListAuthorities.push('"VIEW_FAMILLES_OPERATIONS_REPARATION"');
    }
    if (this.ADD_FAMILLES_OPERATIONS_REPARATION_CTRL.value) {
      this.ListAuthorities.push('"ADD_FAMILLES_OPERATIONS_REPARATION"');
    }
    if (this.MODIFY_FAMILLES_OPERATIONS_REPARATION_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_FAMILLES_OPERATIONS_REPARATION"');
    }
    if (this.DELETE_FAMILLES_OPERATIONS_REPARATION_CTRL.value) {
      this.ListAuthorities.push('"DELETE_FAMILLES_OPERATIONS_REPARATION"');
    }
    if (this.VIEW_OPERATIONS_REPARATION_CTRL.value) {
      this.ListAuthorities.push('"VIEW_OPERATIONS_REPARATION"');
    }
    if (this.ADD_OPERATIONS_REPARATION_CTRL.value) {
      this.ListAuthorities.push('"ADD_OPERATIONS_REPARATION"');
    }
    if (this.MODIFY_OPERATIONS_REPARATION_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_OPERATIONS_REPARATION"');
    }
    if (this.DELETE_OPERATIONS_REPARATION_CTRL.value) {
      this.ListAuthorities.push('"DELETE_OPERATIONS_REPARATION"');
    }
    if (this.VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.value) {
      this.ListAuthorities.push('"VIEW_PROGRAMMES_ENTRETIENS_PREVENTIFS"');
    }
    if (this.ADD_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.value) {
      this.ListAuthorities.push('"ADD_PROGRAMMES_ENTRETIENS_PREVENTIFS"');
    }
    if (this.MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_PROGRAMMES_ENTRETIENS_PREVENTIFS"');
    }
    if (this.DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS_CTRL.value) {
      this.ListAuthorities.push('"DELETE_PROGRAMMES_ENTRETIENS_PREVENTIFS"');
    }
    if (this.VIEW_ANNEES_CTRL.value) {
      this.ListAuthorities.push('"VIEW_ANNEES"');
    }
    if (this.ADD_ANNEES_CTRL.value) {
      this.ListAuthorities.push('"ADD_ANNEES"');
    }
    if (this.DELETE_ANNEES_CTRL.value) {
      this.ListAuthorities.push('"DELETE_ANNEES"');
    }
    if (this.VIEW_ENERGIES_CTRL.value) {
      this.ListAuthorities.push('"VIEW_ENERGIES"');
    }
    if (this.ADD_ENERGIES_CTRL.value) {
      this.ListAuthorities.push('"ADD_ENERGIES"');
    }
    if (this.MODIFY_ENERGIES_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_ENERGIES"');
    }
    if (this.DELETE_ENERGIES_CTRL.value) {
      this.ListAuthorities.push('"DELETE_ENERGIES"');
    }
    if (this.VIEW_TVA_CTRL.value) {
      this.ListAuthorities.push('"VIEW_TVA"');
    }
    if (this.ADD_TVA_CTRL.value) {
      this.ListAuthorities.push('"ADD_TVA"');
    }
    if (this.MODIFY_TVA_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_TVA"');
    }
    if (this.DELETE_TVA_CTRL.value) {
      this.ListAuthorities.push('"DELETE_TVA"');
    }
    if (this.VIEW_UNITES_CTRL.value) {
      this.ListAuthorities.push('"VIEW_UNITES"');
    }
    if (this.ADD_UNITES_CTRL.value) {
      this.ListAuthorities.push('"ADD_UNITES"');
    }
    if (this.DELETE_UNITES_CTRL.value) {
      this.ListAuthorities.push('"DELETE_UNITES"');
    }
    if (this.VIEW_GENRES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"VIEW_GENRES_VEHICULE"');
    }
    if (this.ADD_GENRES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"ADD_GENRES_VEHICULE"');
    }
    if (this.MODIFY_GENRES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_GENRES_VEHICULE"');
    }
    if (this.DELETE_GENRES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"DELETE_GENRES_VEHICULE"');
    }
    if (this.VIEW_USAGES_VEHICULES_CTRL.value) {
      this.ListAuthorities.push('"VIEW_USAGES_VEHICULES"');
    }
    if (this.ADD_USAGES_VEHICULES_CTRL.value) {
      this.ListAuthorities.push('"ADD_USAGES_VEHICULES"');
    }
    if (this.MODIFY_USAGES_VEHICULES_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_USAGES_VEHICULES"');
    }
    if (this.DELETE_USAGES_VEHICULES_CTRL.value) {
      this.ListAuthorities.push('"DELETE_USAGES_VEHICULES"');
    }
    if (this.VIEW_CAUSES_SINISTRES_CTRL.value) {
      this.ListAuthorities.push('"VIEW_CAUSES_SINISTRES"');
    }
    if (this.ADD_CAUSES_SINISTRES_CTRL.value) {
      this.ListAuthorities.push('"ADD_CAUSES_SINISTRES"');
    }
    if (this.MODIFY_CAUSES_SINISTRES_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_CAUSES_SINISTRES"');
    }
    if (this.DELETE_CAUSES_SINISTRES_CTRL.value) {
      this.ListAuthorities.push('"DELETE_CAUSES_SINISTRES"');
    }
    if (this.VIEW_MARQUES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"VIEW_MARQUES_VEHICULE"');
    }
    if (this.ADD_MARQUES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"ADD_MARQUES_VEHICULE"');
    }
    if (this.MODIFY_MARQUES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_MARQUES_VEHICULE"');
    }
    if (this.DELETE_MARQUES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"DELETE_MARQUES_VEHICULE"');
    }
    if (this.VIEW_TYPES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"VIEW_TYPES_VEHICULE"');
    }
    if (this.ADD_TYPES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"ADD_TYPES_VEHICULE"');
    }
    if (this.MODIFY_TYPES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_TYPES_VEHICULE"');
    }
    if (this.DELETE_TYPES_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"DELETE_TYPES_VEHICULE"');
    }
    if (this.VIEW_STRUCTURE_ADMINISTRATIVE_CTRL.value) {
      this.ListAuthorities.push('"VIEW_STRUCTURE_ADMINISTRATIVE"');
    }
    if (this.ADD_STRUCTURE_ADMINISTRATIVE_CTRL.value) {
      this.ListAuthorities.push('"ADD_STRUCTURE_ADMINISTRATIVE"');
    }
    if (this.MODIFY_STRUCTURE_ADMINISTRATIVE_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_STRUCTURE_ADMINISTRATIVE"');
    }
    if (this.DELETE_STRUCTURE_ADMINISTRATIVE_CTRL.value) {
      this.ListAuthorities.push('"DELETE_STRUCTURE_ADMINISTRATIVE"');
    }
    if (this.VIEW_UNITE_GESTION_PARC_CTRL.value) {
      this.ListAuthorities.push('"VIEW_UNITE_GESTION_PARC"');
    }
    if (this.ADD_UNITE_GESTION_PARC_CTRL.value) {
      this.ListAuthorities.push('"ADD_UNITE_GESTION_PARC"');
    }
    if (this.MODIFY_UNITE_GESTION_PARC_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_UNITE_GESTION_PARC"');
    }
    if (this.DELETE_UNITE_GESTION_PARC_CTRL.value) {
      this.ListAuthorities.push('"DELETE_UNITE_GESTION_PARC"');
    }
    if (this.VIEW_DETAILS_PERSONNELS_CTRL.value) {
      this.ListAuthorities.push('"VIEW_DETAILS_PERSONNELS"');
    }
    if (this.ADD_DETAILS_PERSONNELS_CTRL.value) {
      this.ListAuthorities.push('"ADD_DETAILS_PERSONNELS"');
    }
    if (this.MODIFY_DETAILS_PERSONNELS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_DETAILS_PERSONNELS"');
    }
    if (this.DELETE_DETAILS_PERSONNELS_CTRL.value) {
      this.ListAuthorities.push('"DELETE_DETAILS_PERSONNELS"');
    }
    if (this.VIEW_ETATS_STOCK_CTRL.value) {
      this.ListAuthorities.push('"VIEW_ETATS_STOCK"');
    }
    if (this.ADD_ETATS_STOCK_CTRL.value) {
      this.ListAuthorities.push('"ADD_ETATS_STOCK"');
    }
    if (this.MODIFY_ETATS_STOCK_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_ETATS_STOCK"');
    }
    if (this.DELETE_ETATS_STOCK_CTRL.value) {
      this.ListAuthorities.push('"DELETE_ETATS_STOCK"');
    }
    if (this.VIEW_BENEFICIAIRES_EMPRUNTS_CTRL.value) {
      this.ListAuthorities.push('"VIEW_BENEFICIAIRES_EMPRUNTS"');
    }
    if (this.ADD_BENEFICIAIRES_EMPRUNTS_CTRL.value) {
      this.ListAuthorities.push('"ADD_BENEFICIAIRES_EMPRUNTS"');
    }
    if (this.MODIFY_BENEFICIAIRES_EMPRUNTS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_BENEFICIAIRES_EMPRUNTS"');
    }
    if (this.DELETE_BENEFICIAIRES_EMPRUNTS_CTRL.value) {
      this.ListAuthorities.push('"DELETE_BENEFICIAIRES_EMPRUNTS"');
    }
    if (this.VIEW_ALERTES_CTRL.value) {
      this.ListAuthorities.push('"VIEW_ALERTES"');
    }
    if (this.ADD_ALERTES_CTRL.value) {
      this.ListAuthorities.push('"ADD_ALERTES"');
    }
    if (this.MODIFY_ALERTES_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_ALERTES"');
    }
    if (this.DELETE_ALERTES_CTRL.value) {
      this.ListAuthorities.push('"DELETE_ALERTES"');
    }
    if (this.VIEW_USERS_CTRL.value) {
      this.ListAuthorities.push('"VIEW_USERS');
    }
    if (this.ADD_USERS_CTRL.value) {
      this.ListAuthorities.push('"ADD_USERS"');
    }
    if (this.MODIFY_USERS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_USERS"');
    }
    if (this.DELETE_USERS_CTRL.value) {
      this.ListAuthorities.push('"DELETE_USERS"');
    }
    if (this.VIEW_GROUPES_USERS_CTRL.value) {
      this.ListAuthorities.push('"VIEW_GROUPES_USERS"');
    }
    if (this.ADD_GROUPES_USERS_CTRL.value) {
      this.ListAuthorities.push('"ADD_GROUPES_USERS"');
    }
    if (this.MODIFY_GROUPES_USERS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_GROUPES_USERS"');
    }
    if (this.DELETE_GROUPES_USERS_CTRL.value) {
      this.ListAuthorities.push('"DELETE_GROUPES_USERS"');
    }
    if (this.VIEW_MESSAGES_APPLICATIFS_CTRL.value) {
      this.ListAuthorities.push('"VIEW_MESSAGES_APPLICATIFS"');
    }
    if (this.ADD_MESSAGES_APPLICATIFS_CTRL.value) {
      this.ListAuthorities.push('"ADD_MESSAGES_APPLICATIFS"');
    }
    if (this.MODIFY_MESSAGES_APPLICATIFS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_MESSAGES_APPLICATIFS"');
    }
    if (this.DELETE_MESSAGES_APPLICATIFS_CTRL.value) {
      this.ListAuthorities.push('"DELETE_MESSAGES_APPLICATIFS"');
    }
    if (this.VIEW_PARAMETRES_APPLICATION_CTRL.value) {
      this.ListAuthorities.push('"VIEW_PARAMETRES_APPLICATION"');
    }
    if (this.ADD_PARAMETRES_APPLICATION_CTRL.value) {
      this.ListAuthorities.push('"ADD_PARAMETRES_APPLICATION"');
    }
    if (this.MODIFY_PARAMETRES_APPLICATION_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_PARAMETRES_APPLICATION"');
    }
    if (this.VIEW_TRACABILITES_CTRL.value) {
      this.ListAuthorities.push('"VIEW_TRACABILITES"');
    }
    if (this.DELETE_TRACABILITES_CTRL.value) {
      this.ListAuthorities.push('"DELETE_TRACABILITES"');
    }
    if (this.VIEW_GPS_CTRL.value) {
      this.ListAuthorities.push('"VIEW_GPS"');
    }
    if (this.ADD_GPS_CTRL.value) {
      this.ListAuthorities.push('"ADD_GPS"');
    }
    if (this.MODIFY_GPS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_GPS"');
    }
    if (this.DELETE_GPS_CTRL.value) {
      this.ListAuthorities.push('"DELETE_GPS"');
    }
    if (this.RESET_PASSWORD_USERS_CTRL.value) {
      this.ListAuthorities.push('"RESET_PASSWORD_USERS"');
    }
    if (this.MODIFY_PASSWORD_USERS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_PASSWORD_USERS"');
    }
    if (this.LOCK_USERS_CTRL.value) {
      this.ListAuthorities.push('"LOCK_USERS"');
    }
    if (this.ACTIVATE_USERS_CTRL.value) {
      this.ListAuthorities.push('"ACTIVATE_USERS"');
    }
    if (this.MODIFY_USERS_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_USERS"');
    }
    if (this.VIEW_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"VIEW_VEHICULE"');
    }
    if (this.ADD_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"ADD_VEHICULE"');
    }
    if (this.MODIFY_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_VEHICULE"');
    }
    if (this.DELETE_VEHICULE_CTRL.value) {
      this.ListAuthorities.push('"DELETE_VEHICULE"');
    }
    if (this.VIEW_TAXE_CIRCULATION_CTRL.value) {
      this.ListAuthorities.push('"VIEW_TAXE_CIRCULATION"');
    }
    if (this.ADD_TAXE_CIRCULATION_CTRL.value) {
      this.ListAuthorities.push('"ADD_TAXE_CIRCULATION"');
    }
    if (this.MODIFY_TAXE_CIRCULATION_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_TAXE_CIRCULATION"');
    }
    if (this.DELETE_TAXE_CIRCULATION_CTRL.value) {
      this.ListAuthorities.push('"DELETE_TAXE_CIRCULATION"');
    }
    if (this.VIEW_ASSURANCE_CTRL.value) {
      this.ListAuthorities.push('"VIEW_ASSURANCE"');
    }
    if (this.ADD_ASSURANCE_CTRL.value) {
      this.ListAuthorities.push('"ADD_ASSURANCE"');
    }
    if (this.MODIFY_ASSURANCE_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_ASSURANCE"');
    }
    if (this.DELETE_ASSURANCE_CTRL.value) {
      this.ListAuthorities.push('"DELETE_ASSURANCE"');
    }
    if (this.VIEW_VISITE_TECHNIQUE_CTRL.value) {
      this.ListAuthorities.push('"VIEW_VISITE_TECHNIQUE"');
    }
    if (this.ADD_VISITE_TECHNIQUE_CTRL.value) {
      this.ListAuthorities.push('"ADD_VISITE_TECHNIQUE"');
    }
    if (this.MODIFY_VISITE_TECHNIQUE_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_VISITE_TECHNIQUE"');
    }
    if (this.DELETE_VISITE_TECHNIQUE_CTRL.value) {
      this.ListAuthorities.push('"DELETE_VISITE_TECHNIQUE"');
    }
    if (this.VIEW_REFORME_CTRL.value) {
      this.ListAuthorities.push('"VIEW_REFORME"');
    }
    if (this.ADD_REFORME_CTRL.value) {
      this.ListAuthorities.push('"ADD_REFORME"');
    }
    if (this.MODIFY_REFORME_CTRL.value) {
      this.ListAuthorities.push('"MODIFY_REFORME"');
    }
    if (this.DELETE_REFORME_CTRL.value) {
      this.ListAuthorities.push('"DELETE_REFORME"');
    }
   
/* Exploitation*/ 
if (this.VIEW_RESERVATION_CTRL.value) {
    this.ListAuthorities.push('"VIEW_RESERVATION"');
} 
if (this.VIEW_VEHICULE_EMPRUNT_CTRL.value) {
    this.ListAuthorities.push('"VIEW_VEHICULE_EMPRUNT"');
}
if (this.DELETE_EMPRUNT_CTRL.value) {
    this.ListAuthorities.push('"DELETE_EMPRUNT"');
}
if (this.MODIFY_EMPRUNT_CTRL.value) {
    this.ListAuthorities.push('"MODIFY_EMPRUNT"');
} 
if (this.VIEW_EMPRUNT_CTRL.value) {
    this.ListAuthorities.push('"VIEW_EMPRUNT"');
} 
if (this.VIEW_VEHICULE_SINISTRE_CTRL.value) {
    this.ListAuthorities.push('"VIEW_VEHICULE_SINISTRE"');
}
if (this.DELETE_SINISTRE_CTRL.value) {
    this.ListAuthorities.push('"DELETE_SINISTRE"');
}
if (this.MODIFY_SINISTRE_CTRL.value) {
    this.ListAuthorities.push('"MODIFY_SINISTRE"');
}
if (this.ADD_SINISTRE_CTRL.value) {
    this.ListAuthorities.push('"ADD_SINISTRE"');
}
if (this.VIEW_SINISTRE_CTRL.value) {
    this.ListAuthorities.push('"VIEW_SINISTRE"');
} 
if (this.DELETE_LOCATION_CTRL.value) {
    this.ListAuthorities.push('"DELETE_LOCATION"');
}
if (this.MODIFY_LOCATION_CTRL.value) {
    this.ListAuthorities.push('"MODIFY_LOCATION"');
} 
if (this.ADD_LOCATION_CTRL.value) {
    this.ListAuthorities.push('"ADD_LOCATION"');
} 
if (this.DELETE_LOCATION_CTRL.value) {
    this.ListAuthorities.push('"VIEW_LOCATION"');
}
if (this.VIEW_VEHICULE_RESERVATION_CTRL.value) {
    this.ListAuthorities.push('"VIEW_VEHICULE_RESERVATION"');
} 
if (this.DELETE_RESERVATION_CTRL.value) {
    this.ListAuthorities.push('"DELETE_RESERVATION"');
}
if (this.MODIFY_RESERVATION_CTRL.value) {
    this.ListAuthorities.push('"MODIFY_RESERVATION"');
}
if (this.ADD_RESERVATION_CTRL.value) {
    this.ListAuthorities.push('"ADD_RESERVATION"');
}

/* Exploitation*/ 

/*agilis*/
if (this.VIEW_AGILIS_CASH_CRT.value) {
  this.ListAuthorities.push('"VIEW_AGILIS_CASH"');
}
if (this.ADD_AGILIS_CASH_CRT.value) {
  this.ListAuthorities.push('"ADD_AGILIS_CASH"');
}
if (this.MODIFY_AGILIS_CASH_CRT.value) {
  this.ListAuthorities.push('"MODIFY_AGILIS_CASH"');
}
if (this.DELETE_AGILIS_CASH_CRT.value) {
  this.ListAuthorities.push('"DELETE_AGILIS_CASH"');
}
if (this.VEHICULE_AGILIS_CASH_CRT.value) {
  this.ListAuthorities.push('"VEHICULE_AGILIS_CASH"');
}
if (this.VIEW_RECHARGE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"VIEW_RECHARGE_AGILIS"');
}
if (this.ADD_RECHARGE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"ADD_RECHARGE_AGILIS"');
}
if (this.MODIFY_RECHARGE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"MODIFY_RECHARGE_AGILIS"');
}
if (this.DELETE_RECHARGE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"DELETE_RECHARGE_AGILIS"');
}
if (this.VEHICULE_RECHARGE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"VEHICULE_RECHARGE_AGILIS"');
}
if (this.VIEW_DECLARATION_PERTE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"VIEW_DECLARATION_PERTE_AGILIS"');
}
if (this.DELETE_DECLARATION_PERTE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"DELETE_DECLARATION_PERTE_AGILIS');
}

 if (this.ListAuthorities.includes('CONFIRMER_RECHARGE_AGILIS')) {
      this.CONFIRMER_RECHARGE_AGILIS_CRT.patchValue(true);
    }

    if (this.ListAuthorities.includes('VALIDER_RECHARGE_AGILIS')) {
      this.VALIDER_RECHARGE_AGILIS_CRT.patchValue(true);
    }


if (this.MODIFY_DECLARATION_PERTE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"MODIFY_DECLARATION_PERTE_AGILIS"');
}

if (this.ADD_DECLARATION_PERTE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"ADD_DECLARATION_PERTE_AGILIS"');
}
if (this.CONFIRMER_DECLARATION_PERTE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"CONFIRMER_DECLARATION_PERTE_AGILIS"');
}
if (this.VIEW_HISTORIQUE_PERTE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"VIEW_HISTORIQUE_PERTE_AGILIS');
}

if (this.DELETE_HISTORIQUE_PERTE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"DELETE_HISTORIQUE_PERTE_AGILIS');
}

if (this.VIEW_ANNULATION_AGILIS_CRT.value) {
  this.ListAuthorities.push('"VIEW_ANNULATION_AGILIS"');
}
if (this.ADD_ANNULATION_AGILIS_CRT.value) {
  this.ListAuthorities.push('"ADD_ANNULATION_AGILIS"');
}
if (this.MODIFY_ANNULATION_AGILIS_CRT.value) {
  this.ListAuthorities.push('"MODIFY_ANNULATION_AGILIS"');
}

if (this.DELETE_ANNULATION_AGILIS_CRT.value) {
  this.ListAuthorities.push('"DELETE_ANNULATION_AGILIS"');
}
if (this.CONFIRMER_ANNULATION_AGILIS_CRT.value) {
  this.ListAuthorities.push('"CONFIRMER_ANNULATION_AGILIS"');
}

if (this.VALIDER_RECHARGE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"VALIDER_RECHARGE_AGILIS"');
}

if (this.CONFIRMER_RECHARGE_AGILIS_CRT.value) {
  this.ListAuthorities.push('"CONFIRMER_RECHARGE_AGILIS"');
}

/* end agilis*/

//Ordre de mission
if (this.ADD_ORDRE_MISSION_CTRL.value) {
  this.ListAuthorities.push('"ADD_ORDRE_MISSION"');
} 

if (this.VIEW_ORDRE_MISSION_CTRL.value) {
  this.ListAuthorities.push('"VIEW_ORDRE_MISSION"');
} 

if (this.MODIFY_ORDRE_MISSION_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_ORDRE_MISSION"');
} 

if (this.DELETE_ORDRE_MISSION_CTRL.value) {
  this.ListAuthorities.push('"DELETE_ORDRE_MISSION"');
} 

if (this.VIEW_VEHICULE_DEPASSANT_CTRL.value) {
  this.ListAuthorities.push('"VIEW_VEHICULE_DEPASSANT"');
} 

if (this.DETAILS_VEHICULE_DEPASSANT_CTRL.value) {
  this.ListAuthorities.push('"DETAILS_VEHICULE_DEPASSANT"');
} 

if (this.DELETE_VEHICULE_DEPASSANT_CTRL.value) {
  this.ListAuthorities.push('"DELETE_VEHICULE_DEPASSANT"');
} 

if (this.VEHICULE_VEHICULE_DEPASSANT_CTRL.value) {
  this.ListAuthorities.push('"VEHICULE_VEHICULE_DEPASSANT"');
} 

if (this.CONFIRMER_ORDRE_MISSION_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMER_ORDRE_MISSION"');
} 

if (this.VEHICULE_ORDRE_MISSION_CTRL.value) {
  this.ListAuthorities.push('"VEHICULE_ORDRE_MISSION"');
} 

//Ordre de mission

//ACHAT
if (this.VIEW_BON_COMMANDE_CTRL.value) {
  this.ListAuthorities.push('"VIEW_BON_COMMANDE"');
}
if (this.ADD_BON_COMMANDE_CTRL.value) {
  this.ListAuthorities.push('"ADD_BON_COMMANDE"');
}
if (this.MODIFY_BON_COMMANDE_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_BON_COMMANDE"');
}
if (this.DELETE_BON_COMMANDE_CTRL.value) {
  this.ListAuthorities.push('"DELETE_BON_COMMANDE"');
}
//ACHAT

//EXPLOITATION
if (this.VIEW_RESERVATION_CTRL.value) {
  this.ListAuthorities.push('"VIEW_RESERVATION"');
} 
if (this.VIEW_VEHICULE_RESERVATION_CTRL.value) {
  this.ListAuthorities.push('"VIEW_VEHICULE_RESERVATION"');
} 
if (this.DELETE_RESERVATION_CTRL.value) {
  this.ListAuthorities.push('"DELETE_RESERVATION"');
}
if (this.MODIFY_RESERVATION_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_RESERVATION"');
}
if (this.ADD_RESERVATION_CTRL.value) {
  this.ListAuthorities.push('"ADD_RESERVATION"');
}
if (this.CONFIRMER_RESERVATION_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMER_RESERVATION"');
}
if (this.VIEW_VEHICULE_EMPRUNT_CTRL.value) {
  this.ListAuthorities.push('"VIEW_VEHICULE_EMPRUNT"');
}
if (this.CONFIRMER_EMPRUNT_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMER_EMPRUNT"');
}
if (this.DELETE_EMPRUNT_CTRL.value) {
  this.ListAuthorities.push('"DELETE_EMPRUNT"');
}
if (this.MODIFY_EMPRUNT_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_EMPRUNT"');
} 
if (this.ADD_EMPRUNT_CTRL.value) {
  this.ListAuthorities.push('"ADD_EMPRUNT"');
} 
if (this.VIEW_EMPRUNT_CTRL.value) {
  this.ListAuthorities.push('"VIEW_EMPRUNT"');
} 
if (this.VIEW_VEHICULE_SINISTRE_CTRL.value) {
  this.ListAuthorities.push('"VIEW_VEHICULE_SINISTRE"');
}
if (this.DELETE_SINISTRE_CTRL.value) {
  this.ListAuthorities.push('"DELETE_SINISTRE"');
}
if (this.MODIFY_SINISTRE_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_SINISTRE"');
}
if (this.ADD_SINISTRE_CTRL.value) {
  this.ListAuthorities.push('"ADD_SINISTRE"');
}
if (this.VIEW_SINISTRE_CTRL.value) {
  this.ListAuthorities.push('"VIEW_SINISTRE"');
} 
if (this.DELETE_LOCATION_CTRL.value) {
  this.ListAuthorities.push('"DELETE_LOCATION"');
}
if (this.MODIFY_LOCATION_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_LOCATION"');
} 
if (this.ADD_LOCATION_CTRL.value) {
  this.ListAuthorities.push('"ADD_LOCATION"');
} 
if (this.VIEW_LOCATION_CTRL.value) {
  this.ListAuthorities.push('"VIEW_LOCATION"');
}

//EXPLOITATION
    
//CARBURANT : CARTE PLAFOND

if (this.DELETE_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"DELETE_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND"');
}
if (this.VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"VIEW_HISTORIQUE_DEMANDE_ANNULATION_CARTE_PLAFOND"');
}
if (this.CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMATION_DEMANDE_ANNULATION_CARTE_PLAFOND"');
}
if (this.DELETE_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DEMANDE_ANNULATION_CARTE_PLAFOND"');
}
if (this.MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DEMANDE_ANNULATION_CARTE_PLAFOND"');
}
if (this.VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DEMANDE_ANNULATION_CARTE_PLAFOND"');
}
if (this.ADD_DEMANDE_ANNULATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"ADD_DEMANDE_ANNULATION_CARTE_PLAFOND"');
}
if (this.DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND"');
}
if (this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_PLAFOND"');
}
if (this.CONFIRMATION_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMATION_DECLARATION_PERTE_CARTE_PLAFOND"');
}
if (this.ADD_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"ADD_DECLARATION_PERTE_CARTE_PLAFOND"');
}
if (this.DELETE_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DECLARATION_PERTE_CARTE_PLAFOND"');
}
if (this.MODIFY_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DECLARATION_PERTE_CARTE_PLAFOND"');
}
if (this.VIEW_DECLARATION_PERTE_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DECLARATION_PERTE_CARTE_PLAFOND"');
}
if (this.VEHICULE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"VEHICULE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND"');
}
if (this.DELETE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"DELETE_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND"');
}
if (this.VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"VIEW_HISTORIQUE_DEMANDE_AFFECTATION_CARTE_PLAFOND"');
}
if (this.VALIDATION_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"VALIDATION_DEMANDE_AFFECTATION_CARTE_PLAFOND"');
}
if (this.CONFIRM_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"CONFIRM_DEMANDE_AFFECTATION_CARTE_PLAFOND"');
}
if (this.ADD_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"ADD_DEMANDE_AFFECTATION_CARTE_PLAFOND"');
}
if (this.DELETE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DEMANDE_AFFECTATION_CARTE_PLAFOND"');
}
if (this.VEHICULE_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"VEHICULE_DEMANDE_AFFECTATION_CARTE_PLAFOND"');
}
if (this.VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DEMANDE_AFFECTATION_CARTE_PLAFOND"');
}
if (this.DELETE_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"DELETE_CARTE_PLAFOND"');
}
if (this.MODIFY_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_CARTE_PLAFOND"');
}
if (this.VIEW_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"VIEW_CARTE_PLAFOND"');
}
if (this.ADD_CARTE_PLAFOND_CTRL.value) {
  this.ListAuthorities.push('"ADD_CARTE_PLAFOND"');
}
//CARBURANT : CARTE PLAFOND



//STOCK

if (this.CONFIRM_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"CONFIRM_TRANSFERT_PARC_VERS_MAGASIN"');
}
if (this.VALID_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"VALID_TRANSFERT_PARC_VERS_MAGASIN"');
}
if (this.ADD_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"ADD_TRANSFERT_PARC_VERS_MAGASIN"');
}
if (this.MODIFY_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_TRANSFERT_PARC_VERS_MAGASIN"');
}
if (this.DELETE_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"DELETE_TRANSFERT_PARC_VERS_MAGASIN"');
}
if (this.VIEW_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"VIEW_TRANSFERT_PARC_VERS_MAGASIN"');
}

if (this.VIEW_Bon_Travail_Sortie_CTRL.value) {
  this.ListAuthorities.push('"VIEW_Bon_Travail_Sortie"');
}
if (this.DETAILS_Bon_Travail_Sortie_CTRL.value) {
  this.ListAuthorities.push('"DETAILS_Bon_Travail_Sortie');
}
if (this.VIEW_Bon_Transfert_vers_magasin_CTRL.value) {
  this.ListAuthorities.push('"VIEW_Bon_Transfert_vers_magasin"');
}
if (this.ADD_Bon_Transfert_vers_magasin_CTRL.value) {
  this.ListAuthorities.push('"ADD_Bon_Transfert_vers_magasin"');
}
if (this.CONFIRM_Bon_Transfert_vers_magasin_CTRL.value) {
  this.ListAuthorities.push('"CONFIRM_Bon_Transfert_vers_magasin"');
}
if (this.VALIDER_Bon_Transfert_vers_magasin_CTRL.value) {
  this.ListAuthorities.push('"VALIDER_Bon_Transfert_vers_magasin"');
}
if (this.MODIFY_Bon_Transfert_vers_magasin_CTRL .value) {
  this.ListAuthorities.push('"MODIFY_Bon_Transfert_vers_magasin"');
}
if (this.DELETE_Bon_Transfert_vers_magasin_CTRL .value) {
  this.ListAuthorities.push('"DELETE_Bon_Transfert_vers_magasin"');
}
if (this.VIEW_Bon_Sortie_Structure_CTRL .value) {
  this.ListAuthorities.push('"VIEW_Bon_Sortie_Structure"');
}

if (this.VIEW_Reception_Fournisseur_CTRL .value) {
  this.ListAuthorities.push('"VIEW_Reception_Fournisseur"');
}
if (this.DELETE_Reception_Fournisseur_CTRL  .value) {
  this.ListAuthorities.push('"DELETE_Reception_Fournisseur"');
}
if (this.DETAILS_Reception_Fournisseur_CTRL  .value) {
  this.ListAuthorities.push('"DETAILS_Reception_Fournisseur"');
}
if (this.VIEW_Reception_Atelier_CTRL  .value) {
  this.ListAuthorities.push('"VIEW_Reception_Atelier"');
}

if (this.VIEW_Transfert_magasin_CTRL  .value) {
  this.ListAuthorities.push('"VIEW_Transfert_magasin"');
}
if (this.VIEW_Retour_Structure_CTRL   .value) {
  this.ListAuthorities.push('"VIEW_Retour_Structure"');
}
if (this.ADD_Retour_Structure_CTRL   .value) {
  this.ListAuthorities.push('"ADD_Retour_Structure"');
}
if (this.DETAILS_Retour_Structure_CTRL   .value) {
  this.ListAuthorities.push('"DETAILS_Retour_Structure"');
}
if (this.DELETE_Retour_Structure_CTRL   .value) {
  this.ListAuthorities.push('"DELETE_Retour_Structure"');
}


if (this.VIEW_Inventaire_Stock_CTRL   .value) {
  this.ListAuthorities.push('"VIEW_Inventaire_Stock"');
}
if (this.DETAILS_Inventaire_Stock_CTRL    .value) {
  this.ListAuthorities.push('"DETAILS_Inventaire_Stock"');
}
if (this.ADD_Inventaire_Stock_CTRL    .value) {
  this.ListAuthorities.push('"ADD_Inventaire_Stock"');
}
if (this.DELETE_Inventaire_Stock_CTRL    .value) {
  this.ListAuthorities.push('"DELETE_Inventaire_Stock"');
}
if (this.VIEW_Regulation_Stock_CTRL    .value) {
  this.ListAuthorities.push('"VIEW_Regulation_Stock"');
}
if (this.ADD_Regulation_Stock_CTRL    .value) {
  this.ListAuthorities.push('"ADD_Regulation_Stock"');
}


if (this.DETAILS_Regulation_Stock_CTRL    .value) {
  this.ListAuthorities.push('"DETAILS_Regulation_Stock"');
}
if (this.DELETE_Regulation_Stock_CTRL     .value) {
  this.ListAuthorities.push('"DELETE_Regulation_Stock"');
}


//CARBURANT : CARTE JOCKER

if (this.VIEW_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"VIEW_CARTE_JOCKER"');
}

if (this.MODIFY_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_CARTE_JOCKER"');
}
if (this.DELETE_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"DELETE_CARTE_JOCKER"');
}
if (this.ADD_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"ADD_CARTE_JOCKER"');
}
if (this.CONFIRMATION_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMATION_DEMANDE_AFFECTATION_CARTE_JOCKER"');
}
if (this.VALIDATION_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"VALIDATION_DEMANDE_AFFECTATION_CARTE_JOCKER"');
}
if (this.VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DEMANDE_AFFECTATION_CARTE_JOCKER"');
}
if (this.MODIFY_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DEMANDE_AFFECTATION_CARTE_JOCKER"');
}
if (this.ADD_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"ADD_DEMANDE_AFFECTATION_CARTE_JOCKER"');
}
if (this.VEHICULE_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"VEHICULE_DEMANDE_AFFECTATION_CARTE_JOCKER"');
}
if (this.DELETE_DEMANDE_AFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DEMANDE_AFFECTATION_CARTE_JOCKER"');
}
if (this.CONFIRMATION_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMATION_DEMANDE_DESAFFECTATION_CARTE_JOCKER"');
}
if (this.VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DEMANDE_DESAFFECTATION_CARTE_JOCKER"');
}
if (this.MODIFY_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DEMANDE_DESAFFECTATION_CARTE_JOCKER"');
}
if (this.DELETE_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DEMANDE_DESAFFECTATION_CARTE_JOCKER"');
}
if (this.ADD_DEMANDE_DESAFFECTATION_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"ADD_DEMANDE_DESAFFECTATION_CARTE_JOCKER"');
}
if (this.ADD_DECLARATION_PERTE_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"ADD_DECLARATION_PERTE_CARTE_JOCKER"');
}
if (this.DELETE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DECLARATION_PERTE_CARTE_JOCKER"');
}
if (this.MODIFY_DECLARATION_PERTE_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DECLARATION_PERTE_CARTE_JOCKER"');
}
if (this.CONFIRMATION_DECLARATION_PERTE_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMATION_DECLARATION_PERTE_CARTE_JOCKER"');
}
if (this.VIEW_DECLARATION_PERTE_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DECLARATION_PERTE_CARTE_JOCKER"');
}
if (this.VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"VIEW_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER"');
}
if (this.DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"DELETE_HISTORIQUE_DECLARATION_PERTE_CARTE_JOCKER"');
}
if (this.CONFIRMATION_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMATION_DEMANDE_QUOTA_CARTE_JOCKER"');
}
if (this.VALIDATION_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"VALIDATION_DEMANDE_QUOTA_CARTE_JOCKER"');
}
if (this.ADD_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"ADD_DEMANDE_QUOTA_CARTE_JOCKER"');
}
if (this.MODIFY_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DEMANDE_QUOTA_CARTE_JOCKER"');
}
if (this.DELETE_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DEMANDE_QUOTA_CARTE_JOCKER"');
}
if (this.VIEW_DEMANDE_QUOTA_CARTE_JOCKER_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DEMANDE_QUOTA_CARTE_JOCKER"');
}
//CARBURANT : CARTE JOCKER
//Maintenance:


if (this.ADD_DEMANDE_INTERVENTION_CTRL.value) {
  this.ListAuthorities.push('"ADD_DEMANDE_INTERVENTION"');
}
if (this.VIEW_DEMANDE_INTERVENTION_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DEMANDE_INTERVENTION"');
}
if (this.DELETE_DEMANDE_INTERVENTION_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DEMANDE_INTERVENTION"');
}
if (this.MODIFY_DEMANDE_INTERVENTION_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DEMANDE_INTERVENTION"');
}



if (this.DETAILS_BON_TRAVAIL_CTRL.value) {
  this.ListAuthorities.push('"DETAILS_BON_TRAVAIL"');
}
if (this.DELETE_BON_TRAVAIL_CTRL.value) {
  this.ListAuthorities.push('"DELETE_BON_TRAVAIL"');
}
if (this.VIEW_BON_TRAVAIL_CTRL.value) {
  this.ListAuthorities.push('"VIEW_BON_TRAVAIL"');
}
if (this.ADD_BON_TRAVAIL_CTRL.value) {
  this.ListAuthorities.push('"ADD_BON_TRAVAIL"');
}
if (this.MODIFY_SORTIE_VEHICULE_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_SORTIE_VEHICULE"');
}

if (this.VIEW_HISTORIQUE_MAINTENANCE_VEHICULE_CTRL.value) {
  this.ListAuthorities.push('"VIEW_HISTORIQUE_MAINTENANCE_VEHICULE"');
}

if (this.DELETE_HISTORIQUE_MAINTENANCE_VEHICULE_CTRL.value) {
  this.ListAuthorities.push('"DELETE_HISTORIQUE_MAINTENANCE_VEHICULE"');
}

if (this.DELETE_HISTORIQUE_MAINTENANCE_CTRL.value) {
  this.ListAuthorities.push('"DELETE_HISTORIQUE_MAINTENANCE"');
}
//End Maintenance



//End Maintenace


// CARBURANT : Distribution de carburant
if (this.VIEW_SUIVI_CTRL.value) {
  this.ListAuthorities.push('"VIEW_SUIVI"');
}
if (this.ADD_SUIVI_CTRL.value) {
  this.ListAuthorities.push('"ADD_SUIVI"');
}
if (this.VIEW_BON_CARBURANT_BON_CTRL.value) {
  this.ListAuthorities.push('"VIEW_BON_CARBURANT_BON"');
}
if (this.ADD_BON_CARBURANT_BON_CTRL.value) {
  this.ListAuthorities.push('"ADD_BON_CARBURANT_BON"');
}
if (this.CONFIRMER_ETAT_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"CONFIRMER_ETAT_MENSUEL"');
}
if (this.VALIDER_ETAT_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"VALIDER_ETAT_MENSUEL"');
}
if (this.VEHICULE_ETAT_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"VEHICULE_ETAT_MENSUEL"');
}
if (this.VIEW_ETAT_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"VIEW_ETAT_MENSUEL"');
}
if (this.DELETE_ETAT_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"DELETE_ETAT_MENSUEL"');
}
if (this.MODIFY_ETAT_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_ETAT_MENSUEL"');
}
if (this.ADD_ETAT_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"ADD_ETAT_MENSUEL"');
}
if (this.VIEW_RETOUR_CARBURANT_CTRL.value) {
  this.ListAuthorities.push('"VIEW_RETOUR_CARBURANT"');
}
if (this.ADD_RETOUR_CARBURANT_CTRL.value) {
  this.ListAuthorities.push('"ADD_RETOUR_CARBURANT"');
}
if (this.DETAIL_TRANSFERT_PARC_CTRL.value) {
  this.ListAuthorities.push('"DETAIL_TRANSFERT_PARC"');
}
if (this.VIEW_TRANSFERT_PARC_CTRL.value) {
  this.ListAuthorities.push('"VIEW_TRANSFERT_PARC"');
}
if (this.ADD_TRANSFERT_PARC_CTRL.value) {
  this.ListAuthorities.push('"ADD_TRANSFERT_PARC"');
}
if (this.VEHICULE_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"VEHICULE_DESTRIBUTION_CARBURANT_COMPENSATION"');
}
if (this.VIEW_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DESTRIBUTION_CARBURANT_COMPENSATION"');
}

if (this.DELETE_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DESTRIBUTION_CARBURANT_COMPENSATION"');
}
if (this.MODIFY_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DESTRIBUTION_CARBURANT_COMPENSATION"');
}
if (this.ADD_DESTRIBUTION_CARBURANT_COMPENSATION_CTRL.value) {
  this.ListAuthorities.push('"ADD_DESTRIBUTION_CARBURANT_COMPENSATION"');
}
if (this.VEHICULE_DESTRIBUTION_CARBURANT_SERVICE_CTRL.value) {
  this.ListAuthorities.push('"VEHICULE_DESTRIBUTION_CARBURANT_SERVICE"');
}
if (this.VIEW_DESTRIBUTION_CARBURANT_SERVICE_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DESTRIBUTION_CARBURANT_SERVICE"');
}
if (this.DELETE_DESTRIBUTION_CARBURANT_SERVICE_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DESTRIBUTION_CARBURANT_SERVICE"');
}
if (this.MODIFY_DESTRIBUTION_CARBURANT_SERVICE_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DESTRIBUTION_CARBURANT_SERVICE"');
}
if (this.ADD_DESTRIBUTION_CARBURANT_SERVICE_CTRL.value) {
  this.ListAuthorities.push('"ADD_DESTRIBUTION_CARBURANT_SERVICE"');
}
if (this.VIEW_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DISTRIBUTION_CARBURANT_VEHICULE"');
}
if (this.DELETE_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DISTRIBUTION_CARBURANT_VEHICULE"');
}
if (this.MODIFY_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DISTRIBUTION_CARBURANT_VEHICULE"');
}
if (this.ADD_DISTRIBUTION_CARBURANT_VEHICULE_CTRL.value) {
  this.ListAuthorities.push('"ADD_DISTRIBUTION_CARBURANT_VEHICULE"');
}
if (this.VEHICULE_DISTRIBUTION_CARBURANT_FONCTION_CTRL.value) {
  this.ListAuthorities.push('"VEHICULE_DISTRIBUTION_CARBURANT_FONCTION"');
}
if (this.VIEW_DISTRIBUTION_CARBURANT_FONCTION_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DISTRIBUTION_CARBURANT_FONCTION"');
}
if (this.DELETE_DISTRIBUTION_CARBURANT_FONCTION_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DISTRIBUTION_CARBURANT_FONCTION"');
}
if (this.MODIFY_DISTRIBUTION_CARBURANT_FONCTION_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_DISTRIBUTION_CARBURANT_FONCTION"');
}
if (this.ADD_DISTRIBUTION_CARBURANT_FONCTION_CTRL.value) {
  this.ListAuthorities.push('"ADD_DISTRIBUTION_CARBURANT_FONCTION"');
}



if (this.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DEMANDE_RECHARGE_SOUS_COMPTE"');
}
if (this.ADD_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.value) {
  this.ListAuthorities.push('"ADD_DEMANDE_RECHARGE_SOUS_COMPTE"');
}
if (this.VALID_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.value) {
  this.ListAuthorities.push('"VALID_DEMANDE_RECHARGE_SOUS_COMPTE"');
}
if (this.CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.value) {
  this.ListAuthorities.push('"CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE"');
}
if (this.DELETE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DEMANDE_RECHARGE_SOUS_COMPTE"');
} 

  

if (this.VIEW_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.value) {
  this.ListAuthorities.push('"VIEW_DEMANDE_RECHARGE_SOUS_COMPTE"');
}
if (this.ADD_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.value) {
  this.ListAuthorities.push('"ADD_DEMANDE_RECHARGE_SOUS_COMPTE"');
}
if (this.VALID_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.value) {
  this.ListAuthorities.push('"VALID_DEMANDE_RECHARGE_SOUS_COMPTE"');
}
if (this.CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.value) {
  this.ListAuthorities.push('"CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE"');
}
if (this.DELETE_DEMANDE_RECHARGE_SOUS_COMPTE_CTRL.value) {
  this.ListAuthorities.push('"DELETE_DEMANDE_RECHARGE_SOUS_COMPTE"');
}
// CARBURANT : Distribution de carburant

if (this.VIEW_HISTORIQUE_REGULATION_CTRL.value) {
  this.ListAuthorities.push('"VIEW_HISTORIQUE_REGULATION"');
}
if (this.DELETE_HISTORIQUE_REGULATION_CTRL.value) {
  this.ListAuthorities.push('"DELETE_HISTORIQUE_REGULATION"');
} 
if (this.VIEW_SORTIE_VEHICULE_CTRL.value) {
  this.ListAuthorities.push('"VIEW_SORTIE_VEHICULE"');
} 





if (this.CONFIRM_RECHARGE_QUOTA_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"CONFIRM_RECHARGE_QUOTA_MENSUEL"');
} 
if (this.VALID_RECHARGE_QUOTA_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"VALID_RECHARGE_QUOTA_MENSUEL"');
} 
if (this.ADD_RECHARGE_QUOTA_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"ADD_RECHARGE_QUOTA_MENSUEL"');
} 
if (this.VIEW_RECHARGE_QUOTA_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"VIEW_RECHARGE_QUOTA_MENSUEL"');
} 
if (this.VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL_CTRL.value) {
  this.ListAuthorities.push('"VIEW_HISTORIQUE_RECHARGE_QUOTA_MENSUEL"');
} 


//stock
if (this.CONFIRM_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"CONFIRM_TRANSFERT_PARC_VERS_MAGASIN"');
} 
if (this.VALID_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"VALID_TRANSFERT_PARC_VERS_MAGASIN"');
} 
if (this.ADD_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"ADD_TRANSFERT_PARC_VERS_MAGASIN"');
} 
if (this.VIEW_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"VIEW_RECHARGE_QUOTA_MENSUEL"');
} 

if (this.MODIFY_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"MODIFY_RECHARGE_QUOTA_MENSUEL"');
} 
if (this.DELETE_TRANSFERT_PARC_VERS_MAGASIN_CTRL.value) {
  this.ListAuthorities.push('"DELETE_RECHARGE_QUOTA_MENSUEL"');
} 

//stock

  }
}
