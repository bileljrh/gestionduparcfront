import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utilisateur} from './creation-utilisateurs/utilisateur';
import {MessageApplicatif} from './messages-applicatifs/message-applicatif';
import {Alerte} from './alertes/alerte';
import {ModifyMot2Pass} from './creation-utilisateurs/modify-mot2-pass';
import {ParametreApplication} from './parametres-application/parametre-application';
import {StructureUgpMagasin} from './creation-utilisateurs/structure-ugp-magasin';
import {environment} from '../../../../environments/environment.prod';
import {Tracabilite} from './tracabilite/tracabilite';
import {Role} from './groupes-utilisateurs/role';
import {Message} from '../message/message';
import { NewUtilisateur } from './creation-utilisateurs/new-utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AdministrationServiceService {
  serverURL = environment.serverUrl;

  constructor(private  http: HttpClient) {
  }


  modifySelectedPassword(mot2passe: string): Observable<any> {
    return this.http.put<any>(this.serverURL + '/mot_passe_utilisateur', mot2passe);
  }

  deleteSelectedUtilisateur(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/utilisateur/' + id);
  }


  addNewMessageApplicatif(message: MessageApplicatif): Observable<any> {
    return this.http.post<any>(this.serverURL + '/message_applicatif', message);
  }

  modifySelectedMessageApplicatif(message: MessageApplicatif): Observable<any> {
    return this.http.put<any>(this.serverURL + '/message_applicatif', message);
  }

  deleteSelectedMessageApplicatif(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/message_applicatif/' + id);
  }

  getListMessageApplicatif(): Observable<MessageApplicatif[]> {
    return this.http.get<MessageApplicatif[]>(this.serverURL + '/message_applicatif');
  }

  addNewAlerte(alerte: Alerte): Observable<any> {
    return this.http.post<any>(this.serverURL + '/alerte', alerte);
  }

  modifySelectedAlerte(alerte: Alerte): Observable<any> {
    return this.http.put<any>(this.serverURL + '/alerte', alerte);
  }

  deleteSelectedAlerte(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/alerte/' + id);
  }

  getListAlerte(): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(this.serverURL + '/alerte');
  }


  // user request

  addNewUtilisateur(utilisateur: NewUtilisateur): Observable<any> {
    return this.http.post<any>(this.serverURL + '/utilisateur', utilisateur);
  }

  modifySelectedUtilisateur(utilisateur: Utilisateur): Observable<any> {
    return this.http.put<any>(this.serverURL + '/utilisateur', utilisateur);
  }

  getListUtilisateur(structure: string): Observable<Utilisateur[]> {
    const params = new HttpParams().set('structure', structure);
    return this.http.get<Utilisateur[]>(this.serverURL + '/utilisateur', {params});
  }
  getListUser(page:string , limit : string ,structure: string): Observable<Utilisateur[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('structure', structure);
    return this.http.get<Utilisateur[]>(this.serverURL + '/user', {params});
  }
  activateDesactivateSelectedUtilisateur(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/activation_utilisateur', id);
  }

  verrouillageDeverrouillageUtilisateur(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/verrouillage_utilisateur', id);
  }

  modificationMot2PassUtilisateur(modifyMot2Pass: ModifyMot2Pass): Observable<any> {
    return this.http.put<any>(this.serverURL + '/mot2pass_utilisateur', modifyMot2Pass);
  }

  reinitialisationMot2PassUtilisateur(id: number, nouveauMot2pass: string): Observable<any> {
    return this.http.post<any>(this.serverURL + '/mot2pass_utilisateur/' + id, nouveauMot2pass);
  }


  addParametreApplication(parametraApplication: ParametreApplication): Observable<any> {
    return this.http.post<any>(this.serverURL + '/parametre_application', parametraApplication);
  }

  modifyParametreApplication(parametraApplication: ParametreApplication): Observable<any> {
    return this.http.put<any>(this.serverURL + '/parametre_application', parametraApplication);
  }

  deleteParametreApplication(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/parametre_application/' + id);
  }

  getParametreApplication(): Observable<ParametreApplication> {
    return this.http.get<ParametreApplication>(this.serverURL + '/parametre_application');
  }

  getListStructureUgpMagasin(): Observable<StructureUgpMagasin[]> {
    return this.http.get<StructureUgpMagasin[]>(this.serverURL + '/structure_ugp_magasin');
  }

  getPaginationListTracabilite(page: string, limit: string, idUser: string, nomModule: string, dateMin: string, dateMax: string): Observable<Tracabilite[]> {
    
    const params = new HttpParams().set('page', page).set('limit', limit).set('idUser', idUser).set('nomModule', nomModule).set('dateMin', dateMin).set('dateMax', dateMax);
    return this.http.get<Tracabilite[]>(this.serverURL + '/pagination_tracabilite', {params});
  }


  getTotalItemTracabilite(idUser: string, nomModule: string, dateMin: string, dateMax: string): Observable<number> {
  
    const params = new HttpParams().set('idUser', idUser).set('nomModule', nomModule).set('dateMin', dateMin).set('dateMax', dateMax);
    return this.http.get<number>(this.serverURL + '/total_item_tracabilite', {params});
  }

  deleteSelectedTracabilite(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/tracabilite/' + id);
  }

  addNewGroupeUtilisateur(profil: string, designation: string): Observable<any> {
    return this.http.post<any>(this.serverURL + '/groupe_utilisateur/' + profil, designation);
  }

  getListGroupeUtilisateur(page: string, limit: string): Observable<Role[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<Role[]>(this.serverURL + '/groupe_utilisateur', {params});
  }
  /*
  getListGroupeUtilisateur(): Observable<Role[]> {
    return this.http.get<Role[]>(this.serverURL + '/groupe_utilisateur');
  }
  */

  deleteSelectedGroupeUtilisateur(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/groupe_utilisateur/' + id);
  }

  modifySelectedGroupeUtilisateur(role: Role): Observable<any> {
    return this.http.put<any>(this.serverURL + '/groupe_utilisateur', role);
  }

  addGroupeAuthorities(id: number, authorties: string[]): Observable<any> {
    return this.http.post<any>(this.serverURL + '/groupe_authorities/' + id, authorties);
  }

  addGroupeUtilisateurs(id: number, utilisateurs: string[]): Observable<any> {
    return this.http.post<any>(this.serverURL + '/groupe_utilisateurs/' + id, utilisateurs);
  }

  sendNewMessage(matricule: string, email: string): Observable<any> {
    return this.http.post<any>(this.serverURL + '/reset_password/' + matricule, email);
  }

  deleteSelectedMessage(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/message/' + id);
  }

  getNombreMessages(structure: string): Observable<number> {
    return this.http.get<number>(this.serverURL + '/nombre_message/' + structure);
  }

  getListMessage(structure: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.serverURL + '/message/' + structure);
  }

}
