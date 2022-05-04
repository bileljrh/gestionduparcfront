import { ArticleBon } from "./ArticleBon";

export interface BonTravailArticleExterne {
    id?:number
    externes:ArticleBon;
    quantite: number;
    quantiteLivree:number;
}