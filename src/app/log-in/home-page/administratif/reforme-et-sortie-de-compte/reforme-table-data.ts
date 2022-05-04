import {Vehicule} from '../vehicules/vehicule';

export interface ReformeTableData {
  vehicule?: Vehicule;
  id?: number;
  nom: string;
  reference: string;
  prix: number;
  numeroPlaque?: string;
  date: string;
  dateSortie: string;
  cause: string;
  idVehicule: number;
  structure?: string;
}
