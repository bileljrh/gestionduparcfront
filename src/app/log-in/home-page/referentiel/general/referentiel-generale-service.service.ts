import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FamilleArticle} from './articles/famille-article';
import {SousFamilleArticle} from './articles/sous-famille-article';
import {Article} from './articles/article';
import {ListFamilleAndSousFamille} from './articles/list-famille-and-sous-famille';
import {MarqueVehicule} from './parametres-vehicules/marque-vehicule/marque-vehicule';
import {GenreVehicule} from './parametres-vehicules/genre-vehicule/genre-vehicule';
import {FamilleOperationReparation} from './operation-reparation/famille-operation-reparation/famille-operation-reparation';
import {OperationReparation} from './operation-reparation/liste-operation-reparation/operation-reparation';
import {Fournisseur} from './fournisseurs/fournisseur';
import {TypeVehicule} from './parametres-vehicules/type-vehicule/type-vehicule';
import {Marche} from '../../achat/marche';
import {Gouvernorat} from './decoupage-administratif/gouvernorat';
import {StationPeage} from './decoupage-administratif/station-peage';
import {Expert} from './experts/expert';
import {LieuParking} from './lieu-parking/lieu-parking';
import {UsageVehicule} from './parametres-vehicules/exploitation-vehicule/usage-vehicule/usage-vehicule';
import {CauseSinistre} from './parametres-vehicules/exploitation-vehicule/cause-sinistre/cause-sinistre';
import {ProgrammeEntretiensPreventifs} from './operation-reparation/programme-entretiens-preventifs/programme-entretiens-preventifs';
import {Energie} from './parametres-generaux/energie/energie';
import {Annee} from './parametres-generaux/annee/annee';
import {TVA} from './parametres-generaux/tva/tva';
import {Unite} from './parametres-generaux/unite/unite';
import {TypeMarqueVehicule} from './parametres-vehicules/type-marque-vehicule';
import {environment} from '../../../../../environments/environment.prod';
import { Vehicule } from '../../administratif/vehicules/vehicule';
import { BonTravailArticle } from '../../maintenance-et-reparation/BonTravailArticle';
import { BonTravailArticleExterne } from '../../maintenance-et-reparation/BonTravailArticleExterne';
import { BonTravailOperation } from '../../maintenance-et-reparation/BonTravailOperation';
import { BonDeTravail } from '../../maintenance-et-reparation/BonDeTravail';
import { DocumentSinistre } from '../../exploitation/gestion-des-sinistres/document-sinistre';
import { subscribeOn } from 'rxjs/operators';
import { FournisseurList } from '../../achat/gestion-bon-commande/FournisseurList';
import { Structure } from '../specifique/structure-administrative/structure';
import { UGP } from '../specifique/unite-gestion-parc/ugp';
import { Atelier } from '../specifique/unite-gestion-parc/atelier';
import { Magasin } from '../specifique/unite-gestion-parc/magasin';

@Injectable({
  providedIn: 'root'
})
export class ReferentielGeneraleServiceService {
  serverURL = environment.serverUrl;
  documents2BeUploaded: File[] = [];
  documents2BeDeleted: number[] = [];

  constructor(private  http: HttpClient) {}

  addNewFamilleArticle(famille: FamilleArticle): Observable<any> {
    return this.http.post<any>(this.serverURL + '/famille_article', famille);
  }

  addNewSousFamilleArticle(sousFamille: SousFamilleArticle): Observable<any> {
    return this.http.post<any>(this.serverURL + '/sous_famille_article', sousFamille);
  }

  modifySelectedFamilleArticle(sousFamille: SousFamilleArticle): Observable<any> {
    return this.http.put<any>(this.serverURL + '/famille_article', sousFamille);
  }

  modifySelectedFamille(famille: FamilleArticle): Observable<any> {
    return this.http.put<any>(this.serverURL + '/modify_famille_article', famille);
  }

  deleteSelectedFamilleArticle(idFamille: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/famille_article/' + idFamille);
  }

  onChangeUgp(id: any): Observable<any> {
    return this.http.get<any[]>(this.serverURL + '/onchange/ugp/'+id);
  }

  
  getListFamilleArticle(): Observable<FamilleArticle[]> {
    return this.http.get<FamilleArticle[]>(this.serverURL + '/famille_article');
  }

  listAtelier(): Observable<Atelier[]> {
    return this.http.get<Atelier[]>(this.serverURL + '/listAtelier');
  }

  listMagasin(): Observable<Magasin[]> {
    return this.http.get<Magasin[]>(this.serverURL + '/listMagasin');
  }


  getListSousFamilleArticle(): Observable<SousFamilleArticle[]> {
    return this.http.get<SousFamilleArticle[]>(this.serverURL + '/sous_famille_article');
  }

