import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './log-in/home-page/home-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { HomePageModule } from './log-in/home-page/home-page.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdministratifComponent } from './log-in/home-page/administratif/administratif.component';
import { ExploitationComponent } from './log-in/home-page/exploitation/exploitation.component';
import { OrdresDeMissionComponent } from './log-in/home-page/ordres-de-mission/ordres-de-mission.component';
import { CarburantComponent } from './log-in/home-page/carburant/carburant.component';
import { AchatComponent } from './log-in/home-page/achat/achat.component';
import { StockComponent } from './log-in/home-page/stock/stock.component';
import { MaintenanceEtReparationComponent } from './log-in/home-page/maintenance-et-reparation/maintenance-et-reparation.component';
import { ReferentielComponent } from './log-in/home-page/referentiel/referentiel.component';
import { AdministrationComponent } from './log-in/home-page/administration/administration.component';
import { VehiculesComponent } from './log-in/home-page/administratif/vehicules/vehicules.component';
import { TaxeDeCirculationComponent } from './log-in/home-page/administratif/taxe-de-circulation/taxe-de-circulation.component';
import { AssurancesComponent } from './log-in/home-page/administratif/assurances/assurances.component';
import { VisiteTechniqueComponent } from './log-in/home-page/administratif/visite-technique/visite-technique.component';
import { ReformeEtSortieDeCompteComponent } from './log-in/home-page/administratif/reforme-et-sortie-de-compte/reforme-et-sortie-de-compte.component';
import { EtatsDeSortieComponent } from './log-in/home-page/administratif/etats-de-sortie/etats-de-sortie.component';
import { GestionDesReservationsComponent } from './log-in/home-page/exploitation/gestion-des-reservations/gestion-des-reservations.component';
import { GestionDesLocationsComponent } from './log-in/home-page/exploitation/gestion-des-locations/gestion-des-locations.component';
import { TransfertDeParkAParcComponent } from './log-in/home-page/carburant/transfert-de-park-aparc/transfert-de-park-aparc.component';
import { ReceptionBonsCarburantsComponent } from './log-in/home-page/carburant/reception-bons-carburants/reception-bons-carburants.component';
import { TransfertVersStructureComponent } from './log-in/home-page/carburant/transfert-vers-structure/transfert-vers-structure.component';
import { ConsommationCarburantComponent } from './log-in/home-page/carburant/consommation-carburant/consommation-carburant.component';
import { RetourDeCarburantComponent } from './log-in/home-page/carburant/retour-de-carburant/retour-de-carburant.component';
import { EtatMensuelComponent } from './log-in/home-page/carburant/etat-mensuel/etat-mensuel.component';
import { BonCommandeDesBonsComponent } from './log-in/home-page/carburant/bon-commande-des-bons/bon-commande-des-bons.component';
import { RechercheAffectationDesBonsComponent } from './log-in/home-page/carburant/recherche-affectation-des-bons/recherche-affectation-des-bons.component';
import { CarburantInventaireComponent } from './log-in/home-page/carburant/carburant-inventaire/carburant-inventaire.component';
import { SuiviComponent } from './log-in/home-page/carburant/suivi/suivi.component';
import { EScarburantComponent } from './log-in/home-page/carburant/escarburant/escarburant.component';
import { MarchesComponent } from './log-in/home-page/achat/marches/marches.component';
import { BudgetComponent } from './log-in/home-page/achat/budget/budget.component';
import { BonSortieBonTravailComponent } from './log-in/home-page/stock/bon-sortie-bon-travail/bon-sortie-bon-travail.component';
import { TransfertVersMagasinComponent } from './log-in/home-page/stock/transfert-vers-magasin/transfert-vers-magasin.component';
import { BonSortiePourStructureComponent } from './log-in/home-page/stock/bon-sortie-pour-structure/bon-sortie-pour-structure.component';
import { ReceptionFournisseurComponent } from './log-in/home-page/stock/reception-fournisseur/reception-fournisseur.component';
import { ReceptionAtelierComponent } from './log-in/home-page/stock/reception-atelier/reception-atelier.component';
import { TransfertMagasinComponent } from './log-in/home-page/stock/transfert-magasin/transfert-magasin.component';
import { RetourStructureComponent } from './log-in/home-page/stock/retour-structure/retour-structure.component';
import { RegulationStockComponent } from './log-in/home-page/stock/regulation-stock/regulation-stock.component';
import { InventaireStockComponent } from './log-in/home-page/stock/inventaire-stock/inventaire-stock.component';
import { ESstockComponent } from './log-in/home-page/stock/esstock/esstock.component';
import { SortieDesVehiculesComponent } from './log-in/home-page/maintenance-et-reparation/sortie-des-vehicules/sortie-des-vehicules.component';
import { ESmaintenanceReparationComponent } from './log-in/home-page/maintenance-et-reparation/esmaintenance-reparation/esmaintenance-reparation.component';
import { GeneralComponent } from './log-in/home-page/referentiel/general/general.component';
import { DecoupageAdministratifComponent } from './log-in/home-page/referentiel/general/decoupage-administratif/decoupage-administratif.component';
import { ArticlesComponent } from './log-in/home-page/referentiel/general/articles/articles.component';
import { ExpertsComponent } from './log-in/home-page/referentiel/general/experts/experts.component';
import { FournisseursComponent } from './log-in/home-page/referentiel/general/fournisseurs/fournisseurs.component';
import { LieuParkingComponent } from './log-in/home-page/referentiel/general/lieu-parking/lieu-parking.component';
import { EtatStockComponent } from './log-in/home-page/referentiel/specifique/etat-stock/etat-stock.component';
import { BeneficiaireEmpruntsComponent } from './log-in/home-page/referentiel/specifique/beneficiaire-emprunts/beneficiaire-emprunts.component';
import { CreationUtilisateursComponent } from './log-in/home-page/administration/creation-utilisateurs/creation-utilisateurs.component';
import { GroupesUtilisateursComponent } from './log-in/home-page/administration/groupes-utilisateurs/groupes-utilisateurs.component';
import { MessagesApplicatifsComponent } from './log-in/home-page/administration/messages-applicatifs/messages-applicatifs.component';
import { AlertesComponent } from './log-in/home-page/administration/alertes/alertes.component';
import { TracabiliteComponent } from './log-in/home-page/administration/tracabilite/tracabilite.component';
import { ParametresApplicationComponent } from './log-in/home-page/administration/parametres-application/parametres-application.component';
import { GpsComponent } from './log-in/home-page/administratif/gps/gps.component';
import { SpecifiqueComponent } from './log-in/home-page/referentiel/specifique/specifique.component';
import { DetailsExploitationComponent } from './log-in/home-page/carburant/etat-mensuel/details-exploitation/details-exploitation.component';
import { DetailsBonDeCommandeComponent } from './log-in/home-page/achat/details-bon-de-commande/details-bon-de-commande.component';
import { MatMenuModule } from '@angular/material/menu';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { DetailsBonCommandeDesBonsComponent } from './log-in/home-page/carburant/bon-commande-des-bons/details-bon-commande-des-bons/details-bon-commande-des-bons.component';
import { NouvelleReformeComponent } from './log-in/home-page/administratif/reforme-et-sortie-de-compte/nouvelle-reforme/nouvelle-reforme.component';
import { NouvelleAssuranceComponent } from './log-in/home-page/administratif/assurances/nouvelle-assurance/nouvelle-assurance.component';
import { NewTaxeDeCirculationComponent } from './log-in/home-page/administratif/taxe-de-circulation/new-taxe-de-circulation/new-taxe-de-circulation.component';
import { DistributionCarburantFonctionComponent } from './log-in/home-page/carburant/distribution-carburant-fonction/distribution-carburant-fonction.component';
import { DistributionCarburantFonctionVehiculePersonnelComponent } from './log-in/home-page/carburant/distribution-carburant-fonction-vehicule-personnel/distribution-carburant-fonction-vehicule-personnel.component';
import { DistributionCarburantFonctionCompensationComponent } from './log-in/home-page/carburant/distribution-carburant-fonction-compensation/distribution-carburant-fonction-compensation.component';
import { DistributionCarburantServiceComponent } from './log-in/home-page/carburant/distribution-carburant-service/distribution-carburant-service.component';
import { DistributionCarburantServiceStructureAdministrativeComponent } from './log-in/home-page/carburant/distribution-carburant-service-structure-administrative/distribution-carburant-service-structure-administrative.component';
import { DistributionCarburantServiceQuotaComplementaireComponent } from './log-in/home-page/carburant/distribution-carburant-service-quota-complementaire/distribution-carburant-service-quota-complementaire.component';
import { NouvelleDistributionCarburantFonctionComponent } from './log-in/home-page/carburant/nouvelle-distribution-carburant-fonction/nouvelle-distribution-carburant-fonction.component';
import { NewEtatMensuelComponent } from './log-in/home-page/carburant/etat-mensuel/new-etat-mensuel/new-etat-mensuel.component';
import { NouvelleDistributionCarburantServiceComponent } from './log-in/home-page/carburant/nouvelle-distribution-carburant-service/nouvelle-distribution-carburant-service.component';
import { HistoriqueAffectationCartePlafondComponent } from './log-in/home-page/carburant/carte-plafond/historique-affectation-carte-plafond/historique-affectation-carte-plafond.component';
import { DeclarationPerteCartePlafondComponent } from './log-in/home-page/carburant/carte-plafond/declaration-perte-carte-plafond/declaration-perte-carte-plafond.component';
import { HistoriqueDeclarationPerteCartePlafondComponent } from './log-in/home-page/carburant/carte-plafond/historique-declaration-perte-carte-plafond/historique-declaration-perte-carte-plafond.component';
import { DemandeAnnulationCartePlafondComponent } from './log-in/home-page/carburant/carte-plafond/demande-annulation-carte-plafond/demande-annulation-carte-plafond.component';
import { HistoriqueDemandeAnnulationCartePlafondComponent } from './log-in/home-page/carburant/carte-plafond/historique-demande-annulation-carte-plafond/historique-demande-annulation-carte-plafond.component';
import { GestionDeclarationPerteCarteComponent } from './log-in/home-page/carburant/carte-plafond/gestion-declaration-perte-carte/gestion-declaration-perte-carte.component';
import { GestionAnnulationCartePlafondComponent } from './log-in/home-page/carburant/gestions-annulation/gestion-annulation-carte-plafond/gestion-annulation-carte-plafond.component';
import { GestionCartePlafondComponent } from './log-in/home-page/carburant/gestion-cartes/gestion-carte-plafond/gestion-carte-plafond.component';
import { GestionRechargeCarteAgilisCashComponent } from './log-in/home-page/carburant/gestion-affectation/gestion-recharge-carte-agilis-cash/gestion-recharge-carte-agilis-cash.component';
import { HistoriqueRechargeCarteAgilisCashComponent } from './log-in/home-page/carburant/carte-agilis-cash/historique-recharge-carte-agilis-cash/historique-recharge-carte-agilis-cash.component';
import { DeclarationPerteCarteAgilisCashComponent } from './log-in/home-page/carburant/carte-agilis-cash/declaration-perte-carte-agilis-cash/declaration-perte-carte-agilis-cash.component';
import { GestionDeclarationsPerteCarteAgilisCashComponent } from './log-in/home-page/carburant/carte-agilis-cash/gestion-declarations-perte-carte-agilis-cash/gestion-declarations-perte-carte-agilis-cash.component';
import { HistoriqueDeclarationPerteCarteAgilisCashComponent } from './log-in/home-page/carburant/carte-agilis-cash/historique-declaration-perte-carte-agilis-cash/historique-declaration-perte-carte-agilis-cash.component';
import { DemandeAnnulationCarteAgilisCashComponent } from './log-in/home-page/carburant/carte-agilis-cash/demande-annulation-carte-agilis-cash/demande-annulation-carte-agilis-cash.component';
import { GestionAnnulationCarteAgilisCashComponent } from './log-in/home-page/carburant/carte-agilis-cash/gestion-annulation-carte-agilis-cash/gestion-annulation-carte-agilis-cash.component';
import { GestionCartesJockerComponent } from './log-in/home-page/carburant/gestion-cartes/gestion-cartes-jocker/gestion-cartes-jocker.component';
import { NouvelleDemandeAffectationCarteJockerComponent } from './log-in/home-page/carburant/gestion-affectation/gestion-affectation-carte-jocker/nouvelle-demande-affectation-carte-jocker/nouvelle-demande-affectation-carte-jocker.component';
import { GestionAffectationCarteJockerComponent } from './log-in/home-page/carburant/gestion-affectation/gestion-affectation-carte-jocker/gestion-affectation-carte-jocker.component';
import { HistoriqueAffectationCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/historique-affectation-carte-jocker/historique-affectation-carte-jocker.component';
import { NouvelleDemandeDesaffectationCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/gestion-demande-desaffectation-carte-jocker/nouvelle-demande-desaffectation-carte-jocker/nouvelle-demande-desaffectation-carte-jocker.component';
import { GestionDemandeDesaffectationCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/gestion-demande-desaffectation-carte-jocker/gestion-demande-desaffectation-carte-jocker.component';
import { HistoriqueDesaffectationCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/historique-desaffectation-carte-jocker/historique-desaffectation-carte-jocker.component';
import { NouvelleDemandeAffectationCartePlafondComponent } from './log-in/home-page/carburant/carte-plafond/demande-affectation-carte-plafond/nouvelle-demande-affectation-carte-plafond/nouvelle-demande-affectation-carte-plafond.component';
import { DemandeAffectationCartePlafondComponent } from './log-in/home-page/carburant/carte-plafond/demande-affectation-carte-plafond/demande-affectation-carte-plafond.component';
import { GestionCarteAgilisCashComponent } from './log-in/home-page/carburant/gestion-cartes/gestion-carte-agilis-cash/gestion-carte-agilis-cash.component';
import { HistoriqueAnnulationCarteAgilisCashComponent } from './log-in/home-page/carburant/carte-agilis-cash/historique-annulation-carte-agilis-cash/historique-annulation-carte-agilis-cash.component';
import { GestionDesSinistresComponent } from './log-in/home-page/exploitation/gestion-des-sinistres/gestion-des-sinistres.component';
import { GestionDesEmpruntsComponent } from './log-in/home-page/exploitation/gestion-des-emprunts/gestion-des-emprunts.component';
import { GestionVehiculesDepassantDateRetourComponent } from './log-in/home-page/ordres-de-mission/gestion-vehicules-depassant-date-retour/gestion-vehicules-depassant-date-retour.component';
import { GestionOrdreMissionComponent } from './log-in/home-page/ordres-de-mission/gestion-ordre-mission/gestion-ordre-mission.component';
import { GestionBonCommandeComponent } from './log-in/home-page/achat/gestion-bon-commande/gestion-bon-commande.component';
import { GestionDemandeInterventionComponent } from './log-in/home-page/maintenance-et-reparation/gestion-demande-intervention/gestion-demande-intervention.component';
import { GestionBonTravailComponent } from './log-in/home-page/maintenance-et-reparation/gestion-bon-travail/gestion-bon-travail.component';
import { StructureAdministrativeComponent } from './log-in/home-page/referentiel/specifique/structure-administrative/structure-administrative.component';
import { UniteGestionParcComponent } from './log-in/home-page/referentiel/specifique/unite-gestion-parc/unite-gestion-parc.component';
import { DetailsPersonnelComponent } from './log-in/home-page/referentiel/specifique/details-personnel/details-personnel.component';
import { ParametresVehiculesComponent } from './log-in/home-page/referentiel/general/parametres-vehicules/parametres-vehicules.component';
import { OperationReparationComponent } from './log-in/home-page/referentiel/general/operation-reparation/operation-reparation.component';
import { ParametresGenerauxComponent } from './log-in/home-page/referentiel/general/parametres-generaux/parametres-generaux.component';
import { AuthenticationGuard } from './log-in/guard/authentication.guard';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MessageComponent } from './log-in/home-page/message/message.component';
import { GestionCartesComponent } from './log-in/home-page/carburant/gestion-cartes/gestion-cartes.component';
import { GestionAffectationComponent } from './log-in/home-page/carburant/gestion-affectation/gestion-affectation.component';
import { GestionsPertesComponent } from './log-in/home-page/carburant/gestions-pertes/gestions-pertes.component';
import { GestionsAnnulationComponent } from './log-in/home-page/carburant/gestions-annulation/gestions-annulation.component';
import { NewDeclarationPerteCarteComponent } from './log-in/home-page/carburant/carte-jocker/gestion-declaration-perte-carte-jocker/new-declaration-perte-carte/new-declaration-perte-carte.component';
import { GestionDeclarationPerteCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/gestion-declaration-perte-carte-jocker/gestion-declaration-perte-carte-jocker.component';
import { HistoriqueDeclarationPerteCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/historique-declaration-perte-carte-jocker/historique-declaration-perte-carte-jocker.component';
import { CreateDemandeQuotaCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/gestion-demande-quota-carte-jocker/create-demande-quota-carte-jocker/create-demande-quota-carte-jocker.component';
import { UpdateDemandeQuotaCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/gestion-demande-quota-carte-jocker/update-demande-quota-carte-jocker/update-demande-quota-carte-jocker.component';
import { DeleteDemandeQuotaCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/gestion-demande-quota-carte-jocker/delete-demande-quota-carte-jocker/delete-demande-quota-carte-jocker.component';
import { DemandeQuotaCarburantCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/gestion-demande-quota-carte-jocker/demande-quota-carburant-carte-jocker/demande-quota-carburant-carte-jocker.component';
import { ApiGuardGuard } from './log-in/guard/api-guard.guard';
import { HistoriqueOperationDesRechargeComponent } from './log-in/home-page/carburant/recharge-sous-compte/historique-operation-des-recharge/historique-operation-des-recharge.component';
import { HistoriqueRechargeCarburantCompensationComponent } from './log-in/home-page/carburant/recharge-carburant-compensation/historique-recharge-carburant-compensation/historique-recharge-carburant-compensation.component';
import { HistoriqueRegulationComponent } from './log-in/home-page/stock/regulation-stock/historique-regulation/historique-regulation.component';
import { ImportExcelFileComponent } from './log-in/home-page/carburant/import-excel-file/import-excel-file.component';
import { ModifyCarburantPriceComponent } from './log-in/home-page/carburant/modify-carburant-price/modify-carburant-price.component';
import { TransfertParcVersParcComponent } from './log-in/home-page/stock/transfert-parc-vers-parc/transfert-parc-vers-parc.component';
import { RechargeQuotaMensuelComponent } from './log-in/home-page/carburant/recharge-des-carburants-de-fonction/recharge-quota-mensuel/recharge-quota-mensuel.component';
import { HistoriqueRechargeQuotaMensuelComponent } from './log-in/home-page/carburant/historique-recharge-quota-mensuel/historique-recharge-quota-mensuel.component';
import { HistoriqueMaintenanceComponent } from './log-in/home-page/maintenance-et-reparation/historique-maintenance/historique-maintenance.component';
import { RechargeCarburantCompensationComponent } from './log-in/home-page/carburant/recharge-carburant-compensation/recharge-carburant-compensation.component';
import { RechargeComplementaireComponent } from './log-in/home-page/carburant/recharge-complementaire/recharge-complementaire.component';
import { RechargeSousCompteComponent } from './log-in/home-page/carburant/recharge-sous-compte/recharge-sous-compte.component';
import { HistoriqueRechargeComplementaireComponent } from './log-in/home-page/carburant/recharge-complementaire/historique-recharge-complementaire/historique-recharge-complementaire.component';
import { AlertingStockComponent } from './log-in/home-page/stock/alerting-stock/alerting-stock.component';
import { AlertVehiculeComponent } from './log-in/home-page/administratif/alert-vehicule/alert-vehicule.component';

const routes: Routes = [
  {
    path: 'api', component: HomePageComponent, canActivate: [ApiGuardGuard], children: [

      {
        path: 'administratif', component: AdministratifComponent, children: [
          { path: '', redirectTo: 'véhicules', pathMatch: 'full' },
          { path: 'véhicules', component: VehiculesComponent },
          { path: 'taxe_de_circulation', component: TaxeDeCirculationComponent },
          { path: 'assurances', component: AssurancesComponent },
          { path: 'visite_technique', component: VisiteTechniqueComponent },
          { path: 'réforme_et_sortie_de_compte', component: ReformeEtSortieDeCompteComponent },
          { path: 'etats_de_sortie', component: EtatsDeSortieComponent },
          { path: 'nouvelle_reforme', component: NouvelleReformeComponent },
          { path: 'nouvelle_assurance', component: NouvelleAssuranceComponent },
          { path: 'nouvelle_taxe_de_circulation', component: NewTaxeDeCirculationComponent }
        ]
      },
      {
        path: 'exploitation', component: ExploitationComponent, children: [
          { path: '', redirectTo: 'gestion_des_réservations', pathMatch: 'full' },
          { path: 'gestion_des_réservations', component: GestionDesReservationsComponent },
          { path: 'gestion_des_locations', component: GestionDesLocationsComponent },
          { path: 'gestion_des_emprunts', component: GestionDesEmpruntsComponent },
          { path: 'gestion_des_sinistres', component: GestionDesSinistresComponent }
        ]
      },
      {
        path: 'ordres_de_mission', component: OrdresDeMissionComponent, children: [
          { path: '', redirectTo: 'ordres_de_mission', pathMatch: 'full' },
          { path: 'gestion_ordres_de_mission', component: GestionOrdreMissionComponent },
          { path: 'véhicules_qui_ont_dépassés_la_date_de_retour', component: GestionVehiculesDepassantDateRetourComponent },
        ]
      },
      {
        path: 'carburant', component: CarburantComponent, children: [
          { path: 'gestion_demande_quota_des_cartes_jocker', component: DemandeQuotaCarburantCarteJockerComponent },
          { path: 'gestion_des_cartes', component: GestionCartesComponent },
          { path: 'gestion_des_affectations', component: GestionAffectationComponent },
          { path: 'gestion_des_annulations', component: GestionsAnnulationComponent },
          { path: 'gestion_des_pertes', component: GestionsPertesComponent },
          { path: '', redirectTo: 'distribution_de_carburant_de_fonction', pathMatch: 'full' },
          { path: 'distribution_de_carburant_de_fonction', component: DistributionCarburantFonctionComponent },
          { path: 'gestion_demande_quota_des_cartes_jocker', component: DemandeQuotaCarburantCarteJockerComponent },
          { path: 'gestion_des_cartes', component: GestionCartesComponent },
          { path: 'gestion_des_recharge_de_compensation', component: RechargeCarburantCompensationComponent },
          { path: 'gestion_des_affectations', component: GestionAffectationComponent },
          { path: 'gestion_des_annulations', component: GestionsAnnulationComponent },
          { path: 'gestion_des_pertes', component: GestionsPertesComponent },
          { path: 'recharge_sous_compte', component: RechargeSousCompteComponent },
          { path: 'gestion_des_recharge_complementaire', component: RechargeComplementaireComponent },
          { path: 'historique_recharge_sous_compte', component: HistoriqueOperationDesRechargeComponent },
          { path: 'historique_gestion_des_recharge_de_compensation', component: HistoriqueRechargeCarburantCompensationComponent },
          { path: 'historique_gestion_des_recharge_complementaire', component: HistoriqueRechargeComplementaireComponent },

          { path: '', redirectTo: 'distribution_de_carburant_de_fonction', pathMatch: 'full' },
          { path: 'distribution_de_carburant_de_fonction', component: DistributionCarburantFonctionComponent },
          {
            path: 'distribution_de_carburant_de_fonction_(véhicule_personelle)',
            component: DistributionCarburantFonctionVehiculePersonnelComponent
          },
          {
            path: 'distribution_de_carburant_de_fonction_(compensation)',
            component: DistributionCarburantFonctionCompensationComponent
          },
          {
            path: 'nouvelle_distribution_de_carburant_de_fonction',
            component: NouvelleDistributionCarburantFonctionComponent
          },
          { path: 'distribution_de_carburant_de_service', component: DistributionCarburantServiceComponent },
          {
            path: 'distribution_de_carburant_de_service_(structure_administrative)',
            component: DistributionCarburantServiceStructureAdministrativeComponent
          },
          {
            path: 'distribution_de_carburant_de_service_(quota_complémentaire)',
            component: DistributionCarburantServiceQuotaComplementaireComponent
          },
          { path: 'nouvelle_distribution_de_carburant_de_service', component: NouvelleDistributionCarburantServiceComponent },
          { path: 'transfert_de_parc_à_parc', component: TransfertDeParkAParcComponent },
          { path: 'réception_des_bons_de_carburants', component: ReceptionBonsCarburantsComponent },
          { path: 'transfert_vers_structure', component: TransfertVersStructureComponent },
          { path: 'consommation_du_carburant', component: ConsommationCarburantComponent },
          { path: 'retour_de_carburant', component: RetourDeCarburantComponent },
          { path: 'etat_mensuel_(16_auto)', component: EtatMensuelComponent },
          { path: 'details_exploitation', component: DetailsExploitationComponent },
          { path: 'bon_de_commande_des_bons', component: BonCommandeDesBonsComponent },
          { path: 'recherche_affectation_des_bons', component: RechercheAffectationDesBonsComponent },
          { path: 'inventaire', component: CarburantInventaireComponent },
          { path: 'suivi', component: SuiviComponent },
          { path: 'etats_de_sortie', component: EScarburantComponent },
          { path: 'details-bon-commande-des_bons', component: DetailsBonCommandeDesBonsComponent },
          { path: 'nouveau-etat-mensuel', component: NewEtatMensuelComponent },
          { path: 'carte_plafond', redirectTo: 'affectation_des_cartes', pathMatch: 'full' },
          { path: 'nouvelle_demande_affectation_carte_plafond', component: NouvelleDemandeAffectationCartePlafondComponent },
          { path: 'gestion_des_demandes_affectations_carte_plafond', component: DemandeAffectationCartePlafondComponent },
          { path: 'historique_des_affectations_carte_plafond', component: HistoriqueAffectationCartePlafondComponent },
          { path: 'nouvelle_déclaration_de_perte_carte_plafond', component: DeclarationPerteCartePlafondComponent },
          { path: 'gestion_des_déclarations_de_perte_carte_plafond', component: GestionDeclarationPerteCarteComponent },
          { path: 'historique_des_déclarations_de_perte_carte_plafond', component: HistoriqueDeclarationPerteCartePlafondComponent },
          { path: 'nouvelle_demande_d\'annulation_carte_plafond', component: DemandeAnnulationCartePlafondComponent },
          { path: 'gestion_des_annulations_carte_plafond', component: GestionAnnulationCartePlafondComponent },
          { path: 'historique_des_demandes_d\'annulation_perte_carte_plafond', component: HistoriqueDemandeAnnulationCartePlafondComponent },
          { path: 'gestion_des_cartes_plafond', component: GestionCartePlafondComponent },
          { path: 'gestion_des_cartes_agilis_cash', component: GestionCarteAgilisCashComponent },
          { path: 'gestion_des_demandes_recharge_carte_agilis_cash', component: GestionRechargeCarteAgilisCashComponent },
          { path: 'historique_des_recharge_carte_agilis_cash', component: HistoriqueRechargeCarteAgilisCashComponent },
          { path: 'nouvelle_déclaration_de_perte_carte_agilis_cash', component: DeclarationPerteCarteAgilisCashComponent },
          { path: 'gestion_des_déclarations_de_perte_carte_agilis_cash', component: GestionDeclarationsPerteCarteAgilisCashComponent },
          { path: 'historique_des_déclarations_de_perte_carte_agilis_cash', component: HistoriqueDeclarationPerteCarteAgilisCashComponent },
          { path: 'nouvelle_demande_d\'annulation_carte_agilis_cash', component: DemandeAnnulationCarteAgilisCashComponent },
          { path: 'gestion_des_demandes_annulation_carte_agilis_cash', component: GestionAnnulationCarteAgilisCashComponent },
          { path: 'historique_des_demandes_annulation_carte_agilis_cash', component: HistoriqueAnnulationCarteAgilisCashComponent },
          { path: 'gestion_des_cartes_jocker', component: GestionCartesJockerComponent },
          { path: 'nouvelle_demande_affectation_carte_jocker', component: NouvelleDemandeAffectationCarteJockerComponent },
          { path: 'gestion_affectation_des_cartes_jocker', component: GestionAffectationCarteJockerComponent },
          { path: 'historique_affectation_des_cartes_jocker', component: HistoriqueAffectationCarteJockerComponent },
          { path: 'nouvelle_demande_désaffectation_des_cartes_jocker', component: NouvelleDemandeDesaffectationCarteJockerComponent },
          { path: 'gestion_demande_désaffectation_des_cartes_jocker', component: GestionDemandeDesaffectationCarteJockerComponent },
          { path: 'historique_désaffectation_des_cartes_jocker', component: HistoriqueDesaffectationCarteJockerComponent },
          { path: 'nouvelle_déclaration_de_perte_carte_jocker', component: NewDeclarationPerteCarteComponent },
          { path: 'gestion_des_déclarations_de_perte_carte_jocker', component: GestionDeclarationPerteCarteJockerComponent },
          { path: 'historique_des_déclarations_de_perte_carte_jocker', component: HistoriqueDeclarationPerteCarteJockerComponent },
          { path: 'import_fichier_excel', component: ImportExcelFileComponent },
          { path: 'modify_price_carburant', component: ModifyCarburantPriceComponent },

          { path: 'nouvelle_distribution_de_carburant_de_service', component: NouvelleDistributionCarburantServiceComponent },
          { path: 'transfert_de_parc_à_parc', component: TransfertDeParkAParcComponent },
          { path: 'réception_des_bons_de_carburants', component: ReceptionBonsCarburantsComponent },
          { path: 'transfert_vers_structure', component: TransfertVersStructureComponent },
          { path: 'consommation_du_carburant', component: ConsommationCarburantComponent },
          { path: 'retour_de_carburant', component: RetourDeCarburantComponent },
          { path: 'etat_mensuel_(16_auto)', component: EtatMensuelComponent },
          { path: 'details_exploitation', component: DetailsExploitationComponent },
          { path: 'bon_de_commande_des_bons', component: BonCommandeDesBonsComponent },
          { path: 'recherche_affectation_des_bons', component: RechercheAffectationDesBonsComponent },
          { path: 'inventaire', component: CarburantInventaireComponent },
          { path: 'suivi', component: SuiviComponent },
          { path: 'etats_de_sortie', component: EScarburantComponent },
          { path: 'details-bon-commande-des_bons', component: DetailsBonCommandeDesBonsComponent },
          { path: 'nouveau-etat-mensuel', component: NewEtatMensuelComponent },
          { path: 'carte_plafond', redirectTo: 'affectation_des_cartes', pathMatch: 'full' },
          { path: 'nouvelle_demande_affectation_carte_plafond', component: NouvelleDemandeAffectationCartePlafondComponent },
          { path: 'gestion_des_demandes_affectations_carte_plafond', component: DemandeAffectationCartePlafondComponent },
          { path: 'historique_des_affectations_carte_plafond', component: HistoriqueAffectationCartePlafondComponent },
          { path: 'nouvelle_déclaration_de_perte_carte_plafond', component: DeclarationPerteCartePlafondComponent },
          { path: 'gestion_des_déclarations_de_perte_carte_plafond', component: GestionDeclarationPerteCarteComponent },
          { path: 'historique_des_déclarations_de_perte_carte_plafond', component: HistoriqueDeclarationPerteCartePlafondComponent },
          { path: 'nouvelle_demande_d\'annulation_carte_plafond', component: DemandeAnnulationCartePlafondComponent },
          { path: 'gestion_des_annulations_carte_plafond', component: GestionAnnulationCartePlafondComponent },
          { path: 'historique_des_demandes_d\'annulation_perte_carte_plafond', component: HistoriqueDemandeAnnulationCartePlafondComponent },
          { path: 'gestion_des_cartes_plafond', component: GestionCartePlafondComponent },
          { path: 'gestion_des_cartes_agilis_cash', component: GestionCarteAgilisCashComponent },
          { path: 'gestion_des_demandes_recharge_carte_agilis_cash', component: GestionRechargeCarteAgilisCashComponent },
          { path: 'historique_des_recharge_carte_agilis_cash', component: HistoriqueRechargeCarteAgilisCashComponent },
          { path: 'nouvelle_déclaration_de_perte_carte_agilis_cash', component: DeclarationPerteCarteAgilisCashComponent },
          { path: 'gestion_des_déclarations_de_perte_carte_agilis_cash', component: GestionDeclarationsPerteCarteAgilisCashComponent },
          { path: 'historique_des_déclarations_de_perte_carte_agilis_cash', component: HistoriqueDeclarationPerteCarteAgilisCashComponent },
          { path: 'nouvelle_demande_d\'annulation_carte_agilis_cash', component: DemandeAnnulationCarteAgilisCashComponent },
          { path: 'gestion_des_demandes_annulation_carte_agilis_cash', component: GestionAnnulationCarteAgilisCashComponent },
          { path: 'historique_des_demandes_annulation_carte_agilis_cash', component: HistoriqueAnnulationCarteAgilisCashComponent },
          { path: 'gestion_des_cartes_jocker', component: GestionCartesJockerComponent },
          { path: 'nouvelle_demande_affectation_carte_jocker', component: NouvelleDemandeAffectationCarteJockerComponent },
          { path: 'gestion_affectation_des_cartes_jocker', component: GestionAffectationCarteJockerComponent },
          { path: 'historique_affectation_des_cartes_jocker', component: HistoriqueAffectationCarteJockerComponent },
          { path: 'nouvelle_demande_désaffectation_des_cartes_jocker', component: NouvelleDemandeDesaffectationCarteJockerComponent },
          { path: 'gestion_demande_désaffectation_des_cartes_jocker', component: GestionDemandeDesaffectationCarteJockerComponent },
          { path: 'historique_désaffectation_des_cartes_jocker', component: HistoriqueDesaffectationCarteJockerComponent },
          { path: 'nouvelle_déclaration_de_perte_carte_jocker', component: NewDeclarationPerteCarteComponent },
          { path: 'gestion_des_déclarations_de_perte_carte_jocker', component: GestionDeclarationPerteCarteJockerComponent },
          { path: 'historique_des_déclarations_de_perte_carte_jocker', component: HistoriqueDeclarationPerteCarteJockerComponent },
          { path: 'recharge_quota_mensuel', component: RechargeQuotaMensuelComponent },
          { path: 'historique_recharge_quota_mensuel', component: HistoriqueRechargeQuotaMensuelComponent },
        ]
      },
      {
        path: 'achat', component: AchatComponent, children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
          { path: 'gestion_bons_commande', component: GestionBonCommandeComponent },
          { path: 'details_bons_de_commandes', component: DetailsBonDeCommandeComponent },
          { path: 'marchés', component: MarchesComponent },
          { path: 'budget', component: BudgetComponent },
        ]
      },
      {
        path: 'stock', component: StockComponent, children: [
          { path: '', redirectTo: 'bon_de_sortie_pour_bon_de_travail', pathMatch: 'full' },
          { path: 'bon_de_sortie_pour_bon_de_travail', component: BonSortieBonTravailComponent },
          { path: 'transfert_du_magasin', component: TransfertMagasinComponent },
          { path: 'retour_d\'une_structure', component: RetourStructureComponent },
          { path: 'régulation_du_stock', component: RegulationStockComponent },
          { path: 'inventaire_du_stock', component: InventaireStockComponent },
          { path: 'etats_de_sortie', component: ESstockComponent },
          { path: 'transfert_vers_magasin', component: TransfertVersMagasinComponent },
          { path: 'bon_de_sortie_pour_structure', component: BonSortiePourStructureComponent },
          { path: 'réception_des_fournisseurs', component: ReceptionFournisseurComponent },
          { path: 'réception_d\'un_atelier', component: ReceptionAtelierComponent },
          { path: 'transfert_parc_vers_parc', component: TransfertParcVersParcComponent },
          { path: 'historique_regulation', component: HistoriqueRegulationComponent },
          { path: 'alerting-stock', component: AlertingStockComponent },
          { path: 'alerting-vehicule', component: AlertVehiculeComponent },

        ]
      },
      {
        path: 'maintenance_et_réparation', component: MaintenanceEtReparationComponent, children: [
          { path: '', redirectTo: 'demande_d\'intervention', pathMatch: 'full' },
          { path: 'gestion_demande_d\'intervention', component: GestionDemandeInterventionComponent },
          { path: 'gestion_bons_travail', component: GestionBonTravailComponent },
          { path: 'sorties_des_véhicules', component: SortieDesVehiculesComponent },
          { path: 'etats_de_sortie', component: ESmaintenanceReparationComponent },
          { path: '', redirectTo: 'demande_d\'intervention', pathMatch: 'full' },
          { path: 'gestion_demande_d\'intervention', component: GestionDemandeInterventionComponent },
          { path: 'gestion_bons_travail', component: GestionBonTravailComponent },
          { path: 'sorties_des_véhicules', component: SortieDesVehiculesComponent },
          { path: 'etats_de_sortie', component: ESmaintenanceReparationComponent },
          { path: 'historique_vehicule', component: HistoriqueMaintenanceComponent },

        ]
      },
      {
        path: 'reférentiel', component: ReferentielComponent, children: [
          { path: '', redirectTo: 'général', pathMatch: 'full' },
          {
            path: 'général', component: GeneralComponent, children: [
              { path: '', redirectTo: 'découpage_administratif', pathMatch: 'full' },
              { path: 'découpage_administratif', component: DecoupageAdministratifComponent },
              { path: 'articles', component: ArticlesComponent },
              { path: 'experts', component: ExpertsComponent },
              { path: 'opérations_réparation', component: OperationReparationComponent },
              {
                path: 'paramètres_généraux',
                component: ParametresGenerauxComponent
              },
              { path: 'fournisseurs', component: FournisseursComponent },
              { path: 'paramètres_véhicules', component: ParametresVehiculesComponent },
              { path: 'lieuParking', component: LieuParkingComponent },
            ]
          },

          {
            path: 'spécifique', component: SpecifiqueComponent, children: [
              {
                path: 'structure_administrative',
                component: StructureAdministrativeComponent
              }, {
                path: 'unite_gestion_parc',
                component: UniteGestionParcComponent
              }, {
                path: 'details_personnel',
                component: DetailsPersonnelComponent
              },
              { path: 'etat_de_stock', component: EtatStockComponent },
              { path: 'bénéficiaire_des_emprunts', component: BeneficiaireEmpruntsComponent },
            ]
          },
        ]
      },

      {
        path: 'administration', component: AchatComponent, children: [
          { path: '', redirectTo: 'création_des_utilisateurs', pathMatch: 'full' },
          { path: 'création_des_utilisateurs', component: CreationUtilisateursComponent },
          { path: 'groupes_des_utilisateurs', component: GroupesUtilisateursComponent },
          { path: 'messages_applicatifs', component: MessagesApplicatifsComponent },
          { path: 'alertes', component: AlertesComponent },
          { path: 'traçabilité', component: TracabiliteComponent },
          { path: 'parametres_application', component: ParametresApplicationComponent },
          { path: 'gps', component: GpsComponent },
        ]
      },

      { path: 'exploitation', component: ExploitationComponent },
      { path: 'ordres_de_mission', component: OrdresDeMissionComponent },
      { path: 'carburant', component: CarburantComponent },
      { path: 'achat', component: AchatComponent },
      { path: 'stock', component: StockComponent },
      { path: 'maintenance_et_réparation', component: MaintenanceEtReparationComponent },
      { path: 'reférentiel', component: ReferentielComponent },
      { path: 'administration', component: AdministrationComponent },
      { path: 'messages', component: MessageComponent }
    ]
  },
  { path: 'login', component: LogInComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), HomePageModule, MatSidenavModule, MatButtonModule, CommonModule, MatTreeModule, MatIconModule, MatBadgeModule, MatExpansionModule, MatFormFieldModule, MatMenuModule, MalihuScrollbarModule, NgxUiLoaderModule],
  exports: [RouterModule],
  declarations: [HomePageComponent],
})
export class AppRoutingModule {
}
