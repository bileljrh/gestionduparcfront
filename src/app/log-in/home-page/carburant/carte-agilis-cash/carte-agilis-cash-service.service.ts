import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NewRechargeCarteAgilisCash} from '../gestion-affectation/gestion-recharge-carte-agilis-cash/new-recharge-carte-agilis-cash';
import {DemandeAnnulationCarteAgilisCash} from './demande-annulation-carte-agilis-cash/demande-annulation-carte-agilis-cash';
import {HistoriqueDemandeAnnulationCarteAgilisCash} from './gestion-annulation-carte-agilis-cash/historique-demande-annulation-carte-agilis-cash';
import {NewCarteAgilisCash} from '../gestion-cartes/gestion-carte-agilis-cash/new-carte-agilis-cash';
import {ListCarteAgilisCash} from '../gestion-cartes/gestion-carte-agilis-cash/list-carte-agilis-cash';
import {ListHistoriqueRechargeCarteAgilisCash} from './historique-recharge-carte-agilis-cash/list-historique-recharge-carte-agilis-cash';
import {DeclarationPerteCarteAgilisCash} from './gestion-declarations-perte-carte-agilis-cash/declaration-perte-carte-agilis-cash';
import {NewDeclarationPerteCarteAgilisCash} from './declaration-perte-carte-agilis-cash/new-declaration-perte-carte-agilis-cash';
import {SelectVehicule} from '../../administratif/vehicules/select-vehicule';
import {environment} from '../../../../../environments/environment.prod';
import {CarteAgilisCashTabData} from './carte-agilis-cash-tab-data';
import {RechargeCarteAgilisCashTabData} from '../gestion-affectation/gestion-recharge-carte-agilis-cash/recharge-carte-agilis-cash-tab-data';

@Injectable({
  providedIn: 'root'
})
export class CarteAgilisCashServiceService {
  

  serverURL = environment.serverUrl;

  constructor(private  http: HttpClient) {
  }

  createNewRechargeRequestCarteAgilisCash(newRechargeCarteAgilisCash: NewRechargeCarteAgilisCash): Observable<any> {
    return this.http.post<any>(this.serverURL + '/new_recharge_carte_agilis_cash/', newRechargeCarteAgilisCash);
  }

  deleteSelectedRechargeCarteAgilisCash(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/recharge_carte_agilis_cash/' + id);
  }

  modifySelectedRechargeCarteAgilisCash(newRechargeCarteAgilisCash: NewRechargeCarteAgilisCash): Observable<any> {
    return this.http.put<any>(this.serverURL + '/recharge_carte_agilis_cash', newRechargeCarteAgilisCash);
  }

  getListHistoriqueCarteAgilisCash(): Observable<ListHistoriqueRechargeCarteAgilisCash[]> {
    return this.http.get<ListHistoriqueRechargeCarteAgilisCash[]>(this.serverURL + '/historique_recharge_carte_agilis_cash');
  }

  deleteSelectedHistoriqueRechargeCarteAgilisCash(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/historique_recharge_carte_agilis_cash/' + id);
  }

  createOneDeclarationPerteCarteAgilisCash(declarationPerteCarteAgilisCash: NewDeclarationPerteCarteAgilisCash): Observable<any> {
    return this.http.post<any>(this.serverURL + '/declaration_perte_carte_agilis_cash', declarationPerteCarteAgilisCash);
  }

