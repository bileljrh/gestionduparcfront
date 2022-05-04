import {UGP} from './ugp';
import {Section} from './section';

export interface Ressource {
  id?: number;
  numero: string;
  designation: string;
  prixUnitaire: string;
  nombrePersonnels: number;
  ugp?: UGP;
  sections?: Section[];
  collapsed?: boolean;
  square?: boolean;
}
