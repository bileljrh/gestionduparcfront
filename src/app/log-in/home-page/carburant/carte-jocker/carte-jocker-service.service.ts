import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CarteJockerDataResponseList} from '../gestion-cartes/gestion-cartes-jocker/carte-jocker-data-response-list';
import {Observable} from 'rxjs';
import {ModifyCarteJocker} from '../gestion-cartes/gestion-cartes-jocker/modify-carte-jocker';
import {NouvelleCarteJocker} from '../gestion-cartes/gestion-cartes-jocker/nouvelle-carte-jocker/nouvelle-carte-jocker';
import {HistoriqueAffectationCarteJocker} from './historique-affectation-carte-jocker/historique-affectation-carte-jocker';
import {ListAffectedVehiculesAndCartesJocker} from './gestion-demande-desaffectation-carte-jocker/list-affected-vehicules-and-cartes-jocker';
import {NouvelleDemandeDesaffectationCarteJocker} from './gestion-demande-desaffectation-carte-jocker/nouvelle-demande-desaffectation-carte-jocker/nouvelle-demande-desaffectation-carte-jocker';
import {DemandeDesaffectationCarteJockerResponse} from './gestion-demande-desaffectation-carte-jocker/demande-desaffectation-carte-jocker-response';
import {ModificationDemandeDesaffectationCarteJocker} from './gestion-demande-desaffectation-carte-jocker/modification-demande-desaffectation-carte-jocker';
import {HistoriqueDesaffectationCarteJocker} from './historique-desaffectation-carte-jocker/historique-desaffectation-carte-jocker';
import {environment} from '../../../../../environments/environment.prod';
import {SelectVehicule} from '../../administratif/vehicules/select-vehicule';
import { DeclarationPerteCartejocker } from './gestion-declaration-perte-carte-jocker/new-declaration-perte-carte/declaration-perte-carte-jocker';


@Injectable({
  providedIn: 'root'
})
export class CarteJockerServiceService {

  serverURL = environment.serverUrl;

  constructor(private http: HttpClient) {
  }

  
  getAllCarteJockerTabDataResponses(): Observable<CarteJockerDataResponseList[]>{
    return this.http.get<CarteJockerDataResponseList[]>(this.serverURL + '/list_carte_jocker');
    }


  getPaginationCarteJockerList(select: string, page: string, limit: string): Observable<CarteJockerDataResponseList[]> {
    const params = new HttpParams().set('etat', select).set('page', page).set('limit', limit);
    return this.http.get<CarteJockerDataResponseList[]>(this.serverURL + '/pagination_carte_jocker', {params});
  }

  getTotalNumberCarteJocker(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_number_carte_jocker');
  }

  modifySelectedCarteJocker(etatCarte: ModifyCarteJocker): Observable<any> {
    return this.http.put<any>(this.serverURL + '/carte_jocker', etatCarte);
  }
getbyid(id : number ): Observable<any> {
  return this.http.get<any>(this.serverURL +'/cartejocker/' +id)
}
  deleteSelectedCarteJocker(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/carte_jocker/' + id);
  }

  addNewCarteJocker(newCarte: NouvelleCarteJocker): Observable<any> {
    return this.http.post<any>(this.serverURL + '/carte_jocker', newCarte);
  }

  getListNotAffectedCartesJocker(): Observable<CarteJockerDataResponseList[]> {
    return this.http.get<CarteJockerDataResponseList[]>(this.serverURL + '/carte_jocker_not_affected');
  }

  getListCardWithNoCards(): Observable<CarteJockerDataResponseList[]> {
    return this.http.get<CarteJockerDataResponseList[]>(this.serverURL + '/carte-jocker-affected');
  }

  getListVehiculesServiceWithNoCarteJocker(): Observable<SelectVehicule[]> {
    return this.http.get<SelectVehicule[]>(this.serverURL + '/list_vehicules_service_no_carte_jocker');
  }

  getTotalDemandeAffectationCarteJockerByFilteredDate(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_number_affectation_carte_jocker');
  }

  addNewAffectationCarteJocker(idCarte: number, idVehicule: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/affectation_carte_jocker/' + idCarte, idVehicule);
  }

  getPaginationDemandesAffectationCarteJocker(page: string, limit: string): Observable<CarteJockerDataResponseList[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<CarteJockerDataResponseList[]>(this.serverURL + '/pagination_affectation_carte_jocker', {params});
  }

  modifySelectedDemandeAffectationCarteJocker(idCarte: number, idVehicule: number, idDemande: number): Observable<any> {
    return this.http.put<any>(this.serverURL + '/affectation_carte_jocker/' + idCarte + '/' + idVehicule+'/'+idDemande,idDemande);
  }

  confirmSelectedDemandeAffectationCarteJocker(idCarte: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirm_affectation_carte_jocker', idCarte);
  }

  validateSelectedDemandeAffectationCarteJocker(idCarte: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/validate_affectation_carte_jocker', idCarte);
  }

  deleteSelectedDemandeAffectationCarteJocker(idCarte: number, idHistorique: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/affectation_carte_jocker/' + idCarte + '/' + idHistorique);
  }

  getTotalNumberHistoriqueAffectationCarteJockerByFilteredDate(firstDate: string, secondDate: string): Observable<number> {
    const params = new HttpParams().set('dateMin', firstDate).set('dateMax', secondDate);
    return this.http.get<number>(this.serverURL + '/total_number_historique_affectation_carte_jocker', {params});
  }


