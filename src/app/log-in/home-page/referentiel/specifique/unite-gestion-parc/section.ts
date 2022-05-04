import {Magasin} from './magasin';
import {Atelier} from './atelier';
import {Ressource} from './ressource';

export interface Section {
  id?: number;
  code: string;
  designation: string;
  nombrePersonnels: number;
  magasin?: Magasin;
  atelier?: Atelier;
  ressource?: Ressource;
  collapsed?: boolean;
  square?: boolean;
}
