import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BonCommande } from '../achat/bon-commande';
import { environment } from '../../../../environments/environment.prod';
import { UpdateMagasinVirtuel } from './transfert-magasin/UpdateMagasinVirtuel';
import { magasinVirtuel } from './transfert-magasin/MagasinVirtuel';
import { RegulationArticleStock } from './RegulationArticleStock';
import { BonDeTravail } from '../maintenance-et-reparation/BonDeTravail';
import { BonTravailList } from './bon-sortie-bon-travail/bon-tavail-list';
import { Magasin } from '../referentiel/specifique/unite-gestion-parc/magasin';
import { UGP } from '../referentiel/specifique/unite-gestion-parc/ugp';
import { DemandeMaintenance } from '../maintenance-et-reparation/gestion-demande-intervention/demande-maintenance';
import { BonTravail } from '../maintenance-et-reparation/gestion-bon-travail/bon-travail';
import { Article } from '../referentiel/general/articles/article';
import { InventaireArticleStock } from './inventaire-stock/InventaireArticleStock';
import { RetourStructureComponent } from './retour-structure/retour-structure.component';
import { RetourStructure } from './RetourStructure';
import { Structure } from '../referentiel/specifique/structure-administrative/structure';
import { ParcTransfert } from '../referentiel/specifique/unite-gestion-parc/ParcTransfert';
import { BonTravailArticle } from '../maintenance-et-reparation/BonTravailArticle';
import { HistoriqueRegulation } from './HistoriqueRegulation';
import { UpdateUgp } from './UpdateUgp';
import { MagasinRotationNull } from './transfert-magasin/MagasinRotationNull';
import { VisiteTechnique } from '../administratif/visite-technique/visite-technique';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  serverURL = environment.serverUrl;


  constructor(private http: HttpClient) {
  }

  getPaginationReceptionFournisseurListBySelection(status: string, page: string, limit: string): Observable<BonCommande[]> {
    const params = new HttpParams().set('status', status).set('page', page).set('limit', limit);
    return this.http.get<BonCommande[]>(this.serverURL + '/pagination_reception_fournisseur', { params });
  }


  getPaginationMagasinVirtuel(ugp: string, page: string, limit: string): Observable<MagasinRotationNull[]> {
    const params = new HttpParams().set('ugp', ugp).set('page', page).set('limit', limit);
    return this.http.get<MagasinRotationNull[]>(this.serverURL + '/pagination_rotation_null', { params });
  }
  getTotalItemsReceptionFournisseurBySelection(status: string): Observable<number> {

    const params = new HttpParams().set('status', status);
    return this.http.get<number>(this.serverURL + '/total_item_reception_fournisseur', { params });
  }

  confirmReceptionFournisseur(bonCommande: BonCommande): Observable<any> {

    return this.http.post<any>(this.serverURL + '/reception_fournisseur', bonCommande);
  }
  confirmReceptionArticlesBonDeTravail(bonTravailArticle: BonTravailArticle): Observable<any> {

    return this.http.post<any>(this.serverURL + '/bon_sortie_pour_bon_de_travail', bonTravailArticle);
  }
  modifyRegulation(regulation: RegulationArticleStock): Observable<any> {

    return this.http.post<any>(this.serverURL + '/regulation_modify', regulation);
  }

    
  updateRegulation(regulationArticleStock: RegulationArticleStock): Observable<any> {
    return this.http.put<any>(this.serverURL + '/regulation_modify', regulationArticleStock);
  }
  
  addNewAriclesMV(MagasinRotationNull: MagasinRotationNull): Observable<any> {

    return this.http.post<any>(this.serverURL +'/creation_rotation_null', MagasinRotationNull);
  }
      



  updateDemandeTransferMV(id: number): Observable<any> {
    alert(id)
    return this.http.delete<any>(this.serverURL + '/Re_Transfert_rotation_null/' + id);
  }


  deleteDemandeMV(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/delete_rotation_null/' + id);
  }



  getAllRegulartions(): Observable<RegulationArticleStock[]> {

    return this.http.get<RegulationArticleStock[]>(this.serverURL + '/list_regulation_article');
  }
  getAllMagasins(): Observable<Magasin[]> {

    return this.http.get<Magasin[]>(this.serverURL + '/list_Magasin');
  }
  getAllUgps(): Observable<UGP[]> {
    return this.http.get<UGP[]>(this.serverURL + '/list_Ugp');
  }
  getAllMagasinRegulation(): Observable<RegulationArticleStock[]> {
    return this.http.get<RegulationArticleStock[]>(this.serverURL + '/list_regulation_article_magasin');
  }
  getAllUgp(): Observable<UGP[]> {
    return this.http.get<UGP[]>(this.serverURL + '/Liste_Ugp');
  }

  getAllStatus(): Observable<DemandeMaintenance[]> {
    return this.http.get<DemandeMaintenance[]>(this.serverURL + '/list_status');
  }

  getAllStructure(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.serverURL + '/list_Structure');
  }

  getTotalItemsBonTravailList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_items_bon_travail');
  }

  getAllBonTravail(magasin: string, status: string, ugp: string, page: string, limit: string): Observable<BonTravailList[]> {

    const params = new HttpParams().set('magasin', magasin).set('status', status).set('ugp', ugp).set('page', page).set('limit', limit);
    return this.http.get<BonTravailList[]>(this.serverURL + '/pagination_bon_travail', { params });
  }


  getRegulartionById(id: number): Observable<RegulationArticleStock> {

    return this.http.get<RegulationArticleStock>(this.serverURL + '/list_regulation_article/' + id);
  }

  createRegulartion(regulationAricle: RegulationArticleStock): Observable<any> {
    return this.http.post<any>(this.serverURL + '/creation_regulation_article', regulationAricle);
  }


  createRetourStructure(retourStructure: RetourStructureComponent): Observable<any> {
    return this.http.post<any>(this.serverURL + '/creation_retour_structure', retourStructure);
  }
  getAllMagasinInventaire(): Observable<InventaireArticleStock[]> {
    return this.http.get<InventaireArticleStock[]>(this.serverURL + '/list_inventaire_article_magasin');
  }
  deleteRegulartion(id: number): Observable<any> {

    return this.http.delete<any>(this.serverURL + '/delete_regulation_article/' + id);
  }

  deleteRetour(id: number): Observable<any> {

    return this.http.delete<any>(this.serverURL + '/delete_retour_structure/' + id);
  }


  /*  getPaginationRegulartionList(page: string, limit: string): Observable<RegulationArticleStock[]> {
      
      const params = new HttpParams().set('page', page).set('limit', limit);
        return this.http.get<RegulationArticleStock[]>(this.serverURL + '/pagination_regulation_article', {params});
      }*/
  getTotalItemsRegulationList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_items_regulation');
  }

  getAllRegulartion(ugp: string, page: string, limit: string): Observable<RegulationArticleStock[]> {
    const params = new HttpParams().set('ugp', ugp).set('page', page).set('limit', limit);
    return this.http.get<RegulationArticleStock[]>(this.serverURL + '/pagination_regulation_article', { params });
  }

  getTotalItemsRetour(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_items_retour');
  }

  getAllRetourStructure(magasin: string, ugp: string, page: string, limit: string): Observable<RetourStructure[]> {
    const params = new HttpParams().set('magasin', magasin).set('ugp', ugp).set('page', page).set('limit', limit);
    return this.http.get<RetourStructure[]>(this.serverURL + '/pagination_retour_structure', { params });
  }


  getTotalNumberRegulartion(): Observable<number> {

    return this.http.get<number>(this.serverURL + '/total_number_regulation_article');
  }

  getArticleForRegulartion(id: number): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_regulation/' + id);
  }

  getTotalItemsRegulations(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_items_regulation');
  }
  ModificationQuantieArticleReceptionFournisseur(receptionFournisseur: BonCommande): Observable<any> {
    return this.http.post<any>(this.serverURL + '/quantite_article_reception_fournisseur', receptionFournisseur);
  }

  confirmTransfert(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirm_rotation_null', id);
  }

  validateStock(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/valide_rotation_null', id);
  }

  getArticleBySousFamille(s: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Sous/' + s);

  }

  getArticleByType(s: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_filtre_type/' + s);

  }
  getArticleByFamille(s: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Famille/' + s);
  }

  getArticleByUgp(id: number): Observable<UGP[]> {
    return this.http.get<UGP[]>(this.serverURL + '/listeDesArticles/' +id);
  }

  getArticleByFamilleSousFamille(s: string, a: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Famille_sous/' + s);
  }

  getArticleByFamilleGenre(s: string, g: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Famille_genre/' + s);
  }

  getArticleByFamilleMarque(s: string, m: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Famille_marque/' + s);
  }

  getArticleByFamilleType(s: string, t: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Famille_type/' + s);
  }
  getArticleByMarque(s: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_marque/' + s);

  }

  getArticleByGenre(s: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Sous_genre/' + s);

  }

  getArticleByGenreSousFamilles(s: string, s1: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_genre_Sous/' + s + '/' + s1);

  }

  getArticleByGenreMarque(s: string, s1: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_genre_marque/' + s + '/' + s1);

  }

  getArticleByGenreType(s: string, s1: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_genre_marque/' + s + '/' + s1);

  }

  getArticleBySousFamilleMarque(s: string, s1: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_sous_marque/' + s + '/' + s1);

  }

  getArticleBySousFamilleType(s: string, s1: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_sous_type/' + s + '/' + s1);

  }

  getArticleBymarqueType(s: string, s1: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_type_marque/' + s + '/' + s1);

  }

  getArticleBySousFamilleGenreType(s: string, s1: string, s2: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_sous_type_genre/' + s + '/' + s1 + '/' + s2);

  }

  getArticleBySousFamilleMarqueType(s: string, s1: string, s2: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_sous_marque_type/' + s + '/' + s1 + '/' + s2);

  }

  getArticleByGenreMarqueType(s: string, s1: string, s2: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_genre_marque_type/' + s + '/' + s1 + '/' + s2);

  }

  getArticleByGenreSousFamillemarque(s: string, s1: string, s2: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_sous_marque/' + s + '/' + s1 + '/' + s2);

  }

  getArticleByTouts(s: string, s1: string, s2: string, s3: string): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_tout/' + s + '/' + s1 + '/' + s2 + '/' + s3);

  }
  /*Inventaire*/

  getInventaireById(id: number): Observable<InventaireArticleStock> {

    return this.http.get<InventaireArticleStock>(this.serverURL + '/list_InventaireStock_article/' + id);
  }

  createInventaire(inventaireArticleStock: InventaireArticleStock): Observable<any> {
    return this.http.post<any>(this.serverURL + '/creation_InventaireStock_article', inventaireArticleStock);
  }


  deleteInventaire(id: number): Observable<any> {

    return this.http.delete<any>(this.serverURL + '/delete_InventaireStock_article/' + id);
  }

  getTotalItemsInventaireList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_items_InventaireStock');
  }

  getAllInventaire(magasin: string, ugp: string, page: string, limit: string): Observable<InventaireArticleStock[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<InventaireArticleStock[]>(this.serverURL + '/article_inventaire', { params });
  }
  getTotalNumberInventairen(): Observable<number> {

    return this.http.get<number>(this.serverURL + '/total_number_InventaireStock_article');
  }

  getArticleForInventaire(id: number): Observable<Article[]> {

    return this.http.get<Article[]>(this.serverURL + '/list_article_InventaireStock/' + id);
  }

  getTotalItemsInventaires(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_items_InventaireStock');
  }

  modifyInventaireArticleStock(inventaireArticleStock: InventaireArticleStock): Observable<any> {

    return this.http.post<any>(this.serverURL + '/InventaireStock_modify', inventaireArticleStock);
  }

  /*transfert parc vers parc*/
  
  addNewAricleUgp(nouveauBon: UpdateUgp): Observable<any> {
   
    return this.http.post<any>(this.serverURL + '/transfert_article_ugp', nouveauBon);
  }

  getPaginationParcTransfert( ugp:string , page: string, limit: string): Observable<ParcTransfert[]> {
    const params = new HttpParams().set('ugp', ugp).set('page', page).set('limit', limit);
    return this.http.get<ParcTransfert[]>(this.serverURL + '/pagination_transfert_parc', {params});
  }

  deleteDemandeParcTransfert(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/delete_transfert_parc/' + id);
  }

  confirmTransfertParc(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/confirmer_parc_transfert', id);
  }

  validTransfertParc(id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/valider_parc_transfert', id);
  }

  getTotalItemParcTransfertList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_parc_transfert');
  }

  updateDemandeTransferUgp(updateUgp: UpdateUgp): Observable<any> {
    return this.http.put<any>(this.serverURL + '/modify_demande_transfert_parc_vers_magasin', updateUgp);
  }
