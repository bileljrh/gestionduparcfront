import {UGP} from '../unite-gestion-parc/ugp';

export interface Structure {
  id?: number;
  code: string;
  typeStructure: string;
  designation: string;
  structureMere?: string;
  ugp: UGP;
  collapsed?: boolean;
  square?: boolean;
  structureFilles?: Structure[];
}
