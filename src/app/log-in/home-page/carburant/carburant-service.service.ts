import {Injectable} from '@angular/core';
import {ListBeneficiairesExternes} from './list-beneficiaires-externes';
import {ListBeneficiairesInternes} from './list-beneficiaires-internes';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DistributionFonctionTabData} from './distribution-fonction-tab-data';
import {ModifyDistributionFonction} from './modify-distribution-fonction';
import {NouvelleDistributionCarburantFonction} from './nouvelle-distribution-carburant-fonction/nouvelle-distribution-carburant-fonction';
import {DistributionServiceTabData} from './distribution-service-tab-data';
import {VehiculeServiceList} from './carte-plafond/demande-affectation-carte-plafond/vehicule-service-list';
import {CartePlafond} from './carte-plafond/carte-plafond';
import {DeclarationPerteCartePlafond} from './carte-plafond/declaration-perte-carte-plafond/declaration-perte-carte-plafond';
import {DemandeAnnulationCartePlafond} from './carte-plafond/demande-annulation-carte-plafond/demande-annulation-carte-plafond';
import {HistoriqueDemandeAnnulationCartePlafond} from './carte-plafond/historique-demande-annulation-carte-plafond/historique-demande-annulation-carte-plafond';
import {environment} from '../../../../environments/environment.prod';
import {ListCarteAgilisCash} from './gestion-cartes/gestion-carte-agilis-cash/list-carte-agilis-cash';
import { DeclarationPerteCartejocker } from './carte-jocker/gestion-declaration-perte-carte-jocker/new-declaration-perte-carte/declaration-perte-carte-jocker';
import { RechargeSousCompte } from './recharge-sous-compte/RechargeSousCompte';
import { RechargeCarburantCompensationModule } from './recharge-carburant-compensation/recharge-carburant-compensation/recharge-carburant-compensation.module';
import { ModificarionRechargeCarburantCompensationModule } from './recharge-carburant-compensation/modify-recharge-carburant-compensation/modificarion-recharge-carburant-compensation/modificarion-recharge-carburant-compensation.module';
import { HistoriqueOperationRecharge } from './recharge-sous-compte/historique-operation-des-recharge/HistoriqueOperationRecharge';
import { RechargeQuotaMensuel } from './recharge-des-carburants-de-fonction/Recharge quota mensuel';
import { RechargeComplementaireModule } from './recharge-complementaire/recharge-complementaire/recharge-complementaire.module';
import { ModificationRechargeComplementaireModule } from './recharge-complementaire/modify-recharge-complementaire/modification-recharge-complementaire/modification-recharge-complementaire.module';
import { HistoriqueRechargeQM } from './historique-recharge-quota-mensuel/HistoriqueRechargeQM';
import { HistoriqueRechargeComplementaireModule } from './recharge-complementaire/historique-recharge-complementaire/historique-recharge-complementaire/historique-recharge-complementaire.module';
import { HistoriqueRechargeCompensationModule } from './recharge-carburant-compensation/historique-recharge-compensation/historique-recharge-compensation.module';


@Injectable({
  providedIn: 'root'
})
export class CarburantServiceService {
 
  
  serverURL = environment.serverUrl;

  constructor(private  http: HttpClient) {
  }

  getListBeneficiairesInternes(): Observable<ListBeneficiairesInternes[]> {
    return this.http.get<ListBeneficiairesInternes[]>(this.serverURL + '/list_beneficiaires_internes');
  }

  getListBeneficiairesExternes(): Observable<ListBeneficiairesExternes[]> {
    return this.http.get<ListBeneficiairesExternes[]>(this.serverURL + '/list_beneficiaires_externes');
  }

  getListDistributionsCarburant2FonctionBySource(source: string): Observable<DistributionFonctionTabData []> {
    return this.http.get<DistributionFonctionTabData []>(this.serverURL + '/list_distributions_carburant_fonction/' + source);
  }

  modifyOneDistributionsCarburant2Fonction(data: ModifyDistributionFonction): Observable<any> {
    return this.http.post<any>(this.serverURL + '/distributions_carburant_fonction', data);
  }

  createNewDistributionCarburant2Fonction(data: NouvelleDistributionCarburantFonction): Observable<any> {
    return this.http.post<any>(this.serverURL + '/new_distribution_carburant_fonction', data);
  }

  deleteOneDistributionCarburant2Fonction(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/delete_distribution_carburant_fonction/' + id);
  }

  getAllEtatMensuels(): Observable<any> {
    return this.http.get<any>(this.serverURL + '/etat_mensuels');
  }

  validateOneEtatMensuels(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/validate_etat_mensuels/', id);
  }

  unvalidateOneEtatMensuels(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/unvalidate_etat_mensuels/', id);
  }