  getPaginationHistoriqueAffectationCarteJockerByFilteredDate(firstDate: string, secondDate: string, page: string, limit: string): Observable<HistoriqueAffectationCarteJocker[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('dateMin', firstDate).set('dateMax', secondDate);
    return this.http.get<HistoriqueAffectationCarteJocker[]>(this.serverURL + '/pagination_historique_affectation_carte_jocker', {params});
  }

  deleteSelectedHistoriqueAffectationCarteJocker(idCarte: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/delete_historique_affectation_carte_jocker/' + idCarte);
  }

  getListAffectedVehiculesAndCartesJocker(): Observable<ListAffectedVehiculesAndCartesJocker[]> {
    return this.http.get<ListAffectedVehiculesAndCartesJocker[]>(this.serverURL + '/list_affected_vehicules_and_cartes_jocker');
  }

  listCarsAnnuler(): Observable<ListAffectedVehiculesAndCartesJocker[]> {
    return this.http.get<ListAffectedVehiculesAndCartesJocker[]>(this.serverURL + '/carte-jocker-affected');
  }

  createNouvelleDemandeDesaffectationCarteJockerRequest(nouvelleDemandeDesaffectation: NouvelleDemandeDesaffectationCarteJocker): Observable<any> {
    return this.http.post<any>(this.serverURL + '/desaffectation_carte_jocker', nouvelleDemandeDesaffectation);
  }

  /*
  getPaginationDemandesDesaffectationCarteJockerByFilteredDate(firstDate: string, secondDate: string, page: string, limit: string): Observable<DemandeDesaffectationCarteJockerResponse[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('dateMin', firstDate).set('dateMax', secondDate);
    return this.http.get<DemandeDesaffectationCarteJockerResponse[]>(this.serverURL + '/pagination_desaffectation_carte_jocker', {params});
  }
  */
  getPaginationHistoriqueDesaffectationCarteAgilis(page: string, limit: string): Observable<DemandeDesaffectationCarteJockerResponse[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<DemandeDesaffectationCarteJockerResponse[]>(this.serverURL + '/pagination_historique_desaffectation_carte_jocker', {params});
  }

  getTotalNumberDemandesDesaffectationCarteJockerByFilteredDate(firstDate: string, secondDate: string): Observable<number> {
    const params = new HttpParams().set('dateMin', firstDate).set('dateMax', secondDate);
    return this.http.get<number>(this.serverURL + '/total_number_desaffectation_carte_jocker', {params});
  }

  deleteSelectedDemandeDesaffectationCarteJocker(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/desaffectation_carte_jocker/' + id);
  }

  confirmSelectedDemandeDesaffectationCarteJocker(id: number): Observable<any> {
    return this.http.put<any>(this.serverURL + '/desaffectation_carte_jocker/'+id, id);
  }

  modifySelectedDemandeDesaffectationCarteJocker(modificationDemande: ModificationDemandeDesaffectationCarteJocker): Observable<any> {
    return this.http.put<any>(this.serverURL + '/modify_desaffectation_carte_jocker', modificationDemande);
  }

  getPaginationHistoriqueDesaffectationCarteJockerByFilteredDate(firstDate: string, secondDate: string, page: string, limit: string): Observable<HistoriqueDesaffectationCarteJocker[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('dateMin', firstDate).set('dateMax', secondDate);
    return this.http.get<HistoriqueDesaffectationCarteJocker[]>(this.serverURL + '/pagination_historique_desaffectation_carte_jocker', {params});
  }

  getTotalNumberHistoriqueDesaffectationCarteJockerByFilteredDate(firstDate: string, secondDate: string): Observable<number> {
    const params = new HttpParams().set('dateMin', firstDate).set('dateMax', secondDate);
    return this.http.get<number>(this.serverURL + '/total_number_historique_desaffectation_carte_jocker', {params});
  }

  deleteSelectedHistoriqueDesaffectationCarteJocker(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/historique_desaffectation_carte_jocker/' + id);
  }
  getListCarteJocker(): Observable<NouvelleCarteJocker[]> {
    return this.http.get<NouvelleCarteJocker[]>(this.serverURL + '/carte_Jocker');
  }

  createNewDeclarationPerteCarteJocker(data: DeclarationPerteCartejocker): Observable<any> {
    return this.http.post<any>(this.serverURL + '/declaration_perte_carte_jocker', data);
  }

  modifySelectedDeclarationPerteCarteJocker(data: DeclarationPerteCartejocker): Observable<any> {
    return this.http.put<any>(this.serverURL + '/declaration_perte_carte_jocker', data);
  }
  getPaginationDeclarationdespertecarteJocker(page: string, limit: string,confirmed: string): Observable<DeclarationPerteCartejocker[]> {
    const params = new HttpParams().set('confirmed',confirmed).set('page', page).set('limit', limit);
    return this.http.get<DeclarationPerteCartejocker[]>(this.serverURL + '/pagination_declaration_perte_cartejocker', {params});
  }

  getTotalNumberDeclarationCarteJocker(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_number_declaration_carte_jocker');
  }
  getuserbyid(id : number ): Observable<any> {
    return this.http.get<any>(this.serverURL +'/user/' +id)
  }
}
