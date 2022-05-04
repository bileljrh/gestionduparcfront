import { Article } from "../referentiel/general/articles/article";
import { ArticleBon } from "./ArticleBon";

export interface BonTravailArticle {
  
    id?: number;
    articles:ArticleBon;
    quantite: number;
    quantiteLivree:number;
    
  }