  confirmOneEtatMensuels(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirm_etat_mensuels/', id);
  }

  unconfirmOneEtatMensuels(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/unconfirm_etat_mensuels/', id);
  }

  modifyOneEtatMensuels(data: any): Observable<any> {
    return this.http.put<any>(this.serverURL + '/etat_mensuel', data);
  }

  createNewEtatMensuel(data: any): Observable<any> {
    return this.http.post<any>(this.serverURL + '/etat_mensuel', data);
  }

  deleteOneEtatMensuels(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/etat_mensuel/' + id);
  }

  getEtatMensuelsByMonthAndType(type: string, month: string): Observable<any> {
    return this.http.get<any>(this.serverURL + '/etat_mensuel/' + type + '/' + month);
  }

  getDistributionsCarburant2FonctionByMonthAndType(type: string, month: string): Observable<any> {
    return this.http.get<any>(this.serverURL + '/distributions_carburant_fonction/' + type + '/' + month);
  }

  getValidatedEtatMensuelList(): Observable<DistributionServiceTabData[]> {
    return this.http.get<DistributionServiceTabData[]>(this.serverURL + '/validated_etat_mensuel');
  }

  createNewDistribution2Service(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/new_distribution_service', id);
  }

  getListDistributionsCarburant2ServiceBySource(source: string): Observable<DistributionServiceTabData[]> {
    return this.http.get<DistributionServiceTabData[]>(this.serverURL + '/list_distributions_carburant_service/' + source);
  }

  deleteOneDistributionCarburant2Service(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/distributions_carburant_service/' + id);
  }

  getListVehiculesService(): Observable<VehiculeServiceList[]> {
    return this.http.get<VehiculeServiceList[]>(this.serverURL + '/list_vehicule_service');
  }

  getListVehiculesServiceWithNoCartePlafond(): Observable<VehiculeServiceList[]> {
    return this.http.get<VehiculeServiceList[]>(this.serverURL + '/list_vehicule_service_with_no_cart_plafond');
  }


  modifySelectedAffectationCartePlafond(idCartePlafond: number, idVehicule: number): Observable<any> {
    return this.http.put<any>(this.serverURL + '/affectation_carte_plafond/' + idCartePlafond, idVehicule);
  }

  getListDeclarationPerteCartePlafondByConfirmation(confirmation: string): Observable<DeclarationPerteCartePlafond[]> {
    const params = new HttpParams().set('confirmation', confirmation);
    return this.http.get<DeclarationPerteCartePlafond[]>(this.serverURL + '/list_declaration_perte_carte_plafond', {params});
  }

  deleteOneDeclarationPerteCartePlafond(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/declaration_perte_carte_plafond/' + id);
  }

  getHistoriqueDemandeAnnulationCartePlafondByConfirmation(confirmation: string): Observable<HistoriqueDemandeAnnulationCartePlafond[]> {
    const params = new HttpParams().set('confirmation', confirmation);
    return this.http.get<HistoriqueDemandeAnnulationCartePlafond[]>(this.serverURL + '/historique_demande_annulation_carte_plafond', {params});
  }

  deleteOneDemandeAnnulationCartePlafond(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/demande_annulation_carte_plafond/' + id);
  }

  confirmOneDeclarationPerteCartePlafond(id: number): Observable<any[]> {
    return this.http.post<any>(this.serverURL + '/confirm_declaration_perte_carte_plafond', id);
  }

  confirmSelectedDemandeAnnulationCarteCarburant(id: number): Observable<any[]> {
    return this.http.post<any>(this.serverURL + '/confirm_demande_annulation_carte_plafond', id);
  }

  modifyOneDemandeAnnulationCarteCarburant(data: DemandeAnnulationCartePlafond): Observable<any[]> {
    return this.http.put<any>(this.serverURL + '/demande_annulation_carte_plafond', data);
  }

  deleteOneCartePlafond(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/delete_carte_plafond/' + id);
  }


  getPaginationListCarteAgilisCashByTypeCarburant(typeCarburant: string, page: string, limit: string): Observable<ListCarteAgilisCash[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('typeCarburant', typeCarburant);
    return this.http.get<ListCarteAgilisCash[]>('/pagination_list_carte_agilis_cash', {params});
  }


  getTotalNumberListCartePlafondByTypeCarburant(typeCarburant: string): Observable<number> {
    const params = new HttpParams().set('typeCarburant', typeCarburant);
    return this.http.get<number>(this.serverURL + '/total_number_list_carte_plafond', {params});
  }

