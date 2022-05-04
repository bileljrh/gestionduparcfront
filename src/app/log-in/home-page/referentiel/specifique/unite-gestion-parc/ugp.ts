import {Structure} from '../structure-administrative/structure';
import {User} from '../../../carburant/etat-mensuel/details-exploitation/details-exploitation.component';
import {Magasin} from './magasin';
import {Ressource} from './ressource';
import {Atelier} from './atelier';

export interface UGP {
  id?: number;
  
  code: string;
  
  designation: string;
  
  structures?: Structure[];
  
  users?: User[];
  
  magasins?: Magasin[];
  
  ressources?: Ressource[];
  
  ateliers?: Atelier[];
  
  collapsed?: boolean;
  
  square?: boolean;
  

    
}
