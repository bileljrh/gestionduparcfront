import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BeneficiaireEmprunt} from './beneficiaire-emprunts/beneficiaire-emprunt';
import {EtatStock} from './etat-stock/etat-stock';
import {Personnel} from './details-personnel/personnel';
import {Structure} from './structure-administrative/structure';
import {Magasin} from './unite-gestion-parc/magasin';
import {UGP} from './unite-gestion-parc/ugp';
import {Atelier} from './unite-gestion-parc/atelier';
import {Ressource} from './unite-gestion-parc/ressource';
import {Section} from './unite-gestion-parc/section';
import {environment} from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReferentielSpecifiqueServiceService {
  serverURL = environment.serverUrl;

  constructor(private  http: HttpClient) {
  }

  addNewBeneficiaireEmprunt(beneficiaireEmprunt: BeneficiaireEmprunt): Observable<any> {
    return this.http.post<any>(this.serverURL + '/beneficiaire_emprunt', beneficiaireEmprunt);
  }

  modifySelectedBeneficiaireEmprunt(beneficiaireEmprunt: BeneficiaireEmprunt): Observable<any> {
    return this.http.put<any>(this.serverURL + '/beneficiaire_emprunt', beneficiaireEmprunt);
  }

  deleteSelectedBeneficiaireEmprunt(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/beneficiaire_emprunt/' + id);
  }

  getListBeneficiaireEmprunt(page: string, limit: string): Observable<BeneficiaireEmprunt[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<BeneficiaireEmprunt[]>(this.serverURL + '/beneficiaire_emprunt' , {params});
  }

  addNewEtatStock(etatStock: EtatStock): Observable<any> {
    return this.http.post<any>(this.serverURL + '/etat_stock', etatStock);
  }

  modifySelectedEtatStock(etatStock: EtatStock): Observable<any> {
    return this.http.put<any>(this.serverURL + '/etat_stock', etatStock);
  }

  deleteSelectedEtatStock(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/etat_stock/' + id);
  }

  getListEtatStock(page: string, limit: string): Observable<EtatStock[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<EtatStock[]>(this.serverURL + '/etat_stock' , {params});
  }

  addNewPersonnel(personnel: Personnel): Observable<number> {
    return this.http.post<any>(this.serverURL + '/personnel', personnel);
  }

  modifySelectedPersonnel(personnel: Personnel): Observable<number> {
    return this.http.put<any>(this.serverURL + '/personnel', personnel);
  }

  deleteSelectedPersonnel(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/personnel/' + id);
  }

  getListPersonnel(page: string, limit: string): Observable<Personnel[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<Personnel[]>(this.serverURL + '/personnel', {params});
  }

  uploadImagePersonnel(id: number, formData: FormData): Observable<any> {
    return this.http.post<any>(this.serverURL + '/image_personnel/' + id, formData);
  }

  getByteImagePersonnel(id: number, imageName: string): Observable<any> {
    return this.http.get<any>(this.serverURL + '/image_personnel/' + id + '/' + imageName);
  }

  addNewParentStructure(structure: Structure): Observable<any> {
    return this.http.post<any>(this.serverURL + '/parent_structure', structure);
  }

  addNewChildStructure(structure: Structure, idParent: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/child_structure/' + idParent, structure);
  }

  modifySelectedStructure(structure: Structure): Observable<any> {
    return this.http.put<any>(this.serverURL + '/structure/', structure);
  }

  deleteSelectedStructure(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/structure/' + id);
  }

  getListStructure(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.serverURL + '/structure');
  }


  addNewMagasin(magasin: Magasin, idUGP: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/magasin/' + idUGP, magasin);
  }

  modifySelectedMagasin(magasin: Magasin): Observable<any> {
    return this.http.put<any>(this.serverURL + '/magasin', magasin);
  }

  deleteSelectedMagasin(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/magasin/' + id);
  }

  addNewAtelier(atelier: Atelier, idUGP: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/atelier/' + idUGP, atelier);
  }

  modifySelectedAtelier(atelier: Atelier): Observable<any> {
    return this.http.put<any>(this.serverURL + '/atelier', atelier);
  }

  deleteSelectedAtelier(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/atelier/' + id);
  }

  addNewRessource(ressource: Ressource, idUGP: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/ressource/' + idUGP, ressource);
  }

  modifySelectedRessource(ressource: Ressource): Observable<any> {
    return this.http.put<any>(this.serverURL + '/ressource', ressource);
  }

  deleteSelectedRessource(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/ressource/' + id);
  }

  addNewSection(section: Section, parent: string, id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/section/' + parent + '/' + id, section);
  }

  modifySelectedSection(section: Section): Observable<any> {
    return this.http.put<any>(this.serverURL + '/section', section);
  }

  deleteSelectedSection(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/section/' + id);
  }


  addNewUGP(ugp: UGP): Observable<any> {
    return this.http.post<any>(this.serverURL + '/ugp', ugp);
  }

  modifySelectedUGP(ugp: UGP): Observable<any> {
    return this.http.put<any>(this.serverURL + '/ugp', ugp);
  }

  deleteSelectedUGP(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/ugp/' + id);
  }

  getListUGP(): Observable<UGP[]> {
    return this.http.get<UGP[]>(this.serverURL + '/ugp');
  }


}
