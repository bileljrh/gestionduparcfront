import { UpdateUgpArticle } from "./UpdateUgpArticle";

export interface UpdateUgp{
    id? : number ;
    status:string,
    updateParcTransfertArticle :UpdateUgpArticle [];
}