import {Vehicule} from '../vehicules/vehicule';

export interface TaxeCirculation {
  vehicule?: Vehicule;
  id?: number;
  numeroQuittance: string;
  parPoids: boolean;
  poids: number;
  parPlace: boolean;
  nombrePlaces: number;
  dateDebutCirculation: string;
  dateFinCirculation: string;
  montant: number;
  dateFinValidite: string;
}
