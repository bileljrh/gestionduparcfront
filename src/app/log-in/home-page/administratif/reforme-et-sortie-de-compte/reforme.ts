import {Vehicule} from '../vehicules/vehicule';

export interface Reforme {
  vehicule?: Vehicule;
  id?: number;
  nom: string;
  date: string;
  reference: string;
  dateSortie: string;
  prix: number;
  cause: string;
}
