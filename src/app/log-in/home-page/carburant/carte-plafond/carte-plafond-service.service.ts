import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NouvelleCartePlafond} from '../gestion-cartes/gestion-carte-plafond/nouvelle-carte-plafond';
import {environment} from '../../../../../environments/environment.prod';
import {SelectVehicule} from '../../administratif/vehicules/select-vehicule';
import {AffectationCarteTabData} from './affectation-carte-tab-data';
import {HistoriqueAffectationCartePlafond} from './historique-affectation-carte-plafond/historique-affectation-carte-plafond';
import {DeclarationPerteCartePlafond} from './declaration-perte-carte-plafond/declaration-perte-carte-plafond';
import {DemandeAnnulationCartePlafond} from './demande-annulation-carte-plafond/demande-annulation-carte-plafond';
import {CartePlafondTabData} from '../gestion-cartes/gestion-carte-plafond/carte-plafond-tab-data';

@Injectable({
  providedIn: 'root'
})
export class CartePlafondServiceService {
  serverURL = environment.serverUrl;

  constructor(private http: HttpClient) {
  }

  getListCartePlafondWithNoVehicule(): Observable<NouvelleCartePlafond[]> {
    return this.http.get<NouvelleCartePlafond[]>(this.serverURL + '/Card-with-no-card-Plafond');
  }

  
  createNewDemandAffectationCartePlafond(hacp: HistoriqueAffectationCartePlafond): Observable<HistoriqueAffectationCartePlafond> {
    return this.http.post<HistoriqueAffectationCartePlafond>(this.serverURL + '/demande_affectation_carte_plafond', hacp);
  }

  getPaginationListCartePlafondByTypeCarburant(typeCarburant: string, page: string, limit: string): Observable<CartePlafondTabData[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('typeCarburant', typeCarburant);
    return this.http.get<CartePlafondTabData[]>(this.serverURL + '/pagination_list_carte_plafond', {params});
  }

  getTotalNumberListCartePlafondByTypeCarburant(typeCarburant: string): Observable<number> {
    const params = new HttpParams().set('typeCarburant', typeCarburant);
    return this.http.get<number>(this.serverURL + '/total_number_list_carte_plafond', {params});
  }

  createNewCartePlafond(nouvelleCartePlafond: NouvelleCartePlafond): Observable<number> {
    return this.http.post<number>(this.serverURL + '/carte_plafond', nouvelleCartePlafond);
  }

  modifySelectedCartePlafond(newCarte: NouvelleCartePlafond): Observable<any> {
    return this.http.put<any>(this.serverURL + '/carte_plafond', newCarte);
  }

  deleteSelectedCartePlafond(id): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/carte_plafond/' + id);
  }

  getListVehiculeWithNoCartePlafond(): Observable<SelectVehicule[]> {
    return this.http.get<SelectVehicule[]>(this.serverURL + '/carte_plafond_vehicule');
  }

  /*

  getPaginationListDemandeAffectationCartePlafondByEtat(pageIndex: string, pageSize: string, typeCarburant: string): Observable<AffectationCarteTabData[]> {
    const params = new HttpParams().set('page', pageIndex).set('limit', pageSize).set('typeCarburant', typeCarburant);
    return this.http.get<AffectationCarteTabData[]>(this.serverURL + '/pagination_demande_affectation_carte_plafond', {params});
  }
*/

getPaginationListDemandeAffectationCartePlafondByEtat(pageIndex: string, pageSize: string, selectedTypeCarburant: string): Observable<AffectationCarteTabData[]> {
  const params = new HttpParams().set('page', pageIndex).set('limit', pageSize).set('selectedTypeCarburant', selectedTypeCarburant);
  return this.http.get<AffectationCarteTabData[]>(this.serverURL + '/pagination_historique_affectation_carte_plafond', {params});
}

  getTotalNumberDemandesAffectationCartesPlafond(typeCarburant: string): Observable<number> {
    const params = new HttpParams().set('typeCarburant', typeCarburant);
    return this.http.get<number>(this.serverURL + '/total_number_affectation_cartes_plafond', {params});
  }

  deleteDemandAffectationCartePlafond(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/demande_affectation_carte_plafond/' + id);
  }

  confirmDemandeAffectationCartePlafond(idCarte: number): Observable<number> {
    return this.http.post<number>(this.serverURL + '/confirm_demande_affectation_cartes_plafond/'+idCarte,idCarte);
  }

  validateDemandeAffectationCartePlafond(idCarte: number): Observable<number> {
    return this.http.post<number>(this.serverURL + '/validate_demande_affectation_cartes_plafond/'+idCarte, idCarte);
  }

// ========================
  getTotalItemsHistoriqueAffectationCartesPlafondBySelection(typeCarburant: string): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_items_historique_affectation_cartes_plafond/' + typeCarburant);
  }

  getPaginationHistoriqueAffectationCartePlafond(pageIndex: string, pageSize: string, selectedTypeCarburant: string): Observable<HistoriqueAffectationCartePlafond[]> {
    const params = new HttpParams().set('page', pageIndex).set('limit', pageSize).set('selectedTypeCarburant', selectedTypeCarburant);
    return this.http.get<HistoriqueAffectationCartePlafond[]>(this.serverURL + '/pagination_historique_affectation_carte_plafond', {params});
  }

  deleteSelectedHistoriqueAffectationCartePlafond(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/historique_affectation_carte_plafond/' + id);
  }

  getListCartePlafond(): Observable<NouvelleCartePlafond[]> {
    return this.http.get<NouvelleCartePlafond[]>(this.serverURL + '/carte_plafond');
  }

  //Test 
  getListCartePlafondDisponible(): Observable<NouvelleCartePlafond[]> {
    return this.http.get<NouvelleCartePlafond[]>(this.serverURL + '/list-carte-nest-pas-encore-annuler');
  }
  
  createNewDeclarationPerteCartePlafond(data: DeclarationPerteCartePlafond): Observable<any> {
    return this.http.post<any>(this.serverURL + '/declaration_perte_carte_plafond', data);
  }

  modifySelectedDeclarationPerteCartePlafond(data: DeclarationPerteCartePlafond): Observable<any> {
    return this.http.put<any>(this.serverURL + '/declaration_perte_carte_plafond', data);
  }

  createNewDemandeAnnulationCarteCarburant(data: DemandeAnnulationCartePlafond): Observable<any> {
    return this.http.post<any>(this.serverURL + '/demande_annulation_carte_plafond', data);
  }

  getPaginationDeclarationdespertecartePlafond(page: string, limit: string,confirmed : string): Observable<DeclarationPerteCartePlafond[]> {
    const params = new HttpParams().set('confirmed',confirmed).set('page', page).set('limit', limit);
    return this.http.get<DeclarationPerteCartePlafond[]>(this.serverURL + '/pagination_declaration_perte_cartePlafond', {params});
  }

  getTotalNumberDeclarationCartePlafond(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_number_declaration_cartePlafond');
  }
  getuserbyid(id : number ): Observable<any> {
    return this.http.get<any>(this.serverURL +'/user/' +id)
  }
}
