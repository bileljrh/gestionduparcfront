import { Article } from '../referentiel/general/articles/article';

export interface DemandeArticle {
  id?: number;
  article: Article;
  quantiteCommandee: number;
  prix?: number;
  quantiteLivree: number;
  dateDemandeArticle?: string;
}
