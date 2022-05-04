import {SousFamilleArticle} from './sous-famille-article';

export interface FamilleArticle {
  id?: number;
  famille: string;
  code: string;
  sousFamilles?: SousFamilleArticle[];
}
