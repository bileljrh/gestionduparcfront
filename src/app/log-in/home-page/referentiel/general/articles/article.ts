import {MarqueVehicule} from '../parametres-vehicules/marque-vehicule/marque-vehicule';
import {TypeVehicule} from '../parametres-vehicules/type-vehicule/type-vehicule';
import {GenreVehicule} from '../parametres-vehicules/genre-vehicule/genre-vehicule';
import {SousFamilleArticle} from './sous-famille-article';
import {UGP} from '../../specifique/unite-gestion-parc/ugp';
import { RegulationArticleStock } from '../../../stock/RegulationArticleStock';
import { DemandeArticle } from '../../../achat/demande-article';
import { magasinVirtuel } from '../../../stock/transfert-magasin/MagasinVirtuel';
import { EtatStock } from '../../specifique/etat-stock/etat-stock';
import { BonTravailArticle } from '../../../maintenance-et-reparation/BonTravailArticle';
import { BonTravailArticleExterne } from '../../../maintenance-et-reparation/BonTravailArticleExterne';
import { InventaireArticleStock } from '../../../stock/inventaire-stock/InventaireArticleStock';
import { RetourStructure } from '../../../stock/RetourStructure';

export interface Article {
  id?: number;
  designation?: string;
  codeArticle?: string;
  quantiteStock?: number;
  quantiteInventaire?: number;
  prix?: number;
  ugp?: UGP;
  dateAjout?: string;
  quantiteLivree?: number;
  tva?: number;
  remise?: number;
  sousFamille?: SousFamilleArticle;
  marqueVehicule?: MarqueVehicule;
  typeVehicule?: TypeVehicule;
  genreVehicule?: GenreVehicule;
  demandeArticles? : DemandeArticle;
  magasinVirtuelArticle? : magasinVirtuel; 
  etatsStock?: EtatStock ;
  bonTravailArticle? : BonTravailArticle ;
  bonTravailArticleExterne? : BonTravailArticleExterne ;
  inventaireStock? : InventaireArticleStock; 
  retourStructure? : RetourStructure; 
  alertStock ?:number ;
  
}