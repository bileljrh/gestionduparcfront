import {UGP} from './ugp';
import {Section} from './section';

export interface Magasin {
  id?: number;
  code: string;
  designation: string;
  ugp?: UGP;
  sections?: Section[];
  collapsed?: boolean;
  square?: boolean;
}
