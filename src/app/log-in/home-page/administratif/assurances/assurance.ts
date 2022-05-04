import {Vehicule} from '../vehicules/vehicule';

export interface Assurance {
  id?: number;
  datePMC: string;
  nombreplaces: number;
  puissanceFiscale: number;
  montantAssurance: number;
  dateDebutValidite: string;
  dateFinValidite: string;
  assuranceSP: string;
  numeroContrat: string;
  compagnieAssurance: string;
  vehicules?: Vehicule[];
}