  confirmDeclarationPerteCarteAgilisCash(id: string): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirm_declaration_perte_carte_agilis_cash', id);
  }

  deleteOneDeclarationPerteCarteAgilisCash(id: string): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/declaration_perte_carte_agilis_cash/' + id);
  }

  modifyOneDeclarationPerteCarteAgilisCash(data: NewDeclarationPerteCarteAgilisCash): Observable<any> {
    return this.http.put<any>(this.serverURL + '/declaration_perte_carte_agilis_cash', data);
  }

  createNewDemandeAnnulationCarteCarburant(data: DemandeAnnulationCarteAgilisCash): Observable<any> {
    return this.http.post<any>(this.serverURL + '/demande_annulation_carte_agilis_cash', data);
  }

  deleteDemandeAnnulationCarteAgilisCash(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/historique_annulation_carte_agilis_cash/' + id);
  }

  getListCarteAgilisCash(): Observable<ListCarteAgilisCash[]> {
    return this.http.get<ListCarteAgilisCash[]>(this.serverURL + '/carte_agilis_cash_not_recharged');
  }


  getListCarteAgilis(): Observable<ListCarteAgilisCash[]> {
    return this.http.get<ListCarteAgilisCash[]>(this.serverURL + '/carte_Agilis');
  }



  getListAllCarteAgilisCash(): Observable<ListCarteAgilisCash[]> {
    return this.http.get<ListCarteAgilisCash[]>(this.serverURL + '/list-carte-agilis-nest-pas-encore-annuler');
  }

  getHistoriqueDeclarationPerteCarteAgilisCashByConfirmation(confirmed: string): Observable<DeclarationPerteCarteAgilisCash[]> {
    const params = new HttpParams().set('confirmed', confirmed);
    return this.http.get<DeclarationPerteCarteAgilisCash[]>(this.serverURL + '/list_declaration_perte_carte_agilis_cash', {params});
  }

  getHistoriqueDemandeAnnulationCarteAgilisCashByConfirmation(confirmed: string): Observable<HistoriqueDemandeAnnulationCarteAgilisCash[]> {
    return this.http.get<HistoriqueDemandeAnnulationCarteAgilisCash[]>(this.serverURL + '/list_demande_annulation_carte_agilis_cash/' + confirmed);
  }

  confirmDemandeAnnulationCarteAgilisCash(id: number): Observable<any> {
    return this.http.put<any>(this.serverURL + '/demande_annulation_carte_agilis_cash/'+id,id);
  }

  //    new request =============================================================

  getTotalNumberAnnulationCarteAgilisCash(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_number_annulation_carte_agilis_agilis_cash');
  }
  getPaginationDemandesAffectationCarteJocker(confirmed:string,
    page: string, limit: string): Observable<DemandeAnnulationCarteAgilisCash[]> {
   const params = new HttpParams().set('confirmed',confirmed).set('page', page).set('limit', limit);
   return this.http.get<DemandeAnnulationCarteAgilisCash[]>(this.serverURL + '/pagination_annulation_carte_agilis', {params});
 }

  getSelectVehiculeByStrucutureForAgilisCash(): Observable<SelectVehicule[]> {
    return this.http.get<SelectVehicule[]>(this.serverURL + '/select_vehicule_carte_agilis_cash');
  }

  createNewCarteAgilisCash(newCarte: NewCarteAgilisCash): Observable<any> {
    return this.http.post<any>(this.serverURL + '/carte_agilis', newCarte);
  }

  modifySelectedCarteAgilisCash(newCarte: NewCarteAgilisCash): Observable<any> {
    return this.http.put<any>(this.serverURL + '/carte_agilis', newCarte);
  }

  confirmSelectedRechargeCarteAgilisCash(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirm_carte_agilis', id);
  }

  validateSelectedRechargeCarteAgilisCash(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/validate_carte_agilis', id);
  }

  getPaginationListCarteAgilisCashByTypeCarburant(typeCarburant: string, page: string, limit: string): Observable<CarteAgilisCashTabData[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('typeCarburant', typeCarburant);
    return this.http.get<CarteAgilisCashTabData[]>(this.serverURL + '/pagination_carte_agilis_cash', {params});
  }

  getTotalNumberListCarteAgilisCashByTypeCarburant(typeCarburant: string): Observable<number> {
    const params = new HttpParams().set('typeCarburant', typeCarburant);
    return this.http.get<number>(this.serverURL + '/total_number_carte_agilis_cash', {params});
  }

  getPaginationListRechargeCarteAgilisCash(page: string, limit: string): Observable<RechargeCarteAgilisCashTabData[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<RechargeCarteAgilisCashTabData[]>(this.serverURL + '/pagination_recharge_carte_agilis_cash', {params});
  }

  getTotalNumberListRechargeCarteAgilisCash(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_number_recharge_carte_agilis_cash');
  }

  deleteSelectedCarteAgilisCash(id: string) {
    return this.http.delete<number>(this.serverURL + '/carte_agilis_cash/' + id);
  }
  getListDeclarationPerteCarteAgilisCashByConfirmation(confirmed: string): Observable<DeclarationPerteCarteAgilisCash[]> {
    const params = new HttpParams().set('confirmed', confirmed);
    return this.http.get<DeclarationPerteCarteAgilisCash[]>(this.serverURL + '/list_declaration_perte_carte_agilis_cash', {params});
  }
  confirmOneDeclarationPerteCarteAgilisCash(id: number): Observable<any[]> {
    return this.http.post<any>(this.serverURL + '/confirm_declaration_perte_carte_agilis_cash', id);
  }

  modifyOneDemandeAnnulationCarteAgilis(dacac: DemandeAnnulationCarteAgilisCash): Observable<any> {
    return this.http.put<any>(this.serverURL + '/demande_annulation_agilis', dacac);
  }

  getPaginationDeclarationdespertecarteAgilis(page: string, limit: string, confirmed:string): Observable<DeclarationPerteCarteAgilisCash[]> {
    const params = new HttpParams().set('confirmed',confirmed).set('page', page).set('limit', limit);
    return this.http.get<DeclarationPerteCarteAgilisCash[]>(this.serverURL + '/pagination_declaration_perte_carteAgilis', {params});
  }

  getTotalNumberDeclarationCarteAgilis(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_number_declaration_carte_Agilis');
  }
  getuserbyid(id : number ): Observable<any> {
    return this.http.get<any>(this.serverURL +'/user/' +id)
  }
}
