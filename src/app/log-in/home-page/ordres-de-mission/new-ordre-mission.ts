import {AccompagnonMission} from './accompagnon-mission';

export interface NewOrdreMission {
  accompagnons: AccompagnonMission[];
  id?: number;
  idVehicule: number;
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
  depassantDateRetour: boolean;
}
