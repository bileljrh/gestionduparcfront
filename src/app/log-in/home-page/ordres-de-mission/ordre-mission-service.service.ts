import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrdreMission} from './ordre-mission';
import {environment} from '../../../../environments/environment.prod';
import {SelectVehicule} from '../administratif/vehicules/select-vehicule';
import {NewOrdreMission} from './new-ordre-mission';
import {OrdreMissionTableData} from './gestion-ordre-mission/ordre-mission-table-data';

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionServiceService {

  serverURL = environment.serverUrl;

  constructor(private  http: HttpClient) {
  }

  addNewOrdreMission(newOrdreMission: NewOrdreMission): Observable<any> {
    return this.http.post<any>(this.serverURL + '/ordre_mission', newOrdreMission);
  }

  modifySelectedOrdreMission(newOrdreMission: NewOrdreMission): Observable<any> {
    return this.http.put<any>(this.serverURL + '/ordre_mission', newOrdreMission);
  }

  confirmSelectedOrdreMission(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirm_ordre_mission', id);
  }

  deleteSelectedOrdreMission(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/ordre_mission/' + id);
  }

  getPaginationOrdreMissionListBySelectedEtat(status: string, page: string, limit: string): Observable<OrdreMissionTableData[]> {
    const params = new HttpParams().set('status', status).set('page', page).set('limit', limit);
    return this.http.get<OrdreMissionTableData[]>(this.serverURL + '/pagination_ordre_mission', {params});
  }

  getTotalItemsOrdreMissionListBySelectedEtat(status: string): Observable<number> {
    const params = new HttpParams().set('status', status);
    return this.http.get<number>(this.serverURL + '/total_items_ordre_mission', {params});
  }

  getPaginationVehiculeListDepassantDateRetour(page: string, limit: string): Observable<OrdreMissionTableData[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<OrdreMissionTableData[]>(this.serverURL + '/pagination_vehicule_depasse_date_retour', {params});
  }

  getTotalItemsVehiculeListDepassantDateRetour(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_items_vehicule_depasse_date_retour');
  }

  getSelectedOrdreMission(id: number): Observable<OrdreMission> {
    return this.http.get<any>(this.serverURL + '/selected_ordre_mission/' + id);
  }

  getSelectVehiculeByStrucutureForOrdreMission(): Observable<SelectVehicule[]> {
    return this.http.get<SelectVehicule[]>(this.serverURL + '/select_vehicule_ordre_mission');
  }

}
