import {Vehicule} from '../vehicules/vehicule';

export interface VisiteTechnique {
  id?: number;
  nombrePlaces: number;
  montantVisiteTechnique: number;
  prixAchat: number;
  puissanceFiscale: number;
  datePMC: string;
  dateDebutValidite: string;
  dateFinValidite: string;
  vehicule?: Vehicule;
}
