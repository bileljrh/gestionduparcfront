import {UpdateArticle} from '../referentiel/general/articles/update-article';

export interface UpdateDemandeArticle {
  id?: number;
  updateArticle: UpdateArticle;
  quantiteCommandee: number;
  quantiteLivree: number;
}