  getPaginationListSousFamilleArticle(page: string, limit: string): Observable<SousFamilleArticle[]> {

    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<SousFamilleArticle[]>(this.serverURL + '/PaginationListSousFamilleArticle', {params});
  }

  getPaginationListEnergies(page: string, limit: string): Observable<Energie[]> {

    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<Energie[]>(this.serverURL + '/Pagination_List_energies', {params});
  }

  getPaginationTva(page: string, limit: string): Observable<TVA[]> {

    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<TVA[]>(this.serverURL + '/Pagination_List_Tva', {params});
  }

  getPaginationListGouvernorat(page: string, limit: string): Observable<Gouvernorat[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<Gouvernorat[]>(this.serverURL + '/gouvernoratList', {params});
  }
  getPaginationListStationPeage(page: string, limit: string): Observable<StationPeage[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<StationPeage[]>(this.serverURL + '/station_peageList', {params});
  }

  
  getPaginationListFamilleArticle(page: string, limit: string): Observable<FamilleArticle[]> {

    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<FamilleArticle[]>(this.serverURL + '/Pagination_List_Famille_Article', {params});
  }
  ListSousFamilleArticle(): Observable<SousFamilleArticle[]> {
    return this.http.get<SousFamilleArticle[]>(this.serverURL + '/Sous_Famille');
  }
  deleteSelectedSousFamilleArticle(idSousFamille: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/sous_famille_article/' + idSousFamille);
  }

  getPaginationListArticle(page: string, limit: string): Observable<Article[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<Article[]>(this.serverURL + '/PaginationListArticle', {params});
  }

  getTotalItemArticleByCustomSelection(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_article');
  }

  createNewArticle(article: Article): Observable<any> {
    return this.http.post<any>(this.serverURL + '/article', article);
  }

  modifySelectedArticle(famille: FamilleArticle): Observable<any> {
    return this.http.put<any>(this.serverURL + '/article', famille);
  }


  deleteSelectedArticle(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/article/' + id);
  }

  getListFamilleAndSousFamille(): Observable<ListFamilleAndSousFamille[]> {
    return this.http.get<ListFamilleAndSousFamille[]>(this.serverURL + '/list_famille_sous_famille');
  }

  addNewMarqueVehicule(marqueVehicule: MarqueVehicule): Observable<any> {
    return this.http.post<any>(this.serverURL + '/marque_vehicule', marqueVehicule);
  }

  modifySelectedMarqueVehicule(marqueVehicule: MarqueVehicule): Observable<any> {
    return this.http.put<any>(this.serverURL + '/marque_vehicule', marqueVehicule);
  }

  deleteSelectedMarqueVehicule(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/marque_vehicule/' + id);
  }

  getListMarqueVehicule(page: string, limit: string): Observable<MarqueVehicule[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<MarqueVehicule[]>(this.serverURL + '/marque_vehicule', {params});
  }

  addNewGenreVehicule(genre: GenreVehicule): Observable<any> {
    return this.http.post<any>(this.serverURL + '/genre_vehicule', genre);
  }

  modifySelectedGenreVehicule(genre: GenreVehicule): Observable<any> {
    return this.http.put<any>(this.serverURL + '/genre_vehicule', genre);
  }

  deleteSelectedGenreVehicule(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/genre_vehicule/' + id);
  }

  getListGenreVehicule(page: string, limit: string): Observable<GenreVehicule[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<GenreVehicule[]>(this.serverURL + '/genre_vehicule', {params});
  }

  addNewFamilleOperationReparation(famille: FamilleOperationReparation): Observable<any> {
    return this.http.post<any>(this.serverURL + '/famille_operation_reparation', famille);
  }

  modifySelectedFamilleOperationReparation(famille: FamilleOperationReparation): Observable<any> {
    return this.http.put<any>(this.serverURL + '/famille_operation_reparation', famille);
  }

  deleteSelectedFamilleOperationReparation(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/famille_operation_reparation/' + id);
  }

  getListFamilleOperationReparation(page: string, limit: string): Observable<FamilleOperationReparation[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<FamilleOperationReparation[]>(this.serverURL + '/famille_operation_reparation' , {params});
  }

  addNewOperationReparation(operation: OperationReparation): Observable<any> {
    return this.http.post<any>(this.serverURL + '/operation_reparation', operation);
  }

  modifySelectedOperationReparation(operation: OperationReparation): Observable<any> {
    return this.http.put<any>(this.serverURL + '/operation_reparation', operation);
  }

  deleteSelectedOperationReparation(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/operation_reparation/' + id);
  }

  getListOperationReparation(page: string, limit: string): Observable<OperationReparation[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<OperationReparation[]>(this.serverURL + '/operation_reparation' , {params});
  }

  addNewFournisseur(fournisseur: string): Observable<any> {
    return this.http.post<any>(this.serverURL + '/fournisseur', fournisseur);
  }

