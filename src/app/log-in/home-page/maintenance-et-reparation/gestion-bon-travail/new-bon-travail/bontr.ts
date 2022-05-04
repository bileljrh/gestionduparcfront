import { DemandeMaintenance } from "../../gestion-demande-intervention/demande-maintenance";

export interface bntr{
    demandeMaintenance: DemandeMaintenance;
  id?: number;
  dateEntree: string;
  dateSortiePrevue: string;
  natureTravaux: string;
  mode: string;
  //fournisseur:Fournisseur;
  indexKM: number;
  observation: string;
}