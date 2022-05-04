import { Fournisseur } from '../../referentiel/general/fournisseurs/fournisseur';
import { BonTravailArticle } from '../BonTravailArticle';
import { BonTravailArticleExterne } from '../BonTravailArticleExterne';
import { BonTravailOperation } from '../BonTravailOperation';
import { FacturationBonTravail } from '../FacturationBonTravail';
import {DemandeMaintenance} from '../gestion-demande-intervention/demande-maintenance';

export interface BonTravail {
  demandeMaintenance: DemandeMaintenance;
  id?: number;
  dateEntree: string;
  dateSortiePrevue: string;
  natureTravaux: string;
  mode: string;
  //fournisseur:Fournisseur;
  indexKM: number;
  observation: string;
  cloturer? : boolean; 
  facturation:FacturationBonTravail[],
  bonTravailArticle:BonTravailArticle[],
  bonTravailOperation:BonTravailOperation[],
  bonTravailArticleExterne:BonTravailArticleExterne[]


}