  modifySelectedFournisseur(fournisseur: string): Observable<any> {
    return this.http.put<any>(this.serverURL + '/fournisseur', fournisseur);
  }

  deleteSelectedFournisseur(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/fournisseur/' + id);
  }

  getListFournisseur(page: string, limit: string): Observable<Fournisseur[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<Fournisseur[]>(this.serverURL + '/fournisseur', {params});
  }

  
  getListFournisseurBonCommande(): Observable<FournisseurList[]> {
    return this.http.get<FournisseurList[]>(this.serverURL + '/fournisseurBonCommande');
  }

  getListVehicule():Observable<Vehicule[]>{
    return this.http.get<Vehicule[]>(this.serverURL+'/listVehicule') 
  }
  addNewTypeVehicule(type: TypeVehicule, idMarque: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/type_vehicule/' + idMarque, type);
  }

  modifySelectedTypeVehicule(type: TypeVehicule): Observable<any> {
    return this.http.put<any>(this.serverURL + '/type_vehicule', type);
  }

  deleteSelectedTypeVehicule(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/type_vehicule/' + id);
  }

  getListTypeVehicule(page: string, limit: string): Observable<TypeVehicule[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<TypeVehicule[]>(this.serverURL + '/type_vehicule', {params});
  }

  getListTypeMarqueVehicule(page: string, limit: string): Observable<TypeMarqueVehicule[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<TypeMarqueVehicule[]>(this.serverURL + '/type_marque_vehicule', {params});
  }

  getListArticleByUGP(ugp: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article/' + ugp);
  }

  getListMarche(): Observable<Marche[]> {
    return this.http.get<Marche[]>(this.serverURL + '/marche');
  }

