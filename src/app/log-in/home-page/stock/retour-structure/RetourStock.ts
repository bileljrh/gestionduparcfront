import { Article } from '../../referentiel/general/articles/article';

export interface RetourStock {
  id?: number;
  article: Article;
  quantiteStock: number;
  quantite: number;
}
