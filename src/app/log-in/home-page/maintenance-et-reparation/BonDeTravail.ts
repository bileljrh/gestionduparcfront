import { Article } from "../referentiel/general/articles/article";
import { Fournisseur } from "../referentiel/general/fournisseurs/fournisseur";
import { Atelier } from "../referentiel/specifique/unite-gestion-parc/atelier";
import { Magasin } from "../referentiel/specifique/unite-gestion-parc/magasin";
import { ArticleBon } from "./ArticleBon";
import { BonTravailArticle } from "./BonTravailArticle";
import { BonTravailArticleExterne } from "./BonTravailArticleExterne";
import { BonTravailOperation } from "./BonTravailOperation";
import { FacturationBonTravail } from "./FacturationBonTravail";
import { DemandeMaintenance } from "./gestion-demande-intervention/demande-maintenance";

export interface BonDeTravail {
//  demandeMaintenance: DemandeMaintenance;
  id?: number;
 // facturation:FacturationBonTravail;
 // fournisseur:Fournisseur;
 //articles:Article;
  articles?:BonTravailArticle[];
  externes?:BonTravailArticleExterne[];
  observationMode?:string;
  observatioMode?:string;
  operations?:BonTravailOperation[];
  fournisseur?:Fournisseur[],
  facturation?:FacturationBonTravail,
  magasin?:Magasin[],
  atelier?:Atelier[]
 // bonTravailArticle:BonTravailArticle[];
 // bonTravailOperation:BonTravailOperation;
 // bonTravailArticleExterne:BonTravailArticleExterne;
}