  deleteSelectedCartePlafond(id): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/carte_plafond/' + id);
  }


  getListCartePlafond(): Observable<CartePlafond[]> {
    return this.http.get<CartePlafond[]>(this.serverURL + '/list_carte_plafond');
  }

  deleteHistoriqueDemandeAnnulationCartePlafond(id: number): Observable<CartePlafond[]> {
    return this.http.get<CartePlafond[]>(this.serverURL + '/historique_demande_annulation_carte_plafond/' + id);
  }

  getListDeclarationPerteCarteJockerByConfirmation(confirmation: string): Observable<DeclarationPerteCartejocker[]> {
    const params = new HttpParams().set('confirmation', confirmation);
    return this.http.get<DeclarationPerteCartejocker[]>(this.serverURL + '/list_declaration_perte_carte_jocker', {params});
  }

  deleteOneDeclarationPerteCarteJocker(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/declaration_perte_carte_jocker/' + id);
  }
  confirmOneDeclarationPerteCarteJocker(id: number): Observable<any[]> {
    return this.http.post<any>(this.serverURL + '/confirm_declaration_perte_carte_jocker', id);
  }

  /********/
  
  getAllRechargeCarburantCompensationModules(): Observable<RechargeCarburantCompensationModule[]>{
    return this.http.get<RechargeCarburantCompensationModule[]>(this.serverURL + '/list_recharge_carburant_compensation');
    }

  getRechargeCarburantCompensationModuleById(id: number): Observable<RechargeCarburantCompensationModule>{
    return this.http.get<RechargeCarburantCompensationModule>(this.serverURL + '/list_recharge_carburant_compensation'+ id);
    }
    
    createRechargeCarburantCompensationModule(RechargeCarburantCompensationModule: RechargeCarburantCompensationModule): Observable<any> {
    return this.http.post<any>(this.serverURL + '/creation_recharge_carburant_compensation', RechargeCarburantCompensationModule);
  }
    
  updateRechargeCarburantCompensationModulel(modificarionRechargeCarburantCompensationModule: ModificarionRechargeCarburantCompensationModule): Observable<any> {
  return this.http.put<any>(this.serverURL + '/modify_recharge_carburant_compensation', modificarionRechargeCarburantCompensationModule);
}

  
  deleteRechargeCarburantCompensationModule(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/delete_recharge_carburant_compensation/' + id);
  }

      getPaginationRechargeCarburantCompensationModuleList(cartePlafond: string, page: string, limit: string): Observable<RechargeCarburantCompensationModule[]> {
        const params = new HttpParams().set('cartePlafond',cartePlafond).set('page', page).set('limit', limit);
        return this.http.get<RechargeCarburantCompensationModule[]>(this.serverURL + '/pagination_recharge_carburant_compensation_filtrage', {params});
        }

  getTotalNumberRechargeCarburantCompensationModule(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_number_recharge_carburant_compensation');
  }

  confirmSelectedRechargeCarburantCompensationModule(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirm_recharge_carburant_compensation', id);
  }

  validateSelectedRechargeCarburantCompensationModule(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/validate_recharge_carburant_compensation', id);
  }
  getTotalDemandeRechargeSousCompte(page: string, limit: string): Observable<RechargeSousCompte[]> 
  {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<RechargeSousCompte[]>(this.serverURL + '/pagination_demande_recharge_sous_compte', { params });
  }

  deleteDemandeRechargeSousCompte(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/demande_recharge_sous_compte/' + id);
  }
  confirmSelectedDemandeRechargeSousCompte(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirm_demande_recharge_sous_compte', id);
  }

  validateSelectedDemandeRechargeSousCompte(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/validate_demande_recharge_sous_compte', id);
  }

  createDemandeRechargeSousCompte(data: any): Observable<any> {
    return this.http.post<any>(this.serverURL + '/creation_demande_recharge_sous_compte', data);
  }
/*=========================Recharge quota mensuel==========================*/
createRechargeQuotaMensuel(rechargeQuotaMensuel: RechargeQuotaMensuel): Observable<any> {
  return this.http.post<any>(this.serverURL + '/creation_recharge_quota_mensuel', rechargeQuotaMensuel);
}
  confirmRechargeQuotaMensuel(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirm_recharge_quota_mensuel', id);
  }

  validateRechargeQuotaMensuel(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/validate_recharge_quota_mensuel', id);
  }

  getTotalRechargeQuotaMensuel(cartePlafond: string , page: string, limit: string): Observable<RechargeQuotaMensuel[]> 
  {
    const params = new HttpParams().set('cartePlafond',cartePlafond).set('page', page).set('limit', limit);
    return this.http.get<RechargeQuotaMensuel[]>(this.serverURL + '/pagination_recharge_quota_mensuel', { params });
  }

  getTotalHistoriqueRechargeQM(page: string, limit: string): Observable<HistoriqueRechargeQM[]> 
  {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<HistoriqueRechargeQM[]>(this.serverURL + '/pagination_historique_recharge_quota_mensuel', { params });
  }

  getNbNotif(): Observable<number>{
    return this.http.get<number>(this.serverURL+ '/notif_ajout_quota_mensuel');
  }

