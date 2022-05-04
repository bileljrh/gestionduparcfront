import { Injectable } from '@angular/core';
import {DemandeQuotaCarteJocker} from './DemandeQuotaCarteJocker'
import { Observable } from 'rxjs';
import { CarteJockerDataResponse } from "../carte-jocker-data-response";
import {environment} from '../../../../../../environments/environment.prod';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { ModificarionDemandeQuotaCarteJocker } from './update-demande-quota-carte-jocker/ModificarionDemandeQuotaCarteJocker';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})
export class DemandeQuotaCarteJockerService {
  serverURL = environment.serverUrl;

  constructor(private httpClient: HttpClient) {}

  getAllDemandeQuotaCarteJockers(): Observable<DemandeQuotaCarteJocker[]>{
    return this.httpClient.get<DemandeQuotaCarteJocker[]>(this.serverURL + '/list_demande_quota_carte_jocker');
    }

  getDemandeQuotaCarteJockerById(id: number): Observable<DemandeQuotaCarteJocker>{
    return this.httpClient.get<DemandeQuotaCarteJocker>(this.serverURL + '/list_demande_quota_carte_jocker'+ id);
    }
    
    createDemandeQuotaCarteJocker(demandeQuotaCarteJocker: DemandeQuotaCarteJocker): Observable<any> {
    return this.httpClient.post<any>(this.serverURL + '/creation_demande_quota_carte_jocker', demandeQuotaCarteJocker);
  }
    
  updateDemandeQuotaCarteJockerl(modificarionDemandeQuotaCarteJocker: ModificarionDemandeQuotaCarteJocker): Observable<any> {
  return this.httpClient.put<any>(this.serverURL + '/modify_demande_quota_carte_jocker', modificarionDemandeQuotaCarteJocker);
}

  
  deleteDemandeQuotaCarteJocker(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.serverURL + '/delete_demande_quota_carte_jocker/' + id);
  }


      getPaginationDemandeQuotaCarteJockerList(page: string, limit: string): Observable<DemandeQuotaCarteJocker[]> {
          const params = new HttpParams().set('page', page).set('limit', limit);
          return this.httpClient.get<DemandeQuotaCarteJocker[]>(this.serverURL + '/pagination_demande_quota_carte_jocker', {params});
        }

  getTotalNumberDemandeQuotaCarteJocker(): Observable<number> {
    return this.httpClient.get<number>(this.serverURL + '/total_number_demande_quota_carte_jocker');
  }

  confirmSelectedDemandeQuotaCarteJocker(id: number): Observable<any> {
    return this.httpClient.post<any>(this.serverURL + '/confirm_quota_carte_jocker', id);
  }

  validateSelectedDemandeQuotaCarteJocker(id: number): Observable<any> {
    return this.httpClient.post<any>(this.serverURL + '/validate_quota_carte_jocker', id);
  }


}
