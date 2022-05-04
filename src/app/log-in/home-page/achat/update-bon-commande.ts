import {Marche} from './marche';
import {UpdateDemandeArticle} from './update-demande-article';
import {Fournisseur} from '../referentiel/general/fournisseurs/fournisseur';

export interface UpdateBonCommande {
  id?: number;
  //achat: string;
  
  parc?: string;
  status?: string;
  dateDemande?: string;
  numePiece?:string;
  commandeHTBrut?: number;
  commandeHTNet?: number;
  commandeTVA?: number;
  commandeTimbreFix?: number;
  commandeTTC?: number;
  livraisonHTBrut?: number;
  livraisonHTNet?: number;
  livraisonTVA?: number;
  livraisonTimbreFix?: number;
  livraisonTTC?: number;
  montantLivre?: number;
  montantFacture?: number;
  dateFacture?: string;
  referenceFacture?: string;
  montantReglement?: number;
  dateReglement?: string;
  referenceReglement?: string;
  marche?: Marche;
  fournisseur?: Fournisseur;
  updateDemandesArticle?: UpdateDemandeArticle[];
}
