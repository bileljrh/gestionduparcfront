import { Article } from "../../general/articles/article";
import { Magasin } from "./magasin";
import { UGP } from "./ugp";

export interface UgpArticle{
    id?: number;
    article: Article;
    qteTransferer: number;
    magasinDestinataire: string;
}