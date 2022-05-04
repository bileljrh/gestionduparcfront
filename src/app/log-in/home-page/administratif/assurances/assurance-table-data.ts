import {SelectVehicule} from '../vehicules/select-vehicule';

export interface AssuranceTableData {
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
  vehicules: SelectVehicule[];
}