/*================================*/

  getArticleForMaintenanceVehicule(id: number): Observable<BonTravailArticle[]> {

    return this.http.get<BonTravailArticle[]>(this.serverURL + '/articlesForMaintenance/' + id);
  }

  getAllHistoriqueRegulartions(page: string, limit: string): Observable<HistoriqueRegulation[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<HistoriqueRegulation[]>(this.serverURL + '/pagination_historique_regulation', { params });
  }

  listarticle

  
  getAllArticle(): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/listarticle');
  }

  deleteHistoriqueRegulartion(id: number): Observable<any> {

    return this.http.delete<any>(this.serverURL + '/delete_historique_regulation/' + id);
  }

 
  
  findArticleForAlerting(page: string, limit: string): Observable<Article[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<Article[]>(this.serverURL + '/list_alert_article', { params });
  }

  AlertNombre(): Observable<number> {

    return this.http.get<number>(this.serverURL + '/list_nombre_alert_article/');
  }
  Telecharger(): Observable<any> {
    return this.http.get<any>(this.serverURL + '/telechager');
  }

  getInventaire(): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/listArticle');
  }

  findVisiteForAlerting(): Observable<VisiteTechnique[]> {
    return this.http.get<VisiteTechnique[]>(this.serverURL + '/liste_fin_visite');
  }

  AlertNombreVehicule(): Observable<number> {

    return this.http.get<number>(this.serverURL + '/nombre_fin_visite/');
  }
}
