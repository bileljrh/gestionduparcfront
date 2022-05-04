import {FamilleArticle} from './famille-article';

export interface SousFamilleArticle {
  id?: number;
  code: string;
  sousFamille: string;
  famille?: FamilleArticle;
}