  articleList(): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/listarticle');
  }

  addNewGouvernorat(gouvernorat: Gouvernorat): Observable<any> {
    return this.http.post<any>(this.serverURL + '/gouvernorat', gouvernorat);
  }

  modifySelectedGouvernorat(gouvernorat: Gouvernorat): Observable<any> {
    return this.http.put<any>(this.serverURL + '/gouvernorat', gouvernorat);
  }

  deleteSelectedGouvernorat(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/gouvernorat/' + id);
  }

  getListGouvernorat(): Observable<Gouvernorat[]> {
    return this.http.get<Gouvernorat[]>(this.serverURL + '/gouvernorat');
  }

  addNewStationPeage(designation: string): Observable<any> {
    return this.http.post<any>(this.serverURL + '/station_peage', designation);
  }

  modifySelectedStationPeage(stationPayage: StationPeage): Observable<any> {
    return this.http.put<any>(this.serverURL + '/station_peage', stationPayage);
  }

  deleteSelectedStationPeage(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/station_peage/' + id);
  }

  getListStationPeage(): Observable<StationPeage[]> {
    return this.http.get<StationPeage[]>(this.serverURL + '/station_peage');
  }

  addNewExpert(expert: Expert): Observable<any> {
    return this.http.post<any>(this.serverURL + '/expert', expert);
  }

  modifySelectedExpert(expert: Expert): Observable<any> {
    return this.http.put<any>(this.serverURL + '/expert', expert);
  }

  deleteSelectedExpert(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/expert/' + id);
  }

  getListExpert(): Observable<Expert[]> {
    return this.http.get<Expert[]>(this.serverURL + '/expert');
  }

  addNewLieuParking(lieuParking: LieuParking): Observable<any> {
    return this.http.post<any>(this.serverURL + '/lieu_parking', lieuParking);
  }

  modifySelectedLieuParking(lieuParking: LieuParking): Observable<any> {
    return this.http.put<any>(this.serverURL + '/lieu_parking', lieuParking);
  }

  deleteSelectedLieuParking(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/lieu_parking/' + id);
  }

  getListLieuParkingByGouvernorat(gouvernorat: string): Observable<LieuParking[]> {
    return this.http.get<LieuParking[]>(this.serverURL + '/lieu_parking/' + gouvernorat);
  }

  addNewUsageVehicule(usageVehicule: UsageVehicule): Observable<any> {
    return this.http.post<any>(this.serverURL + '/usage_vehicule', usageVehicule);
  }

  modifySelectedUsageVehicule(usageVehicule: UsageVehicule): Observable<any> {
    return this.http.put<any>(this.serverURL + '/usage_vehicule', usageVehicule);
  }

  deleteSelectedUsageVehicule(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/usage_vehicule/' + id);
  }

  getListUsageVehicule(page: string, limit: string): Observable<UsageVehicule[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<UsageVehicule[]>(this.serverURL + '/usage_vehicule', {params});
  }

  addNewCauseSinistre(causeSinistre: CauseSinistre): Observable<any> {
    return this.http.post<any>(this.serverURL + '/cause_sinistre', causeSinistre);
  }

  modifySelectedCauseSinistre(causeSinistre: CauseSinistre): Observable<any> {
    return this.http.put<any>(this.serverURL + '/cause_sinistre', causeSinistre);
  }

  deleteSelectedCauseSinistre(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/cause_sinistre/' + id);
  }

  getListCauseSinistre(page: string, limit: string): Observable<CauseSinistre[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<CauseSinistre[]>(this.serverURL + '/cause_sinistre', {params});
  }


  addNewProgrammeEntretiensPreventifs(programmeEntretiensPreventifs: ProgrammeEntretiensPreventifs): Observable<any> {
    return this.http.post<any>(this.serverURL + '/programme_entretiens_preventifs', programmeEntretiensPreventifs);
  }

  modifySelectedProgrammeEntretiensPreventifs(programmeEntretiensPreventifs: ProgrammeEntretiensPreventifs): Observable<any> {
    return this.http.put<any>(this.serverURL + '/programme_entretiens_preventifs', programmeEntretiensPreventifs);
  }

  deleteSelectedProgrammeEntretiensPreventifs(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/programme_entretiens_preventifs/' + id);
  }

  getListProgrammeEntretiensPreventifs(page: string, limit: string,marque: string, type: string): Observable<ProgrammeEntretiensPreventifs[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('marque', marque).set('type', type);
    return this.http.get<ProgrammeEntretiensPreventifs[]>(this.serverURL + '/programme_entretiens_preventifs', {params});
  }

  addNewEnergie(energie: Energie): Observable<any> {
    return this.http.post<any>(this.serverURL + '/energie', energie);
  }

  modifySelectedEnergie(energie: Energie): Observable<any> {
    return this.http.put<any>(this.serverURL + '/energie', energie);
  }

  deleteSelectedEnergie(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/energie/' + id);
  }

  getListEnergie(): Observable<Energie[]> {
    return this.http.get<Energie[]>(this.serverURL + '/energie');
  }

  addNewAnnee(annee: Annee): Observable<any> {
    return this.http.post<any>(this.serverURL + '/annee', annee);
  }


  deleteSelectedAnnee(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/annee/' + id);
  }

  getListAnnee(): Observable<Annee[]> {
    return this.http.get<Annee[]>(this.serverURL + '/annee');
  }


  addNewTva(tva: TVA): Observable<any> {
    return this.http.post<any>(this.serverURL + '/tva', tva);
  }


  deleteSelectedTva(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/tva/' + id);
  }

  getListTva(): Observable<TVA[]> {
    return this.http.get<TVA[]>(this.serverURL + '/tva');
  }

  addNewUnite(unite: Unite): Observable<any> {
    return this.http.post<any>(this.serverURL + '/unite', unite);
  }


  deleteSelectedUnite(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/unite/' + id);
  }

  getListUnite(): Observable<Unite[]> {
    return this.http.get<Unite[]>(this.serverURL + '/unite');
  }


  //Start 

  getAllBonArt(id:number): Observable<BonTravailArticle[]> {
    return this.http.get<BonTravailArticle[]>(this.serverURL + '/articlebontravail/'+id);
  }


  getAllArticleExterne(id: number): Observable<BonTravailArticleExterne[]> {
    return this.http.get<BonTravailArticleExterne[]>(this.serverURL + '/articleExterneBonTravail/'+id);
  }


  getAllOperations(id: number): Observable<BonTravailOperation[]> {
    return this.http.get<BonTravailOperation[]>(this.serverURL + '/operationReparationBonTravail/'+id);
  }
  //End

  getAllDocumentSinistre(id: number): Observable<DocumentSinistre[]> {
    return this.http.get<DocumentSinistre[]>(this.serverURL + '/get_document_sinistre_vehicule/' + id);
  }

  addDocument2BeUploaded(file: File) {
    if (file !== null) {
      this.documents2BeUploaded.push(file);
    }
  }

  deleteDocument2BeUploaded(fileIndex: number) {
    this.documents2BeUploaded.splice(fileIndex, 1);
  }

  addIdsDocument2BeDeleted(fileId: number) {
    this.documents2BeDeleted.push(fileId);
  }

  setSinistreDocumentCar(id: number, observations: string): void {
    for (let file of this.documents2BeUploaded) {
      const formData: FormData = new FormData();
      formData.append("file", file);
      this.http.post<DocumentSinistre>(this.serverURL + '/document_sinistre_vehicule/' + id + "/" + observations, formData).subscribe(res => {});
    }
    for (let fileId of this.documents2BeDeleted) {
      this.http.delete<void>(this.serverURL + '/delete_document_sinistre_vehicule/' + fileId);
    }
  }

  modifySelectedSousFamilleArticle(sousFamille: SousFamilleArticle): Observable<any> {
    return this.http.put<any>(this.serverURL + '/sous_famille_article', sousFamille);
  }
}
