import { Article } from "../referentiel/general/articles/article";


export class RetourStructure {
    id?: number;
    dateSortie: Date ; 
    magasin:string ; 
    structure : String ; 
    articles: Article[];
    
  }