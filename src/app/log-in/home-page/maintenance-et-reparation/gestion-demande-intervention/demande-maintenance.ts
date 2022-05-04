import { Vehicule } from "../../administratif/vehicules/vehicule";

export interface DemandeMaintenance {
  id?: number;
  vehicule: Vehicule;
  numeroSerie: string;
  idBeneficiaire: number;
  nomBeneficiaire: string;
  matriculeBeneficiaire: string;
  structure: string;
  personnel?: string;
  ugp: string;
  ugpReparation: string;
  demandeur: string;
  dateDemande: string;
  indexKm: number;
  descriptionIntervention: string;
  status: string;
  dateRDV: string;
  observation?: string;
  numeroDemande?: string;
}
