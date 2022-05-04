import {Vehicule} from '../vehicules/vehicule';

export interface Gps {
  id: number;
  codeIMEI: string;
  lien: string;
  vehicule: Vehicule;
}
