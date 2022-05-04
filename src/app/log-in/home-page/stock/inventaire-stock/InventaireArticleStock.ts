import { Article } from "../../referentiel/general/articles/article";

export class InventaireArticleStock {
  id?: number;
  dateInventaire: Date ; 
  tMouvement:string ; 
  magasin : String ; 
  articles: Article[];
  
}
