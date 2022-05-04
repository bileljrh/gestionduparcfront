import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DemandeMaintenance} from './gestion-demande-intervention/demande-maintenance';
import {ListVehiculeDemandeIntervention} from './gestion-demande-intervention/list-vehicule-demande-intervention';
import {BonTravail} from './gestion-bon-travail/bon-travail';
import {environment} from '../../../../environments/environment.prod';
import { BonDeTravail } from './BonDeTravail';
import { Vehicule } from '../administratif/vehicules/vehicule';
import { FacturationBonTravail } from './FacturationBonTravail';
import { CarExit } from './sortie-des-vehicules/CarExit';
import { OperationRep } from './OperationRep';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceAndReparationServiceService {
  serverURL = environment.serverUrl;


  constructor(private  http: HttpClient) {
  }


  getListVehiculeAvailableForMaintenanceByStructure(structure: string): Observable<ListVehiculeDemandeIntervention[]> {
    return this.http.get<ListVehiculeDemandeIntervention[]>(this.serverURL + '/list_vehicule_available_for_maintenance/' + structure);
  }
//start 
  vehiculeList(): Observable<any>{
    return this.http.get<any>(this.serverURL + '/vehicule')
  }
  operationList(): Observable<any>{
    return this.http.get<any>(this.serverURL + '/listOperation')
  }

  ugpList():Observable<any>{

    return this.http.get<any>((this.serverURL + '/unite_gestion_parc'))
  }

    
  getBeneficiaire(id): Observable<any> {
    return this.http.get<any>(this.serverURL + '/beneficiare/' + id);
  }


  findstructurebyid(id): Observable<any> {
    return this.http.get<any>(this.serverURL + '/structue/' + id);
  }

  
  getVehiculeByUgp(id): Observable<any> {
    return this.http.get<any>(this.serverURL + '/vehicule_ugp/' + id);
  }


//end
  createNewDemandeMaintenance(demandeMaintenance: DemandeMaintenance): Observable<any> {
    return this.http.post<any>(this.serverURL + '/demande_maintenance', demandeMaintenance);
  }

  modifySelectedDemandeMaintenance(demandeMaintenance: DemandeMaintenance): Observable<any> {
    return this.http.put<any>(this.serverURL + '/demande_maintenance', demandeMaintenance);
  }

  annulerSelectedDemandeMaintenance(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/demande_maintenance_annulation/' + id);
  }
 
  eSelectedDemandeMaintenance(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/demande_maintenance/' + id);
  }
/*delet
  getPaginationDemandeMaintenanceList(page: string, limit: string): Observable<DemandeMaintenance[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<DemandeMaintenance[]>(this.serverURL + '/pagination_demande_maintenance', {params});
  }
  */

      
  getAllStatus(): Observable<DemandeMaintenance[]>
  {
      return this.http.get<DemandeMaintenance[]>(this.serverURL + '/list_status');
  }
  getPaginationDemandeMaintenanceList(status: string,ugp :string ,structure:string,
     page: string, limit: string): Observable<DemandeMaintenance[]> {
    const params = new HttpParams().set('status', status).set('ugp', ugp).set('structure', structure).set('page', page).set('limit', limit);
    return this.http.get<DemandeMaintenance[]>(this.serverURL + '/pagination_demande_maintenance', {params});
  }
  getTotalItemsDemandeMaintenanceList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_items_demande_maintenance');
  }
  getDemandeMaintenanceListAvailableForBonTravail(): Observable<DemandeMaintenance[]> {
    return this.http.get<DemandeMaintenance[]>(this.serverURL + '/demande_maintenance_for_bon_travail');
  }

  createNewBonTravail(bonTravail: BonTravail): Observable<any> {
    return this.http.post<any>(this.serverURL + '/bon_travail', bonTravail);
  }


  modifySelectedBonTravail(bonTravail: BonTravail): Observable<any> {
    return this.http.put<any>(this.serverURL + '/bon_travail', bonTravail);
  }

  deleteSelectedBonTravail(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/bon_travail/' + id);
  }
  
  reouvrirBonTravailCloturer(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/bontravail_cloturer/' + id);
  }

  getPaginationBonTravailList(page: string, limit: string): Observable<BonTravail[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<BonTravail[]>(this.serverURL + '/List_bon_travail', {params});
  }
 
  getTotalItemBonTravailList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_bon_travail');
  }

  genCode(): Observable<any> {
    return this.http.get<any>(this.serverURL + '/totalDemMain');
  }

  showBontravailById(id): Observable<any> {
    return this.http.get<any>(this.serverURL + '/bontravailInterne/' + id);
  }
commandeArticleForBonTravail(bonTravail: BonDeTravail): Observable<any> {
    return this.http.put<any>(this.serverURL + '/demande-piece-bon-travail', bonTravail);
  }
  getPaginationBonTravailListfilter(page: string, limit: string,mode:string,natureTravaux:string): Observable<BonTravail[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('mode',mode).set('natureTravaux',natureTravaux);
    return this.http.get<BonTravail[]>(this.serverURL + '/pagination_bon_travail_filter', {params});
  }

  getOneVehicule(id: number): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.serverURL + '/find-vehicule/'+id);
  }

  getOnDemandeMaintenance(id: number): Observable<DemandeMaintenance[]> {
    return this.http.get<DemandeMaintenance[]>(this.serverURL + '/demande-maintenance/'+id);
  }

  getOnFacturation(id: number): Observable<FacturationBonTravail[]> {
    return this.http.get<FacturationBonTravail[]>(this.serverURL + '/facturation/'+id);
  }

  listStructure(): Observable<any>{
    return this.http.get<any>(this.serverURL + '/structres')
  }

  updateDateSortie(Data: CarExit, id: number): Observable<any> {
    return this.http.put<any>(this.serverURL + '/add_sortie_vehicule_date/' + id, Data);
  }

  showAllFamille(): Observable<any> {
    return this.http.get<any>(this.serverURL + '/findFamilleReparation')
  }

  showoperationbyfamille(id: number): Observable<OperationRep[]> {
    return this.http.get<OperationRep[]>(this.serverURL + '/operation-reparation/'+id);
  }

  getPaginationHistoriqueVehiculeList(
    ugp : string ,structure :string ,page: string, limit: string): Observable<DemandeMaintenance[]> {
   const params = new HttpParams().set('ugp', ugp).set('structure', structure).set('page', page).set('limit', limit);
   return this.http.get<DemandeMaintenance[]>(this.serverURL + '/pagination_historique_demande_maintenance', {params});
 }

modifySelectedDemandeMaintenanceHistorique(demandeMaintenance: DemandeMaintenance): Observable<any> 
{
  return this.http.put<any>(this.serverURL + '/pagination_historique_demande_maintenance', demandeMaintenance);
}


deleteSelectedDemandeMaintenance(id: number): Observable<any> {
  return this.http.delete<any>(this.serverURL + '/pagination_historique_demande_maintenance/' + id);
}

}
