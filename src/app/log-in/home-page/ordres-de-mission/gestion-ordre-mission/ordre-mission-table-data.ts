import {AccompagnonMission} from '../accompagnon-mission';

export interface OrdreMissionTableData {
  accompagnons: AccompagnonMission[];
  id?: number;
  idVehicule: number;
  numeroPlaque: string;
  codeStructure: string;
  designationStructure: string;
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
  depassantDateRetour: boolean;
}
