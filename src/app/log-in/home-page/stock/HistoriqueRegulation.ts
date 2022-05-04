import { RegulationArticleStock } from "./RegulationArticleStock";

export class HistoriqueRegulation {
    id?: number; 
    creationDate?: Date;
    type_mouvement?: string;
    observation?: String;
    quantite_modifier?: number ; 
    codeArticle?: String;
}
  