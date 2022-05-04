import { FournisseurList } from "./FournisseurList";
import { NewDemandeArticle } from "./NewDemandeArticle";

export interface BonCommandeList {
  id?: number;
  parc: string;
  status: string;
  dateDemande: string;
  fournisseur: FournisseurList;
  demandesArticle: NewDemandeArticle[];

}
