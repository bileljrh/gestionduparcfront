import {AccompagnonMission} from './accompagnon-mission';

export interface OrdreMission {
  id?: number;
  idVehicule: number;
  numeroSerie: string;
  typeCarburant: string;
  structure: string;
  idBeneficiaire: number;
  nomBeneficiaire: string;
  matriculeBeneficiaire: string;
  numeroOrdre: string;
  dateOrdre: string;
  heureDateDepart: string;
  indexDepart: number;
  lieuDepart: string;
  destination: string;
  objectifMission: string;
  marchandiseTransportee: string;
  dateDebutValidite: string;
  dateFinValidite: string;
  heureDateRetour: string;
  indexRetour: number;
  confirmed: boolean;
  accompagnons: AccompagnonMission[];
}
