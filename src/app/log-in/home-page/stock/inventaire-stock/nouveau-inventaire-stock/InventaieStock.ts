import { Article } from "../../../referentiel/general/articles/article";

export interface InventaireStock {
  id?: number;
  article: Article;
  quantiteInvente: number;
  quantite: number;
}
