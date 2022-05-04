import {MagasinUGP} from './magasin-ugp';

export interface StructureUgpMagasin {
  idStructure: number;
  designationStructure: string;
  codeStructure: string;
  idUgp: number;
  designationUgp: string;
  codeUgp: string;
  magasins: MagasinUGP[];
}
