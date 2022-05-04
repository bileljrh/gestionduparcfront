import { UpdateArticle } from "../referentiel/general/articles/update-article";
import { Magasin } from "../referentiel/specifique/unite-gestion-parc/magasin";

export interface UpdateUgpArticle  {
    id?: number;
    updateArticle: UpdateArticle;
    qteTransferer: number;
    magasinDestinataire: string;
    
    
  }