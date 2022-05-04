import {Article} from '../../general/articles/article';

export interface EtatStock {
  id?: number;
  chapitre: string;
  time: string;
  article: Article;
  paragraphe: string;
  region: string;
  sousParagraphe: string;
}
