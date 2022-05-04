import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UpdateBonCommande} from './update-bon-commande';
import {BonCommande} from './bon-commande';
import {environment} from '../../../../environments/environment.prod';
import { BonCommandeList } from './gestion-bon-commande/BonCommandeList';
import { UGP } from '../referentiel/specifique/unite-gestion-parc/ugp';
import { Article } from '../referentiel/general/articles/article';
import { FournisseurList } from './gestion-bon-commande/FournisseurList';
@Injectable({
  providedIn: 'root'
})
export class AchatServiceService {
  serverURL = environment.serverUrl;

  constructor(private  http: HttpClient) {
  }


  //list parc
  getAllParc(): Observable<BonCommandeList[]>
{
    return this.http.get<BonCommandeList[]>(this.serverURL + '/list_Parc');
}
//list status
getAllStatus(): Observable<BonCommandeList[]>
{
    return this.http.get<BonCommandeList[]>(this.serverURL + '/list_Status');
}
//list fournisseur
getAllFournisseur(): Observable<FournisseurList[]>
{
    return this.http.get<FournisseurList[]>(this.serverURL + '/list_fournisseur');
}
//list article
getAllArticle(): Observable<Article[]>
{
    return this.http.get<Article[]>(this.serverURL + '/list_Article');
}



  addNewBonCommande(nouveauBon: UpdateBonCommande): Observable<any> {
    return this.http.post<any>(this.serverURL + '/bon_commande', nouveauBon);
  }


  modifySelectedBonCommande(modifiedBon: UpdateBonCommande): Observable<any> {
    return this.http.put<any>(this.serverURL + '/bon_commande', modifiedBon);
  }

  deleteSelectedBonCommande(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/bon_commande/' + id);
  }

  getTotalItemBonCommandeList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_bon_commande');
  }
  getAllUgps(): Observable<UGP[]>
{
    return this.http.get<UGP[]>(this.serverURL + '/list_Parcs');
}

  getNumPiece(): Observable<any> {
    return this.http.get<any>(this.serverURL + '/numpiece');
  }

//.set('status', status).set('parc', parc).set('fournisseur', fournisseur).set('dateMin', dateMin).set('article', article).set('dateMax', dateMax)
//, status: string, parc: string,fournisseur:string, article:string,dateMin: string, dateMax: string

  getPaginationBonCommandeList(status: string, parc: string,fournisseur:string, article:string,date_demande:string,date_facture:string,page: string, limit: string ): Observable<BonCommandeList[]> {
    const params = new HttpParams().set('status', status).set('parc', parc).set('fournisseur', fournisseur).set('article', article).set('date_demande',date_demande).set('date_facture',date_facture).set('page', page).set('limit', limit);
    return this.http.get<BonCommandeList[]>(this.serverURL + '/pagination_bon_commande', {params});
  }
  getArticleBySousFamille(s :string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Sous/'+s);
  }

  getArticleByFamille(s :string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Famille/'+s);
  }

  getArticleByFamilleSousFamille(s :string,a :string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Famille_sous/'+s);
  }

  getArticleByFamilleGenre(s :string,g:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Famille_genre/'+s);
  }

  getArticleByFamilleMarque(s :string,m:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Famille_marque/'+s);
  }

  getArticleByFamilleType(s :string,t:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Famille_type/'+s);
  }
  getArticleByType(s :string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_filtre_type/'+s);
  }
  getArticleByMarque(s :string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_marque/'+s);
  }
  getArticleByGenre(s :string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_Sous_genre/'+s);
  }
  getArticleByGenreSousFamilles(s :string,s1:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_genre_Sous/'+s+'/'+s1);
  }
  getArticleByGenreMarque(s :string,s1:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_genre_marque/'+s+'/'+s1);
  }
  getArticleByGenreType(s :string,s1:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_genre_marque/'+s+'/'+s1);
  }
  getArticleBySousFamilleMarque(s :string,s1:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_sous_marque/'+s+'/'+s1);
  }
  getArticleBySousFamilleType(s :string,s1:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_sous_type/'+s+'/'+s1);
  }
  getArticleBymarqueType(s :string,s1:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_type_marque/'+s+'/'+s1);
  }
  getArticleBySousFamilleGenreType(s :string,s1:string,s2:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_sous_type_genre/'+s+'/'+s1+'/'+s2);
  }
  getArticleBySousFamilleMarqueType(s :string,s1:string,s2:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_sous_marque_type/'+s+'/'+s1+'/'+s2);
  }
  getArticleByGenreMarqueType(s :string,s1:string,s2:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_genre_marque_type/'+s+'/'+s1+'/'+s2);
  }
  getArticleByGenreSousFamillemarque(s :string,s1:string,s2:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_sous_marque/'+s+'/'+s1+'/'+s2);
  }
  getArticleByTouts(s :string,s1:string,s2:string,s3:string): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverURL + '/list_article_Filtre_tout/'+s+'/'+s1+'/'+s2+'/'+s3);
  }

}
