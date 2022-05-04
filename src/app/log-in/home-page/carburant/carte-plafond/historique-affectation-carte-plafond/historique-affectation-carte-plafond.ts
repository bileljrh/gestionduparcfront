import { CartePlafond } from "../carte-plafond";

export interface HistoriqueAffectationCartePlafond {
  id?: number;
  idVehicule: number;
  structure: string;
  numeroCarte: string;
  montant: number;
  nomBeneficiaire: string;
  matriculeBeneficiaire: string;
  numeroPlaque: string;
  //indexKm: number;
  typeCarburant: string;
  dateAffectation: string;
  cartePlafond:CartePlafond;
}
