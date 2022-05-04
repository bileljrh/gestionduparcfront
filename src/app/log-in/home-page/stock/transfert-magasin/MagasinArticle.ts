import { Article } from "../../referentiel/general/articles/article";

export interface MagasinArticle {
    id?: number;
    article: Article;
    qteTransferer: number;
   
  }