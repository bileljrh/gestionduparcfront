import {Marche} from './marche';
import {DemandeArticle} from './demande-article';
import {Fournisseur} from '../referentiel/general/fournisseurs/fournisseur';

export interface BonCommande {
  id?: number;
  achat: string;
  parc: string;
  status: string;
  dateDemande: string;
  commandeHTBrut: number;
  commandeHTNet: number;
  commandeTVA: number;
  commandeTimbreFix: number;
  commandeTTC: number;
  livraisonHTBrut: number;
  livraisonHTNet: number;
  livraisonTVA: number;
  livraisonTimbreFix: number;
  livraisonTTC: number;
  montantLivre: number;
  montantFacture: number;
  dateFacture: string;
  referenceFacture: string;
  montantReglement: number;
  dateReglement: string;
  referenceReglement: string;
  receipt: boolean;
  fournisseur: Fournisseur;
  marche: Marche;
  demandesArticle: DemandeArticle[];
}
