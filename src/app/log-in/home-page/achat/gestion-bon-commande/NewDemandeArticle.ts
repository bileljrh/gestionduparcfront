import { NewArticle } from "./NewArticle";

export interface NewDemandeArticle {
  id?: number;
  article: NewArticle;
  quantiteCommandee: number;
  quantiteLivree: number;
}