/*============================*/




  
  /********/
  
  getAllRechargeComplementaireModules(): Observable<RechargeComplementaireModule[]>{
    return this.http.get<RechargeComplementaireModule[]>(this.serverURL + '/list_recharge_complementaire');
    }

  getRechargeComplementaireModuleById(id: number): Observable<RechargeComplementaireModule>{
    return this.http.get<RechargeComplementaireModule>(this.serverURL + '/list_recharge_complementaire'+ id);
    }
    
    createRechargeComplementaireModule(RechargeComplementaireModule: RechargeComplementaireModule): Observable<any> {
    return this.http.post<any>(this.serverURL + '/creation_recharge_complementaire', RechargeComplementaireModule);
  }
    
  updateRechargeComplementaireModulel(modificarionRechargeComplementaireModule: ModificationRechargeComplementaireModule): Observable<any> {
  return this.http.put<any>(this.serverURL + '/modify_recharge_complementaire', modificarionRechargeComplementaireModule);
}

  
  deleteRechargeComplementaireModule(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/delete_recharge_complementaire/' + id);
  }


      getPaginationRechargeComplementaireModuleList(cartePlafond:string, page: string, limit: string): Observable<RechargeComplementaireModule[]> {
        const params = new HttpParams().set('cartePlafond',cartePlafond).set('page', page).set('limit', limit);
          return this.http.get<RechargeComplementaireModule[]>(this.serverURL + '/pagination_recharge_complementaire_filtrage', {params});
        }

  getTotalNumberRechargeComplementaireModule(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_number_recharge_complementaire');
  }

  confirmSelectedRechargeComplementaireModule(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirm_recharge_complementaire', id);
  }

  validateSelectedRechargeComplementaireModule(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/validate_recharge_complementaire', id);
  }
  getTotalHistoriqueDemandeRechargeSousCompte(page: string, limit: string): Observable<HistoriqueOperationRecharge[]> 
  {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<HistoriqueOperationRecharge[]>(this.serverURL + '/pagination_historique_recharge_operation', { params });
  }
  deleteHistoriqueDemandeRechargeSousCompte(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/delete_historique_recharge/' + id);
  }
  notifValid
  getNombreNotif(): Observable<number>{
    return this.http.get<number>(this.serverURL+ '/notif');
  }

  getNombreNotifValid(): Observable<number>{
    return this.http.get<number>(this.serverURL+ '/notifValid');
  }



  
  getPaginationRechargeComplementaireHistoriqueModuleList( page: string, limit: string): Observable<RechargeComplementaireModule[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
      return this.http.get<RechargeComplementaireModule[]>(this.serverURL + '/pagination_recharge_complementaire_historique', {params});
    }

    
    getPaginationRechargeCarburantCompensationHistoriqueModuleList( page: string, limit: string): Observable<RechargeCarburantCompensationModule[]> {
      const params = new HttpParams().set('page', page).set('limit', limit);
      return this.http.get<RechargeCarburantCompensationModule[]>(this.serverURL + '/pagination_recharge_carburant_compensation_historique', {params});
      }







      getTotalHistoriqueDemandeRechargeComplementaire(page: string, limit: string): Observable<HistoriqueRechargeComplementaireModule[]> 
  {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<HistoriqueRechargeComplementaireModule[]>(this.serverURL + '/pagination_historique_recharge_complementaire', { params });
  }
  deleteHistoriqueDemandeRechargeComplementaire(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/delete_historique_recharge_complementaire/' + id);
  }
  getNombreNotifComplementaire(): Observable<number>{
    return this.http.get<number>(this.serverURL+ '/notif_complementaire');
  }

  getNombreNotifValidComplementaire(): Observable<number>{
    return this.http.get<number>(this.serverURL+ '/notifValid_complementaire');
  }









  getTotalHistoriqueDemandeRechargeCompensation(page: string, limit: string): Observable<HistoriqueRechargeCompensationModule[]> 
  {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<HistoriqueRechargeCompensationModule[]>(this.serverURL + '/pagination_historique_recharge_compensation', { params });
  }
  deleteHistoriqueDemandeRechargeCompensation(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/delete_historique_recharge_compensation/' + id);
  }
  getNombreNotifCompensation(): Observable<number>{
    return this.http.get<number>(this.serverURL+ '/notif_compensation');
  }

  getNombreNotifValidCompensation(): Observable<number>{
    return this.http.get<number>(this.serverURL+ '/notifValid_compensation');
  }

}
